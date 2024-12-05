import { Footer, Header, Loader } from "@/components";
import { frontendBaseUrl, routes } from "@/constants";
import { Seo } from "@/layouts";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export const Wrapper: React.FC<any> = ({ children }) => {
	const router = useRouter();
	const [showLoader, setShowLoader] = useState(false);
	const wrappablePagesPaths: Array<string> = [
		routes.ROOT,
		routes.ROOM("").split("?")[0],
		routes.HOME,
		routes.PRIVACY_POLICY,
		routes.TERMS_AND_CONDITIONS,
		routes.ERROR,
	];
	const isWrappablePage = wrappablePagesPaths.includes(router.pathname);

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

	return (
		<>
			<Seo
				title="Wault"
				description="Store and secure passwords for everything, encrypted behind one paraphrase that only you remember."
				image={`${frontendBaseUrl}/og-image.png`}
				canonical={frontendBaseUrl}
				author="Akshat Mittal"
				siteName="Wault"
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
					title: "Wault",
					description:
						"Store and secure passwords for everything, encrypted behind one paraphrase that only you remember.",
					image: `${frontendBaseUrl}/og-image.png`,
					url: frontendBaseUrl,
				}}
				og={{
					title: "Wault",
					description:
						"Store and secure passwords for everything, encrypted behind one paraphrase that only you remember.",
					images: [
						{
							url: `${frontendBaseUrl}/og-image.png`,
							secureUrl: `${frontendBaseUrl}/og-image.png`,
							type: "image/png",
							width: 1200,
							height: 630,
							alt: "Wault",
						},
						{
							url: `${frontendBaseUrl}/favicon-192.png`,
							secureUrl: `${frontendBaseUrl}/favicon-192.png`,
							type: "image/png",
							width: 192,
							height: 192,
							alt: "Wault",
						},
						{
							url: `${frontendBaseUrl}/favicon-512.png`,
							secureUrl: `${frontendBaseUrl}/favicon-512.png`,
							type: "image/png",
							width: 512,
							height: 512,
							alt: "Wault",
						},
					],
					url: frontendBaseUrl,
					type: "website",
					siteName: "Wault",
				}}
			/>
			{isWrappablePage ? <Header /> : null}
			{showLoader ? <Loader.Bar /> : null}
			{children}
			{isWrappablePage ? <Footer /> : null}
			<Toaster position="top-center" />
		</>
	);
};
