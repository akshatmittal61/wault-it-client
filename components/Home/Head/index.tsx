import { Button, Typography } from "@/library";
import { stylesConfig } from "@/utils/functions";
import React from "react";
import styles from "./styles.module.scss";

interface IHomeHeadProps {
	onAdd: () => void;
	onImport: () => void;
}

const classes = stylesConfig(styles, "home-head");

const HomeHead: React.FC<IHomeHeadProps> = ({ onAdd, onImport }) => {
	return (
		<section id="home-head" className={classes("")}>
			<Typography as="h1" size="xl">
				Passwords
			</Typography>
			<div className={classes("-actions")}>
				<Button size="small" variant="outlined" onClick={onImport}>
					Import CSV
				</Button>
				<Button size="small" variant="outlined" onClick={onAdd}>
					Add
				</Button>
			</div>
		</section>
	);
};

export default HomeHead;
