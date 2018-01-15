import { ObjectCache } from '../util/ObjectCache';
import { Edrc, Client } from './Edrc';
import { IProject } from '../Models/Project';

export interface IGetUserProjectsParams {
	filter?: 'activated' | 'owner' | 'collaborator' | 'organization_member';
}

export class ProjectController {
	private static Cache: ObjectCache<IProject>;
	private edrcClient: Client;

	public constructor() {
		if (!(ProjectController.Cache)) {
			ProjectController.Cache = new ObjectCache(
				this._getProject,
				{
					keyField: 'fullName',
					lazyCacheArrays: true
				});

			console.log('Project Cache', ProjectController.Cache);
		}

		this.edrcClient = new Edrc().getClient();
	}

	public async getUserProjects(userIdOrName: string, p: IGetUserProjectsParams = {}, initialCount: number = 0): Promise<IProject[]> {
		const params = { filter: 'activated', ...p, user: userIdOrName };

		const userResponse = await this.edrcClient({ path: 'api/v1/user/{user}/project{?filter}', params });
		if (userResponse.status.code !== 200) {
			throw new Error(`User Projects Response ${userResponse.status.text}`);
		} else {
			return ProjectController.Cache.addManyToCache(this.toProjectList(userResponse.entity), initialCount);
		}
	}

	public async getUserProject(userIdOrName: string, projectName: string, initialCount: number = 1): Promise<IProject | null> {
		const result = await ProjectController.Cache.getObjectById(`${userIdOrName}/${projectName}`, initialCount);
		if (result instanceof Error) {
			console.error('Project load error', result);
			throw result;
		}

		return result;
	}

	public async activateUserProject(userIdOrName: string, projectName: string): Promise<IProject> {
		const params = { user: userIdOrName, project: projectName };
		const projectResponse = await this.edrcClient({ method: 'POST', path: 'api/v1/user/{user}/project/{project}', params });
		if (projectResponse.status.code !== 201) {
			throw new Error(`ActivateUserProject response ${projectResponse.status.text}`);
		} else {
			const project = this.toProject(projectResponse.entity);
			console.log('Adding to cache', project);
			ProjectController.Cache.addToCache(project, 0);
			return project;
		}
	}

	public async deactivateUserProject(userIdOrName: string, projectName: string): Promise<void> {
		const params = { user: userIdOrName, project: projectName };
		const projectResponse = await this.edrcClient({ method: 'DELETE', path: 'api/v1/user/{user}/project/{project}', params });
		if (projectResponse.status.code !== 204) {
			throw new Error(`DeactivateUserProject response ${projectResponse.status.text}`);
		}

		ProjectController.Cache.removeObject(`${userIdOrName}/${projectName}`);
	}

	public releaseProjectRef(fullName: string) {
		ProjectController.Cache.releaseObject(fullName);
	}

	public releaseProjectRefs(projects: IProject[]) {
		projects.forEach(p => ProjectController.Cache.releaseObject(p.fullName));
	}

	private _getProject = async (fullName: string): Promise<IProject> => {
		// TODO: Support an api/v1/project/{projectId} path
		const [ userId, projectId ] = fullName.split('/');
		if (!(userId) || !(projectId)) {
			throw new Error('Invalid full project name: ' + fullName);
		}

		const projectResponse = await this.edrcClient({ path: 'api/v1/user/{user}/project/{project}', params: { user: userId, project: projectId } });
		if (projectResponse.status.code !== 200) {
			throw new Error(`User Projects Response ${projectResponse.status.text}`);
		} else {
			const project = this.toProject(projectResponse.entity);
			ProjectController.Cache.addToCache(project);
			return project;
		}
	}

	private toProjectList(test: any): IProject[] {
		return test;
	}

	private toProject(test: any): IProject {
		return test;
	}
}