import * as React from 'react';
import { UserController, IUser } from '../../controllers/User';
import { UserProjectsBar } from '../../components/UserProjectsBar';
import { IRouteProps } from '../../util/Route';
import './style.css';

interface IUserProps extends IRouteProps<{ username: string }, {}> {
	username?: string;
	project?: string;
	build?: string;
}

interface IUserState {
	error: string | null;
	loading: boolean;
	signedIn: boolean;
	user: IUser | null;
}

export class User extends React.Component<IUserProps, IUserState> {
	private userController: UserController;
	private username: string;

	public constructor(props: IUserProps) {
		super(props);
		if (!(props.username) && (props.match.params.username)) {
			this.username = props.match.params.username;
		} else if (props.username) {
			this.username = props.username;
		}
		
		this.userController = new UserController();
		this.state = {
			error: null,
			loading: true,
			signedIn: false,
			user: null,
		};
	}

	componentWillMount() {
		if (!(this.username)) {
			this.setState({...this.state, loading: false, error: 'No user provided'});
		} else if (null === this.state.user) {
			this.userController.getUser(this.username)
				.then(user => this.setState({...this.state, user, signedIn: user !== null, loading: false}))
				.catch((e: Error) => {
						this.setState({...this.state, user: null, signedIn: false, loading: false, error: e.message});
				});
		} else {
			this.setState({...this.state, loading: false});
		}
	}

	componentWillUnmount() {
		if (this.state.user) {
			this.userController.releaseUserRef(this.state.user.username);
		}
	}
	
	render() {
		if (this.state.error) {
			return (<div className="error">{this.state.error}</div>);
		}

		if (this.state.loading) {
			return (<div className="loading" />);
		}

		const userParams: any = {...this.props};
		if (this.state.user) {
			userParams.username = this.state.user.username || this.state.user.id;
		}

		return (
			<div className="page-user">
				<UserProjectsBar {...userParams} />
				<div className="project-builds">
					<div className="App-header">
						<h2>UserController: {this.state.user ? this.state.user.username : ''}</h2>
					</div>
					<p className="App-intro">
						To get started, edit <code>src/App.tsx</code> and save to reload yo.
					</p>
				</div>
			</div>
		);
	}
}

export default User;
