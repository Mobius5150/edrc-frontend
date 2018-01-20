export type BuildType = 'pr' | 'branch';
export type BuildTriggerEvents = 'webhook-pull_request' | 'webhook-push' | 'manual';
export type BuildStatus = 'queued' | 'running' | 'uploading' | 'completed';
export type BuildResult = null | 'failed' | 'succeeded' | 'completed-with-errors';

export interface IProjectBuild {
	projectId: string;
	buildId: string;
	userName: string;
	buildQueued: Date;
	buildCompleted: Date;
	status: BuildStatus;
	result: BuildResult;
	type: BuildType;
	typeRef: string;
	triggerEvent: BuildTriggerEvents;
	triggerUrl: string;
	commitBranch: string;
	commitUser: string;
	commitMessage: string;
	commitHash: string;
}

export interface IBuildListResult {
	builds?: IProjectBuild[];
	branches?: { [branchName: string]: IProjectBuild };
}

export interface IPublicBuildDetails {
	status: string;
	errorMessage: string;
	errorDetails: string;
	FileBuildResults: IPublicBuildFileSummary[];
}

export interface IPublicBuildFileSummary {
	filename: string;
	normalizedFilename: string;
	resultsUrl?: string;
	imageUrl?: string;
	errorMessage: string;
	errorCode: string;
	approvedErrorCount: number;
	activeErrorCount: number;
	unknownErrorCount: number;
	drcConfig: IBuildDrcConfig;
	ercConfig: IBuildErcConfig;
}

export interface IBuildDrcConfig {
	file: string;
	version?: string;
	dru?: IBuildDrcDruConfig;
}

export interface IBuildDrcDruConfig {
	file: string;
	layers: string;
}

export interface IBuildErcConfig {
	file: string;
	version?: string;
}

export type IBuildFileErrorsContract = IBuildFileErrors[];

export interface IBuildFileErrors {
	code: number;
	state: string;
	description: string;
	layer: number; 
	signature: string;
	x: number;
	y: number;
}