import { useGetMyFoundItemsQuery } from "@/redux/api/foundItems";
import { dateFormatter } from "@/utils/dateFormatter";
import { Box, Button, Container, Stack, Typography, styled } from "@mui/material";
import Select from "@mui/material/Select";
import Link from "next/link";
import { useState } from "react";
import EditFoundItemsModal from "../../my-found-items/components/EditFoundItemsModal";
import UpdateStatusModal from "../../my-found-items/components/UpdateStatusModal";

export const CustomBorderSelectField = styled(Select)`
	& label.Mui-focused {
		color: #2ab29f;
	}
	& .MuiOutlinedInput-root {
		&.Mui-focused fieldset {
			border-color: #2ab29f;
		}
	}
`;

const MyFoundItems = () => {
	const { data, isLoading } = useGetMyFoundItemsQuery({});

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [id, setId] = useState<string>("");

	const handleOpenModal = (id: string) => {
		setId(id);
		setIsModalOpen(true);
	};

	// For opening the update status modal
	const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false);
	const [id2, setId2] = useState<string>("");

	const handleOpenModal2 = (id: string) => {
		setId2(id);
		setIsModalOpen2(true);
	};

	return (
		<Container sx={{ my: 10 }} maxWidth="xl">
			<EditFoundItemsModal open={isModalOpen} setOpen={setIsModalOpen} id={id} />
			<UpdateStatusModal open={isModalOpen2} setOpen={setIsModalOpen2} id={id2} />
			<Typography
				align="center"
				variant="h4"
				sx={{ color: "text.secondary", m: 3, fontWeight: "bold" }}>
				My Found Items
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
									display: "flex",
									flex: 1,
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									backgroundColor: "#C8EDFD)",
									border: "1px solid #C8EDFD",
									borderRadius: "10px",
									textAlign: "center",
									padding: "40px 10px",
									"&:hover": {
										border: "1px solid #2AB29F",
										borderRadius: "10px",

										transition: "all 0.5s",
										boxShadow: "0px 0px 10px 0px #D3D3D3",
									},
								}}>
								<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
									{item?.foundItemName}
								</Typography>

								<Stack
									direction={{ xs: "column", md: "row" }}
									gap={2}
									flexWrap={"wrap"}
									justifyContent={"center"}>
									<Box
										sx={{
											p: 2,
											px: 2,
											border: "1px solid #C8EDFD",
											background: "#f4f7fe",
											width: "300px",
											textAlign: "center",
										}}>
										<Typography color={"text.secondary"} variant="caption">
											Item Description
										</Typography>
										<Typography>{item?.description}</Typography>
									</Box>
									<Box
										sx={{
											p: 2,
											px: 2,
											border: "1px solid #C8EDFD",
											background: "#f4f7fe",
											width: "300px",
											textAlign: "center",
										}}>
										<Typography color={"text.secondary"} variant="caption">
											Date & Location
										</Typography>
										<Typography>
											{item?.location} -{dateFormatter(item?.foundDate)}{" "}
										</Typography>
									</Box>
									<Box
										sx={{
											p: 2,
											px: 2,
											border: "1px solid #C8EDFD",
											background: "#f4f7fe",
											width: "300px",
											textAlign: "center",
										}}>
										<Typography color={"text.secondary"} variant="caption">
											Action
										</Typography>
										<Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
											<Button
												size="small"
												sx={{ display: "block", mx: "auto" }}
												onClick={() => handleOpenModal(item?.id)}>
												Edit
											</Button>
										</Box>
									</Box>
								</Stack>

								<Typography sx={{ fontWeight: "bold", fontSize: "18px", my: 3 }}>Claim</Typography>
								<Stack
									direction={{ xs: "column", md: "row" }}
									gap={2}
									flexWrap={"wrap"}
									justifyContent={"center"}>
									{item?.claim?.length === 0 && (
										<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
											No Claim For This Item
										</Typography>
									)}

									{item?.claim?.map((item: any) => {
										return (
											<Box
												key={item?.id}
												sx={{
													display: "flex",
													flexDirection: { xs: "column", md: "row" },
													flexWrap: "wrap",
													justifyContent: "center",
													alignItems: "center",
													gap: 1,
													backgroundColor: "#C8EDFD)",
													border: "1px solid #C8EDFD",
													borderRadius: "10px",
													textAlign: "center",
													padding: "40px 10px",
												}}>
												<Box
													sx={{
														p: 2,
														px: 2,
														border: "1px solid #C8EDFD",
														background: "#f4f7fe",
														width: "300px",
														textAlign: "center",
													}}>
													<Typography color={"text.secondary"} variant="caption">
														Name
													</Typography>
													<Typography>{item?.user?.name}</Typography>
												</Box>
												<Box
													sx={{
														p: 2,
														px: 2,
														border: "1px solid #C8EDFD",
														background: "#f4f7fe",
														width: "300px",
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
												<Box
													sx={{
														p: 2,
														px: 2,
														border: "1px solid #C8EDFD",
														background: "#f4f7fe",
														width: "300px",
														textAlign: "center",
													}}>
													<Typography color={"text.secondary"} variant="caption">
														Update Status
													</Typography>
													<Typography>
														<Button onClick={() => handleOpenModal2(item?.id)}>
															Update Status
														</Button>
													</Typography>
												</Box>
											</Box>
										);
									})}
								</Stack>
							</Box>
						))}
					</Stack>
					<Link href="/my-found-items">
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
							View All My Found Items
						</Button>
					</Link>
				</>
			)}
		</Container>
	);
};

export default MyFoundItems;
