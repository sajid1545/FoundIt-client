import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

const RecentLostItems = async () => {
	const res = await fetch(`${process.env.BACKEND_HOSTED_LINK}/lost-items`, {
		next: { revalidate: 60 },
	});
	const data = await res.json();

	const lostItems = data?.data;

	console.log(lostItems);

	return (
		<Container sx={{ my: 10 }} maxWidth="xl">
			<Typography
				align="center"
				variant="h3"
				sx={{ color: "text.secondary", m: 3, fontWeight: "bold" }}>
				Recent Lost Item Reports
			</Typography>

			<Stack direction={{ xs: "column", md: "row" }} gap={4} mt={5}>
				{lostItems.slice(0, 3).map((item: any) => (
					<Box
						key={item.id}
						sx={{
							flex: 1,
							width: { xs: "100%", md: "150px" },
							backgroundColor: "#C8EDFD)",
							border: "1px solid #C8EDFD",
							borderRadius: "10px",
							textAlign: "center",
							padding: "40px 10px",
							cursor: "pointer",
							"&:hover": {
								border: "1px solid #2AB29F",
								borderRadius: "10px",
								cursor: "pointer",
								transition: "all 0.5s",
								boxShadow: "0px 0px 10px 0px #D3D3D3",
							},
						}}>
						<Box>
							<Typography component="p" fontWeight={600} fontSize={18} mt={2}>
								{item.lostItemName}
							</Typography>
							<Typography component="p" fontWeight={600} fontSize={18} mt={2}>
								{item.description}
							</Typography>
							<Typography component="p" fontWeight={600} fontSize={18} mt={2}>
								{item.location} - {dateFormatter(item.createdAt)} {timeFormatter(item.createdAt)}
							</Typography>

							<Link href={`/lost-items/${item.id}`}>
								<Button
									sx={{
										fontWeight: "bold",
										mt: "20px",
										backgroundColor: "text.secondary",
										"&:hover": {
											backgroundColor: "text.secondary",
										},
									}}>
									View Details
								</Button>
							</Link>
						</Box>
					</Box>
				))}
			</Stack>
			<Button
				variant="outlined"
				sx={{
					mt: "20px",
					border: "1px solid #2AB29F",
					color: "#203145",
					display: "block",
					textAlign: "center",
					fontWeight: "bold",
					mx: "auto",
					my: "20px",

					"&:hover": {
						backgroundColor: "#2AB29F",
						color: "white",
						transition: "all 0.5s",
						border: "1px solid #2AB29F",
					},
				}}>
				View ALL
			</Button>
		</Container>
	);
};

export default RecentLostItems;
