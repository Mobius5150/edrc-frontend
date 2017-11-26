import { setInterval } from 'timers';

const deepExtend = require('deep-extend');

type ObjectGetterFunc<Obj> = (key: string) => Promise<Obj>;

export interface IObjectCacheParams {
	keyField: string;
	lazyCacheArrays: boolean;
}

class CacheArray<Obj> extends Array<Obj> {
	private cache: ObjectCache<Obj>;
	private initialCount: number;
	private hasIterated: boolean;

	public static create<Obj>(items: Array<Obj>, cache: ObjectCache<Obj>, initialCount: number): CacheArray<Obj> {
		return new CacheArray<Obj>(items, cache, initialCount);
	}

	public forEach(callbackfn: (value: Obj, index: number, array: Obj[]) => void, thisArg?: any) {
		for (var i = 0; i < this.length; ++i) {
			const obj = this[i];
			if (!this.hasIterated) {
				this.cache.addToCache(obj, this.initialCount);
			}

			callbackfn.call(thisArg, obj, i, this);
		}

		this.hasIterated = true;
	}

	public map<U>(callbackfn: (value: Obj, index: number, array: Obj[]) => U, thisArg?: any): U[] {
		const ret: U[] = [];
		for (var i = 0; i < this.length; ++i) {
			const obj = this[i];
			if (!this.hasIterated) {
				this.cache.addToCache(obj, this.initialCount);
			}

			ret.push(callbackfn.call(thisArg, obj, i, this));
		}

		this.hasIterated = true;

		return ret;
	}

	public filter<S extends Obj>(callbackfn: (value: Obj, index: number, array: Obj[]) => value is S, thisArg?: any): S[] {
		const ret: S[] = [];
		for (var i = 0; i < this.length; ++i) {
			const obj = this[i];
			if (!this.hasIterated) {
				this.cache.addToCache(obj, this.initialCount);
			}

			const val = callbackfn.call(thisArg, obj, i, this);
			if (val) {
				ret.push(val);
			}
		}

		this.hasIterated = true;

		return ret;
	}

	private constructor(items: Array<Obj>, cache: ObjectCache<Obj>, initialCount: number) {
		super(...items);

		Object.setPrototypeOf(this, CacheArray.prototype);
		this.cache = cache;
		this.initialCount = initialCount;
		this.hasIterated = false;
	}
}

class CacheEntry<Obj> {
	public value: Obj | Promise<Obj | null | Error> | Error | null;

	private _references: number = 0;

	public get references(): number {
		return this._references;
	}

	constructor(value: Obj | Promise<Obj>) {
		if (value instanceof Promise) {
			this.value = this.wrapPromise(value);
		} else {
			this.value = value;
		}
	}
	
	public async when(take: number): Promise<Obj | Error | null> {
		if (this.value instanceof Promise) {
			const result = await this.value;
			if (result === null || result instanceof Error) {
				return result;
			}

			this.take(take);
			return result;
		} else if (this.value instanceof Error) {
			return this.value;
		} else {
			this.take(take);
			return this.value;
		}
	}

	public take(count: number): void {
		this._references += count;
	}

	public release(count: number): void {
		this._references -= count;
		if (this._references < 0) {
			this._references = 0;
		}
	}

	public async refresh(promise: Promise<Obj>): Promise<Obj | Error | null> {
		try {
			this.mergeIn(await promise);
		} catch (e) {
			if (e instanceof Error) {
				this.value = e;
			} else {
				this.value = new Error(e);
			}
		}

		return this.value;
	}

	public mergeIn(otherValue: Obj): void {
		if (this.hasValue()) {
			deepExtend(this.value, otherValue);
		} else {
			this.value = otherValue;
		}
	}

	public hasValue(): boolean {
		return !(this.value === null || this.value instanceof Error || this.value instanceof Promise) && typeof this.value === 'object';
	}

	private async wrapPromise(promise: Promise<Obj>): Promise<Obj | Error | null> {
		try {
			this.value = await promise;
			return this.value;
		} catch (e) {
			if (e instanceof Error) {
				this.value = e;
			} else {
				this.value = new Error(e);
			}
		}

		return this.value;
	}
}

