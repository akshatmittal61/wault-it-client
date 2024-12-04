import { routes } from "@/constants";
import { useStore } from "@/hooks";
import { MaterialIcon, Typography } from "@/library";
import { stylesConfig } from "@/utils/functions";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";

interface IHomeServicesProps {}

const classes = stylesConfig(styles, "home-services");

const HomeServices: React.FC<IHomeServicesProps> = () => {
	const { services } = useStore();
	const router = useRouter();
	return (
		<section id="home-services" className={classes("")}>
			{services.map((service) => (
				<div
					key={`home-services-${service.toString()}`}
					className={classes("-service")}
					onClick={() => {
						router.push(routes.ROOM(service));
					}}
				>
					<Typography size="s">{service}</Typography>
					<MaterialIcon icon="chevron_right" />
				</div>
			))}
		</section>
	);
};

export default HomeServices;
