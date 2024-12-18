import { Logger } from "@/log";
import { IArtifact } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { libraryHelpers } from "../helpers";

type LibrarySlice = {
	services: Array<string>;
	artifacts: Array<IArtifact>;
	searchQuery: string;
};

const initialState: LibrarySlice = {
	services: [],
	artifacts: [],
	searchQuery: "",
};

export const librarySlice = createSlice({
	name: "library",
	initialState,
	reducers: {
		setServices: (state, action) => {
			state.services = action.payload;
		},
		setArtifacts: (state, action) => {
			state.artifacts = action.payload;
		},
		setSearchQuery: (state, action) => {
			state.searchQuery = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			libraryHelpers.getAllServices.fulfilled,
			(state, action) => {
				state.services = action.payload;
			}
		);
		builder.addCase(
			libraryHelpers.getArtifactsForService.fulfilled,
			(state, action) => {
				const artifactsToSet = [...state.artifacts];
				action.payload.forEach((artifact) => {
					// if an artifact exists, replace it, else add it
					if (artifactsToSet.find((a) => a.id === artifact.id)) {
						const index = artifactsToSet.findIndex(
							(a) => a.id === artifact.id
						);
						artifactsToSet[index] = artifact;
					} else {
						artifactsToSet.push(artifact);
					}
				});
				state.artifacts = artifactsToSet;
			}
		);
		builder.addCase(
			libraryHelpers.createArtifact.fulfilled,
			(state, action) => {
				if (!state.services.includes(action.payload.service)) {
					state.services.push(action.payload.service);
				}
				state.artifacts.push(action.payload);
			}
		);
		builder.addCase(
			libraryHelpers.updateArtifact.fulfilled,
			(state, action) => {
				if (!state.services.includes(action.payload.service)) {
					state.services.push(action.payload.service);
				}
				state.artifacts = state.artifacts.map((artifact) => {
					if (artifact.id === action.payload.id) {
						return action.payload;
					}
					return artifact;
				});
			}
		);
		builder.addCase(
			libraryHelpers.deleteArtifact.fulfilled,
			(state, action) => {
				state.artifacts = state.artifacts.filter(
					(artifact) => artifact.id !== action.payload.id
				);
				Logger.debug("Delete toh hogya");
				const countOfRemainingArtifacts = state.artifacts.filter(
					(artifact) => artifact.service === action.payload.service
				).length;
				Logger.debug(
					"countOfRemainingArtifacts",
					countOfRemainingArtifacts,
					action.payload
				);
				if (countOfRemainingArtifacts === 0) {
					state.services = state.services.filter(
						(service) => service !== action.payload.service
					);
				}
				Logger.debug("slice ke end me ", state);
			}
		);
		builder.addCase(
			libraryHelpers.searchForServices.fulfilled,
			(state, action) => {
				state.services = action.payload;
			}
		);
	},
});

export const { setSearchQuery, setServices } = librarySlice.actions;

export default librarySlice.reducer;

export const librarySelector = (state: { library: LibrarySlice }) =>
	state.library;
