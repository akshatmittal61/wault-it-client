import { authenticatedPage } from "@/client";
import { routes } from "@/constants";
import { useStore } from "@/hooks";
import { Avatar, Button, MaterialIcon, Typography } from "@/library";
import styles from "@/styles/pages/Home.module.scss";
import { IUser, ServerSideResult } from "@/types";
import { copyToClipboard, Notify, stylesConfig } from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const classes = stylesConfig(styles, "profile");

type ProfilePageProps = { user: IUser };

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
	const router = useRouter();
	const { dispatch, user, setUser, logoutUser } = useStore();

	useEffect(() => {
		dispatch(setUser(props.user));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const logout = async () => {
		await dispatch(logoutUser()).unwrap();
		router.push(routes.LOGIN);
	};

	return (
		<main id="profile" className={classes("")}>
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
		</main>
	);
};

export default ProfilePage;

export const getServerSideProps = async (
	context: any
): Promise<ServerSideResult<ProfilePageProps>> => {
	return await authenticatedPage(context, {
		onLoggedInAndOnboarded(user) {
			return {
				props: { user },
			};
		},
		onLoggedInAndNotOnboarded() {
			return {
				redirect: {
					destination: routes.ONBOARDING,
					permanent: false,
				},
			};
		},
		onLoggedOut() {
			return {
				redirect: {
					destination: routes.LOGIN,
					permanent: false,
				},
			};
		},
	});
};
