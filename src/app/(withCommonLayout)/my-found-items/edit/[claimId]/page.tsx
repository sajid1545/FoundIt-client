"use client";

import { useGetSingleFoundItemQuery } from "@/redux/api/foundItems";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import UpdateStatusModal from "../../components/UpdateStatusModal";

type TProps = {
	params: {
		claimId: string;
	};
};

const FoundItemsClaim = ({ params }: TProps) => {
	const id = params.claimId;

	const { data, isLoading } = useGetSingleFoundItemQuery(id);

	// For opening the update status modal
	const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false);
	const [id2, setId2] = useState<string>("");

	const handleOpenModal2 = (id: string) => {
		setId2(id);
		setIsModalOpen2(true);
	};

	const claims = data?.claim;

	return (
		<>
			<UpdateStatusModal open={isModalOpen2} setOpen={setIsModalOpen2} id={id2} />
			{isLoading ? (
				<Typography
					align="center"
					sx={{
						m: 3,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh",
					}}
					variant="h6">
					Loading...
				</Typography>
			) : (
				<Container sx={{ my: 15 }} maxWidth="xl">
					<Typography
						align="center"
						variant="h4"
						sx={{ color: "text.secondary", m: 3, fontWeight: "bold" }}>
						{data?.foundItemName} Claims
					</Typography>

					<Stack
						display={"flex"}
						direction={{ xs: "column", md: "row" }}
						gap={2}
						flexWrap={"wrap"}
						justifyContent={"center"}>
						{claims?.map((item: any) => {
							return (
								<Box
									key={item?.id}
									sx={{
										display: "flex",
										flexDirection: { xs: "column" },
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
									<Typography sx={{ fontWeight: "bold", fontSize: "18px", my: 3 }}>
										Claimed By {item?.user?.name}{" "}
									</Typography>
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
											<Button onClick={() => handleOpenModal2(item?.id)}>Update Status</Button>
										</Typography>
									</Box>
								</Box>
							);
						})}
					</Stack>
				</Container>
			)}
		</>
	);
};

export default FoundItemsClaim;
