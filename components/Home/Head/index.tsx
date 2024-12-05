import { Button, Typography } from "@/library";
import { stylesConfig } from "@/utils/functions";
import React from "react";
import styles from "./styles.module.scss";

interface IHomeHeadProps {
	onAdd: () => void;
}

const classes = stylesConfig(styles, "home-head");

const HomeHead: React.FC<IHomeHeadProps> = ({ onAdd }) => {
	return (
		<section id="home-head" className={classes("")}>
			<Typography as="h1" size="xl">
				Passwords
			</Typography>
			<Button size="small" variant="outlined" onClick={onAdd}>
				Add
			</Button>
		</section>
	);
};

export default HomeHead;
