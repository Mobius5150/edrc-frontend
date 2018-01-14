import { RouteComponentProps } from 'react-router-dom';

export interface IRouteProps<P extends {}, Q extends {}> {
	location: {
		query: Q
	};
	match: {
		params: P
	};
	history: RouteComponentProps<any>['history'];
}

export type IGenericRouteProps = IRouteProps<any, any>;