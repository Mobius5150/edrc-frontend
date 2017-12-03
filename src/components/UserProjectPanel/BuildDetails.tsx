import * as React from 'react';
import './style.css';
import { IProjectBuild, IBuildDetails } from '../../Models/Build';
import { BuildController } from '../../controllers/Build';
// import classNames from 'classnames';

interface IBuildDetailsProps {
	build: IProjectBuild;
}

interface IBuildDetailsState {
	error: Error | null;
	loading: boolean;
	details: IBuildDetails | null;
}

export class BuildDetails extends React.Component <IBuildDetailsProps, IBuildDetailsState> {
	private buildController: BuildController;

	public constructor(props: IBuildDetailsProps) {
		super(props);
		this.buildController = new BuildController();
		this.state = {
			error: null,
			loading: true,
			details: null,
		}
	}

	componentWillMount() {
		this.loadBuildDetails();
	}

	private loadBuildDetails() {
		if (!this.state.details) {
			this.buildController.getBuildDetails(this.props.build)
				.then(details => this.setState({...this.state, error: null, loading: false, details}))
				.catch(error => this.setState({...this.state, details: null, loading: false, error }))
		}
	}

	render() {
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
					{details.FileBuildResults.map(f => 
						<div key={f.normalizedFilename} className="file">
							{f.filename}
						</div>)}
				</div>
				<div className="build-pane">
				</div>
			</div>
		);
	}
}

export default BuildDetails;
