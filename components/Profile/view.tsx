import { routes } from "@/constants";
import { useStore } from "@/hooks";
import { Avatar, Button, MaterialIcon, Typography } from "@/library";
import { Notify } from "@/utils";
import { copyToClipboard, stylesConfig } from "@/utils/functions";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";

interface IViewProfileProps {}

const classes = stylesConfig(styles, "view-profile");

const ViewProfile: React.FC<IViewProfileProps> = () => {
	const router = useRouter();
	const { user, logoutUser, dispatch } = useStore();

	const logout = async () => {
		await dispatch(logoutUser()).unwrap();
		router.push(routes.LOGIN);
	};
	return (
		<section id="profile" className={classes("")}>
			<Avatar src={user.avatar || ""} alt={user.name} size="large" />
			<Typography as="h1" size="xxxl" className={classes("-name")}>
				Hi, {user.name}
			</Typography>
			<Typography size="lg" className={classes("-email")}>
				{user.email}{" "}
				<button
					className={classes("-copy")}
					onClick={() => {
						copyToClipboard(user.email);
						Notify.success("Email copied to clipboard");
					}}
				>
					<MaterialIcon icon="content_copy" />
				</button>
			</Typography>
			<Button
				onClick={logout}
				size="large"
				icon={<MaterialIcon icon="logout" />}
			>
				Logout
			</Button>
		</section>
	);
};

export default ViewProfile;
