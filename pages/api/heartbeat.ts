import { HTTP, serverBaseUrl } from "@/constants";
import { Logger } from "@/log";
import { ApiRequest, ApiResponse } from "@/types";
import axios from "axios";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const headers = { cookie: req.headers.cookie };
		const response = await axios.get(`${serverBaseUrl}/api/heartbeat`, {
			headers,
		});
		return res.status(response.status).json(response.data);
	} catch (err: any) {
		Logger.error(err);
		return res
			.status(err?.response?.status || HTTP.status.INTERNAL_SERVER_ERROR)
			.json(
				err?.response?.data || {
					message: HTTP.message.INTERNAL_SERVER_ERROR,
				}
			);
	}
};

export default handler;
