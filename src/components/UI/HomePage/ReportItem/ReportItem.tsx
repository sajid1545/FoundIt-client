import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

const ReportItem = () => {
	return (
		<Container sx={{ my: 15 }} maxWidth="xl">
			<Box sx={{ textAlign: "center", backgroundColor: "#f8f8f8", p: 6, borderRadius: "20px" }}>
				<Typography
					align="center"
					variant="h4"
					sx={{ color: "text.secondary", fontWeight: "bold", fontFamily: "monospace", mb: 3 }}>
					Report Item!!!
				</Typography>

				<Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
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

					<Link href="/submit-found-items">
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
		</Container>
	);
};

export default ReportItem;
