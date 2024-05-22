import { Box, Button, Typography } from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import Link from "next/link";
import homeBanner from "../../../../assets/home-banner.jpg";

const HeroSection = () => {
	return (
		<Box
			sx={{
				backgroundImage: `url(${homeBanner.src})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				opacity: 0.9,
				overflow: "hidden",
				width: "100%",
				height: "600px",
			}}>
			<Box
				sx={{
					width: "100%",
					height: "100%",
					backgroundColor: "rgba(0,0,0,0.8)",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					zIndex: 1,
				}}>
				<Typography variant="h3" sx={{ color: "secondary.main", m: 3, fontWeight: "bold" }}>
					The new standard for lost and found
				</Typography>
				<Box sx={{ mb: 5 }}>
					<Typography variant="h5" sx={{ color: "text.secondary", fontWeight: "bold" }}>
						<DoneIcon fontSize="large" sx={{ fontWeight: "bold" }} /> {""} 60% timesaving on found
						items
					</Typography>
					<Typography variant="h5" sx={{ color: "text.secondary", fontWeight: "bold" }}>
						<DoneIcon fontSize="large" sx={{ fontWeight: "bold" }} /> {""}
						One centralized and standardized platform
					</Typography>
					<Typography variant="h5" sx={{ color: "text.secondary", fontWeight: "bold" }}>
						<DoneIcon fontSize="large" sx={{ fontWeight: "bold" }} /> {""}
						Ultimate user experience
					</Typography>
				</Box>
				<Box sx={{ display: "flex", gap: 4 }}>
					<Link href="/submit-lost-items">
						<Button
							sx={{
								fontWeight: "bold",
								backgroundColor: "text.secondary",
								"&:hover": {
									backgroundColor: "text.secondary",
								},
							}}>
							Report a Lost Item
						</Button>
					</Link>

					<Link href="/lost">
						<Button
							sx={{
								fontWeight: "bold",
								backgroundColor: "white",
								color: "text.primary",
								"&:hover": {
									backgroundColor: "white",
								},
							}}>
							Report a Found Item
						</Button>
					</Link>
				</Box>
			</Box>
		</Box>
	);
};

export default HeroSection;
