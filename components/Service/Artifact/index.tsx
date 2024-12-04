import { LibraryApi } from "@/connections";
import { useConfirmationModal, useHttpClient } from "@/hooks";
import { Button, MaterialIcon } from "@/library";
import { IArtifact } from "@/types";
import { Notify } from "@/utils";
import { stylesConfig } from "@/utils/functions";
import React, { useState } from "react";
import Block from "./block";
import Revealer from "./revealer";
import styles from "./styles.module.scss";

interface IServiceArtifactProps {
	artifact: IArtifact;
	onDelete: () => void;
}

const classes = stylesConfig(styles, "service-artifact");

const ServiceArtifact: React.FC<IServiceArtifactProps> = ({
	artifact,
	onDelete,
}) => {
	const [showRevealer, setShowRevealer] = useState(false);
	const { loading: deleting, call: deleteExpense } = useHttpClient();
	const deleteArtifactHelper = async () => {
		try {
			await deleteExpense(LibraryApi.deleteArtifact, artifact.id);
			onDelete();
		} catch (error) {
			Notify.error(error);
		}
	};
	const deleteArtifactConfirmation = useConfirmationModal(
		`Delete ${artifact.identifier}`,
		<>
			Are you sure you want to delete this password?
			<br />
			This action cannot be undone
		</>,
		async () => {
			await deleteArtifactHelper();
		},
		() => {
			deleteArtifactConfirmation.closePopup();
		},
		deleting
	);
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
						onClick={deleteArtifactConfirmation.openPopup}
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
			{deleteArtifactConfirmation.showPopup
				? deleteArtifactConfirmation.Modal
				: null}
		</>
	);
};

export default ServiceArtifact;
