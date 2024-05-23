import { useGetMyFoundItemsQuery } from "@/redux/api/foundItems";
import { dateFormatter } from "@/utils/dateFormatter";
import { Box, Button, Container, Stack, Typography, styled } from "@mui/material";
import Select from "@mui/material/Select";
import Link from "next/link";
import { useState } from "react";
import ItemDeleteConfirmation from "../../my-found-items/components/ItemDeleteConfirmation";

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

	const [openAlert, setOpenAlert] = useState(false);
	const [idToDelete, setIdToDelete] = useState<string>("");

	const handleOpenDeleteConfirmation = (id: string) => {
		setOpenAlert(true);
		setIdToDelete(id);
	};

	return (
		<Container sx={{ my: 10 }} maxWidth="xl">
			<ItemDeleteConfirmation open={openAlert} setOpen={setOpenAlert} id={idToDelete} />

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
									justifyContent: { xs: "center", md: "flex-start" },
									alignItems: { xs: "center", md: "center" },
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
								<Typography sx={{ fontWeight: "bold", fontSize: "18px", textAlign: "center" }}>
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

										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												gap: 3,
												flexWrap: "wrap",
											}}>
											<Link href={`/my-found-items/edit-item/${item?.id}`}>
												<Button
													size="small"
													sx={{
														mt: 0.5,
														fontSize: "12px",
														backgroundColor: "primary.main",
														color: "white",
														px: 2.5,
														py: 0.8,
														borderRadius: "5px",
													}}>
													Edit
												</Button>
											</Link>
											<Button
												onClick={() => handleOpenDeleteConfirmation(item?.id)}
												color="error"
												size="small"
												sx={{
													mt: 0.5,
													fontSize: "12px",
													backgroundColor: "red",
													color: "white",
													px: 2.5,
													py: 0.8,
													borderRadius: "5px",
												}}>
												Delete
											</Button>
										</Box>
									</Box>
								</Stack>

								<Stack
									direction={{ xs: "column", md: "row" }}
									gap={2}
									flexWrap={"wrap"}
									justifyContent={"center"}>
									{item?.claim?.length === 0 && (
										<Typography sx={{ fontWeight: "bold", fontSize: "20px", mt: 5 }}>
											No Claim For{" "}
											<Box component={"span"} sx={{ color: "#2AB29F" }}>
												{item?.foundItemName}
											</Box>
										</Typography>
									)}

									{item?.claim.length > 0 && (
										<Link href={`/my-found-items/edit/${item?.id}`}>
											<Box
												sx={{
													display: "block",
													mx: "auto",
													mt: 3,
													fontWeight: "bold",
													fontSize: "18px",
													backgroundColor: "#2AB29F",
													color: "white",
													width: "100%",
													padding: "8px 10px",
													borderRadius: "3px",
													cursor: "pointer",
												}}>
												View all {item?.foundItemName} Claims
											</Box>
										</Link>
									)}
								</Stack>
							</Box>
						))}
					</Stack>
					<Link href="/my-found-items">
						<Button
							variant="outlined"
							sx={{
								mt: "35px",
								border: "1px solid #2AB29F",
								color: "#203145",
								display: "block",
								textAlign: "center",
								fontWeight: "bold",
								mx: "auto",

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
