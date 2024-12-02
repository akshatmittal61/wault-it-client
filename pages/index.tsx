import { Typography } from "@/library";
import styles from "@/styles/pages/Home.module.scss";
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
