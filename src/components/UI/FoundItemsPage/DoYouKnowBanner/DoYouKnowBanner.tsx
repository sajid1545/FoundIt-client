import knowIcon from "@/assets/icons/knowIcon.png";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const DoYouKnowBanner = () => {
	return (
		<Box
			sx={{
				boxShadow: "0px 5px 22px lightgray",
				p: 3,
				borderRadius: "20px",
				width: { xs: "100%", md: "70%" },
				margin: "auto",
			}}>
			<Box
				sx={{
					display: { xs: "column", md: "flex" },
					gap: 5,
				}}>
				<Image src={knowIcon} alt="knowIcon" width={180} height={180} style={{ margin: "auto" }} />

				<Box sx={{ textAlign: { xs: "center", md: "left" } }}>
					<Typography
						sx={{ mt: 3, mb: 2, fontWeight: "bold", color: "#2B4D46", fontSize: "30px" }}
						variant="h4">
						You should Know
					</Typography>

					<Typography sx={{ color: "#5E646A" }}>
						We have found some items that might belong to you. If that is the case, please claim it
						by submitting a claim request. In order to submit a claim request, please click the
						button below and you must be logged in.
					</Typography>

					<Link href="/submit-claim-items">
						<Button
							sx={{
								mt: 5,
								backgroundColor: "#2AB29F",
								"&:hover": { backgroundColor: "#2AB29F" },
							}}>
							Submit Claim Request
						</Button>
					</Link>
				</Box>
			</Box>
		</Box>
	);
};

export default DoYouKnowBanner;
