import * as allHelpers from "@/context/helpers";
import {
	librarySelector,
	librarySlice,
	userSelector,
	userSlice,
} from "@/context/store";
import { useDispatch, useSelector } from "react-redux";

export const useStore = () => {
	const dispatch = useDispatch<any>();

	const user = useSelector(userSelector);
	const { services, searchQuery } = useSelector(librarySelector);

	return {
		// dispatch takes an action object and sends it to the store
		dispatch,
		// user and skills: state values
		user,
		services,
		searchQuery,
		// actions
		...userSlice.actions,
		...librarySlice.actions,
		// helpers
		...allHelpers.authHelpers,
		...allHelpers.userHelpers,
		...allHelpers.libraryHelpers,
	};
};
