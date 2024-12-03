import { ApiRes } from "@/types";
import { http } from "@/connections";

export class LibraryApi {
	public static async getAllServices(
		headers?: any
	): Promise<ApiRes<Array<string>>> {
		const response = await http.get("/services", { headers });
		return response.data;
	}
}
