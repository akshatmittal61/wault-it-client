export const routes = Object.freeze({
	ROOT: "/",
	HOME: "/home",
	ABOUT: "/about",
	LOGIN: "/login",
	ONBOARDING: "/onboarding",
	ROOM: (name: string) => {
		const queryParams = { name };
		return `/room?${new URLSearchParams(queryParams).toString()}`;
	},
	PROFILE: "/profile",
	SETTINGS: "/settings",
	ERROR: "/500",
	ADMIN: "/__/admin",
	CACHE: "/__/admin/cache",
	LOGS: "/__/admin/logs",
	LOG_FILE: (file: string) => `/__/admin/logs/${file}`,
	REPORT: "/report",
	PRIVACY_POLICY: "/privacy-policy",
	TERMS_AND_CONDITIONS: "/terms-and-conditions",
	HELP: "/help",
	CONTACT: "/contact",
});
