import { http } from "@/connections";
import { ApiRes, IUser } from "@/types";

export const verifyUserIfLoggedIn = async (
	headers?: any
): Promise<ApiRes<IUser>> => {
	const response = await http.get("/auth/verify", { headers });
	return response.data;
};
