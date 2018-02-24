import * as React from 'react';
import { UserController, IUser } from '../../controllers/User';
import { User as UserPage } from '../User/User';
import { IGenericRouteProps } from '../../util/Route';
import './style.css';
import { AnalyticsCategories, AnalyticsActions } from '../../util/Analytics';

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
		if (this.state.signedIn && this.state.loading) {
			// TODO: show a loader here while loading
			return (<div className="loading" />);
		}

		if (this.state.signedIn) {
			const params: any = {};
			if (this.state.user) {
				params.username = this.state.user.username;
			}
			
			return (<UserPage {...this.props} {...params} />);
		}

		const introItems = [
			{
				id: 'collab',
				img: '/images/front-octocat-2x.png',
				text: 'Collaborate on GitHub'
			},
			{
				id: 'drc',
				img: '/images/front-magglass.png',
				text: 'EDRC checks design rules on every change'
			},
			{
				id: 'design-images',
				img: '/images/front-camera.png',
				text: 'Generate images of your design at each stage'
			},
			{
				id: 'gerber',
				img: '/images/front-gears.png',
				text: 'Gerber files available instantly'
			}
		];

		return (
			<div className="home">
				<div className="home-header">
					<h1>Collaborate with Confidence</h1>
					<h2 className="byline">EDRC is a free tool to automate design and electrical checks in Eagle.</h2>
				</div>
				<div className="home-intro">
					{introItems.map(i => 
						<div key={i.id} className="intro-item">
							<img src={i.img} title={i.text} />
							<span>{i.text}</span>
						</div>
					)}
				</div>
				<div className="home-login">
					<a className="login" href="/login" target="_self" title="Login with GitHub" onClick={() => this.linkClicked('Login with GitHub')}>
						Login with GitHub
					</a>
					<a className="read-the-docs" href="/docs" target="_self" title="Read the documentation" onClick={() => this.linkClicked('Read the documentation')}>
						Read the documentation
					</a>
				</div>
			</div>
		);
	}

	private linkClicked(label: string) {
		ga('send', 'event', AnalyticsCategories.Home, AnalyticsActions.Click, label);
	}
}

export default Home;
