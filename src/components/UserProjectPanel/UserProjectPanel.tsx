import * as React from 'react';
import * as Modal from 'react-modal';
import { ProjectController } from '../../controllers/Project';
import { BuildController } from '../../controllers/Build';
import { UserController } from '../../controllers/User';
import { IProject } from '../../Models/Project';
import { IBuildListResult } from '../../Models/Build';
import { BuildListItem } from './BuildListItem';
import { BuildStatusControl } from '../BuildStatusControl';
import './style.css';
import { AnalyticsActions, AnalyticsCategories, ProjectAnalyticsActions, analyticsEvent, analyticsError } from '../../util/Analytics';

interface IUserProjectsPanelProps {
	username: string;
	project: string;
	onProjectDeactivated?: (project: IProject) => void;
}

interface IUserProjectsPanelState {
	loading: boolean;
	project: IProject | null;
	builds: IBuildListResult | null;
	buildsLoading: boolean;
	projectError: Error | null;
	buildsError: Error | null;
	settingsVisible: boolean;
	showSettingsCog: boolean;
}

export class UserProjectPanel extends React.Component <IUserProjectsPanelProps, IUserProjectsPanelState> {
	private userController: UserController;
	private projectController: ProjectController;
	private buildController: BuildController;
	private username: string;
	private project: string;

	public constructor(props: IUserProjectsPanelProps) {
		super(props);
		this.username = this.props.username;
		this.project = this.props.project;
		this.projectController = new ProjectController();
		this.buildController = new BuildController();
		this.userController = new UserController();
		this.state = {
			loading: true,
			buildsLoading: true,
			project: null,
			builds: null,
			projectError: null,
			buildsError: null,
			settingsVisible: false,
			showSettingsCog: false
		};
	}

	componentDidMount() {
		let loaded = true;
		if (null === this.state.project) {
			this.loadProject();
			loaded = false;
		}

		if (null === this.state.builds) {
			this.loadBuilds();
			loaded = false;
		}
		
		if (loaded) {
			this.setState({...this.state, loading: false, buildsLoading: false});
		}

		this.checkProjectOwnership();
	}

	componentWillReceiveProps(nextProps: any) {
		const oldId = (this.state.project ? this.state.project.fullName : '').toLowerCase();
		const newId = (nextProps.username + '/' + nextProps.project).toLowerCase();

		if (oldId !== newId && !this.state.loading) {
			this.username = nextProps.username;
			this.project = nextProps.project;
			this.setState({
				...this.state,
				project: null,
				builds: null,
				loading: true,
				buildsLoading: true,
			});

			this.loadProject();
			this.loadBuilds();
		}
	}

	componentWillUnmount() {
		if (this.state.project) {
			this.projectController.releaseProjectRef(this.state.project.fullName);
		}
	}

	loadProject() {
		this.projectController.getUserProject(this.username, this.project, 1)
			.then(project => this.setState({...this.state, project, loading: false}))
			.catch(e => {
				analyticsError(this, this.loadProject, e);
				this.setState({...this.state, project: null, loading: false, projectError: e});
			});
	}

