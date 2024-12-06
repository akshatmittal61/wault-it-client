import React from "react";

export interface InputDropdownOption {
	id: any;
	value: string;
	label: string;
}

export interface InputProps
	extends Omit<React.HTMLProps<HTMLInputElement>, "size"> {
	styles?: {
		box?: React.CSSProperties;
		label?: React.CSSProperties;
		input?: React.CSSProperties;
		dropdown?: React.CSSProperties;
		dropdownOption?: React.CSSProperties;
	};
	label?: string | any;
	dropdown?: {
		enabled: boolean;
		options: InputDropdownOption[];
		onSelect: (_: InputDropdownOption) => void;
		onSearch?: (_: string) => void;
	};
	error?: boolean;
	errorMessage?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}
