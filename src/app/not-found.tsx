import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
	return (
		<Box
			sx={{
				textAlign: "center",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}>
			<Typography variant="h1">404</Typography>
			<Typography variant="h5" sx={{ color: "red" }}>
				Could not find requested resource
			</Typography>
			<Link href="/">
				<Typography
					component={"button"}
					sx={{
						color: "blue",
						fontWeight: "bold",
						mt: 3,
						cursor: "pointer",
						textDecoration: "underline",
					}}>
					Return Home
				</Typography>
			</Link>
		</Box>
	);
}
