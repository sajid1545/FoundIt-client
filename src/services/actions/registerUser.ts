"use server";

import { FieldValues } from "react-hook-form";

export const registerUser = async (values: FieldValues) => {
	const res = await fetch(`${process.env.BACKEND_HOSTED_LINK}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
		cache: "no-store",
	});

	const userInfo = await res.json();
	return userInfo;
};
