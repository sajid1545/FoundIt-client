import founder1 from "@/assets/founder-1.jpg";
import founder2 from "@/assets/founder-2.jpg";
import founder3 from "@/assets/founder-3.jpg";
import aboutUs2 from "@/assets/svgs/about3.svg";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

const teamInfo = [
	{
		name: "Angelina",
		designation: "Co-founder / CEO",
		email: "angelina@gmail.com",
		image: founder1,
	},
	{
		name: "Sajid",
		designation: "Founder / CCO",
		email: "sajid@gmail.com",
		image: founder2,
	},
	{
		name: "Ibrahim",
		designation: "Founder / CTO",
		email: "ibrahim@gmail.com",
		image: founder3,
	},
];

const AboutUsPage = () => {
	return (
		<Container sx={{ my: 15 }} maxWidth="xl">
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
					<Box sx={{ color: "text.secondary", fontWeight: "bold" }}>Our Mission</Box>
					<Typography>
						Welcome to our Lost and Found Management System! We are passionate about reuniting lost
						items with their rightful owners. Our mission is to create a seamless experience for
						both finders and claimants. With our user-friendly platform, you can report lost items,
						search for found items, and connect with others in your community. Whether it’s a
						misplaced umbrella or a forgotten backpack, we’re here to help. Join us in making lost
						and found a little less stressful!
					</Typography>

					<Typography>
						At Lost and Found Manager, we’re on a mission to simplify the process of reuniting lost
						items with their rightful owners. We understand the frustration of misplacing belongings
						or finding something without knowing how to return it. That’s why we’ve built a
						user-friendly platform where you can report lost items, search for found items, and
						connect with others in your community. Whether it’s a forgotten umbrella, a misplaced
						wallet, or a lost pet, we’re here to help bridge the gap between finders and claimants.
						Join us in making lost and found a little less stressful! 🌟
					</Typography>
				</Box>
				<Box
					sx={{
						width: { xs: "100%", md: "50%", display: "flex", justifyContent: "center" },
					}}>
					<Image src={aboutUs2} alt="about-us" />
				</Box>
			</Stack>

			<Typography
				align="center"
				variant="h4"
				sx={{ color: "text.secondary", m: 3, fontWeight: "bold" }}>
				Founder Team
			</Typography>

			<Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 5 }}>
				{teamInfo.map((item, index) => {
					return (
						<Box
							key={index}
							sx={{
								borderRadius: "12px",
								p: 8,
								m: 2,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: 2,
								boxShadow: 1,
								"&:hover": {
									boxShadow: 15,
									transition: "all 0.5s ease",
								},
							}}>
							<Box sx={{ width: 150, height: 150, mx: "auto" }}>
								<Image
									src={item.image}
									alt={item.name}
									style={{ borderRadius: "50%", margin: "auto" }}
								/>
							</Box>
							<Box sx={{ color: "text.secondary", fontWeight: "bold" }}>{item.name}</Box>
							<Box sx={{ color: "text.primary", fontWeight: "bold" }}>{item.designation}</Box>
							<Box sx={{ color: "#A9A9A9" }}>{item.email}</Box>
						</Box>
					);
				})}
			</Box>
		</Container>
	);
};

export default AboutUsPage;
