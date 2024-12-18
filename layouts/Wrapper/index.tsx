import { Footer, Header, Loader, SideBar } from "@/components";
import { frontendBaseUrl, routes } from "@/constants";
import { useDevice, useStore } from "@/hooks";
import { Seo } from "@/layouts";
import { Logger } from "@/log";
import { IUser } from "@/types";
import { stylesConfig } from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import styles from "./styles.module.scss";

interface WrapperProps {
	children: React.ReactNode;
	user?: IUser;
}

const classes = stylesConfig(styles, "wrapper");

export const Wrapper: React.FC<WrapperProps> = ({ children, user }) => {
	const router = useRouter();
	const { type: device } = useDevice();
	const { initStore, syncNetworkStatus, closeSideBar } = useStore();
	const [showLoader, setShowLoader] = useState(false);
	const pagesSupportingHeader: Array<string> = [
		routes.ROOT,
		routes.ERROR,
		routes.PRIVACY_POLICY,
		routes.HOME,
		routes.ROOM(""),
		routes.PROFILE,
	];
	const pagesSupportingFooter: Array<string> = [
		routes.ROOT,
		routes.ERROR,
		routes.PRIVACY_POLICY,
	];
	const pagesSupportingContainer: Array<string> = [
		routes.HOME,
		routes.ROOM(""),
		routes.PROFILE,
	];

	// only show loader when route is changing

	useEffect(() => {
		router.events.on("routeChangeStart", () => {
			setShowLoader(true);
		});
		router.events.on("routeChangeComplete", () => {
			setShowLoader(false);
		});
		router.events.on("routeChangeError", () => {
			setShowLoader(false);
		});
	}, [router.events]);

	useEffect(() => {
		initStore(user);
		setInterval(() => {
			syncNetworkStatus();
		}, 10000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		Logger.debug("router.pathname", router.pathname, routes.ROOM(""));
		if (device === "mobile") {
			closeSideBar();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [device, router.pathname]);

	return (
		<>
			<Seo
				title="Wault It"
				description="Store and secure passwords for everything, encrypted behind one paraphrase that only you remember."
				image={`${frontendBaseUrl}/og-image.png`}
				canonical={frontendBaseUrl}
				author="Akshat Mittal"
				siteName="Wault It"
				themeColor="#4AA63C"
				icons={["icon", "shortcut icon", "apple-touch-icon"].map(
					(item) => {
						return {
							rel: item,
							href: `${frontendBaseUrl}/favicon.ico`,
							type: "icon/ico",
						};
					}
				)}
				twitter={{
					card: "summary_large_image",
					site: "@akshatmittal61",
					author: "@akshatmittal61",
					title: "Wault It",
					description:
						"Store and secure passwords for everything, encrypted behind one paraphrase that only you remember.",
					image: `${frontendBaseUrl}/og-image.png`,
					url: frontendBaseUrl,
				}}
				og={{
					title: "Wault It",
					description:
						"Store and secure passwords for everything, encrypted behind one paraphrase that only you remember.",
					images: [
						{
							url: `${frontendBaseUrl}/og-image.png`,
							secureUrl: `${frontendBaseUrl}/og-image.png`,
							type: "image/png",
							width: 1200,
							height: 630,
							alt: "Wault It",
						},
						{
							url: `${frontendBaseUrl}/favicon-192.png`,
							secureUrl: `${frontendBaseUrl}/favicon-192.png`,
							type: "image/png",
							width: 192,
							height: 192,
							alt: "Wault It",
						},
						{
							url: `${frontendBaseUrl}/favicon-512.png`,
							secureUrl: `${frontendBaseUrl}/favicon-512.png`,
							type: "image/png",
							width: 512,
							height: 512,
							alt: "Wault It",
						},
					],
					url: frontendBaseUrl,
					type: "website",
					siteName: "Wault It",
				}}
			/>
			{pagesSupportingHeader.includes(router.pathname) ? (
				<Header />
			) : null}
			{pagesSupportingContainer.includes(router.pathname) ? (
				<SideBar />
			) : null}
			{showLoader ? <Loader.Bar /> : null}
			<main
				className={
					pagesSupportingContainer.includes(router.pathname)
						? classes("")
						: ""
				}
			>
				{children}
			</main>
			{pagesSupportingFooter.includes(router.pathname) ? (
				<Footer />
			) : null}
			<Toaster position="top-center" />
		</>
	);
};
