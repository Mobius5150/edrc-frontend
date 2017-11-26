export interface IProject {
	edrcUserId: string;
	providerId: string;
	providerUrl: string;
	activated: Date;
	name: string;
	fullName: string;
	lastBuildId: string;
	lastBuildStatus: string;
	lastBuildDate: Date;
	ownerName: string;
	ownerType: string;
	public: boolean;
}
