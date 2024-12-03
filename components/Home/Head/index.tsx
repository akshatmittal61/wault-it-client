import React from "react";
import { stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";
import { Button, Typography } from "@/library";

interface IHomeHeadProps {}

const classes = stylesConfig(styles, "home-head");

const HomeHead: React.FC<IHomeHeadProps> = () => {
	return (
		<section id="home-head" className={classes("")}>
			<Typography as="h1" size="xl">
				Passwords
			</Typography>
			<Button size="small" variant="outlined">
				Add
			</Button>
		</section>
	);
};

export default HomeHead;
