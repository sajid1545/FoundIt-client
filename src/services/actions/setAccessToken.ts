"use server";
import { authKey } from "@/constants/auth";
import { cookies } from "next/headers";

const setAccessToken = (token: string, option?: any) => {
	cookies().set(authKey, token);
};

export default setAccessToken;
