import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import Header from './components/Header';

// Pages
import Home from './pages/Home/Home';
import User from './pages/User/User';
import NotFound from './pages/NotFound/NotFound';

// TODO: Get rid of this stupid div
const Routes = (props: any) => (
	<BrowserRouter {...props}>
		<>
			<Route component={Header} />
			<Switch>
				<Route exact={true} path="/" component={Home} />
				<Route path="/g/:username/:project/:build" component={User} />
				<Route path="/g/:username/:project" component={User} />
				<Route path="/g/:username" component={User} />
				<Route path="*" component={NotFound} />
			</Switch>
		</>
	</BrowserRouter>
);

export default Routes;