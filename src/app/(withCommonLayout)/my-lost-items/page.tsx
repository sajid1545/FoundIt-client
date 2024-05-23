"use client";

import {
	useGetMyLostItemsQuery,
	useUpdateLostItemFoundStatusMutation,
} from "@/redux/api/lostItemsApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import EditLostItemModal from "./components/EditLostItemModal";
import LostItemDeleteConfirmation from "./components/LostItemDeleteConfirmation";

interface LoadingItems {
	[key: string]: boolean;
}

const MyLostItemsPage = () => {
	const [loadingItems, setLoadingItems] = useState<LoadingItems>({});

	const { data, isLoading } = useGetMyLostItemsQuery({});

	const [changeItemStatus] = useUpdateLostItemFoundStatusMutation();

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
		<Container sx={{ my: 15 }} maxWidth="xl">
			<LostItemDeleteConfirmation open={openAlert} setOpen={setOpenAlert} id={idToDelete} />
			<EditLostItemModal open={isModalOpen} setOpen={setIsModalOpen} id={id} />
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
											minWidth: "300px",
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
											minWidth: "300px",
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
											minWidth: "300px",
											textAlign: "center",
										}}>
										<Typography color={"text.secondary"} sx={{ mb: 1 }} variant="caption">
											Action
										</Typography>
										<Box sx={{ display: "flex", alignItems: "center" }}>
											<Button
												size="small"
												sx={{ display: "block", mx: "auto" }}
												onClick={() => handleOpenModal(item?.id)}>
												Edit
											</Button>
											<Button
												onClick={() => handleOpenDeleteConfirmation(item?.id)}
												color="error"
												size="small"
												sx={{ display: "block", mx: "auto" }}>
												Delete
											</Button>
										</Box>
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

export default MyLostItemsPage;
