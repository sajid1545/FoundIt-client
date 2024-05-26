"use client";
import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo } from "@/utils/localStorage";
import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AuthButton = () => {
	const pathname = usePathname();

	const router = useRouter();

	const userInfo = getUserInfo();

	const handleLogout = () => {
		logoutUser(router);
		if (
			pathname !== "/about" &&
			pathname !== "/found-items" &&
			pathname !== "/" &&
			pathname !== "/lost-items"
		) {
			router.push("/login");
			router.refresh();
		}
	};

	return (
		<>
			{userInfo ? (
				<Button onClick={handleLogout} color="error">
					Logout
				</Button>
			) : (
				<Button
					component={Link}
					href="/login"
					sx={{
						my: { xs: 2, md: 0 },
						mx: { xs: 4 },
						color: "white",
						backgroundColor: "primary.main",
						overflow: "hidden",
						"&:hover": { backgroundColor: "primary.dark" },
					}}>
					Login
				</Button>
			)}
		</>
	);
};

export default AuthButton;
