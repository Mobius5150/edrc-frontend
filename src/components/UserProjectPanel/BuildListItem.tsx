import * as React from 'react';
import './style.css';
import { IProjectBuild } from '../../Models/Build';
import { BuildDetails } from './BuildDetails';
import classNames from 'classnames';
import * as moment from 'moment';
import { BuildStatusControl } from '../BuildStatusControl/index';

interface IBuildListItemProps {
	build: IProjectBuild;
	isRef: boolean;
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
		};
	}

	render() {
		moment.locale();
		const build = this.props.build;
		const buildMoment = moment(build.buildQueued);
		return (
			<div className={classNames({build: true, expanded: this.state.expanded})}>
				<div className="build-summary" onClick={this.onExpandCollapse}>
					<div className="build-header">
						<h4>{this.props.header}</h4>
						{this.renderBuildStatus()}
					</div>
					<span className="build-date" title={buildMoment.format('LLL')}>{buildMoment.fromNow()}</span>
				</div>
				{this.state.expanded &&	
					<BuildDetails {...this.props} />}
			</div>
		);
	}

	renderBuildStatus() {
		const build = this.props.build;
		let tagText: string = build.status;

		if (build.status === 'completed') {
			switch (build.result) {
				case 'succeeded':
					tagText = 'pass';
					break;
				case 'failed':
				case 'completed-with-errors':
				default:
					tagText = 'fail';
					break;
			}
		}

		if (this.props.isRef) {
			return (
				<BuildStatusControl
					owner={this.props.build.userName}
					project={this.props.build.projectId}
					branchRef={this.props.build.typeRef}
					enableEmbed={true}
					enableEmbedText={false}
					hoverText={tagText}
					compact={true}
				/>
			);
		} else {
			return (
				<BuildStatusControl
					owner={this.props.build.userName}
					project={this.props.build.projectId}
					buildId={this.props.build.buildId}
					enableEmbed={true}
					enableEmbedText={false}
					hoverText={tagText}
					compact={true}
				/>
			);
		}
	}

	renderExpanded() {
		return (
			<div className="build-details">
				<div className="build-files" />
				<div className="build-pane" />
			</div>
		);
	}

	onExpandCollapse = () => {
		this.setState({ ...this.state, expanded: !this.state.expanded });
	}
}

export default BuildListItem;
