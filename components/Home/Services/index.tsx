import React from "react";
import { stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";
import { useStore } from "@/hooks";
import { MaterialIcon, Typography } from "@/library";

interface IHomeServicesProps {}

const classes = stylesConfig(styles, "home-services");

const HomeServices: React.FC<IHomeServicesProps> = () => {
	const { services } = useStore();
	return (
		<section id="home-services" className={classes("")}>
			{services.map((service) => (
				<div
					key={`home-services-${service.toString()}`}
					className={classes("-service")}
				>
					<Typography size="s">{service}</Typography>
					<MaterialIcon icon="chevron_right" />
				</div>
			))}
		</section>
	);
};

export default HomeServices;
