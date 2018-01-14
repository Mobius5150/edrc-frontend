import * as React from 'react';
import './style.css';
import { IProjectBuild, IPublicBuildDetails, IPublicBuildFileSummary, IBuildFileErrors, IBuildFileErrorsContract } from '../../Models/Build';
import { BuildController } from '../../controllers/Build';
import classNames from 'classnames';

interface IBuildDetailsProps {
	build: IProjectBuild;
}

interface IBuildDetailsState {
	error: Error | null;
	loading: boolean;
	details: IPublicBuildDetails | null;
	selectedFileName: string | null;
	currentFileErrors: IBuildFileSortedErrors | null;
	loadCurrentFileError: Error | null;
	expandedErrorGroups: {
		other: IGroupList,
		approved: IGroupList,
	};
}

type IGroupList = { [groupName: string]: null };
type IErrorSignatureList = { [signature: string]: IBuildFileErrors };
type ISortedError = { [description: string]: IErrorSignatureList };

interface IBuildFileSortedErrors {
	approved: ISortedError;
	other: ISortedError;
}

export class BuildDetails extends React.Component <IBuildDetailsProps, IBuildDetailsState> {
	private buildController: BuildController;
	private fileErrors: { [filename: string]: IBuildFileSortedErrors | null } = {};

	public constructor(props: IBuildDetailsProps) {
		super(props);
		this.buildController = new BuildController();
		this.state = {
			error: null,
			loading: true,
			details: null,
			selectedFileName: null,
			currentFileErrors: null,
			loadCurrentFileError: null,
			expandedErrorGroups: {
				other: {},
				approved: {},
			}
		};
	}

	componentDidMount() {
		this.loadBuildDetails();
	}

	private loadBuildDetails() {
		if (!this.state.details) {
			this.buildController.getBuildDetails(this.props.build)
				.then(details => {
					let selectedFileName = this.state.selectedFileName;
					if (!selectedFileName && details !== null && details.FileBuildResults.length > 0) {
						selectedFileName = details.FileBuildResults[0].normalizedFilename;
					}

					this.setState({...this.state, error: null, loading: false, details, selectedFileName});
				})
				.catch(error => this.setState({...this.state, details: null, loading: false, error }));
		}
	}

	private loadFileErrors(normalizedFilename: string) {
		if (this.fileErrors[normalizedFilename] !== undefined) {
			return;
		}

		this.fileErrors[normalizedFilename] = null;
		this.buildController.getBuildFileDetails(this.props.build, normalizedFilename)
			.then(details => {
				const sorted = this.sortFileErrors(details);
				this.fileErrors[normalizedFilename] = sorted;
				if (this.state.selectedFileName === normalizedFilename) {
					this.setState({ ...this.state, currentFileErrors: sorted, loadCurrentFileError: null });
				}
			})
			.catch(e => {this.setState({ ...this.state, currentFileErrors: null, loadCurrentFileError: e }); });
	}

	private sortFileErrors(errors: IBuildFileErrorsContract) {
		const sorted: IBuildFileSortedErrors = {
			approved: {},
			other: {}
		};

		for (const e in errors) {
			const error = errors[e];
			if (error.state.toLowerCase() === 'approved') {
				if (!sorted.approved[error.description]) {
					sorted.approved[error.description] = {};
				}

				sorted.approved[error.description][error.signature] = error;
			} else {
				if (!sorted.other[error.description]) {
					sorted.other[error.description] = {};
				}

				sorted.other[error.description][error.signature] = error;
			}
		}

		return sorted;
	}

	render() {
		if (this.state.currentFileErrors === null && null !== this.state.selectedFileName) {
			this.loadFileErrors(this.state.selectedFileName);
		}

		if (this.state.loading) {
			return (
				<div className="loading" />
			);
		}

		const details = this.state.details;
		if (this.state.error || !details) {
			return (
				<div className="error">
					An error occured loading build details.
				</div>
			);
		}

		return (
			<div className="build-details">
				<div className="build-files">
					<ul>
						{details.FileBuildResults.map(f => 
							<li 
								key={f.normalizedFilename} 
								className={classNames({ 'build-file': true, 'selected': f.normalizedFilename === this.state.selectedFileName })}
								onClick={() => this.selectFile(f)}
							>
								<span title={f.filename}>{this.getFileName(f.filename)}</span>
							</li>)}
					</ul>
				</div>
				{this.renderBuildPane()}
			</div>
		);
	}

