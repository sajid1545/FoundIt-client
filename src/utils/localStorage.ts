import { authKey } from "@/constants/auth";
import { decodeToken } from "./decodeToken";

export const setToLocalStorage = (key: string, token: string) => {
	if (!key || typeof window === "undefined") {
		return "";
	}
	return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key: string) => {
	if (!key || typeof window === "undefined") {
		return "";
	}
	return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key: string) => {
	if (!key || typeof window === "undefined") {
		return "";
	}
	return localStorage.removeItem(key);
};

export const getUserInfo = () => {
	const authToken = getFromLocalStorage(authKey);

	if (authToken) {
		const decodedData: any = decodeToken(authToken);
		return {
			...decodedData,
			role: decodedData?.role.toLowerCase(),
		};
	}
};

export const isLoggedIn = () => {
	const authToken = getFromLocalStorage(authKey);
	return !!authToken;
};
