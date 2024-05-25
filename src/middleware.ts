import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authKey } from "./constants/auth";

const AuthRoutes = ["/login", "/register"];
const protectedRoutes = [
	"/dashboard",
	"/dashboard/:page*",
	"/submit-found-items",
	"/submit-lost-items",
	"/submit-claim-items",
	"/my-profile",
	"/my-claim-requests",
	"/my-lost-items",
	"/my-lost-items/edit/:id*",
	"/my-found-items",
	"/my-found-items/edit/:id*",
	"/my-found-items/edit-item/:id*",
];
const roleBasedPrivateRoutes = {
	ADMIN: [/^\/dashboard\/admin/],
};

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// console.log("🚀 ~ middleware ~ pathname: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀", pathname);
	// console.log("⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️", protectedRoutes.includes(pathname));

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
	let decodedData = null;

	if (accessToken) {
		decodedData = jwtDecode(accessToken) as any;
	}

	const role = decodedData?.role;

	if (role === "ADMIN" && pathname.startsWith("/dashboard/admin")) {
		return NextResponse.next();
	}

	return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
	matcher: [
		"/login",
		"/register",
		"/dashboard",
		"/dashboard/:page*",
		"/submit-found-items",
		"/submit-lost-items",
		"/submit-claim-items",
		"/my-profile",
		"/my-lost-items",
		"/my-lost-items/edit",
		"/my-claim-requests",
		"/my-found-items",
		"/my-found-items/edit",
		"/my-found-items/edit-item",
	],
};
