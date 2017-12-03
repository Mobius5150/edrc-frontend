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

export interface IBuildDetails {
	status: string;
	errorMessage: string;
	errorDetails: string;
	FileBuildResults: IBuildFileSummary[];
}

export interface IBuildFileSummary {
	filename: string;
	normalizedFilename: string;
	resultsBlobUrl: string;
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