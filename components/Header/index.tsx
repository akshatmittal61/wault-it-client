import { routes } from "@/constants";
import { useStore } from "@/hooks";
import { Avatar, Button } from "@/library";
import { stylesConfig } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiLogIn } from "react-icons/fi";
import Search from "./search";
import styles from "./styles.module.scss";

interface IHeaderProps {}

const classes = stylesConfig(styles, "header");

const Header: React.FC<IHeaderProps> = () => {
	const router = useRouter();
	const { user } = useStore();
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
			{user.email ? (
				<div className={classes("-right")}>
					<Search />
					<Avatar
						src={user.avatar || ""}
						alt={user.name}
						className={classes("-avatar")}
						size={42}
						onClick={() => {
							router.push(routes.PROFILE);
						}}
					/>
				</div>
			) : (
				<Button
					onClick={() => {
						router.push(routes.LOGIN);
					}}
					icon={<FiLogIn />}
				>
					Login
				</Button>
			)}
		</header>
	);
};

export default Header;
