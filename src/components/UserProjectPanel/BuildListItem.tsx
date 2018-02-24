import * as React from 'react';
import './style.css';
import { IProjectBuild } from '../../Models/Build';
import { BuildDetails } from './BuildDetails';
import classNames from 'classnames';
import * as moment from 'moment';
import { BuildStatusControl } from '../BuildStatusControl/index';
import { AnalyticsCategories, AnalyticsActions } from '../../util/Analytics';

interface IBuildListItemProps {
	build: IProjectBuild;
	fromGitRef: boolean;
	header: string;
	project?: string;
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
						<h4>{this.getCleanGitRefName(this.props.header)}</h4>
						{this.renderBuildStatus()}
						<span className="commit">{this.cleanCommitMessage(build.commitMessage)}</span>
						<span className="commit-author">
							by <a href={build.triggerUrl} onClick={(e) => e.stopPropagation()}>@{build.commitUser}</a>
						</span>
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

		if (this.props.fromGitRef) {
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
		const expanded = !this.state.expanded;
		const label = this.props.fromGitRef ? 'gitref' : 'buildno';
		if (expanded) {
			ga('send', 'event', AnalyticsCategories.Builds, AnalyticsActions.Open, label);
		} else {
			ga('send', 'event', AnalyticsCategories.Builds, AnalyticsActions.Close, label);
		}

		this.setState({ ...this.state, expanded});
	}

	private getCleanGitRefName(branchRef: string): string {
		let cleanRef: string = branchRef;
		if (branchRef && branchRef.indexOf && cleanRef.indexOf('/')) {
			const match = /^\/?refs\/(\S+\/)?(\S+)$/.exec(cleanRef); // matches '/refs/heads/master`
			if (null === match) {
				return branchRef;
			}

			const ref: string = match[2];
			if (typeof match[1] === 'string' && ref) {
				const refSpace: string = match[1];
				if (refSpace === 'heads/') {
					cleanRef = `${ref}`;
				} else if (refSpace === 'tags/') {
					cleanRef = `${ref}`;
				} else if (refSpace === 'remotes/') {
					cleanRef = `${ref}`;
				} else {
					return branchRef;
				}
			} else if (ref) {
				cleanRef = ref;
			}
		}

		return cleanRef;
	}

	private cleanCommitMessage(message: string): string | JSX.Element {
		if (message && message.substr) {
			if (message.length > 80) {
				return <>{message.substr(0, 80)}&hellip;</>;
			}

			return message;
		}

		return message;
	}
}

export default BuildListItem;
