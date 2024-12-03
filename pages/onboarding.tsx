import { authenticatedPage } from "@/client";
import { routes } from "@/constants";
import { Typography } from "@/library";
import styles from "@/styles/pages/Auth.module.scss";
import { IUser, ServerSideResult } from "@/types";
import { stylesConfig } from "@/utils";
import React from "react";

const classes = stylesConfig(styles, "onboarding");

type OnboardingPageProps = {
	user: IUser;
};

const OnboardingPage: React.FC<OnboardingPageProps> = (props) => {
	return (
		<div className={classes("")}>
			<Typography
				as="h1"
				family="montserrat"
				size="xxl"
				weight="medium"
				className={classes("-title")}
			>
				Onboarding
			</Typography>
			<pre>{JSON.stringify(props, null, 2)}</pre>
		</div>
	);
};

export default OnboardingPage;

export const getServerSideProps = async (
	context: any
): Promise<ServerSideResult<OnboardingPageProps>> => {
	return await authenticatedPage(context, {
		onLoggedInAndOnboarded() {
			return {
				redirect: {
					destination: routes.HOME,
					permanent: false,
				},
			};
		},
		onLoggedInAndNotOnboarded(user) {
			return {
				props: { user },
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
