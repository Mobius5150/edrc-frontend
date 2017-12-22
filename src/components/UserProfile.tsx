import * as React from 'react';
import classNames from 'classnames';

import { UserController, IUser } from '../controllers/User';
import '../app.css';

interface IUserProfileProps {

}

interface IUserProfileState {
	signedIn: boolean;
	user: IUser | null;
}

export class UserProfile extends React.Component<IUserProfileProps, IUserProfileState> {
	private userController: UserController;

	public constructor(props: IUserProfileProps) {
		super(props);

		this.state = {
			signedIn: false,
			user: null,
		};
	}

	componentWillMount() {
		if (null == this.userController) {
			this.userController = new UserController();
		}

		this.userController.getCurrentUser()
			.then(user => this.setState({...this.state, signedIn: user !== null, user }))
			.catch(e => {
				this.setState({...this.state, signedIn: false});
			});
	}

	render() {
		const userPhoto = this.state.user === null ? '' : this.state.user.github.profilePhotoUrl;
		return (
			<div className={classNames({'user-profile': true, authed: this.state.signedIn})}>
				{this.state.signedIn ? 
					<img src={userPhoto} className="user-profile-img" />
				:
					<a href="/auth/github" className="sign-in">Sign In</a>
				}
			</div>
		);
	}
}

export default UserProfile;
