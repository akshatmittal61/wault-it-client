import { http } from "@/connections";
import { ApiRes, IArtifact } from "@/types";

export class LibraryApi {
	public static async getAllServices(
		headers?: any
	): Promise<ApiRes<Array<string>>> {
		const response = await http.get("/services", { headers });
		return response.data;
	}
	public static async getArtifactsForService(
		service: string,
		headers?: any
	): Promise<ApiRes<Array<IArtifact>>> {
		const response = await http.post(
			"/services/artifacts",
			{ service },
			{ headers }
		);
		return response.data;
	}
	public static async getRevealedArtifact(
		{ artifactId, privateKey }: { artifactId: string; privateKey: string },
		headers?: any
	) {
		const response = await http.post(
			`/artifacts/reveal/${artifactId}`,
			{ privateKey },
			{ headers }
		);
		return response.data;
	}
	public static async deleteArtifact(
		id: string,
		headers?: any
	): Promise<ApiRes<IArtifact>> {
		const response = await http.delete(`/artifacts/${id}`, { headers });
		return response.data;
	}
}
