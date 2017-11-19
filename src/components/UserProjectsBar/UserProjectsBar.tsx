import * as React from 'react';
import { UserController, IUser } from '../../controllers/User';
import { ProjectController, IUserActivatedGitHubRepo } from '../../controllers/Project';
import './style.css';

interface IUserProjectsBarProps {
	username: string;
	project: string;
}

interface IUserProjectsBarState {
	loading: boolean;
	signedIn: boolean;
	user: IUser | null;
	projects: IUserActivatedGitHubRepo[] | null;
}

export class UserProjectsBar extends React.Component <IUserProjectsBarProps, IUserProjectsBarState> {
	private userController: UserController;
	private projectController: ProjectController;
	private username: string;
	private selectedProject: string;

	public constructor(props: IUserProjectsBarProps) {
		super(props);
		this.username = this.props.username;
		this.selectedProject = this.props.project;
		this.userController = new UserController();
		this.projectController = new ProjectController();
		this.state = {
			loading: true,
			signedIn: false,
			user: null,
			projects: null,
		};
	}

	componentWillMount() {
		if (null === this.state.user) {
			this.loadUser();
		} else if (null === this.state.projects) {
			this.loadUserProjects();
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
		if (this.state.user) {
			this.userController.releaseUserRef(this.state.user.username);
		}

		if (this.state.projects) {
			this.projectController.releaseProjectRefs(this.state.projects);
		}
	}

	loadUser() {
		if (!(this.state.user)) {
			this.userController.getUser(this.username)
				.then(user => { 
					this.setState({...this.state, user, signedIn: user !== null});
					this.loadUserProjects();
				})
				.catch(e => this.setState({...this.state, user: null, signedIn: false}));
		}
	}

	loadUserProjects() {
		if (null !== this.state.user && !(this.state.projects)) {
			this.projectController.getUserProjects(this.username)
				.then(projects => this.setState({...this.state, projects, loading: false}))
				.catch(e => this.setState({...this.state, user: null, signedIn: false, loading: false}));
		}
	}

	render() {
		const projects = this.state.projects || [];
		return (
			<div className="user-projects">
				{this.state.loading && <div className="loading" />}
				{!this.state.loading && this.state.projects === null && 
					<div className="error">
					<p>An error occured loading user projects. Please reload and try again.</p>
				</div>}
				<ul>
					{projects.map(project => (
						<li key={project.id}>{project.full_name}</li>
					))}
				</ul>
				<div className="add-project">
					<button>+ New Project</button>
				</div>
			</div>
		);
	}
}

export default UserProjectsBar;
