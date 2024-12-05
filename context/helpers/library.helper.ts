import { LibraryApi } from "@/connections";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllServices = createAsyncThunk(
	"library/getAllServices",
	async (_, thunkApi) => {
		try {
			const res = await LibraryApi.getAllServices();
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
			return Promise.resolve(res.data);
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.response.data);
		}
	}
);
