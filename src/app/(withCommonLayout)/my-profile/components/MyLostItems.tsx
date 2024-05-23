import { useGetMyLostItemsQuery } from "@/redux/api/lostItemsApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import EditLostItemModal from "../../my-lost-items/components/EditLostItemModal";
import LostItemDeleteConfirmation from "../../my-lost-items/components/LostItemDeleteConfirmation";

const MyLostItems = () => {
	const { data, isLoading } = useGetMyLostItemsQuery({});

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
											Action
										</Typography>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												gap: 5,
											}}>
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
