import { LibraryApi } from "@/connections";
import { useHttpClient } from "@/hooks";
import { Button, Input, MaterialIcon, Popup } from "@/library";
import { IRevealedArtifact } from "@/types";
import { Notify } from "@/utils";
import { stylesConfig } from "@/utils/functions";
import React, { useState } from "react";
import Block from "./block";
import styles from "./styles.module.scss";

interface IArtifactRevealerProps {
	id: string;
	identifier: string;
	onClose: () => void;
}

const classes = stylesConfig(styles, "artifact-revealer");

const ArtifactRevealer: React.FC<IArtifactRevealerProps> = ({
	id,
	identifier,
	onClose,
}) => {
	const { data, loading, call } = useHttpClient<IRevealedArtifact>();
	const [privateKey, setPrivateKey] = useState("");
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await call(LibraryApi.getRevealedArtifact, {
				artifactId: id,
				privateKey,
			});
		} catch (error) {
			Notify.error(error);
		}
	};
	return (
		<Popup
			width="300px"
			height="375px"
			onClose={onClose}
			title="Reveal Artifact"
		>
			<div className={classes("")}>
				<Block label="Identifier" value={identifier} showCopy />
				{data.password ? (
					<Block label="Password" value={data.password} showCopy />
				) : (
					<form className={classes("-form")} onSubmit={handleSubmit}>
						<Input
							className={classes("-input")}
							type="password"
							name="privateKey"
							label="Private Key"
							placeholder="Enter your private key"
							icon={<MaterialIcon icon="lock" />}
							value={privateKey}
							onChange={(e: any) => setPrivateKey(e.target.value)}
						/>
						<Button
							type="submit"
							variant="outlined"
							loading={loading}
							icon={<MaterialIcon icon="visibility" />}
						>
							Reveal
						</Button>
					</form>
				)}
			</div>
		</Popup>
	);
};

export default ArtifactRevealer;
