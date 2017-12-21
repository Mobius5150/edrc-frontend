import * as React from 'react';
import { ProjectController } from '../../controllers/Project';
import { BuildController } from '../../controllers/Build';
import './style.css';
import { IProject } from '../../Models/Project';
import { IBuildListResult } from '../../Models/Build';
import { BuildListItem } from './BuildListItem';

interface IUserProjectsPanelProps {
	username: string;
	project: string;
}

interface IUserProjectsPanelState {
	loading: boolean;
	project: IProject | null;
	builds: IBuildListResult | null;
	buildsLoading: boolean;
	projectError: Error | null;
	buildsError: Error | null;
}

export class UserProjectPanel extends React.Component <IUserProjectsPanelProps, IUserProjectsPanelState> {
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
		this.state = {
			loading: true,
			buildsLoading: true,
			project: null,
			builds: null,
			projectError: null,
			buildsError: null,
		};
	}

	componentWillMount() {
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
	}

	componentWillUpdate() {
		const oldId = (this.props.username + '/' + this.props.project).toLowerCase();
		const newId = (this.state.project ? this.state.project.fullName : '').toLowerCase();
		if (oldId !== newId && !this.state.loading) {
			this.username = this.props.username;
			this.project = this.props.project;
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
		if (!(this.state.project)) {
			this.projectController.getUserProject(this.username, this.project, 1)
				.then(project => this.setState({...this.state, project, loading: false}))
				.catch(e => this.setState({...this.state, project: null, loading: false, projectError: e}));
		}
	}

	loadBuilds() {
		if (!(this.state.builds)) {
			this.buildController.getProjectBuilds(this.username, this.project, { filter: 'summary' }, 1)
				.then(builds => this.setState({...this.state, builds, buildsLoading: false}))
				.catch(e => this.setState({...this.state, builds: null, buildsLoading: false, buildsError: e}));
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
				{this.renderBuilds()}
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
				{Object.keys(branches).map(b => <BuildListItem build={branches[b]} header={b} key={b} />)}
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
				{builds.map(b => <BuildListItem build={b} header={b.buildId} key={b.buildId} />)}
			</div>
		);
	}
}

export default UserProjectPanel;
