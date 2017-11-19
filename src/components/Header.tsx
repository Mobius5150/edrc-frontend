import * as React from 'react';
import { UserProfile } from './UserProfile';
import '../app.css';

class User extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <h1>edrc</h1>
          <span className="status">alpha</span>
        </div>
        <UserProfile />
      </div>
    );
  }
}

export default User;
