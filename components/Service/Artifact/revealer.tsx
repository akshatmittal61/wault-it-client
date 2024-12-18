import { InputPrivateKey } from "@/components";
import { LibraryApi } from "@/connections";
import { useHttpClient } from "@/hooks";
import { Button, MaterialIcon, Pane } from "@/library";
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
		<Pane width="400px" onClose={onClose} title="Reveal Artifact">
			<div className={classes("")}>
				<Block label="Identifier" value={identifier} showCopy />
				{data.password ? (
					<Block label="Password" value={data.password} showCopy />
				) : (
					<form className={classes("-form")} onSubmit={handleSubmit}>
						<InputPrivateKey
							className={classes("-input")}
							value={privateKey}
							onChange={(value: string) => setPrivateKey(value)}
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
		</Pane>
	);
};

export default ArtifactRevealer;
