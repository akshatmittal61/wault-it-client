import { authenticatedPage } from "@/client";
import { Loader } from "@/components";
import { LibraryApi } from "@/connections";
import { routes } from "@/constants";
import { useHttpClient, useStore } from "@/hooks";
import { Typography } from "@/library";
import { Logger } from "@/log";
import styles from "@/styles/pages/Room.module.scss";
import { IArtifact, IUser, ServerSideResult } from "@/types";
import { getNonEmptyString, stylesConfig } from "@/utils";
import React, { useEffect } from "react";

const classes = stylesConfig(styles, "room");

type RoomPageProps = { user: IUser; service: string };

const RoomPage: React.FC<RoomPageProps> = (props) => {
	const { dispatch, setUser } = useStore();
	const client = useHttpClient<Array<IArtifact>>([]);
	const serviceName = props.service;

	const getArtifacts = async () => {
		await client.call(LibraryApi.getArtifactsForService, serviceName);
	};

	useEffect(() => {
		dispatch(setUser(props.user));
		getArtifacts();
		Logger.debug("Room Page", serviceName);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<main id="room" className={classes("")}>
			<Typography
				as="h1"
				family="montserrat"
				size="xxl"
				weight="medium"
				className={classes("-title")}
			>
				Room {serviceName}
			</Typography>
			<div>
				{client.loading ? (
					<Loader.Spinner />
				) : client.data.length === 0 ? (
					<Typography>
						No artifacts found for {serviceName}
					</Typography>
				) : (
					client.data.map((artifact) => (
						<Typography key={`room-${serviceName}-${artifact.id}`}>
							{artifact.identifier}
						</Typography>
					))
				)}
			</div>
		</main>
	);
};

export default RoomPage;

export const getServerSideProps = async (
	context: any
): Promise<ServerSideResult<RoomPageProps>> => {
	return await authenticatedPage(context, {
		onLoggedInAndOnboarded(user) {
			const serviceName = context.query.name;
			if (!serviceName) {
				return {
					redirect: {
						destination: routes.HOME,
						permanent: false,
					},
				};
			}
			return {
				props: { user, service: getNonEmptyString(serviceName) },
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