export class ObjectCache<Obj extends {}> {
	private static readonly CacheClearInterval: number = 5000;
	private static readonly CacheClearMaxItems: number = 10;
	private getterFunc: ObjectGetterFunc<Obj>;
	private params: IObjectCacheParams;
	private cache: {[key: string]: CacheEntry<Obj>};
	private checkInterval: NodeJS.Timer | null;
	private cacheClearList: string[];

	constructor(getter: ObjectGetterFunc<Obj>, params: IObjectCacheParams) {
		this.getterFunc = getter;
		this.params = params;
		this.cache = {};
		this.cacheClearList = [];
		this.checkInterval = null;
	}

	public async getObjectById(key: string, take: boolean | number = false): Promise<Obj | Error | null> {
		let takeCount = 0;
		if (take === true) {
			takeCount = 1;
		} else if (typeof take === 'number' && take > 0) {
			takeCount = take;
		}

		if (this.cache[key]) {
			return this.cache[key].when(takeCount);
		}

		this.cache[key] = new CacheEntry(this.getterFunc(key));
		return this.cache[key].when(takeCount);
	}

	public takeObject(key: string, count: number) {
		if (!(this.cache[key])) {
			throw new Error(`Object not in cache: ${key}`);
		}

		this.cache[key].take(count);
	}

	public releaseObject(key: string, count: number = 1): void {
		if (!(this.cache[key])) {
			return;
		}

		this.cache[key].release(count);

		if (this.cache[key].references === 0) {
			this.addToCacheClearList(key);
		}
	}

	public refreshObject(key: string): Promise<Obj | Error | null> {
		if (!(this.cache[key])) {
			throw new Error('Object not in cache');
		}

		return this.cache[key].refresh(this.getterFunc(key));
	}

	public addToCache(obj: Obj, initialCount: number = 0) {
		const key: string = obj[this.params.keyField];
		let entry: CacheEntry<Obj> | null = null;

		if (this.cache[key]) {
			entry = this.cache[key];
			entry.mergeIn(obj);
		} else {
			entry = new CacheEntry(obj);
			this.cache[key] = entry;
		}

		entry.take(initialCount);
	}

	/**
	 * Adds all objects in the array to the cache with the given initialCount.
	 * 
	 * If lazyCacheArrays is true, this will return an instance of CacheArray<Obj>. When iterating over a 
	 * CacheArray be sure to call the array iteration functions (`array.forEach` and `array.map`) rather than iterating manually.
	 * When you do this objects will be cached as you iterate them - saving an iteration of the array.
	 * 
	 * If lazyCacheArrays is false then this will return the array you pass it after caching all items, unmodified.
	 * @param objects 
	 * @param initialCount 
	 * @param lazyCacheArrays Whether to perform lazy caching of arrays.
	 */
	public addManyToCache(objects: Obj[], initialCount: number = 1, lazyCacheArrays: boolean = this.params.lazyCacheArrays): Array<Obj> {
		if (lazyCacheArrays) {
			return CacheArray.create(objects, this, initialCount);
		}

		for (var i in objects) {
			this.addToCache(objects[i], initialCount);
		}

		return objects;
	}

	private clearDereferencedItems = () => {
		const clearCount = this.cacheClearList.length > ObjectCache.CacheClearMaxItems ? ObjectCache.CacheClearMaxItems : this.cacheClearList.length;
		for (var i = 0; i < clearCount; ++i) {
			const key = this.cacheClearList[i];
			if (!this.cache[key] || this.cache[key].references > 0) {
				continue;
			}

			delete this.cache[key];

			if (++i >= ObjectCache.CacheClearMaxItems) {
				break;
			}
		}

		this.cacheClearList.splice(0, i);

		if (this.cacheClearList.length === 0 && this.checkInterval !== null) {
			clearInterval(this.checkInterval);
			this.checkInterval = null;
		}
	}

	private addToCacheClearList(key: string) {
		const previousLength = this.cacheClearList.length;
		this.cacheClearList.push(key);
		if (previousLength === 0 && this.checkInterval === null) {
			this.checkInterval = setInterval(this.clearDereferencedItems, ObjectCache.CacheClearInterval);
		}
	}
}