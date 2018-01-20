import * as React from 'react';
import { UserController, IUser } from '../../controllers/User';
import { ProjectController } from '../../controllers/Project';
import * as Modal from 'react-modal';
import classNames from 'classnames';

import './style.css';
import { IProject } from '../../Models/Project';
import { UserProjectsList } from '../UserProjectsList/UserProjectsLists';

interface IUserProjectsBarProps {
	username: string;
	project: string;
	onProjectSelected?: (p: IProject) => void;
}

interface IUserProjectsBarState {
	loading: boolean;
	signedIn: boolean;
	user: IUser | null;
	modalIsOpen: boolean;
	projects: IProject[] | null;
	selectedProject: string | null;
}

export class UserProjectsBar extends React.Component <IUserProjectsBarProps, IUserProjectsBarState> {
	private userController: UserController;
	private projectController: ProjectController;
	private username: string;

	public constructor(props: IUserProjectsBarProps) {
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
			selectedProject: `${this.props.username}/${this.props.project}`,
		};
	}

	public async refreshProjects() {
		await this.clearProjects();
		this.loadUserProjects();
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

		this.clearProjects();
	}

	loadUserProjects() {
		if (!(this.state.projects)) {
			this.setState({ ...this.state, loading: true });
			this.projectController.getUserProjects(this.username, { filter: 'activated' }, 1)
				.then(projects => this.setState({...this.state, projects, loading: false}))
				.catch(e => this.setState({...this.state, user: null, signedIn: false, loading: false}));
		}
	}

	render() {
		const projects = this.state.projects || [];
		return (
			<React.Fragment>
				<div className="user-projects">
					{this.state.loading && <div className="loading" />}
					{!this.state.loading && this.state.projects === null && 
						<div className="error">
						<p>An error occured loading user projects. Please reload and try again.</p>
					</div>}
					<ul>
						{projects.map(project => (
							<li 
								key={project.fullName}
								className={classNames({ selected: this.state.selectedProject === project.fullName })}
								onClick={() => this.selectProject(project)}
							>{project.fullName}
							</li>
						))}
					</ul>
					<div className="add-project">
						<button onClick={() => this.openModal()}>Add Project</button>
					</div>
				</div>
				<Modal
					className="add-project-modal"
					isOpen={this.state.modalIsOpen}
					onRequestClose={() => this.closeModal()}
					contentLabel="Add Project"
				>
					<h1>Add a project</h1>
					<UserProjectsList
						username={this.props.username}
						onProjectSelected={(p) => this.selectNewProject(p)}
					/>
					<button onClick={() => this.closeModal()}>close</button>
				</Modal>
			</React.Fragment>
		);
	}

	private openModal() {
		this.setState({...this.state, modalIsOpen: true});
	}

	private closeModal() {
		this.setState({...this.state, modalIsOpen: false});
	}

	private selectProject(project: IProject) {
		if (this.state.selectedProject !== project.fullName) {
			this.setState({...this.state, selectedProject: project.fullName });
			if (typeof this.props.onProjectSelected === 'function') {
				this.props.onProjectSelected(project);
			}
		}
	}

	private clearProjects(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (this.state.projects) {
				this.projectController.releaseProjectRefs(this.state.projects);
				this.setState({...this.state, projects: null, selectedProject: null}, () => {
					resolve();
				});
			} else {
				resolve();
			}
		});
	}

	private async selectNewProject(p: IProject) {
		this.setState({...this.state, modalIsOpen: false, loading: true});

		try {
			const activated = await this.projectController.activateUserProject(this.props.username, p.providerId);
			this.clearProjects();
			this.loadUserProjects();
			this.selectProject(activated);
		} catch (e) {
			this.setState({...this.state, loading: false});
		}
	}
}

export default UserProjectsBar;
