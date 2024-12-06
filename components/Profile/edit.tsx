import { useHttpClient, useStore } from "@/hooks";
import { Avatar, Button, Input } from "@/library";
import { IUpdateUser, IUser } from "@/types";
import { Notify } from "@/utils";
import { stylesConfig } from "@/utils/functions";
import React, { useState } from "react";
import styles from "./styles.module.scss";

interface IEditProfileProps {
	onEdit: () => void;
}

const classes = stylesConfig(styles, "edit-profile");

const EditProfile: React.FC<IEditProfileProps> = ({ onEdit }) => {
	const { user, updateProfile } = useStore();
	const client = useHttpClient<IUser>(user);

	const [userDetails, setUserDetails] = useState<IUpdateUser>({
		name: user.name,
		avatar: user.avatar,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserDetails((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!userDetails.name) return Notify.error("Name is required");
		await client.dispatch(updateProfile, userDetails);
		onEdit();
	};
	return (
		<section id="profile" className={classes("")}>
			<form onSubmit={handleSubmit} className={classes("-form")}>
				<Avatar src={userDetails.avatar || ""} alt={userDetails.name} />
				<Input
					name="name"
					value={userDetails.name}
					onChange={handleChange}
					label="Name"
					placeholder="Enter your name"
					type="text"
				/>
				<Input
					name="avatar"
					value={userDetails.avatar}
					onChange={handleChange}
					label="Avatar"
					placeholder="Enter your avatar URL"
					type="url"
				/>
				<Button loading={client.loading} type="submit">
					Save
				</Button>
			</form>
		</section>
	);
};

export default EditProfile;
