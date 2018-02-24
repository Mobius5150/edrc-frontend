import * as React from 'react';
import { UserController, IUser } from '../../controllers/User';
import { ProjectController } from '../../controllers/Project';
import { IProject } from '../../Models/Project';
import './style.css';
import { analyticsError } from '../../util/Analytics';

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

	componentDidMount() {
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
				.catch(e => {
					analyticsError(this, this.loadUserProjects, e);
					this.setState({...this.state, user: null, signedIn: false, loading: false});
				});
		}
	}

	render() {
		
		return (
			<div className="user-projects-list">
				{this.state.loading && <div className="loading" />}
				{!this.state.loading && this.state.projects === null && 
					<div className="error">
						<p>An error occured loading user projects. Please reload and try again.</p>
					</div>
				}
				{!this.state.loading && this.renderUserProjects()}
			</div>
		);
	}

	renderUserProjects() {
		const projects = this.state.projects || [];
		if (projects.length === 0) {
			return (
				<div className="projects empty">
					<span className="empty">You don't have any projects on GitHub. Create one to get started!</span>
				</div>
			);
		}

		return (
			<div className="projects">
				{projects.map(project => (
					<div
						className="project-listing" 
						key={project.fullName} 
						onClick={() => this.handleProjectSelection(project)}
					>
						{project.fullName}
					</div>
				))}
			</div>
		);
	}

	private handleProjectSelection(project: IProject) {
		if (this.props.onProjectSelected) {
			this.props.onProjectSelected(project);
		}
	}
}

export default UserProjectsList;
