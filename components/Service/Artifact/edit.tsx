import { LibraryApi } from "@/connections";
import { useHttpClient } from "@/hooks";
import { Responsive } from "@/layouts";
import { Button, Input, MaterialIcon, Popup } from "@/library";
import { IArtifact, IUpdateArtifact } from "@/types";
import { Notify } from "@/utils";
import { stylesConfig } from "@/utils/functions";
import React, { useState } from "react";
import styles from "./styles.module.scss";

interface IUpdateArtifactProps {
	id: string;
	artifact: IArtifact;
	onClose: () => void;
	onUpdate: (_: IArtifact) => void;
}

const classes = stylesConfig(styles, "artifact-add");

const UpdateArtifact: React.FC<IUpdateArtifactProps> = ({
	id,
	artifact,
	onClose,
	onUpdate,
}) => {
	const { data, loading, call } = useHttpClient<IArtifact>();
	const [artifactDetails, setArtifactDetails] = useState<IUpdateArtifact>({
		service: artifact.service,
		identifier: artifact.identifier,
		comment: artifact.comment,
		password: "",
		privateKey: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setArtifactDetails((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const payload: IUpdateArtifact = {};
			if (artifactDetails.service !== artifact.service)
				payload.service = artifactDetails.service;
			if (artifactDetails.comment !== artifact.comment)
				payload.comment = artifactDetails.comment;
			if (artifactDetails.identifier !== artifact.identifier)
				payload.identifier = artifactDetails.identifier;
			if (artifactDetails.password)
				payload.password = artifactDetails.password;
			if (Object.keys(payload).length === 0) throw "Nothing to update";
			payload.privateKey = artifactDetails.privateKey;
			await call(LibraryApi.updateArtifact, id, payload);
			onUpdate(data);
		} catch (error) {
			Notify.error(error);
		}
	};
	return (
		<Popup title="Update Artifact" onClose={onClose}>
			<form className={classes("")} onSubmit={handleSubmit}>
				<Responsive.Row>
					<Responsive.Col xlg={50} lg={50} md={50} sm={100} xsm={100}>
						<Input
							className={classes("-input")}
							type="text"
							name="service"
							label="Service"
							placeholder="Enter service name"
							value={artifactDetails.service}
							onChange={handleChange}
						/>
					</Responsive.Col>
					<Responsive.Col xlg={50} lg={50} md={50} sm={100} xsm={100}>
						<Input
							className={classes("-input")}
							type="text"
							name="comment"
							label="Comment"
							placeholder="Enter comment"
							value={artifactDetails.comment}
							onChange={handleChange}
						/>
					</Responsive.Col>
					<Responsive.Col xlg={50} lg={50} md={50} sm={100} xsm={100}>
						<Input
							className={classes("-input")}
							type="text"
							name="identifier"
							label="Identifier"
							placeholder="myemail@example.com or label(My iPhone)"
							value={artifactDetails.identifier}
							onChange={handleChange}
						/>
					</Responsive.Col>
					<Responsive.Col xlg={50} lg={50} md={50} sm={100} xsm={100}>
						<Input
							className={classes("-input")}
							type="password"
							name="password"
							label="Password"
							placeholder="Enter your password"
							icon={<MaterialIcon icon="lock" />}
							value={artifactDetails.password}
							onChange={handleChange}
						/>
					</Responsive.Col>
					<Responsive.Col
						xlg={100}
						lg={100}
						md={100}
						sm={100}
						xsm={100}
					>
						<Input
							className={classes("-input", "-input--full")}
							type="password"
							name="privateKey"
							label="Private Key"
							placeholder="Enter your private key"
							icon={<MaterialIcon icon="key" />}
							value={artifactDetails.privateKey}
							onChange={handleChange}
						/>
					</Responsive.Col>
					<Responsive.Col
						xlg={100}
						lg={100}
						md={100}
						sm={100}
						xsm={100}
					>
						<Button
							type="submit"
							variant="outlined"
							loading={loading}
						>
							Update
						</Button>
					</Responsive.Col>
				</Responsive.Row>
			</form>
		</Popup>
	);
};

export default UpdateArtifact;
