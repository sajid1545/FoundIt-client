import { useGetMyClaimedRequestsQuery } from "@/redux/api/claimItems";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

const MyClaimedRequests = () => {
	const { data, isLoading } = useGetMyClaimedRequestsQuery({});

	return (
		<Container sx={{ my: 10 }} maxWidth="xl">
			<Typography
				align="center"
				variant="h4"
				sx={{ color: "text.secondary", m: 3, fontWeight: "bold" }}>
				My Claim Requests
			</Typography>

			{isLoading ? (
				<Typography align="center" sx={{ m: 3 }} variant="h6">
					Loading...
				</Typography>
			) : (
				<>
					<Stack direction={{ xs: "column", md: "row" }} gap={4} mt={5}>
						{data?.slice(0, 3)?.map((item: any) => (
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
								<Typography sx={{ fontWeight: "bold", fontSize: "18px", mb: 3 }}>
									{item?.foundItem?.foundItemName}
								</Typography>

								<Stack
									direction={{ xs: "column", md: "row" }}
									gap={2}
									flexWrap={"wrap"}
									justifyContent={"center"}>
									<Box
										sx={{
											p: 2,
											border: "1px solid #C8EDFD",
											background: "#f4f7fe",
											minWidth: "300px",
											textAlign: "center",
										}}>
										<Typography color={"text.secondary"} variant="caption">
											Item Description
										</Typography>
										<Typography>{item?.foundItem?.description}</Typography>
									</Box>

									<Box
										sx={{
											p: 2,
											border: "1px solid #C8EDFD",
											background: "#f4f7fe",
											minWidth: "300px",
											textAlign: "center",
										}}>
										<Typography color={"text.secondary"} variant="caption">
											Finders info
										</Typography>
										<Typography>{item?.foundItem?.user?.name}</Typography>
									</Box>

									<Box
										sx={{
											p: 2,
											border: "1px solid #C8EDFD",
											background: "#f4f7fe",
											minWidth: "300px",
											textAlign: "center",
										}}>
										<Typography color={"text.secondary"} variant="caption">
											Status
										</Typography>
										<Typography>
											{item?.status === "REJECTED" ? (
												<Typography fontWeight={600} color="red">
													{item?.status}
												</Typography>
											) : item?.status === "APPROVED" ? (
												<Typography fontWeight={600} color="green">
													{item?.status}
												</Typography>
											) : (
												<Typography>{item?.status}</Typography>
											)}
										</Typography>
									</Box>
								</Stack>
							</Box>
						))}
					</Stack>
					<Link href="/my-claim-requests">
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
							View All My Claimed Items
						</Button>
					</Link>
				</>
			)}
		</Container>
	);
};

export default MyClaimedRequests;
