"use server";
import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";

export const userLogin = async (values: FieldValues) => {
	const res = await fetch(`${process.env.BACKEND_HOSTED_LINK}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
		cache: "no-store",
	});

	const userInfo = await res.json();

	if (userInfo?.data?.token) {
		setAccessToken(userInfo?.data?.token);
	}

	return userInfo;
};
