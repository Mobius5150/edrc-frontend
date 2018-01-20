import * as React from 'react';
import { Link } from 'react-router-dom';
import { UserMeControl } from './UserMeControl/UserMeControl';
import '../app.css';

class User extends React.Component {
	render() {
		return (
			<div className="header">
				<div className="header-logo">
					<h1><Link to="/">EDRC</Link></h1>
					<span className="status">alpha</span>
				</div>
				<UserMeControl />
			</div>
		);
	}
}

export default User;
