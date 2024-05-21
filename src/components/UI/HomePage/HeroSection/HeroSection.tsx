import { Box, Typography } from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import homeBanner from "../../../../assets/home-banner.jpg";

const HeroSection = () => {
	return (
		<Box
			sx={{
				backgroundImage: `url(${homeBanner.src})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPosition: "center",
				width: "100%",
				height: "500px",
			}}>
			<Box
				sx={{
					width: "100%",
					height: "100%",
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Typography variant="h3" sx={{ color: "white", m: 3 }}>
					The new standard for lost and found
				</Typography>
				<Box>
					<Typography variant="h5" sx={{ color: "white" }}>
						<DoneIcon fontSize="large" sx={{ fontWeight: "bold" }} /> {""} 60% timesaving on found
						items
					</Typography>
					<Typography variant="h5" sx={{ color: "white" }}>
						<DoneIcon fontSize="large" sx={{ fontWeight: "bold" }} /> {""}
						One centralized and standardized platform
					</Typography>
					<Typography variant="h5" sx={{ color: "white" }}>
						<DoneIcon fontSize="large" sx={{ fontWeight: "bold" }} /> {""}
						Ultimate user experience
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default HeroSection;
