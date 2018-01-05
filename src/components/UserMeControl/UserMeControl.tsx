import * as React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { UserController, IUser } from '../../controllers/User';
import './style.css';

interface IUserMeControlState {
	signedIn: boolean;
	user: IUser | null;
	menuHidden: boolean;
}

export class UserMeControl extends React.Component <any, IUserMeControlState> {
	private userController: UserController;

	public constructor(props: any) {
		super(props);

		this.state = {
			signedIn: false,
			user: null,
			menuHidden: true
		};
	}

	componentDidMount() {
		this.userController = new UserController();

		this.userController.getCurrentUser()
			.then(user => this.setState({...this.state, signedIn: user !== null, user }))
			.catch(e => {
				this.setState({...this.state, signedIn: false});
			});
	}

	toggleMenuDropdown() {
		this.setState({...this.state, menuHidden: !this.state.menuHidden});
	}

	renderDropdown() {
		const userPhoto = this.state.user === null ? '' : this.state.user.github.profilePhotoUrl;
		const userName = this.state.user === null ? '' : this.state.user.username;
		return (
			<React.Fragment>
			<img 
				src={userPhoto} 
				className='user-profile-img' 
				onClick={() => this.toggleMenuDropdown()}
			/>
			<div className={classNames({'menu': true, 'hidden': this.state.menuHidden})}>
				<ul>
					<li className='menu-header'>Signed in as <b>{userName}</b></li>
					<li className='menu-divider'/>
					<li className='menu-item'>Settings</li>
					<li className='menu-item'>Help</li>
					<Link to='/logout' target='_self'>
						<li 
							className='menu-item'
							onClick={() => this.toggleMenuDropdown()}
						>
							Sign out
						</li>
					</Link>
				</ul>
			</div>
			</React.Fragment>
		)
	}

	render() {
		return (
			<div className={classNames({'user-profile': true, authed: this.state.signedIn})}>
				{this.state.signedIn ? 
					this.renderDropdown()
				:
					<a href="/login" className="sign-in">Sign In</a>
				}
			</div>
		);
	}
}

export default UserMeControl;