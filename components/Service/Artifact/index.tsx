import { Button, MaterialIcon } from "@/library";
import { IArtifact } from "@/types";
import { stylesConfig } from "@/utils/functions";
import React, { useState } from "react";
import Block from "./block";
import Revealer from "./revealer";
import styles from "./styles.module.scss";

interface IServiceArtifactProps {
	artifact: IArtifact;
}

const classes = stylesConfig(styles, "service-artifact");

const ServiceArtifact: React.FC<IServiceArtifactProps> = ({ artifact }) => {
	const [showRevealer, setShowRevealer] = useState(false);
	return (
		<>
			<div className={classes("")}>
				<div className={classes("-container")}>
					<Block
						label="Identifier"
						value={artifact.identifier}
						showCopy
					/>
					{artifact.comment ? (
						<Block label="Comment" value={artifact.comment} />
					) : null}
				</div>
				<span className={classes("-divider")} />
				<div className={classes("-actions")}>
					<Button
						size="small"
						variant="outlined"
						icon={<MaterialIcon icon="visibility" />}
						onClick={() => setShowRevealer(true)}
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
			{showRevealer ? (
				<Revealer
					id={artifact.id}
					identifier={artifact.identifier}
					onClose={() => setShowRevealer(false)}
				/>
			) : null}
		</>
	);
};

export default ServiceArtifact;
