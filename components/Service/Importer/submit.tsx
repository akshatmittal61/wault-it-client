import { Input, MaterialIcon } from "@/library";
import { stylesConfig } from "@/utils/functions";
import React from "react";
import { FiUpload } from "react-icons/fi";
import styles from "./styles.module.scss";

interface IArtifactsImporterSubmitProps {
	privateKey: string;
	setPrivateKey: (_: string) => void;
	loading: boolean;
	upload: () => void;
}

const classes = stylesConfig(styles, "artifacts-importer");

const ArtifactsImporterSubmit: React.FC<IArtifactsImporterSubmitProps> = ({
	privateKey,
	setPrivateKey,
	loading,
	upload,
}) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		upload();
	};
	return (
		<form onSubmit={handleSubmit} className={classes("-submit")}>
			<Input
				className={classes("-input", "-input--full")}
				type="password"
				name="privateKey"
				label="Private Key"
				placeholder="Enter your private key"
				icon={<MaterialIcon icon="key" />}
				value={privateKey}
				onChange={(e: any) => setPrivateKey(e.target.value)}
				required
				error={privateKey.length === 0}
				errorMessage="Private key is required"
			/>
			<button
				type="submit"
				className={classes("-upload-btn", {
					"-upload-btn--loading": loading,
				})}
				disabled={loading}
			>
				{loading ? (
					<span className={classes("-upload-btn--loader")} />
				) : (
					<>
						<FiUpload />
						Upload this File
					</>
				)}
			</button>
		</form>
	);
};

export default ArtifactsImporterSubmit;
