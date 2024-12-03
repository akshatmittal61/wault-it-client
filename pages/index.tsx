import { authenticatedPage } from "@/client";
import { routes } from "@/constants";
import { Typography } from "@/library";
import styles from "@/styles/pages/Home.module.scss";
import { ServerSideResult } from "@/types";
import { stylesConfig } from "@/utils";
import React from "react";

const classes = stylesConfig(styles, "home");

const HomePage: React.FC = () => {
	return (
		<main className={classes("")}>
			<Typography size="head-1" as="h1" weight="semi-bold">
				NextJS Boilerplate
			</Typography>
			<Typography size="lg" as="p">
				NextJS Boilerplate is a starter template for NextJS with
				TypeScript, ESLint, Prettier, Husky, Commit Lint and modular
				SASS.
			</Typography>
		</main>
	);
};

export default HomePage;

export const getServerSideProps = (context: any): Promise<ServerSideResult> => {
	return authenticatedPage(context, {
		onLoggedInAndOnboarded() {
			return {
				redirect: {
					destination: routes.HOME,
					permanent: false,
				},
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
				props: {},
			};
		},
	});
};
