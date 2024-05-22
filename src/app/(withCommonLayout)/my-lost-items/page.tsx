"use client";

import { useGetMyLostItemsQuery } from "@/redux/api/lostItemsApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import EditLostItemModal from "./components/EditLostItemModal";

const MyLostItemsPage = () => {
	const { data, isLoading } = useGetMyLostItemsQuery({});

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [id, setId] = useState<any>(null);

	const handleOpenModal = (id: string) => {
		setId(id);
		setIsModalOpen(true);
	};

	return (
		<Container sx={{ my: 15 }} maxWidth="xl">
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
											{/* <Button size="small" color="error" fullWidth>
												Delete
											</Button> */}
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
