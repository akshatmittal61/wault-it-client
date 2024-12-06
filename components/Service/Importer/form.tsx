import { Typography } from "@/library";
import { stylesConfig } from "@/utils/functions";
import React from "react";
import { FiUpload } from "react-icons/fi";
import styles from "./styles.module.scss";

interface IArtifactsImporterFormProps {
	file: any;
	setFile: (_: any) => void;
	handleUploadResume: (_: any) => void;
	handleDragOver: (_: any) => void;
	handleDrop: (_: any) => void;
	handleDragStart: (_: any) => void;
}

const classes = stylesConfig(styles, "artifacts-importer");

const ArtifactsImporterForm: React.FC<IArtifactsImporterFormProps> = ({
	file,
	setFile,
	handleUploadResume,
	handleDragOver,
	handleDrop,
	handleDragStart,
}) => {
	return (
		<form
			className={classes("-form")}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			id="upload-resume"
			onSubmit={(e) => {
				e.preventDefault();
				handleUploadResume(file);
			}}
		>
			<div
				className={classes("-form__content")}
				draggable="true"
				onDragStart={handleDragStart}
			>
				<FiUpload />
				<Typography size="lg">
					Upload files (*.csv Format Only)
				</Typography>
				<Typography size="md">Max Size 10MB</Typography>
			</div>
			<input
				type="file"
				name="resume"
				id="resume"
				onChange={(e) => {
					setFile(e.target.files?.[0]);
				}}
				accept=".csv"
			/>
			<label
				className={classes("-form__label")}
				htmlFor="resume"
				title={"Upload File"}
			>
				Browse Files
			</label>
		</form>
	);
};

export default ArtifactsImporterForm;
