export const routes = Object.freeze({
	ROOT: "/",
	HOME: "/home",
	LOGIN: "/login",
	ONBOARDING: "/onboarding",
	PROFILE: "/profile",
	SETTINGS: "/settings",
	ERROR: "/500",
	ADMIN: "/__/admin",
	CACHE: "/__/admin/cache",
	LOGS: "/__/admin/logs",
	LOG_FILE: (file: string) => `/__/admin/logs/${file}`,
	PRIVACY_POLICY: "/privacy-policy",
});
