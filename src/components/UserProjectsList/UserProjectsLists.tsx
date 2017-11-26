import * as React from 'react';
import { UserController, IUser } from '../../controllers/User';
import { ProjectController } from '../../controllers/Project';
import { IProject } from '../../Models/Project';
import './style.css';

interface IUserProjectsListProps {
	username: string;
	onProjectSelected?: (p: IProject) => void;
}

interface IUserProjectsListState {
	loading: boolean;
	signedIn: boolean;
	user: IUser | null;
	modalIsOpen: boolean;
	projects: IProject[] | null;
}

export class UserProjectsList extends React.Component <IUserProjectsListProps, IUserProjectsListState> {
	private userController: UserController;
	private projectController: ProjectController;
	private username: string;

	public constructor(props: IUserProjectsListProps) {
		super(props);
		this.username = this.props.username;
		this.userController = new UserController();
		this.projectController = new ProjectController();
		this.state = {
			loading: true,
			signedIn: false,
			user: null,
			projects: null,
			modalIsOpen: false,
		};
	}

	componentWillMount() {
		if (null === this.state.projects) {
			this.loadUserProjects();
		} else {
			this.setState({...this.state, loading: false});
		}
	}

	componentWillUnmount() {
		if (this.state.user) {
			this.userController.releaseUserRef(this.state.user.username);
		}

		if (this.state.projects) {
			this.projectController.releaseProjectRefs(this.state.projects);
		}
	}

	loadUserProjects() {
		if (!(this.state.projects)) {
			this.projectController.getUserProjects(this.username, { filter: 'owner' }, 1)
				.then(projects => this.setState({...this.state, projects, loading: false}))
				.catch(e => this.setState({...this.state, user: null, signedIn: false, loading: false}));
		}
	}

	render() {
		const projects = this.state.projects || [];
		return (
			<div className="user-projects-list">
				{this.state.loading && <div className="loading" />}
				{!this.state.loading && this.state.projects === null && 
					<div className="error">
						<p>An error occured loading user projects. Please reload and try again.</p>
					</div>
				}
				<div className="projects">
					{projects.map(project => (
						<div key={project.fullName} onClick={() => this.clicked(project)}>{project.fullName}</div>
					))}
				</div>
			</div>
		);
	}

	openModal() {
		this.setState({...this.state, modalIsOpen: true});
	}

	closeModal() {
		this.setState({...this.state, modalIsOpen: false});
	}

	private clicked(project: IProject) {
		if (typeof this.props.onProjectSelected === 'function') {
			this.props.onProjectSelected(project);
		}
	}
}

export default UserProjectsList;
