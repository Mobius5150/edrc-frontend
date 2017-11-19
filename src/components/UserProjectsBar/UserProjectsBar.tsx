import * as React from 'react';
import { UserController, IUser, IUserActivatedGitHubRepo } from '../../controllers/User';
import './style.css';

interface IUserProjectsBarProps {
    user?: IUser | null;
}

interface IUserProjectsBarState {
    loading: boolean;
    signedIn: boolean;
    user: IUser | null;
    projects: IUserActivatedGitHubRepo[] | null;
}

export class UserProjectsBar extends React.Component <IUserProjectsBarProps, IUserProjectsBarState> {
    private userController: UserController;

    public constructor(props: IUserProjectsBarProps) {
        super(props);
        this.userController = new UserController();
        this.state = {
            loading: true,
            signedIn: !!(this.props.user),
            user: props.user ? props.user : null,
            projects: null,
        };
    }

    componentWillMount() {
        if (null === this.state.user) {
            this.userController.getCurrentUser()
                .then(user => { 
                    this.setState({...this.state, user, signedIn: user !== null});
                    this.loadUserProjects();
                })
                .catch(e => this.setState({...this.state, user: null, signedIn: false}));
        } else if (null === this.state.projects) {
            this.loadUserProjects();
        } else {
            this.setState({...this.state, loading: false});
        }
    }

    componentWillUpdate() {
        const oldUserId = this.props.user ? this.props.user.id : '';
        const newUserId = this.state.user ? this.state.user.id : '';
        if (oldUserId !== newUserId) {
            this.setState({
                ...this.state,
                user: this.props.user ? this.props.user : null,
                signedIn: !!(this.props.user),
                projects: null,
                loading: true,
            });

            this.loadUserProjects();
        }
    }

    loadUserProjects() {
        if (null !== this.state.user) {
            this.userController.getUserProjects(this.state.user)
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
