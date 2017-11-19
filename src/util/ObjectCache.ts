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
		// return Object.create(CacheArray.prototype);
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
		} else {
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
	private getterFunc: ObjectGetterFunc<Obj>;
	private params: IObjectCacheParams;
	private cache: {[key: string]: CacheEntry<Obj>};

	constructor(getter: ObjectGetterFunc<Obj>, params: IObjectCacheParams) {
		this.getterFunc = getter;
		this.params = params;
		this.cache = {};
	}

	public async getObjectById(key: string, take: boolean | number = false): Promise<Obj | Error | null> {
		let takeCount = 0;
		if (take === true) {
			takeCount = 1;
		} else if (typeof take === 'number' && takeCount > 0) {
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
			// TODO: timed release
			delete this.cache[key];
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

	public addManyToCache(objects: Obj[], initialCount: number = 1): Array<Obj> {
		if (this.params.lazyCacheArrays) {
			return CacheArray.create(objects, this, initialCount);
		}

		for (var i in objects) {
			this.addToCache(objects[i], initialCount);
		}

		return objects;
	}
}