	renderBuildPane() {
		if (this.state.loadCurrentFileError !== null) {
			return (
				<div className="build-pane">
					<div className="error">
						An error occured loading details for the selected file.
					</div>
				</div>
			);
		}

		if (null === this.state.selectedFileName) {
			return (
				<div className="build-pane">
					<div className="error">
						An error occured within the EDRC build runner that may be unrelated to your files. Please try the build again.
					</div>
				</div>
			);
		}

		const errors = this.state.currentFileErrors;
		if (null === errors) {
			return (
				<div className="build-pane">
					<div className="loading" />
				</div>
			);
		}

		let otherErrorCount = 0;
		let approvedErrorcount = 0;
		Object.keys(errors.other).forEach(e => otherErrorCount += Object.keys(errors.other[e]).length);
		Object.keys(errors.approved).forEach(e => approvedErrorcount += Object.keys(errors.approved[e]).length);

		return (
			<div className="build-pane">
				<div className={classNames({errors: true, empty: otherErrorCount === 0})}>
					<div className="error-list-name">{otherErrorCount} Errors</div>
					{this.renderErrorList(errors.other, this.state.expandedErrorGroups.other)}
				</div>
				<div className={classNames({errors: true, approved: true, empty: approvedErrorcount === 0})}>
					<div className="error-list-name">{approvedErrorcount} Approved Errors</div>
					{this.renderErrorList(errors.approved, this.state.expandedErrorGroups.approved)}
				</div>
			</div>
		);
	}

	renderErrorList(errors: ISortedError, groupList: IGroupList) {
		const keys = Object.keys(errors);
		keys.sort();
		return (
			<table>
				<tbody>
					{keys.map(e => 
						<tr 
							className={classNames({'error-list': true, collapsed: groupList[e] !== null})}
							key={e}
						>
							<td 
								className="collapse-indicator" 
								onClick={() => this.setErrorGroupCollapsed(e, groupList)}
							/>
							{this.renderErrorGroup(e, errors[e], groupList)}
						</tr>
					)}
				</tbody>
			</table>
		);
	}

	renderErrorGroup(description: string, errors: IErrorSignatureList, groupList: IGroupList) {
		const keys = Object.keys(errors);
		keys.sort();
		return (
			<td>
				<table className="error-group">
					<thead onClick={() => this.setErrorGroupCollapsed(description, groupList)}>
						<tr>
							<th className="header-description error-group-name">{description} ({keys.length})</th>
							<th className="header-layer">Layer</th>
						</tr>
					</thead>
					<tbody>
						{keys.map(e => {
							const error = errors[e];
							return (
								<tr key={error.signature}>
									<td className="description">{error.description}</td>
									<td className="layer">{error.layer}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</td>
		);
	}

	setErrorGroupCollapsed(description: string, groupList: IGroupList) {
		if (groupList[description] === null) {
			delete groupList[description];
		} else {
			groupList[description] = null;
		}

		this.setState({...this.state});
	}

	selectFile(file: IPublicBuildFileSummary): void {
		const fileName = file.normalizedFilename;
		if (this.fileErrors[fileName]) {
			this.setState({ ...this.state, selectedFileName: fileName, currentFileErrors: this.fileErrors[fileName] });
		} else {
			this.setState({ ...this.state, selectedFileName: fileName, currentFileErrors: null });
		}
	}

	getFileName(path: string): string {
		const split = path.split(/(\\|\/)+/);
		if (split.length > 0) {
			return split[split.length - 1];
		}

		return path;
	}
}

export default BuildDetails;
