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