	loadBuilds() {
		this.buildController.getProjectBuilds(this.username, this.project, { filter: 'summary' }, 1)
			.then(builds => this.setState({...this.state, builds, buildsLoading: false}))
			.catch(e => {
				analyticsError(this, this.loadBuilds, e);
				this.setState({...this.state, builds: null, buildsLoading: false, buildsError: e});
			});
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
				<div className="project-header">
					<h2>{project.fullName}</h2>
					<BuildStatusControl
						owner={project.ownerName}
						project={project.name}
						enableEmbed={true}
						enableEmbedText={true}
					/>
					{this.state.showSettingsCog && 
						<div
							className="project-settings"
							onClick={() => this.openProjectSettings()}
							title="Project settings"
						>
							<span className="ion-gear-a" />
						</div>
					}
				</div>
				{this.renderBuilds()}
				{this.state.showSettingsCog &&
					<Modal
						className="app-modal project-settings-modal"
						isOpen={this.state.settingsVisible}
						onRequestClose={() => this.closeProjectSettings()}
						contentLabel="Embed Build Status"
					>
						<h1>Project Settings</h1>
						<div className="settings">
							<div className="setting-dangerous">
								<button
									className="button-dangerous"
									onClick={(e) => this.deactivateProjectClicked(e)}
								>
									Disable Project
								</button>
							</div>
						</div>
						<button onClick={() => this.closeProjectSettings()}>close</button>
					</Modal>
				}
			</div>
		);
	}

	renderBuilds() {
		if (this.state.buildsLoading) {
			return (
				<div className="project-builds">
					<div className="branches build-section">
						<div className="branches-header build-header">
							<h3>Branches</h3>
						</div>
						<div className="loading" />
					</div>
					<div className="builds build-section">
						<div className="builds-header build-header">
							<h3>Builds</h3>
						</div>
						<div className="loading" />
					</div>
				</div>
			);
		}

		if (null === this.state.builds) {
			return (
				<div className="project-builds">
					<div className="error"><p>An error occured loading builds for the project</p></div>
				</div>
			);
		}

		const builds = this.state.builds;
		return (
			<div className="project-builds">
				<div className="branches build-section">
					<div className="branches-header">
						<h3>Branches</h3>
					</div>
					{this.renderBuildBranches(builds.branches)}
				</div>
				<div className="builds build-section">
					<div className="builds-header">
						<h3>Builds</h3>
					</div>
					{this.renderBuildList(builds.builds)}
				</div>
			</div>
		);
	}

	private renderBuildBranches(branches: IBuildListResult['branches']) {
		if (!branches) {
			return (
				<div className="builds empty">
					<p>No builds found for any branches. Trigger a build by pushing to your repo and check back!</p>
				</div>
			);
		}

		return (
			<div className="builds">
				{Object.keys(branches).map(b =>
					<BuildListItem
						build={branches[b]}
						header={b}
						key={b}
						fromGitRef={true}
						project={this.state.project ? this.state.project.name : this.project}
					/>)}
			</div>
		);
	}

	private renderBuildList(builds: IBuildListResult['builds']) {
		if (!builds || builds.length === 0) {
			return (
				<div className="builds empty">
					<p>No builds found. Trigger a build by pushing to your repo and check back!</p>
				</div>
			);
		}

		return (
			<div className="builds">
				{builds.map(b => 
					<BuildListItem
						build={b}
						header={b.buildId}
						key={b.buildId}
						fromGitRef={false}
						project={this.state.project ? this.state.project.name : this.project}
					/>)}
			</div>
		);
	}

	private async checkProjectOwnership() {
		const signedIn = await this.userController.isSignedIn();
		if (!signedIn) {
			this.setState({...this.state, showSettingsCog: false});
			return;
		}

		const user = await this.userController.getCurrentUser();
		if (user.username.toLowerCase() === this.props.username.toLowerCase()) {
			this.setState({...this.state, showSettingsCog: true});
		} else {
			this.setState({...this.state, showSettingsCog: false});
		}
	}

	private openProjectSettings() {
		analyticsEvent(AnalyticsCategories.Projects, AnalyticsActions.Open, 'project settings');
		this.setState({...this.state, settingsVisible: true});
	}

	private closeProjectSettings() {
		analyticsEvent(AnalyticsCategories.Projects, AnalyticsActions.Close, 'project settings');
		this.setState({...this.state, settingsVisible: false});
	}

	private async deactivateProjectClicked(e: React.MouseEvent<HTMLButtonElement>) {
		const project = this.state.project;
		if (!project) {
			return;
		}

		const button = e.target as HTMLButtonElement;
		button.disabled = true;
		if (!confirm(`Are you sure you want to deactivate ${project.fullName}?\nThis will permanently delete all builds and cannot be undone.`)) {
			button.disabled = false;
			return;
		}

		try {
			analyticsEvent(AnalyticsCategories.Projects, ProjectAnalyticsActions.Deactivate, `${project.ownerName}/${project.name}`);
			await this.projectController.deactivateUserProject(project.ownerName, project.name);
		} catch (e) {
			const message = e instanceof Error ? e.message : e;
			analyticsError(this, this.deactivateProjectClicked, e);
			alert(`An error occured deactivating the project: ${message}.\n Please reload and try again.`);
		}

		if (this.props.onProjectDeactivated) {
			this.props.onProjectDeactivated(project);
		}
	}
}

export default UserProjectPanel;
