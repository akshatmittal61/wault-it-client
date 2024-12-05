import { Logger } from "@/log";
import { createSlice } from "@reduxjs/toolkit";
import { libraryHelpers } from "../helpers";

type LibrarySlice = {
	services: Array<string>;
	searchQuery: string;
};

const initialState: LibrarySlice = {
	services: [],
	searchQuery: "",
};

export const librarySlice = createSlice({
	name: "library",
	initialState,
	reducers: {
		setServices: (state, action) => {
			Logger.debug("setServices", state, action.payload);
			state.services = action.payload;
		},
		setSearchQuery: (state, action) => {
			state.searchQuery = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			libraryHelpers.getAllServices.fulfilled,
			(state, action) => {
				Logger.debug("getAllServices reducer", state, action.payload);
				state.services = action.payload;
			}
		);
		builder.addCase(
			libraryHelpers.searchForServices.fulfilled,
			(state, action) => {
				Logger.debug(
					"searchForServices reducer",
					state,
					action.payload
				);
				state.services = action.payload;
			}
		);
	},
});

export const { setSearchQuery, setServices } = librarySlice.actions;

export default librarySlice.reducer;

export const librarySelector = (state: { library: LibrarySlice }) =>
	state.library;
