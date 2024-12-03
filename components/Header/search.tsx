import { useDebounce, useHttpClient } from "@/hooks";
import { Input, MaterialIcon } from "@/library";
import { stylesConfig } from "@/utils/functions";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface ISearchProps {}

const classes = stylesConfig(styles, "search");

const Search: React.FC<ISearchProps> = () => {
	const [, setSearchResults] = useState<Array<string>>([]);
	const { loading: searching, call: searchApiCall } = useHttpClient<
		Array<string>
	>([]);
	const [searchStr, debouncedSearchStr, setSearchStr] = useDebounce<string>(
		"",
		1000
	);

	const handleSearch = async (searchStr: any) => {
		const res = await searchApiCall(async (_: string) => {
			return { message: "", data: [] };
		}, searchStr);
		setSearchResults(res);
	};

	useEffect(() => {
		if (debouncedSearchStr && debouncedSearchStr.length >= 3) {
			handleSearch(debouncedSearchStr);
		} else {
			setSearchResults([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchStr]);
	return (
		<form className={classes("")}>
			<Input
				name="search"
				placeholder="Search"
				value={searchStr}
				disabled={searching}
				icon={<MaterialIcon icon="search" />}
				onChange={(e: any) => setSearchStr(e.target.value)}
			/>
		</form>
	);
};

export default Search;
