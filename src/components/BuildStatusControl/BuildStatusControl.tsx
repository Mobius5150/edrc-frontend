import * as React from 'react';
import * as Modal from 'react-modal';
import * as url from 'url';
import classNames from 'classnames';
import './style.css';

interface IBuildStatusControlState {
	embedModalOpen: boolean;
	compactChecked: boolean;
}

interface IBuildStatusControlProps {
	branchRef?: string;
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
	private static readonly embedPreviewFormats = {
		markdown: 'Markdown',
		html: 'HTML',
		asciidoc: 'AsciiDoc',
		url: 'Url'
	};

	private static embedPreviewFormat: string = 'markdown';
	private url: string;

	public constructor(props: IBuildStatusControlProps) {
		super(props);

		this.state = {
			embedModalOpen: false,
			compactChecked: !!this.props.compact,
		};
	}

	componentWillMount() {
		this.url = this.getStatusImageUrl(this.props);
	}

	componentWillReceiveProps(newProps: IBuildStatusControlProps) {
		this.url = this.getStatusImageUrl(newProps);
	}

	private getStatusImageUrl(props: IBuildStatusControlProps) {
		let generatedUrl = '';
		let hasQuery = false;
		if (props.buildId) {
			generatedUrl = `/api/v1/user/${props.owner}/project/${props.project}/build/${props.buildId}/img/status`;
		} else {
			generatedUrl = `/api/v1/user/${props.owner}/project/${props.project}/img/status`;
			if (props.branchRef) {
				hasQuery = true;
				generatedUrl = generatedUrl + '?ref=' + encodeURIComponent(props.branchRef);
			} else if (props.branch) {
				hasQuery = true;
				generatedUrl = generatedUrl + '?branch=' + encodeURIComponent(props.branch);
			}
		}

		if (props.compact) {
			if (hasQuery) {
				generatedUrl = `${generatedUrl}&compact=true`;
			} else {
				generatedUrl = `${generatedUrl}?compact=true`;
			}
		}

		return generatedUrl;
	}

	render() {
		const embed = !!this.props.enableEmbed;
		const embedText = embed && !!this.props.enableEmbedText;
		const hoverText = this.props.hoverText || (embed ? 'embed status' : '');
		const imageUrl = this.state.embedModalOpen && url.resolve(
			window.location.href,
			this.getStatusImageUrl({
				...(this.props as IBuildStatusControlProps),
				compact: this.state.compactChecked
			})
		);

		return (
			<React.Fragment>
				<div
					className={classNames({'embed-link': embed, 'build-status': true})}
					title={hoverText}
					onClick={(e) => this.openModal(e)}
				>
					<img src={this.url} />
					{embedText && <span className="embed-text">embed status</span>}
					<div onClick={e => e.stopPropagation()}>
						{embed && this.state.embedModalOpen &&
							<Modal
								className="embed-status-modal"
								isOpen={this.state.embedModalOpen}
								onRequestClose={() => this.closeModal()}
								contentLabel="Embed Build Status"
							>
								<h1>Embed Build Status</h1>
								<div className="embed-doc">
									Embed this code in another web page to show the live status of {this.getEmbedExplanation()}. <a href="/docs/">Read the docs for more details.</a>
								</div>
								<div>
									Format:&nbsp;
									<select onChange={(e) => this.changeEmbedPreviewFormat(e)}>
										{Object.keys(BuildStatusControl.embedPreviewFormats).map(id => (
											<option key={id} value={id} selected={BuildStatusControl.embedPreviewFormat === id}>
												{BuildStatusControl.embedPreviewFormats[id]}
											</option>
										))}
									</select>
								</div>
								<div>
									<label>Compact: <input type="checkbox" onChange={e => this.changeEmbedPreviewCompact(e)} checked={this.state.compactChecked} /></label>
								</div>
								<div className="embed-preview">
									Preview: <div className="build-status"><img src={imageUrl as string} /></div>
								</div>
								<div className="embed-source">
									<pre>{this.generateEmbedPreview(imageUrl as string)}</pre>
								</div>
								<button onClick={() => this.closeModal()}>close</button>
							</Modal>}
					</div>
				</div>
			</React.Fragment>
		);
	}

	private openModal(e: React.MouseEvent<any>) {
		if (this.props.enableEmbed && !this.state.embedModalOpen) {
			if (e && e.stopPropagation()) {
				e.stopPropagation();
			}

			this.setState({...this.state, embedModalOpen: true});
		}
	}

	private closeModal() {
		this.setState({...this.state, embedModalOpen: false});
	}

	private changeEmbedPreviewFormat(e: React.ChangeEvent<HTMLSelectElement>) {
		if (e && e.target) {
			BuildStatusControl.embedPreviewFormat = e.target.value;
			this.setState({...this.state});
		}
	}

	private changeEmbedPreviewCompact(e: React.ChangeEvent<HTMLInputElement>) {
		if (e && e.target) {
			this.setState({...this.state, compactChecked: e.target.checked});
		}
	}

	private generateEmbedPreview(imageUrl: string): string {
		const title = 'design rule check status';
		const linkUrl = url.resolve(window.location.href, `/g/${this.props.owner}/${this.props.project}`);
		switch (BuildStatusControl.embedPreviewFormat) {
			case 'html':
				return `<a href="${linkUrl}">
	<img alt="${title}" src="${imageUrl}" />
</a>`;
			case 'url':
				return imageUrl;
			case 'asciidoc':
				return `image:${imageUrl}[link="${linkUrl}",title="${title}"]`;
			case 'markdown':
			default:
				return `[![${title}](${imageUrl})](${linkUrl})`;
		}
	}

	private getEmbedExplanation() {
		if (this.props.buildId) {
			return `build #${this.props.buildId}`;
		} if (this.props.branchRef) {
			return `branch ${this.props.branchRef}`;
		} else if (this.props.branch) {
			return `branch ${this.props.branch}`;
		} else {
			return `this project`;
		}
	}
}

export default BuildStatusControl;