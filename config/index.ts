type T_BASE_URL = "frontend" | "backend" | "server";

export const url: Record<T_BASE_URL, string> = {
	frontend:
		process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || "http://localhost:3000",
	backend:
		process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:3000",
	server: process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:4000",
};

export const node_env: "development" | "production" | "test" =
	process.env.NODE_ENV || "development";
export const jwtSecret: string =
	process.env.NEXT_PUBLIC_APP_JWT_SECRET || "secret";
