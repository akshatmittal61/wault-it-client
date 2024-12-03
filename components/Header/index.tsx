import { routes } from "@/constants";
import { Button } from "@/library";
import { stylesConfig } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiLogIn } from "react-icons/fi";
import styles from "./styles.module.scss";

interface IHeaderProps {}

const classes = stylesConfig(styles, "header");

const Header: React.FC<IHeaderProps> = () => {
	const router = useRouter();
	return (
		<header className={classes("")}>
			<Link href="/">
				<Image
					className={classes("-logo")}
					src="/favicon.png"
					alt="logo"
					width={512}
					height={512}
				/>
			</Link>
			<Button
				onClick={() => {
					router.push(routes.LOGIN);
				}}
				icon={<FiLogIn />}
			>
				Login
			</Button>
		</header>
	);
};

export default Header;
