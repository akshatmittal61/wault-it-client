import libraryReducer from "./library.slice";
import uiReducer from "./ui.slice";
import authReducer from "./user.slice";

export * from "./library.slice";
export * from "./ui.slice";
export * from "./user.slice";

const reducers = {
	user: authReducer,
	library: libraryReducer,
	ui: uiReducer,
};

export default reducers;
