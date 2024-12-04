import { Button, MaterialIcon, Typography } from "@/library";
import { IArtifact } from "@/types";
import { copyToClipboard, stylesConfig } from "@/utils/functions";
import React from "react";
import styles from "./styles.module.scss";
import { Notify } from "@/utils";

interface IServiceArtifactProps {
	artifact: IArtifact;
}

interface IServiceArtifactBlockProps {
	label: string;
	value: string;
	showCopy?: boolean;
	style?: React.CSSProperties;
}

const classes = stylesConfig(styles, "service-artifact");

const ServiceArtifactBlock: React.FC<IServiceArtifactBlockProps> = ({
	label,
	value,
	style,
	showCopy = false,
}) => {
	return (
		<div className={classes("-block")} style={style}>
			<Typography size="sm" className={classes("-block-label")}>
				{label}
			</Typography>
			<Typography size="s" className={classes("-block-value")}>
				{value}
				{showCopy ? (
					<button
						className={classes("-block-icon")}
						onClick={() => {
							copyToClipboard(value);
							Notify.success("Copied to clipboard");
						}}
					>
						<MaterialIcon icon="content_copy" />
					</button>
				) : null}
			</Typography>
		</div>
	);
};

const ServiceArtifact: React.FC<IServiceArtifactProps> = ({ artifact }) => {
	return (
		<div className={classes("")}>
			<div className={classes("-container")}>
				<ServiceArtifactBlock
					label="Identifier"
					value={artifact.identifier}
					showCopy
				/>
				{artifact.comment ? (
					<ServiceArtifactBlock
						label="Comment"
						value={artifact.comment}
					/>
				) : null}
			</div>
			<span className={classes("-divider")} />
			<div className={classes("-actions")}>
				<Button
					size="small"
					variant="outlined"
					icon={<MaterialIcon icon="visibility" />}
				>
					Reveal
				</Button>
				<Button
					size="small"
					variant="outlined"
					icon={<MaterialIcon icon="edit" />}
				>
					Edit
				</Button>
				<Button
					size="small"
					variant="outlined"
					icon={<MaterialIcon icon="delete" />}
				>
					Delete
				</Button>
			</div>
		</div>
	);
};

export default ServiceArtifact;
