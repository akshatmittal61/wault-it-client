import { authHelpers, userHelpers } from "@/context/helpers";
import { Action, IUser, UserSlice } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserSlice = {
	name: "",
	email: "",
	avatar: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: Action<Partial<IUser>>) => {
			state = { ...state, ...action.payload };
			return state;
		},
		logout: (state) => {
			state = initialState;
			return state;
		},
	},
	extraReducers: (builder) => {
		// Fetch Logged In User
		builder.addCase(
			authHelpers.fetchAuthenticatedUser.fulfilled,
			(state, action: Action<IUser>) => {
				state = { ...state, ...action.payload };
				return state;
			}
		);
		// Handle rejection: Fetch Logged In User
		builder.addCase(
			authHelpers.fetchAuthenticatedUser.rejected,
			(state) => {
				state = initialState;
				return state;
			}
		);
		// Logout User
		builder.addCase(authHelpers.logoutUser.fulfilled, (state) => {
			state = initialState;
			return state;
		});
		// Update Profile
		builder.addCase(
			userHelpers.updateProfile.fulfilled,
			(state, action: Action<IUser>) => {
				state = { ...state, ...action.payload };
				return state;
			}
		);
	},
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state: { user: UserSlice }) => state.user;
