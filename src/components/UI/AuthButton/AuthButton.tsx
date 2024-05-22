import { authKey } from "@/constants/auth";
import { getUserInfo } from "@/utils/localStorage";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
	const router = useRouter();

	const userInfo = getUserInfo();

	const handleLogout = () => {
		localStorage.removeItem(authKey);

		router.push("/login");
		router.refresh();
	};

	return (
		<>
			{userInfo?.id ? (
				<Button onClick={handleLogout} color="error">
					Logout
				</Button>
			) : (
				<Button
					component={Link}
					href="/login"
					sx={{
						my: 2,
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
