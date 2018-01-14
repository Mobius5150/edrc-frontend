import * as React from 'react';
import classNames from 'classnames';
import './style.css';

interface IBuildStatusControlState {
}

interface IBuildStatusControlProps {
	ref?: string;
	branch?: string;
	buildId?: string;
	enableEmbed?: boolean;
	enableEmbedText?: boolean;
	compact?: boolean;
	hoverText?: string;
	owner: string;
	project: string;
}

export class BuildStatusControl extends React.Component <IBuildStatusControlProps, IBuildStatusControlState> {
	private url: string;

	public constructor(props: IBuildStatusControlProps) {
		super(props);
	}

	componentWillMount() {
		this.updateUrl(this.props);
	}

	componentWillUpdate(newProps: IBuildStatusControlProps) {
		this.updateUrl(newProps);
	}

	private updateUrl(props: IBuildStatusControlProps) {
		let hasQuery = false;
		if (props.buildId) {
			this.url = `/api/v1/user/${props.owner}/project/${props.project}/build/${props.buildId}/img/status`;
		} else {
			this.url = `/api/v1/user/${props.owner}/project/${props.project}/img/status`;
			if (props.ref) {
				hasQuery = true;
				this.url = this.url + '?ref=' + encodeURIComponent(props.ref);
			} else if (props.branch) {
				hasQuery = true;
				this.url = this.url + '?branch=' + encodeURIComponent(props.branch);
			}
		}

		if (props.compact) {
			if (hasQuery) {
				this.url = `${this.url}&compact=true`;
			} else {
				this.url = `${this.url}/?compact=true`;
			}
		}
	}

	render() {
		const embed = !!this.props.enableEmbed;
		const embedText = embed && !!this.props.enableEmbedText;
		const hoverText = this.props.hoverText || (embed ? 'embed status' : '');
		return (
			<div
				className={classNames({'embed-link': embed, 'build-status': true})}
				title={hoverText}
			>
				<img src={this.url} />
				{embedText && <span className="embed-text">embed status</span>}
			</div>
		);
	}
}

export default BuildStatusControl;