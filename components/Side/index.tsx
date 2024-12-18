import { routes } from "@/constants";
import { useStore } from "@/hooks";
import { MaterialIcon, Typography } from "@/library";
import { stylesConfig } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";

interface ISideBarProps {}

const classes = stylesConfig(styles, "side-bar");

const SideBar: React.FC<ISideBarProps> = () => {
	const router = useRouter();
	const {
		closeSideBar,
		sideBarLinks,
		isSidebarExpanded,
		isLoggedIn,
		services,
		logout,
	} = useStore();
	const logoutUser = async () => {
		await logout();
		router.push(routes.LOGIN);
	};
	return (
		<>
			<aside
				className={classes("", {
					"--expanded": isSidebarExpanded,
					"--collapsed": !isSidebarExpanded,
				})}
			>
				<nav className={classes("-nav")}>
					<ul className={classes("-list")}>
						{isLoggedIn ? (
							<>
								<li
									className={classes("-list__item")}
									key="sidebar-logout"
								>
									<Link
										href={routes.HOME}
										className={classes("-link")}
									>
										<MaterialIcon icon="home" />
										<Typography
											className={classes("-link__title")}
											size="md"
										>
											All Services
										</Typography>
									</Link>
								</li>
							</>
						) : null}
						{isLoggedIn
							? services.map((service, index) => (
									<li
										className={classes(
											"-list__item",
											"-list__item--intend"
										)}
										key={`sidebar-service-${index}`}
									>
										<Link
											href={routes.ROOM(service)}
											className={classes("-link", {
												"-link--active":
													service ===
													router.query.name,
											})}
										>
											<MaterialIcon icon="chevron_right" />
											<Typography
												className={classes(
													"-link__title"
												)}
												size="md"
											>
												{service}
											</Typography>
										</Link>
									</li>
								))
							: sideBarLinks.map((item, index) => (
									<li
										className={classes("-list__item")}
										key={index}
									>
										<Link
											href={item.route}
											className={classes("-link", {
												"-link--active":
													item.route ===
													router.pathname,
											})}
										>
											<MaterialIcon icon={item.icon} />
											<Typography
												className={classes(
													"-link__title"
												)}
												size="md"
											>
												{item.title}
											</Typography>
										</Link>
									</li>
								))}
						{isLoggedIn ? (
							<>
								<li
									className={classes("-list__item")}
									key="sidebar-logout"
								>
									<Link
										href={routes.PROFILE}
										className={classes("-link")}
									>
										<MaterialIcon icon="settings" />
										<Typography
											className={classes("-link__title")}
											size="md"
										>
											Settings
										</Typography>
									</Link>
								</li>
								<li
									className={classes("-list__item")}
									key="sidebar-logout"
								>
									<span
										onClick={logoutUser}
										className={classes("-link")}
									>
										<MaterialIcon icon="logout" />
										<Typography
											className={classes("-link__title")}
											size="md"
										>
											Logout
										</Typography>
									</span>
								</li>
							</>
						) : null}
					</ul>
				</nav>
			</aside>
			<div className={classes("-overlay")} onClick={closeSideBar} />
		</>
	);
};

export default SideBar;
