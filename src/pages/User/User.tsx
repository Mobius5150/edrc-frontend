import * as React from 'react';
import { UserController, IUser } from '../../controllers/User';
import { UserProjectsBar } from '../../components/UserProjectsBar';
import './style.css';

interface IUserProps {
  user?: IUser;
}

interface IUserState {
  loading: boolean;
  signedIn: boolean;
  user: IUser | null;
}

export class User extends React.Component<IUserProps, IUserState> {
  private userController: UserController;

  public constructor(props: IUserProps) {
      super(props);
      this.userController = new UserController();
      this.state = {
          loading: !!(props.user),
          signedIn: !!(props.user),
          user: props.user ? props.user : null,
      };
  }

  componentWillMount() {
    if (null === this.state.user) {
        this.userController.getCurrentUser()
            .then(user => this.setState({...this.state, user, signedIn: user !== null, loading: false}))
            .catch(e => {
                this.setState({...this.state, user: null, signedIn: false, loading: false});
            });
    } else {
      this.setState({...this.state, loading: false});
    }
  }
  
  render() {
    if (this.state.loading) {
      return (<div className="loading" />);
    }

    return (
      <div className="page-user">
        <UserProjectsBar user={this.state.user} />
        <div className="project-builds">
          <div className="App-header">
            <h2>UserController: {this.state.user ? this.state.user.username : ''}</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload yo.
          </p>
        </div>
      </div>
    );
  }
}

export default User;
