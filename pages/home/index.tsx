import { authenticatedPage } from "@/client";
import { routes } from "@/constants";
import { useStore } from "@/hooks";
import { Typography } from "@/library";
import styles from "@/styles/pages/Home.module.scss";
import { IUser, ServerSideResult } from "@/types";
import { stylesConfig } from "@/utils";
import React, { useEffect } from "react";

const classes = stylesConfig(styles, "home");

type HomePageProps = { user: IUser };

const HomePage: React.FC<HomePageProps> = (props) => {
	const { dispatch, setUser } = useStore();

	useEffect(() => {
		dispatch(setUser(props.user));
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
				Home
			</Typography>
			<pre>{JSON.stringify(props, null, 2)}</pre>
		</div>
	);
};

export default HomePage;

export const getServerSideProps = async (
	context: any
): Promise<ServerSideResult<HomePageProps>> => {
	return await authenticatedPage(context, {
		onLoggedInAndOnboarded(user) {
			return {
				props: { user },
			};
		},
		onLoggedInAndNotOnboarded() {
			return {
				redirect: {
					destination: routes.ONBOARDING,
					permanent: false,
				},
			};
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
