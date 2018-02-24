export const enum AnalyticsCategories {
	Embeds = 'Embeds',
	Builds = 'Builds',
	Projects = 'Projects',
	Account = 'Account',
	Home = 'Home'
}

export const enum AnalyticsActions {
	Click = 'Click',
	Open = 'Open',
	Close = 'Close',
}

export const enum BuildAnalyticsActions {
	ChangeFile = 'Change File'
}

export const enum ProjectAnalyticsActions {
	Deactivate = 'Deactivate',
	Activate = 'Activate'
}

export const enum GoogleAppDimension {
	Authentication = 'authentication'
}

export function analyticsEvent(category: string, action: string, label?: string, value?: number) {
	// @ts-ignore
	gtag('event', action, {
		event_category: category,
		event_label: label,
		value
	});
}

export function analyticsDimension(dimension: GoogleAppDimension, value: any) {
	const obj = {};
	obj[dimension] = value;
	// @ts-ignore
	gtag('event', 'dimension', obj);
}

export function analyticsError(object: Object | null, f: Function | string, error: Error | string, fatal: boolean = false) {
	try {
		let objectName: string | null = '[unknown]';
		let funcName = '[unknown]';
		if (object) {
			// @ts-ignore
			if (object.name) {
				// @ts-ignore
				objectName = object.name;
			} else if (object.constructor && object.constructor.name) {
				objectName = object.constructor.name;
			}
		} else if (object === null) {
			objectName = null;
		}

		if (typeof f === 'function') {
			if (f && f.name) {
				funcName = f.name;
			}
		} else if (f) {
			funcName = f;
		}

		let errorText = error;
		if (error instanceof Error) {
			errorText = error.message;
		}

		if (objectName === null) {
			logException(`${funcName}(): ${errorText}`, fatal);
		} else {
			logException(`${objectName}::${funcName}(): ${errorText}`, fatal);
		}
	} catch (e) {
		logException(`[analyticsError]: ${error} (${e})`, fatal);
	}
}

function logException(description: string, fatal: boolean) {
	// @ts-ignore
	gtag('event', 'exception', {
		description,
		fatal
	});
}