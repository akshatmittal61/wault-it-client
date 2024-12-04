import { MaterialIcon, Typography } from "@/library";
import { Notify } from "@/utils";
import { copyToClipboard, stylesConfig } from "@/utils/functions";
import React from "react";
import styles from "./styles.module.scss";

interface IServiceArtifactBlockProps {
	label: string;
	value: string;
	showCopy?: boolean;
	style?: React.CSSProperties;
}

const classes = stylesConfig(styles, "service-artifact-block");

const ServiceArtifactBlock: React.FC<IServiceArtifactBlockProps> = ({
	label,
	value,
	style,
	showCopy = false,
}) => {
	return (
		<div className={classes("")} style={style}>
			<Typography size="sm" className={classes("-label")}>
				{label}
			</Typography>
			<Typography size="s" className={classes("-value")}>
				{value}
				{showCopy ? (
					<button
						className={classes("-icon")}
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

export default ServiceArtifactBlock;
