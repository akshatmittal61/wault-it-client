import { getSideBarLinks } from "@/constants";
import * as allHelpers from "@/context/helpers";
import {
	librarySelector,
	librarySlice,
	uiSelector,
	uiSlice,
	userSelector,
	userSlice,
} from "@/context/store";
import { AppTheme, IUser } from "@/types";
import { Notify } from "@/utils";
import { useDispatch, useSelector } from "react-redux";

export const useStore = () => {
	const dispatch = useDispatch<any>();

	const user = useSelector(userSelector);
	const ui = useSelector(uiSelector);
	const { services, artifacts, searchQuery } = useSelector(librarySelector);

	const syncTheme = () => {
		const theme = localStorage.getItem("theme");
		if (theme && ["light", "dark"].includes(theme)) {
			dispatch(uiSlice.actions.setTheme(theme as AppTheme));
		} else {
			const h = window.matchMedia("(prefers-color-scheme: dark)");
			if (h.matches) {
				dispatch(uiSlice.actions.setTheme("dark"));
			} else {
				dispatch(uiSlice.actions.setTheme("light"));
			}
		}
	};

	const syncNetworkStatus = () => {
		const status = navigator.onLine ? "online" : "offline";
		dispatch(uiSlice.actions.setNetworkStatus(status));
		if (status === "offline") {
			Notify.error("You are offline");
		}
	};

	const syncUserState = (user: IUser) => {
		dispatch(userSlice.actions.setUser(user));
		dispatch(uiSlice.actions.setIsLoggedIn(true));
		dispatch(uiSlice.actions.setSideBarLinks(getSideBarLinks(true)));
	};

	const syncEverything = async () => {
		try {
			dispatch(uiSlice.actions.setIsSyncing(true));
			await Promise.all([
				dispatch(allHelpers.authHelpers.fetchAuthenticatedUser()),
				dispatch(allHelpers.libraryHelpers.getAllServices()),
			]);
		} catch (error) {
			Notify.error(error);
		} finally {
			dispatch(uiSlice.actions.setIsSyncing(false));
		}
	};

	const toggleAppTheme = () => {
		localStorage.setItem("theme", ui.theme === "light" ? "dark" : "light");
		dispatch(uiSlice.actions.toggleTheme());
	};

	const openSidebar = () => {
		dispatch(uiSlice.actions.setOpenSidebar(true));
	};

	const closeSideBar = () => {
		dispatch(uiSlice.actions.setOpenSidebar(false));
	};

	const initStore = async (user?: IUser) => {
		syncTheme();
		syncNetworkStatus();
		if (user) {
			syncUserState(user);
		}
	};

	return {
		// dispatch takes an action object and sends it to the store
		dispatch,
		// user and skills: state values
		user,
		services,
		artifacts,
		searchQuery,
		...ui,
		// actions
		...userSlice.actions,
		...librarySlice.actions,
		...uiSlice.actions,
		// helpers
		...allHelpers.authHelpers,
		...allHelpers.userHelpers,
		...allHelpers.libraryHelpers,
		// utils
		syncEverything,
		syncTheme,
		syncNetworkStatus,
		syncUserState,
		toggleAppTheme,
		openSidebar,
		closeSideBar,
		initStore,
	};
};
