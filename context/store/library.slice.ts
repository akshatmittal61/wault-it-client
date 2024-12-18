import { Logger } from "@/log";
import { Action, IArtifact, LibrarySlice } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { libraryHelpers } from "../helpers";

const initialState: LibrarySlice = {
	services: [],
	artifacts: [],
	searchQuery: "",
};

export const librarySlice = createSlice({
	name: "library",
	initialState,
	reducers: {
		setServices: (state, action: Action<Array<string>>) => {
			state.services = action.payload;
		},
		setArtifacts: (state, action: Action<Array<IArtifact>>) => {
			state.artifacts = action.payload;
		},
		setSearchQuery: (state, action: Action<string>) => {
			state.searchQuery = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			libraryHelpers.getAllServices.fulfilled,
			(state, action: Action<Array<string>>) => {
				state.services = action.payload;
			}
		);
		builder.addCase(
			libraryHelpers.getArtifactsForService.fulfilled,
			(state, action: Action<Array<IArtifact>>) => {
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
			(state, action: Action<IArtifact>) => {
				if (!state.services.includes(action.payload.service)) {
					state.services.push(action.payload.service);
				}
				state.artifacts.push(action.payload);
			}
		);
		builder.addCase(
			libraryHelpers.updateArtifact.fulfilled,
			(state, action: Action<IArtifact>) => {
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
			(state, action: Action<IArtifact>) => {
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
			(state, action: Action<Array<string>>) => {
				state.services = action.payload;
			}
		);
	},
});

export const { setSearchQuery, setServices } = librarySlice.actions;

export default librarySlice.reducer;

export const librarySelector = (state: { library: LibrarySlice }) =>
	state.library;
