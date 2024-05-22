import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authKey } from "./constants/auth";

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ["/login", "/register"];
const protectedRoutes = [
	"/dashboard",
	"/submit-found-items",
	"/submit-lost-items",
	"/submit-claim-items",
	"/profile",
];
const roleBasedPrivateRoutes = {
	ADMIN: [/^\/dashboard\/admin/],
};

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const accessToken = cookies().get(authKey)?.value;

	if (!accessToken) {
		if (AuthRoutes.includes(pathname)) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	if (!accessToken) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (accessToken && protectedRoutes.includes(pathname)) {
		return NextResponse.next();
	}

	// let decodedData = null;

	// if (accessToken) {
	// 	decodedData = decodeToken(accessToken);
	// }

	// const role = decodedData?.role;

	// if (role && roleBasedPrivateRoutes[role as Role]) {
	// 	const routes = roleBasedPrivateRoutes[role as Role]; // [ /^\/dashboard\/doctor/ ]

	// 	if (routes.some((route) => pathname.match(route))) {
	// 		return NextResponse.next();
	// 	}
	// }

	return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
	matcher: [
		"/login",
		"/register",
		"/dashboard/:page*",
		"/submit-found-items",
		"/submit-lost-items",
		"/submit-claim-items",
		"/profile",
	],
};
