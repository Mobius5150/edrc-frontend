import * as React from 'react';
import { UserController, IUser } from '../../controllers/User';
import { User as UserPage } from '../User/User';
import { IGenericRouteProps } from '../../util/Route';
import './style.css';

interface IHomeState {
	loading: boolean;
	signedIn: boolean;
	user: IUser | null;
}

class Home extends React.Component <IGenericRouteProps, IHomeState> {
	private userController: UserController;

	public constructor(props: IGenericRouteProps) {
		super(props);
		this.userController = new UserController();
		this.state = {
			loading: true,
			signedIn: false,
			user: null
		};
	}

	componentDidMount() {
		if (null === this.state.user) {
			this.userController.getCurrentUser()
				.then(user => this.setState({...this.state, user, signedIn: user !== null, loading: false}))
				.catch(e => this.setState({...this.state, user: null, signedIn: false, loading: false}));
		} else {
			this.setState({...this.state, loading: false});
		}
	}

	render() {
		// if (this.state.loading) {
		// 	// TODO: show a loader here while loading
		// 	return (<div className="loading" />);
		// }

		if (this.state.signedIn) {
			const params: any = {};
			if (this.state.user) {
				params.username = this.state.user.username;
			}
			
			return (<UserPage {...this.props} {...params} />);
		}

		return (
			<div className="home">
				<div className="home-header">
					<h2>Welcome to EDRC</h2>
				</div>
				<div className="home-intro">
					<p>EDRC is a free tool to automate design and electrical checks in Eagle.</p>
					<p>It only takes a couple minutes to setup EDRC to automatically check your
						GitHub projects for errors in your Eagle CAD designs. Get started by signing in
						below!</p>
				</div>
			</div>
		);
	}
}

export default Home;
