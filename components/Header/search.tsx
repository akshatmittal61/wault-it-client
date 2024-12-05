import { useDebounce, useHttpClient, useStore } from "@/hooks";
import { Input, MaterialIcon } from "@/library";
import { Logger } from "@/log";
import { Notify } from "@/utils";
import { stylesConfig } from "@/utils/functions";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";

interface ISearchProps {}

const classes = stylesConfig(styles, "search");

const Search: React.FC<ISearchProps> = () => {
	const {
		getAllServices,
		searchForServices,
		setSearchQuery,
		setServices,
		dispatch: dispatchToStore,
	} = useStore();
	const { dispatch, data: searchResults } = useHttpClient<Array<string>>([]);
	const client = useHttpClient<Array<string>>();
	const [searchStr, debouncedSearchStr, setSearchStr] = useDebounce<string>(
		"",
		1000
	);

	const handleSearch = async (searchStr: any) => {
		try {
			const res = await dispatch(searchForServices, searchStr);
			Logger.debug("search results", searchResults, res);
		} catch (error) {
			Notify.error(error);
		}
	};

	useEffect(() => {
		dispatchToStore(setSearchQuery(debouncedSearchStr));
		if (debouncedSearchStr) {
			if (debouncedSearchStr.length >= 3) {
				handleSearch(debouncedSearchStr);
			} else {
				dispatchToStore(setServices([]));
			}
		} else {
			client.dispatch(getAllServices, undefined);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchStr]);
	return (
		<form className={classes("")}>
			<Input
				name="search"
				placeholder="Search"
				value={searchStr}
				icon={<MaterialIcon icon="search" />}
				onChange={(e: any) => setSearchStr(e.target.value)}
			/>
		</form>
	);
};

export default Search;
