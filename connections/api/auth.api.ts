import { http } from "@/connections";
import { ApiRes, IUser } from "@/types";

export const verifyUserIfLoggedIn = async (
	headers?: any
): Promise<ApiRes<IUser>> => {
	const response = await http.get("/auth/verify", { headers });
	return response.data;
};

export const logout = async () => {
	const res = await http.get("/auth/logout");
	return res.data;
};

/**
 * Verifies the authentication sign-in process using the code received from the OAuth provider.
 *
 * @param {string} code - The authentication code to verify.
 * @return {Promise<ApiRes<string>>} - A Promise that resolves to the email of the authenticated user.
 */
export const verifyOAuthSignIn = async (
	code: string
): Promise<ApiRes<string>> => {
	const res = await http.post("/oauth/google/verify", { code });
	return res.data;
};

/**
 * Continues the authentication sign-in process using the email of the authenticated user.
 *
 * @param {string} token - The email of the authenticated user.
 * @return {Promise<ApiRes<IUser>>} - A Promise that resolves to the authenticated user.
 */
export const continueOAuthWithGoogle = async (
	token: string
): Promise<ApiRes<IUser>> => {
	const res = await http.post("/oauth/google/continue", { token });
	return res.data;
};
