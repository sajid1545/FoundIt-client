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
				<Link href="/my-profile">
					<MenuItem onClick={handleCloseNavMenu}>
						<Typography textAlign="center">My Profile</Typography>
					</MenuItem>
				</Link>
			)}

			{userInfo?.role === "admin" && (
				<Link href={`/dashboard/${userInfo?.role}`}>
					<MenuItem onClick={handleCloseNavMenu}>
						<Typography textAlign="center">Dashboard</Typography>
					</MenuItem>
				</Link>
			)}
		</>
	);
};

export default AuthMenuItems;
