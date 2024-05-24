import { getUserInfo } from "@/utils/localStorage";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthLinks = () => {
	const userInfo = getUserInfo();

	const router = useRouter();

	return (
		<>
			{userInfo?.id && (
				<>
					<Link href="/my-profile">
						<Typography
							sx={{
								color: "text.secondary",
								fontWeight: "bold",
								"&:hover": {
									color: "#67cfc0",
									transition: "all 0.5s ease",
								},
							}}
							textAlign="center">
							My Profile
						</Typography>
					</Link>
				</>
			)}

			{userInfo?.role === "admin" && (
				<Link href={`/dashboard/${userInfo?.role}`}>
					<Typography
						sx={{
							color: "text.secondary",
							fontWeight: "bold",
							"&:hover": {
								color: "#67cfc0",
								transition: "all 0.5s ease",
							},
						}}
						textAlign="center">
						Dashboard
					</Typography>
				</Link>
			)}
		</>
	);
};

export default AuthLinks;
