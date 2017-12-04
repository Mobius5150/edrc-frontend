import { ObjectCache } from '../util/ObjectCache';
import { Edrc, Client } from './Edrc';
import { IProjectBuild, IBuildListResult, IBuildDetails, IBuildFileErrorsContract } from '../Models/Build';

export interface IGetProjectBuildParams {
	filter?: 'summary' | 'builds' | 'branches' | null;
}

export class BuildController {
	private static Cache: ObjectCache<IProjectBuild>;
	private edrcClient: Client;

	public constructor() {
		if (!(BuildController.Cache)) {
			BuildController.Cache = new ObjectCache(
				this._getBuild,
				{
					keyField: 'buildId',
					lazyCacheArrays: true
				});

			console.log('Build Cache', BuildController.Cache);
		}

		this.edrcClient = new Edrc().getClient();
	}

	public async getProjectBuilds(userIdOrName: string, projectIdOrName: string, p: IGetProjectBuildParams = {}, initialCount: number = 0): Promise<IBuildListResult> {
		const params = { filter: 'summary', ...p, user: userIdOrName, project: projectIdOrName };

		const buildResponse = await this.edrcClient({ path: 'api/v1/user/{user}/project/{project}/build{?filter}', params });
		if (buildResponse.status.code !== 200) {
			throw new Error(`User Projects Response ${buildResponse.status.text}`);
		} else {
			const result = this.toBuildListResult(buildResponse.entity);
			const builds: { [key: string]: IProjectBuild } = {};
			if (result.branches) {
				const branches: { [key: string]: IProjectBuild } = {};
				for (const b in result.branches) {
					const branch = BuildController.Cache.addToCache(result.branches[b], initialCount);
					builds[branch.buildId] = branch;
					branches[b] = branch;
				}
				result.branches = branches;
			}

			if (result.builds) {
				result.builds = result.builds.map(b => {
					if (builds[b.buildId]) {
						return BuildController.Cache.addToCache(b, 0);
					} else {
						return BuildController.Cache.addToCache(b, initialCount);
					}
				});
			}

			return result;
		}
	}

	public async getBuild(buildId: string, initialCount: number = 1): Promise<IProjectBuild | null> {
		const result = await BuildController.Cache.getObjectById(buildId, initialCount);
		if (result instanceof Error) {
			throw result;
		}

		return result;
	}

	public async getBuildDetails(build: IProjectBuild): Promise<IBuildDetails | null> {
		const params = { user: build.userName, project: build.projectId, build: build.buildId };
		
		const buildResponse = await this.edrcClient({ path: 'api/v1/user/{user}/project/{project}/build/{build}/details', params });
		if (buildResponse.status.code !== 200) {
			throw new Error(`User Projects Response ${buildResponse.status.text}`);
		} else {
			return this.toBuildDetails(buildResponse.entity);
		}
	}

	public async getBuildFileDetails(build: IProjectBuild, normalizedFilename: string): Promise<IBuildFileErrorsContract> {
		const params = { user: build.userName, project: build.projectId, build: build.buildId, normalizedFilename };
		
		const buildResponse = await this.edrcClient({ path: 'api/v1/user/{user}/project/{project}/build/{build}/details/{normalizedFilename}', params });
		if (buildResponse.status.code !== 200) {
			throw new Error(`User Projects Response ${buildResponse.status.text}`);
		} else {
			return this.toBuildFileDetails(buildResponse.entity);
		}
	}

	public releaseProjectRef(fullName: string) {
		BuildController.Cache.releaseObject(fullName);
	}

	public releaseProjectRefs(projects: IProjectBuild[]) {
		projects.forEach(b => BuildController.Cache.releaseObject(b.buildId));
	}

	private _getBuild = async (buildId: string): Promise<IProjectBuild> => {
		const buildResponse = await this.edrcClient({ path: 'api/v1/build/{build}', params: { build: buildId } });
		if (buildResponse.status.code !== 200) {
			throw new Error(`Project Build Response ${buildResponse.status.text}`);
		} else {
			const build = this.toBuild(buildResponse.entity);
			BuildController.Cache.addToCache(build);
			return build;
		}
	}

	private toBuildListResult(test: any): IBuildListResult {
		return test;
	}

	private toBuild(test: any): IProjectBuild {
		return test;
	}

	private toBuildDetails(test: any): IBuildDetails {
		return test;
	}

	private toBuildFileDetails(test: any): IBuildFileErrorsContract {
		return test;
	}
}