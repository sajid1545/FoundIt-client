import aboutUs1 from "@/assets/svgs/aboutUs1.svg";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

const AboutUs = () => {
	return (
		<Container sx={{ my: 10 }} maxWidth="xl">
			<Typography
				align="center"
				variant="h3"
				sx={{ color: "text.secondary", m: 3, fontWeight: "bold" }}>
				About US
			</Typography>

			<Stack
				direction={{ xs: "column-reverse", md: "row" }}
				justifyContent="space-between"
				alignItems={"center"}>
				<Box sx={{ width: { xs: "100%", md: "50%" } }}>
					<Typography variant="h6" sx={{ textAlign: { xs: "center", md: "left" } }}>
						Our lost and found system is designed to be a centralized platform where users can
						easily report lost items, find items that have been lost and even help others by
						reporting found items. Our system can categorize and filter out reported items, making
						it easier for users to search and find what they are looking for. With our system, users
						can save time and effort, while also helping others in the community. We believe that
						our system will make a positive impact in the community by reducing the time it takes
						for items to be found and returned back to their rightful owners.
					</Typography>
				</Box>
				<Box
					sx={{
						width: { xs: "100%", md: "50%" },
						mb: { xs: 3, md: 0 },
					}}>
					<Image src={aboutUs1} alt="about-us" />
				</Box>
			</Stack>
		</Container>
	);
};

export default AboutUs;
