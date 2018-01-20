import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { UserController, IUser } from '../../controllers/User';
import { resolve as urlResolve } from 'url';
import './style.css';

interface IUserMeControlState {
	signedIn: boolean;
	user: IUser | null;
	menuHidden: boolean;
}

export class UserMeControl extends React.Component <any, IUserMeControlState> {
	private static readonly FrontendCookieName = '__edrc_frontend';
	private userController: UserController;
	private frontendVer: string | null;

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

		this.frontendVer = this.getFrontendCookieVal();
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
				className="user-profile-img"
				onClick={() => this.toggleMenuDropdown()}
			/>
			<div className={classNames({menu: true, hidden: this.state.menuHidden})}>
				<ul>
					<li className="menu-header">Signed in as <b>{userName}</b></li>
					<li className="menu-divider"/>
					{null !== this.frontendVer &&
						<React.Fragment>
							<li className="menu-header frontend-version" title="Active frontend version">
								<span className="ion-ios-flask frontend-version-icon" />
								<a
									href={urlResolve(window.location.href, '?clearFrontend=true')}
									className="clear-frontend"
									title="Clear active frontend"
								>
									<span className="ion-close" />
								</a>
								{this.frontendVer}
							</li>
							<li className="menu-divider"/>
						</React.Fragment>
					}
					<li className="menu-item">Settings</li>
					<li className="menu-item">Help</li>
					<Link to="/logout" target="_self">
						<li 
							className="menu-item"
							onClick={() => this.toggleMenuDropdown()}
						>
							Sign out
						</li>
					</Link>
				</ul>
			</div>
			</React.Fragment>
		);
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

	private getFrontendCookieVal(): string | null {
		const cookies = document.cookie.split(';');
		for (const c in cookies) {
			const [key, value] = cookies[c].split('=', 2);
			if (!key || !value) {
				continue;
			}

			if (key === UserMeControl.FrontendCookieName) {
				return value;
			}
		}

		return null;
	}
}

export default UserMeControl;