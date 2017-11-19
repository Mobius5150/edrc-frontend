export interface IRouteProps<P extends {}, Q extends {}> {
	location: {
		query: Q
	};
	match: {
		params: P
	};
}

export type IGenericRouteProps = IRouteProps<any, any>;