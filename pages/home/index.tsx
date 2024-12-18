import { authenticatedPage } from "@/client";
import { Home as Components, Loader, Placeholder, Service } from "@/components";
import { routes } from "@/constants";
import { useHttpClient, useStore } from "@/hooks";
import styles from "@/styles/pages/Home.module.scss";
import { IUser, ServerSideResult } from "@/types";
import { stylesConfig } from "@/utils";
import React, { useEffect, useState } from "react";

const classes = stylesConfig(styles, "home");

type HomePageProps = { user: IUser };

const HomePage: React.FC<HomePageProps> = (props) => {
	const {
		dispatch,
		setUser,
		services,
		setServices,
		getAllServices,
		searchQuery,
	} = useStore();
	const client = useHttpClient<Array<string>>();
	const [openAddArtifactPopup, setopenAddArtifactPopup] = useState(false);
	const [openImporterPopup, setOpenImporterPopup] = useState(false);

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
				<Components.Head
					onAdd={() => setopenAddArtifactPopup(true)}
					onImport={() => setOpenImporterPopup(true)}
				/>
				{client.loading && services.length === 0 ? (
					<Loader.Spinner />
				) : services.length > 0 ? (
					<Components.Services />
				) : (
					<Placeholder
						title={(() => {
							if (searchQuery.length > 0) {
								if (searchQuery.length > 3) {
									return "No results for " + searchQuery;
								} else {
									return "Use more than 3 characters to search";
								}
							}
							return "No services found";
						})()}
						subtitle={searchQuery.length > 0 ? "" : "Add a service"}
						cta={(() => {
							if (searchQuery.length > 0) {
								return undefined;
							} else {
								return {
									label: "Add a service",
									action: () => setopenAddArtifactPopup(true),
								};
							}
						})()}
					/>
				)}
			</main>
			{openImporterPopup ? (
				<Service.Importer
					onClose={() => setOpenImporterPopup(false)}
					onImport={(updatedServices) => {
						dispatch(setServices(updatedServices));
						setOpenImporterPopup(false);
					}}
				/>
			) : null}
			{openAddArtifactPopup ? (
				<Service.AddArtifact
					onClose={() => setopenAddArtifactPopup(false)}
					onAdd={() => {
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
