import libraryReducer from "./library.slice";
import authReducer from "./user.slice";

export * from "./library.slice";
export * from "./user.slice";

const reducers = {
	user: authReducer,
	library: libraryReducer,
};

export default reducers;
