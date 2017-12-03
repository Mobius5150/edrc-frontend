import * as React from 'react';
import './style.css';
import { IProjectBuild } from '../../Models/Build';
import { BuildDetails } from './BuildDetails';
import classNames from 'classnames';

interface IBuildListItemProps {
	build: IProjectBuild;
	header: string;
}

interface IBuildListItemState {
	expanded: boolean;
}

export class BuildListItem extends React.Component <IBuildListItemProps, IBuildListItemState> {
	public constructor(props: IBuildListItemProps) {
		super(props);

		this.state = {
			expanded: false,
		}
	}

	render() {
		const build = this.props.build;
		return (
			<div className={classNames({build: true, expanded: this.state.expanded})}>
				<div className="build-summary" onClick={this.onExpandCollapse}>
					<div className="build-header">
						<h4>{this.props.header}</h4>
						{this.renderBuildStatus()}
					</div>
					<span className="build-date">{build.buildQueued}</span>
				</div>
				{this.state.expanded &&	
					<BuildDetails {...this.props} />}
			</div>
		);
	}

	renderBuildStatus() {
		const build = this.props.build;
		let tagText: string = build.status;
		const classes = { 'build-status': true };
		classes[`status-${build.status}`] = true;

		if (build.status === 'completed') {
			switch (build.result) {
				case 'succeeded':
					tagText = 'pass';
					classes['pass'] = true;
					break;
				case 'failed':
				case 'completed-with-errors':
				default:
					tagText = 'fail';
					classes['fail'] = true;
					break;
			}
		}

		return (
			<span className={classNames(classes)}>{tagText}</span>
		);
	}

	renderExpanded() {
		return (
			<div className="build-details">
				<div className="build-files">
				</div>
				<div className="build-pane">
				</div>
			</div>
		);
	}

	onExpandCollapse = () => {
		this.setState({ ...this.state, expanded: !this.state.expanded });
	}
}

export default BuildListItem;
