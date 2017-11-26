import * as React from 'react';
import { UserController } from '../../controllers/User';
import { ProjectController } from '../../controllers/Project';
import './style.css';
import { IProject } from '../../Models/Project';

interface IUserProjectsPanelProps {
	username: string;
	project: string;
}

interface IUserProjectsPanelState {
	loading: boolean;
	project: IProject | null;
}

export class UserProjectPanel extends React.Component <IUserProjectsPanelProps, IUserProjectsPanelState> {
	private userController: UserController;
	private projectController: ProjectController;
	private username: string;
	private project: string;

	public constructor(props: IUserProjectsPanelProps) {
		super(props);
		this.username = this.props.username;
		this.project = this.props.project;
		this.userController = new UserController();
		this.projectController = new ProjectController();
		this.state = {
			loading: true,
			project: null,
		};
	}

	componentWillMount() {
		// if (null === this.state.user) {
		// 	this.loadUser();
		// } else 
		if (null === this.state.project) {
			this.loadProject();
		} else {
			this.setState({...this.state, loading: false});
		}
	}

	componentWillUpdate() {
		// const oldUserId = this.props.username;
		// const newUserId = this.state.user ? this.state.user.id : '';
		// if (oldUserId !== newUserId) {
		// 	this.username = this.props.username;
		// 	this.setState({
		// 		...this.state,
		// 		user: null,
		// 		signedIn: false,
		// 		projects: null,
		// 		loading: true,
		// 	});

		// 	this.loadUser();
		// 	this.loadUserProjects();
		// }
	}

	componentWillUnmount() {
		if (this.state.project) {
			this.projectController.releaseProjectRef(this.state.project.fullName);
		}
	}

	// loadUser() {
	// 	if (!(this.state.user)) {
	// 		this.userController.getUser(this.username)
	// 			.then(user => { 
	// 				this.setState({...this.state, user, signedIn: user !== null});
	// 				this.loadUserProjects();
	// 			})
	// 			.catch(e => this.setState({...this.state, user: null, signedIn: false}));
	// 	}
	// }

	loadProject() {
		if (!(this.state.project)) {
			this.projectController.getUserProject(this.username, this.project, 1)
				.then(project => this.setState({...this.state, project, loading: false}))
				.catch(e => this.setState({...this.state, project: null, loading: false}));
		}
	}

	render() {
		if (this.state.loading) {
			return (<div className="loading" />);
		}

		if (this.state.project === null) {
			return (
				<div className="error">
					<p>An error occured loading the project. Please reload and try again.</p>
				</div>
			);
		}

		const project: IProject = this.state.project;
		return (
			<div className="project">
				<h2>{project.fullName}</h2>
				<div className="branches">
					<div className="branches-header">
						<h3>Branches</h3>
					</div>
					<div className="branch">
						<span className="branch-name">Branchname</span>
					</div>
				</div>
				<div className="builds">
					<div className="builds-header">
						<h3>Builds</h3>
					</div>
					<div className="build">
						<span className="build-name">Buildname</span>
					</div>
				</div>
			</div>
		);
	}
}

export default UserProjectPanel;
