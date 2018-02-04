import * as React from 'react';
import * as Modal from 'react-modal';
import * as url from 'url';
import classNames from 'classnames';
import './style.css';

interface IBuildImageControlState {
	embedModalOpen: boolean;
}

interface IBuildImageControlProps {
	branchRef?: string;
	branch?: string;
	fileName?: string;
	buildId?: string;
	normalizedFileName?: string;
	enableEmbed?: boolean;
	enableEmbedText?: boolean;
	hoverText?: string;
	owner: string;
	project: string;
}

export class BuildImageControl extends React.Component <IBuildImageControlProps, IBuildImageControlState> {
	private static readonly embedPreviewFormats = {
		markdown: 'Markdown',
		html: 'HTML',
		asciidoc: 'AsciiDoc',
		url: 'Url'
	};

	private static embedPreviewFormat: string = 'url';
	private url: string;

	public constructor(props: IBuildImageControlProps) {
		super(props);

		this.state = {
			embedModalOpen: false,
		};
	}

	componentWillMount() {
		this.url = this.getImageUrl(this.props);
	}

	componentWillReceiveProps(newProps: IBuildImageControlProps) {
		this.url = this.getImageUrl(newProps);
	}

	private getImageUrl(props: IBuildImageControlProps) {
		let generatedUrl = '';
		let hasQuery = false;
		let fileName = '';
		if (props.fileName) {
			fileName = encodeURIComponent(props.fileName);
		} else if (props.normalizedFileName) {
			fileName = `${props.normalizedFileName}?isNormalized=true`;
			hasQuery = true;
		} else {
			throw new Error('Build image component requires filename or normalized filename');
		}

		fileName = fileName.replace('.brd', '.png');

		if (props.buildId) {
			generatedUrl = `/api/v1/user/${props.owner}/project/${props.project}/build/${props.buildId}/img/file/${fileName}`;
		} else {
			generatedUrl = `/api/v1/user/${props.owner}/project/${props.project}/img/file/${fileName}`;
		}

		if (hasQuery) {
			generatedUrl += '&';
		} else {
			generatedUrl += '?';
		}

		if (props.branchRef) {
			generatedUrl = generatedUrl + 'ref=' + encodeURIComponent(props.branchRef);
		} else if (props.branch) {
			generatedUrl = generatedUrl + 'branch=' + encodeURIComponent(props.branch);
		} else {
			generatedUrl = generatedUrl.substr(0, generatedUrl.length - 1);
		}

		return generatedUrl;
	}

	render() {
		const embed = !!this.props.enableEmbed;
		const embedText = embed && !!this.props.enableEmbedText;
		const hoverText = this.props.hoverText || (embed ? 'embed image' : '');
		const imageUrl = this.state.embedModalOpen && url.resolve(
			window.location.href,
			this.getImageUrl({
				...(this.props as IBuildImageControlProps)
			})
		);

		return (
			<React.Fragment>
				<div
					className={classNames({'embed-link': embed, 'build-file-image': true})}
					title={hoverText}
					onClick={(e) => this.openModal(e)}
				>
					<img src={this.url} />
					{embedText && <span className="embed-text">embed status</span>}
					<div onClick={e => e.stopPropagation()}>
						{embed && this.state.embedModalOpen &&
							<Modal
								className="embed-file-modal"
								isOpen={this.state.embedModalOpen}
								onRequestClose={() => this.closeModal()}
								contentLabel="Embed Build Image"
							>
								<h1>Embed Build Image</h1>
								<div className="embed-doc">
									Embed this code in a web page to show the most recent file capture of <strong>{this.getEmbedExplanation()}.</strong> <a href="/docs/guides/setup-build-image">Read the docs for more details.</a>
								</div>
								<div>
									Format:&nbsp;
									<select onChange={(e) => this.changeEmbedPreviewFormat(e)} defaultValue={BuildImageControl.embedPreviewFormat}>
										{Object.keys(BuildImageControl.embedPreviewFormats).map(id => (
											<option key={id} value={id}>
												{BuildImageControl.embedPreviewFormats[id]}
											</option>
										))}
									</select>
								</div>
								<div className="embed-preview">
									Preview: <br /><img src={imageUrl as string} />
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
			BuildImageControl.embedPreviewFormat = e.target.value;
			this.setState({...this.state});
		}
	}

	private generateEmbedPreview(imageUrl: string): string {
		const title = (this.props.fileName ? this.props.fileName : 'board image') + ' from EDRC.me';
		const linkUrl = url.resolve(window.location.href, `/g/${this.props.owner}/${this.props.project}`);
		switch (BuildImageControl.embedPreviewFormat) {
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
		} else if (this.props.branch) {
			return `branch ${this.props.branch}`;
		} else if (this.props.branchRef) {
			return `branch ${this.props.branchRef}`;
		} else {
			return `this project`;
		}
	}
}

export default BuildImageControl;