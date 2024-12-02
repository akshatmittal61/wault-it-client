import { stylesConfig } from "@/utils";
import React from "react";
import styles from "./styles.module.scss";

interface ILoaderProps {}

const classes = stylesConfig(styles, "loader-bar");

const Bar: React.FC<ILoaderProps> = () => {
	return (
		<div className={classes("")}>
			<span className={classes("-line")} />
		</div>
	);
};

export default Bar;
