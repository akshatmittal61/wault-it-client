import { authenticatedPage } from "@/client";
import { routes } from "@/constants";
import { useHttpClient, useStore } from "@/hooks";
import { Avatar, Button, Input } from "@/library";
import styles from "@/styles/pages/Auth.module.scss";
import { IUpdateUser, IUser, ServerSideResult } from "@/types";
import { Notify, stylesConfig } from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const classes = stylesConfig(styles, "onboarding");

type OnboardingPageProps = {
	user: IUser;
};

const OnboardingPage: React.FC<OnboardingPageProps> = (props) => {
	const { dispatch, setUser, updateProfile } = useStore();
	const client = useHttpClient<IUser>(props.user);
	const router = useRouter();
	const [userDetails, setUserDetails] = useState<IUpdateUser>({
		name: props.user.name,
		avatar: props.user.avatar,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserDetails((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!userDetails.name) return Notify.error("Name is required");
		await client.dispatch(updateProfile, userDetails);
		router.push(routes.HOME);
	};

	useEffect(() => {
		dispatch(setUser(props.user));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main id="onboarding" className={classes("")}>
			<form onSubmit={handleSubmit}>
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
		</main>
	);
};

export default OnboardingPage;

export const getServerSideProps = async (
	context: any
): Promise<ServerSideResult<OnboardingPageProps>> => {
	return await authenticatedPage(context, {
		onLoggedInAndOnboarded() {
			return {
				redirect: {
					destination: routes.HOME,
					permanent: false,
				},
			};
		},
		onLoggedInAndNotOnboarded(user) {
			return {
				props: { user },
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
