import * as React from 'react';
import classNames from 'classnames';

import './style.css';

export default class NotFound extends React.Component<{ className: any }> {
	// static propTypes = {}
	// static defaultProps = {}
	// state = {}

	render() {
		const { className, ...props } = this.props;
		return (
			<div className={classNames('notFound', className)} {...props}>
				<h1>
					404 <small>Not Found :(</small>
				</h1>
			</div>
		);
	}
}