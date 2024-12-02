import { api } from "@/connections";
import { Logger } from "@/log";
import { ServerSideAuthMiddleware } from "@/types";

export const authenticatedPage: ServerSideAuthMiddleware = async (
	context: any,
	{ onLoggedInAndNotOnboarded, onLoggedInAndOnboarded, onLoggedOut }
) => {
	const { req } = context;
	Logger.debug("ssr cookies", req.headers.cookie, req.cookies);
	const cookies = req.cookies;
	if (!cookies.token) {
		return onLoggedOut();
	}
	try {
		const headers = { cookie: req.headers.cookie };
		const { data: user } = await api.auth.verifyUserIfLoggedIn(headers);
		if (user.name) {
			return onLoggedInAndOnboarded(user, headers);
		} else {
			return onLoggedInAndNotOnboarded(user, headers);
		}
	} catch (error: any) {
		Logger.error(error.message);
		return onLoggedOut();
	}
};
