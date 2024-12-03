import { Auth } from "@/components";
import { oauth_google } from "@/config";
import { Logger } from "@/log";
import React from "react";

const GoogleOAuthRedirectPage: React.FC = () => {
	return (
		<main
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Auth.Button
				onClick={() => {
					const query = {
						client_id: oauth_google.client_id,
						redirect_uri: oauth_google.redirect_uri,
						response_type: "code",
						scope: oauth_google.scopes,
					};
					const url = new URL(oauth_google.endpoint);
					url.search = new URLSearchParams(query).toString();
					window.location.href = url.toString();
				}}
			/>
		</main>
	);
};

export default GoogleOAuthRedirectPage;

export const getServerSideProps = async () => {
	Logger.debug("Google OAuth Redirect Page", oauth_google);
	const query = {
		client_id: oauth_google.client_id,
		redirect_uri: oauth_google.redirect_uri,
		response_type: "code",
		scope: oauth_google.scopes,
	};
	const url = new URL(oauth_google.endpoint);
	url.search = new URLSearchParams(query).toString();
	const complete_url = url.toString();
	Logger.debug("complete_url", complete_url);
	return {
		redirect: {
			destination: complete_url,
			permanent: false,
		},
	};
};
