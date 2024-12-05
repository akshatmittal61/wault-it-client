import { authenticatedPage } from "@/client";
import { Auth as Components } from "@/components";
import { routes } from "@/constants";
import { useStore } from "@/hooks";
import { Typography } from "@/library";
import styles from "@/styles/pages/Auth.module.scss";
import { IUser, ServerSideResult } from "@/types";
import { stylesConfig } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const classes = stylesConfig(styles, "login");

type LoginPageProps = { user: IUser | null };

const LoginPage: React.FC<LoginPageProps> = (props) => {
	const router = useRouter();
	const { dispatch, setUser } = useStore();
	useEffect(() => {
		if (props.user) {
			dispatch(setUser(props.user));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className={classes("")}>
			<Image
				src="/favicon.png"
				alt="logo"
				width={1920}
				height={1080}
				className={classes("-logo")}
			/>
			<Typography
				as="h1"
				family="montserrat"
				size="xxl"
				weight="medium"
				className={classes("-title")}
			>
				Welcome to Wault It
			</Typography>
			<Typography
				as="p"
				family="montserrat"
				size="lg"
				weight="light"
				className={classes("-subtitle")}
			>
				Store and secure passwords for everything, encrypted behind one
				paraphrase that only you remember.
			</Typography>
			<Components.Button
				onClick={() => {
					router.push("/__/oauth/google");
				}}
			/>
			<Typography size="sm" className={classes("-foot")}>
				By continuing, you acknowledge that you understand and agree to
				the{" "}
				<Link href={routes.TERMS_AND_CONDITIONS}>
					Terms & Conditions
				</Link>{" "}
				and <Link href={routes.PRIVACY_POLICY}>Privacy Policy</Link>
			</Typography>
			<Image
				src="/favicon.svg"
				alt="logo"
				width={1920}
				height={1080}
				className={classes("-background")}
			/>
		</main>
	);
};

export default LoginPage;

export const getServerSideProps = (
	context: any
): Promise<ServerSideResult<LoginPageProps>> => {
	return authenticatedPage(context, {
		async onLoggedInAndOnboarded() {
			return {
				redirect: {
					destination: routes.HOME,
					permanent: false,
				},
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
				props: { user: null },
			};
		},
	});
};
