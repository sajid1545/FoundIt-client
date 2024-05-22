import { getUserInfo } from "@/utils/localStorage";
import { MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthMenuItems = ({ handleCloseNavMenu }: any) => {
	const router = useRouter();

	const userInfo = getUserInfo();

	return (
		<>
			{userInfo?.id && (
				<MenuItem onClick={handleCloseNavMenu}>
					<Link href="/my-profile">
						<Typography textAlign="center">My Profile</Typography>
					</Link>
				</MenuItem>
			)}

			{userInfo?.role === "admin" && (
				<MenuItem onClick={handleCloseNavMenu}>
					<Link href={`/dashboard/${userInfo?.role}`}>
						<Typography textAlign="center">Dashboard</Typography>
					</Link>
				</MenuItem>
			)}
		</>
	);
};

export default AuthMenuItems;
