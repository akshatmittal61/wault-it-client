import { authenticatedPage } from "@/client";
import { routes } from "@/constants";
import { useStore } from "@/hooks";
import { Typography } from "@/library";
import styles from "@/styles/pages/Auth.module.scss";
import { IUser, ServerSideResult } from "@/types";
import { stylesConfig } from "@/utils";
import React, { useEffect } from "react";

const classes = stylesConfig(styles, "oauth");

type LogoutPageProps = {
	user: IUser;
};

const LogoutPage: React.FC<LogoutPageProps> = (props) => {
	const { logoutUser, dispatch } = useStore();
	useEffect(() => {
		dispatch(logoutUser());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className={classes("")}>
			<Typography
				as="h1"
				family="montserrat"
				size="xxl"
				weight="medium"
				className={classes("-title")}
			>
				Logout
			</Typography>
			<pre>{JSON.stringify(props, null, 2)}</pre>
		</div>
	);
};

export default LogoutPage;

export const getServerSideProps = async (
	context: any
): Promise<ServerSideResult<LogoutPageProps>> => {
	return await authenticatedPage(context, {
		onLoggedInAndOnboarded(user) {
			return { props: { user } };
		},
		onLoggedInAndNotOnboarded(user) {
			return { props: { user } };
		},
		onLoggedOut() {
			return {
				redirect: {
					destination: routes.LOGIN,
					permanent: false,
				},
			};
		},
	});
};
