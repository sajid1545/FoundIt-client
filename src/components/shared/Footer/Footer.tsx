import fbIcon from "@/assets/icons/facebook-icon.png";
import twitterIcon from "@/assets/icons/twitter-icon.png";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<Box bgcolor="#EFF2F7" sx={{ color: "#203145" }} py={5}>
			<Container>
				<Stack direction="row" gap={5} justifyContent="center">
					<Box>
						<Stack direction="row" gap={4} justifyContent="center">
							<Typography color={"text.main"} fontWeight={600} variant="h5">
								Follow Us on
							</Typography>
						</Stack>

						<Stack direction="row" gap={2} justifyContent="center" mb={3}>
							<Link href="https://www.facebook.com/">
								<Image src={fbIcon} width={30} height={30} alt="facebook" />
							</Link>
							<Link href="https://x.com/">
								<Image src={twitterIcon} width={30} height={30} alt="facebook" />
							</Link>
						</Stack>
					</Box>

					<Box>
						<Stack direction="row" gap={4} justifyContent="center">
							<Typography color={"text.main"} fontWeight={600} variant="h5">
								Contact Us at {""}
							</Typography>
						</Stack>

						<Stack direction="row" gap={2} justifyContent="center" mb={3}>
							<Link
								href="mailto:clashking1545@gmail.com"
								style={{ textDecoration: "underline", color: "#2AB29F" }}>
								found_it@gmail.com
							</Link>
						</Stack>
					</Box>
				</Stack>

				<Box
					sx={{
						border: "1px dashed black",
					}}></Box>

				<Stack direction="row" gap={2} justifyContent="space-between" alignItems="center" py={3}>
					<Typography component="p" color="text.primary">
						&copy;2024 FoundIt. All Rights Reserved.
					</Typography>
					<Typography variant="h4" component={Link} href="/" fontWeight={600} color="text.primary">
						<Box component="span" color="text.secondary">
							FoundIt
						</Box>{" "}
					</Typography>
					<Typography component="p" color="text.primary">
						Privacy Policy! Terms & Conditions
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
};

export default Footer;
