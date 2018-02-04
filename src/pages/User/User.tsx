import * as React from 'react';
import { UserController, IUser } from '../../controllers/User';
import { UserProjectsBar } from '../../components/UserProjectsBar';
import { IRouteProps } from '../../util/Route';
import './style.css';
import { UserProjectPanel } from '../../components/UserProjectPanel/index';
import { IProject } from '../../Models/Project';

interface IUserProps extends IRouteProps<{ username: string, project: string, build: string }, {}> {
	username?: string;
	project?: string;
	build?: string;
}

interface IUserState {
	error: string | null;
	loading: boolean;
	signedIn: boolean;
	user: IUser | null;
	selectedProject: string | null;
}

export class User extends React.Component<IUserProps, IUserState> {
	private userController: UserController;
	private username: string;
	private userProjectsBar: UserProjectsBar | null;

	public constructor(props: IUserProps) {
		super(props);
		if (!(props.username) && (props.match.params.username)) {
			this.username = props.match.params.username;
		} else if (props.username) {
			this.username = props.username;
		}
		
		this.userController = new UserController();
		this.state = {
			error: null,
			loading: true,
			signedIn: false,
			user: null,
			selectedProject: props.match.params.project ? props.match.params.project : null,
		};
	}

	componentDidMount() {
		const newState = {...this.state};
		let setState = false;
		
		if (this.state.selectedProject === null && typeof this.props.match.params.project === 'string') {
			newState.selectedProject = this.props.match.params.project;
			setState = true;
		}

		if (!(this.username)) {
			newState.loading = false;
			newState.error = 'No user provided';
			setState = true;
		}

		if (setState) {
			this.setState(newState);
		}
	}

	componentWillUnmount() {
		if (this.state.user) {
			this.userController.releaseUserRef(this.state.user.username);
		}
	}
	
	render() {
		if (this.state.error) {
			return (<div className="error">{this.state.error}</div>);
		}

		const userParams: any = {...this.props};
		if (this.username) {
			userParams.username = this.username;
		}

		return (
			<div className="page-user">
				<div className="box">
				<UserProjectsBar
					{...userParams}
					project={this.state.selectedProject}
					onProjectSelected={(p) => this.onProjectSelected(p)}
					ref={bar => this.userProjectsBar = bar}
				/>
				{this.state.loading ?
					<div className="loading" />
					:
					this.state.selectedProject === null ? 
						<div className="project">
							<div className="no-project">
								<h2>No Project Selected</h2>
								<span className="tip">Select or add a project on the left to get started</span>
							</div>
						</div>
						:
						<UserProjectPanel
							{...userParams}
							project={this.state.selectedProject}
							onProjectDeactivated={p => this.onProjectDeactivated(p)}
						/>
				}
				</div>
			</div>
		);
	}

	private onProjectSelected(project: IProject) {
		this.setState({ ...this.state, selectedProject: project.name });
	}

	private onProjectDeactivated(project: IProject) {
		this.setState({ ...this.state, selectedProject: null });
		if (this.userProjectsBar) {
			this.userProjectsBar.refreshProjects();
		}
	}
}

export default User;
