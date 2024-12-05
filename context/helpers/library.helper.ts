import { LibraryApi } from "@/connections";
import { Logger } from "@/log";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllServices = createAsyncThunk(
	"library/getAllServices",
	async (_, thunkApi) => {
		try {
			const res = await LibraryApi.getAllServices();
			Logger.debug("getAllServices res", res);
			return Promise.resolve(res.data);
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.response.data);
		}
	}
);

export const searchForServices = createAsyncThunk(
	"library/searchForServices",
	async (query: string, thunkApi) => {
		try {
			const res = await LibraryApi.searchForServices(query);
			Logger.debug("searchForServices res", res);
			return Promise.resolve(res.data);
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.response.data);
		}
	}
);
