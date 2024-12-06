import { regex } from "@/constants";

export const validateKey = (key: string): boolean => {
	if (!regex.key.test(key)) {
		if (key.length !== 32) {
			throw new Error("Key must be 32 characters long");
		}
		if (!regex.hasUpperCase.test(key)) {
			throw new Error("Key must contain at least one uppercase letter");
		}
		if (!regex.hasLowerCase.test(key)) {
			throw new Error("Key must contain at least one lowercase letter");
		}
		if (!regex.hasNumber.test(key)) {
			throw new Error("Key must contain at least one number");
		}
		if (!regex.hasSpecialChar.test(key)) {
			throw new Error(
				"Key must contain at least one special character, !@#$%& and can't contain any other"
			);
		}
		if (regex.hasSpaces.test(key)) {
			throw new Error("Key must not contain spaces");
		}
	}
	return true;
};
