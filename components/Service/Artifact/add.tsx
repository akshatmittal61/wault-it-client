import { LibraryApi } from "@/connections";
import { useHttpClient } from "@/hooks";
import { Button, Input, MaterialIcon, Popup } from "@/library";
import { IArtifact, ICreateArtifact } from "@/types";
import { Notify } from "@/utils";
import { stylesConfig } from "@/utils/functions";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Responsive } from "@/layouts";

interface IAddNewArtifactProps {
	onClose: () => void;
	onAdd: (_: IArtifact) => void;
}

const classes = stylesConfig(styles, "artifact-add");

const AddNewArtifact: React.FC<IAddNewArtifactProps> = ({ onClose, onAdd }) => {
	const { data, loading, call } = useHttpClient<IArtifact>();
	const [artifactDetails, setArtifactDetails] = useState<ICreateArtifact>({
		service: "",
		identifier: "",
		comment: "",
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
			await call(LibraryApi.createArtifact, artifactDetails);
			onAdd(data);
		} catch (error) {
			Notify.error(error);
		}
	};
	return (
		<Popup title="Add New Artifact" onClose={onClose}>
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
							Add
						</Button>
					</Responsive.Col>
				</Responsive.Row>
			</form>
		</Popup>
	);
};

export default AddNewArtifact;
