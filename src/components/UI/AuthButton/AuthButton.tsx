import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo } from "@/utils/localStorage";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
	const router = useRouter();

	const userInfo = getUserInfo();

	const handleLogout = () => {
		logoutUser(router);
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
						my: 2,
						mx: 4,
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
