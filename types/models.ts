export type IUser = {
	name: string;
	email: string;
	avatar?: string;
};

export type IUpdateUser = Omit<IUser, "email">;

export type Artifact = {
	service: string;
	identifier: string;
	comment: string;
};
export type IArtifact = {
	id: string;
	createdAt: string;
	updatedAt: string;
} & Artifact;

export type ISensitiveInfo = { password: string; privateKey: string };

export type ICreateArtifact = Artifact & ISensitiveInfo;
export type IUpdateArtifact = Partial<Artifact & ISensitiveInfo>;

export type IRevealedArtifact = IArtifact & { password: string };

export type IArtifactsBucket = {
	service: string;
	artifacts: IArtifact[];
};
