import { Typography } from "@/library";
import { stylesConfig } from "@/utils/functions";
import React from "react";
import { LuFileSymlink } from "react-icons/lu";
import styles from "./styles.module.scss";

interface IArtifactsImporterCurrentProps {}

const classes = stylesConfig(styles, "artifacts-importer");

const ArtifactsImporterCurrent: React.FC<
	IArtifactsImporterCurrentProps
> = () => {
	return (
		<>
			<Typography as="h3" size="lg">
				View Current Resume
			</Typography>
			<a
				href="https://akshatmittal61.vercel.app/resume"
				target="_blank"
				rel="noreferrer"
				className={classes("-header-link")}
			>
				<LuFileSymlink />
			</a>
		</>
	);
};

export default ArtifactsImporterCurrent;
