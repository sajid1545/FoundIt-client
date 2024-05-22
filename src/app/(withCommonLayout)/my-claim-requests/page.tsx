"use client";

import { useGetMyClaimedRequestsQuery } from "@/redux/api/claimItems";
import { Box, Container, Stack, Typography } from "@mui/material";

const MyClaimedRequests = () => {
	const { data, isLoading } = useGetMyClaimedRequestsQuery({});
	return (
		<Container sx={{ my: 15 }} maxWidth="xl">
			<Typography
				align="center"
				variant="h4"
				sx={{ color: "text.secondary", m: 3, fontWeight: "bold" }}>
				My Claim Requests
			</Typography>

			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					<Stack direction={{ xs: "column" }} gap={5} mt={5}>
						{data?.map((item: any) => (
							<Box
								key={item.id}
								sx={{
									backgroundColor: "#C8EDFD)",
									border: "1px solid #C8EDFD",
									borderRadius: "10px",
									textAlign: "center",
									padding: "40px 10px",
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
				</>
			)}
		</Container>
	);
};

export default MyClaimedRequests;
