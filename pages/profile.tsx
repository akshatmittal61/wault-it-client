import { authenticatedPage } from "@/client";
import { Profile } from "@/components";
import { routes } from "@/constants";
import { useStore } from "@/hooks";
import { Button, MaterialIcon } from "@/library";
import styles from "@/styles/pages/Home.module.scss";
import { IUser, ServerSideResult } from "@/types";
import { stylesConfig } from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const classes = stylesConfig(styles, "profile");

type ProfilePageProps = { user: IUser };

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
	const router = useRouter();
	const { dispatch, setUser } = useStore();
	const [mode, setMode] = useState<"view" | "edit">("view");

	useEffect(() => {
		dispatch(setUser(props.user));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main id="profile" className={classes("")}>
			<div className={classes("-actions")}>
				<button
					className={classes("-home")}
					onClick={() => router.push(routes.HOME)}
				>
					<MaterialIcon icon="home" />
				</button>
				<Button
					className={classes("-button")}
					variant="outlined"
					icon={
						<MaterialIcon
							icon={mode === "view" ? "edit" : "visibility"}
						/>
					}
					onClick={() =>
						setMode((p) => (p === "view" ? "edit" : "view"))
					}
				>
					{mode === "view" ? "Edit Profile" : "View Profile"}
				</Button>
			</div>
			{mode === "view" ? (
				<Profile.View />
			) : (
				<Profile.Edit onEdit={() => setMode("view")} />
			)}
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
