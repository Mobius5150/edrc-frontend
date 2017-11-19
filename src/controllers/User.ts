import { Edrc, Client } from './Edrc';

export interface IUser {
    id: string;
    email: string;
    username: string;
    lastLogin: Date;
    created: Date;
    github: {
        profileUrl: string;
        profilePhotoUrl: string;
        id: number;
        username: string;
        email: string;
    };
}

export interface IGetUserProjectsParams {
    filter?: 'activated' | 'owner' | 'collaborator' | 'organization_member';
}

export class UserController {
    private static CurrentUserPromise: Promise<IUser> | 'not-loaded' | 'loaded' = 'not-loaded';
    private static CurrentUser: IUser | null = null;
    private edrcClient: Client;

    constructor() {
        this.edrcClient = new Edrc().getClient();
    }

    public async isSignedIn(): Promise<boolean> {
        if (null === UserController.CurrentUser) {
            return false;
        }

        return (await this.getCurrentUser() !== null);
    }

    public async getCurrentUser(): Promise<IUser> {
        if (UserController.CurrentUserPromise === 'loaded') {
            return UserController.CurrentUser as IUser;
        } else if (UserController.CurrentUserPromise instanceof Promise) {
            return UserController.CurrentUserPromise;
        }

        UserController.CurrentUserPromise = new Promise<IUser>(async (resolve, reject) => {
            const userResponse = await this.edrcClient({ path: 'api/v1/user/current'});
            if (userResponse.status.code !== 200) {
                throw new Error(`User Response ${userResponse.status.text}`);
            } else {
                UserController.CurrentUser = this.toUser(userResponse.entity);
                UserController.CurrentUserPromise = 'loaded';
                resolve(UserController.CurrentUser);
            }
        });

        return UserController.CurrentUserPromise;
    }

    public async getUserProjects(user: IUser, p: IGetUserProjectsParams = {}): Promise<IUserActivatedGitHubRepo[]> {
        const params = { filter: 'activated', ...p };

        const userResponse = await this.edrcClient({ path: 'api/v1/user/{user}/project{?filter}', params: { user: user.id, filter: params.filter } });
        if (userResponse.status.code !== 200) {
            throw new Error(`User Projects Response ${userResponse.status.text}`);
        } else {
            return this.toProjectList(userResponse.entity);
        }
    }

    private toUser(test: any): IUser {
        return test;
    }

    private toProjectList(test: any): IUserActivatedGitHubRepo[] {
        return test;
    }
}

export interface IRepoOwner {
    login: string;
    id: number;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface IRepoPermissions {
    admin: boolean;
    push: boolean;
    pull: boolean;
}

export interface IGithubRepo {
    id: number;
    name: string;
    full_name: string;
    owner: IRepoOwner;
    private: boolean;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: Date;
    updated_at: Date;
    pushed_at: Date;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url?: any;
    archived: boolean;
    open_issues_count: number;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    permissions: IRepoPermissions;
}

export interface IUserActivatedGitHubRepo extends IGithubRepo {
    edrcActivated: boolean;
    lastBuildDate: Date;
    lastBuild: string;
}