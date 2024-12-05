import { authenticatedPage } from "@/client";
import { Home as Components, Loader, Service } from "@/components";
import { routes } from "@/constants";
import { useHttpClient, useStore } from "@/hooks";
import styles from "@/styles/pages/Home.module.scss";
import { IUser, ServerSideResult } from "@/types";
import { stylesConfig } from "@/utils";
import React, { useEffect, useState } from "react";

const classes = stylesConfig(styles, "home");

type HomePageProps = { user: IUser };

const HomePage: React.FC<HomePageProps> = (props) => {
	const { dispatch, setUser, getAllServices } = useStore();
	const client = useHttpClient<Array<string>>();
	const [openAddArtifactPopup, setopenAddArtifactPopup] = useState(false);

	const getServices = async () => {
		await client.dispatch(getAllServices, undefined);
	};

	useEffect(() => {
		dispatch(setUser(props.user));
		getServices();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<main id="home" className={classes("")}>
				<Components.Head onAdd={() => setopenAddArtifactPopup(true)} />
				{client.loading ? (
					<Loader.Spinner />
				) : client.data.length > 0 ? (
					<Components.Services />
				) : null}
			</main>
			{openAddArtifactPopup ? (
				<Service.AddArtifact
					onClose={() => setopenAddArtifactPopup(false)}
					onAdd={() => {
						getServices();
						setopenAddArtifactPopup(false);
					}}
				/>
			) : null}
		</>
	);
};

export default HomePage;

export const getServerSideProps = async (
	context: any
): Promise<ServerSideResult<HomePageProps>> => {
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
