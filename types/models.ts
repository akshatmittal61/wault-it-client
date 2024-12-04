export type IUser = {
	name: string;
	email: string;
	avatar?: string;
};

export type IUpdateUser = Omit<IUser, "email">;

export type IArtifact = {
	id: string;
	service: string;
	identifier: string;
	comment: string;
	createdAt: string;
	updatedAt: string;
};

export type IRevealedArtifact = IArtifact & { password: string };

export type IArtifactsBucket = {
	service: string;
	artifacts: IArtifact[];
};
