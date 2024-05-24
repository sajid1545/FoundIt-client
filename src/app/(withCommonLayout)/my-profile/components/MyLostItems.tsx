import {
	useGetMyLostItemsQuery,
	useUpdateLostItemFoundStatusMutation,
} from "@/redux/api/lostItemsApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import EditLostItemModal from "../../my-lost-items/components/EditLostItemModal";
import LostItemDeleteConfirmation from "../../my-lost-items/components/LostItemDeleteConfirmation";

interface LoadingItems {
	[key: string]: boolean;
}

const MyLostItems = () => {
	const [loadingItems, setLoadingItems] = useState<LoadingItems>({});

	const { data, isLoading } = useGetMyLostItemsQuery({});

	const [changeItemStatus, { isLoading: isUpdating }] = useUpdateLostItemFoundStatusMutation();

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [id, setId] = useState<any>(null);

	const handleOpenModal = (id: string) => {
		setId(id);
		setIsModalOpen(true);
	};

	// delete confirmation alert
	const [openAlert, setOpenAlert] = useState(false);
	const [idToDelete, setIdToDelete] = useState<string>("");

	const handleOpenDeleteConfirmation = (id: string) => {
		setOpenAlert(true);
		setIdToDelete(id);
	};

	const handleChangeItemFoundStatus = async (id: string) => {
		setLoadingItems((prev) => ({ ...prev, [id]: true }));
		try {
			await changeItemStatus(id);
		} catch (error) {
			console.log(error);
		} finally {
			setLoadingItems((prev) => ({ ...prev, [id]: false }));
		}
	};
	return (
		<Container sx={{ my: 10 }} maxWidth="xl">
			<EditLostItemModal open={isModalOpen} setOpen={setIsModalOpen} id={id} />
			<LostItemDeleteConfirmation open={openAlert} setOpen={setOpenAlert} id={idToDelete} />
			<Typography
				align="center"
				variant="h4"
				sx={{ color: "text.secondary", m: 3, fontWeight: "bold" }}>
				My Lost Items
			</Typography>

			{isLoading ? (
				<Typography align="center" sx={{ m: 3 }} variant="h6">
					Loading...
				</Typography>
			) : (
				<>
					{data?.length === 0 && !isLoading && (
						<Typography sx={{ textAlign: "center" }} variant="h5">
							No Items Found
						</Typography>
					)}
					<Stack direction={{ xs: "column", md: "row" }} gap={4} mt={5}>
						{data?.slice(0, 3)?.map((item: any) => {
							return (
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
										"&:hover": {
											border: "1px solid #2AB29F",
											borderRadius: "10px",
											transition: "all 0.5s",
											boxShadow: "0px 0px 10px 0px #D3D3D3",
										},
									}}>
									<Typography sx={{ fontWeight: "bold", fontSize: "18px", mb: 3 }}>
										{item?.lostItemName}
									</Typography>

									<Stack
										direction={{ xs: "column", md: "row" }}
										gap={2}
										flexWrap={"wrap"}
										justifyContent={"center"}>
										<Box
											sx={{
												p: 2,
												px: 4,
												border: "1px solid #C8EDFD",
												background: "#f4f7fe",
												width: "100%",
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
												px: 4,
												border: "1px solid #C8EDFD",
												background: "#f4f7fe",
												width: "100%",
												textAlign: "center",
											}}>
											<Typography color={"text.secondary"} variant="caption">
												Date & Location
											</Typography>
											<Typography>
												{item?.location} -{dateFormatter(item?.lostDate)}{" "}
											</Typography>
										</Box>
										<Box
											sx={{
												p: 2,
												px: 4,
												border: "1px solid #C8EDFD",
												background: "#f4f7fe",
												width: "100%",
												textAlign: "center",
											}}>
											<Typography color={"text.secondary"} variant="caption">
												Item Found Status
											</Typography>
											<Typography
												color={item?.itemFound ? "green" : "red"}
												sx={{ fontWeight: "bold" }}>
												{item?.itemFound ? "Found" : "Lost"}
											</Typography>

											<Button
												onClick={() => handleChangeItemFoundStatus(item?.id)}
												sx={{
													mt: 0.5,
													backgroundColor: "primary.main",
													color: "white",
													px: 1,
													py: 0.5,
													borderRadius: "5px",
													cursor: "pointer",
													"&:hover": {
														backgroundColor: "primary.dark",
														transition: "all 0.5s",
													},
												}}>
												{/* {isUpdating ? "Changing..." : "Change Status"} */}
												{/* Change Status */}
												{loadingItems[item.id] ? "Loading..." : "Change Status"}
											</Button>
										</Box>
										<Box
											sx={{
												p: 2,
												px: 4,
												border: "1px solid #C8EDFD",
												background: "#f4f7fe",
												width: "100%",
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
												<Link href={`/my-lost-items/edit/${item?.id}`}>
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
														}}
														// onClick={() => handleOpenModal(item?.id)}
													>
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
								</Box>
							);
						})}
					</Stack>
					<Link href="/my-lost-items">
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
							View All My Lost Items
						</Button>
					</Link>
				</>
			)}
		</Container>
	);
};

export default MyLostItems;
