import { IArtifact, IUser } from "./models";
import { AppNetworkStatus, AppTheme, Navigation } from "./ui";

export type Action<T> = {
	type: string;
	payload: T;
};
export type UiSlice = {
	vh: number;
	theme: AppTheme;
	isSidebarExpanded: boolean;
	networkStatus: AppNetworkStatus;
	isLoggedIn: boolean;
	isSyncing: boolean;
	sideBarLinks: Array<Navigation>;
};
export type UserSlice = IUser;
export type LibrarySlice = {
	services: Array<string>;
	artifacts: Array<IArtifact>;
	searchQuery: string;
};
