import { Input, MaterialIcon } from "@/library";
import { InputProps } from "@/library/Input/types";
import { validateKey } from "@/validations";
import React, { useState } from "react";

interface IInputPrivateKeyProps extends Omit<InputProps, "onChange"> {
	value: string;
	onChange: (_: string) => void;
}

const InputPrivateKey: React.FC<IInputPrivateKeyProps> = ({
	value,
	onChange,
	...props
}) => {
	const [reveal, setReveal] = useState(false);
	const validate = (key: string): string | null => {
		try {
			validateKey(key);
			return null;
		} catch (err: any) {
			return err.message;
		}
	};
	return (
		<Input
			type={reveal ? "text" : "password"}
			name="privateKey"
			label="Private Key"
			placeholder="Enter your private key"
			leftIcon={<MaterialIcon icon="lock" />}
			rightIcon={
				<MaterialIcon
					icon={reveal ? "visibility" : "visibility_off"}
					onClick={() => setReveal((p) => !p)}
				/>
			}
			value={value}
			onChange={(e: any) => onChange(e.target.value)}
			error={validate(value) === null}
			errorMessage={validate(value)?.toString()}
			{...props}
		/>
	);
};

export default InputPrivateKey;
