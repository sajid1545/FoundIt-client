"use client";

import { useGetMyProfileQuery } from "@/redux/api/myProfile";
import EditIcon from "@mui/icons-material/Edit";
import KeyIcon from "@mui/icons-material/Key";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import EditProfileModal from "./components/EditProfileModal";
import MyClaimedRequests from "./components/MyClaimedRequests";
import MyFoundItems from "./components/MyFoundItems";
import MyInformation from "./components/MyInformations";
import MyLostItems from "./components/MyLostItems";

const MyProfile = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const { data: myProfile, isLoading: profileLoading } = useGetMyProfileQuery(
		{},
		{
			refetchOnMountOrArgChange: true,
		}
	);

	return (
		<Container sx={{ my: 15 }} maxWidth="xl">
			<EditProfileModal
				open={isModalOpen}
				setOpen={setIsModalOpen}
				data={myProfile}
				loading={profileLoading}
			/>
			<Box
				sx={{
					border: "1px solid #C8EDFD",
					p: 3,
					borderRadius: "3px",
					"&hover": {
						boxShadow: "0px 5px 22px lightgray",
						transition: "all 0.5s ease",
						border: "1px solid #2AB29F",
						cursor: "pointer",
					},
				}}>
				<Typography
					align="center"
					variant="h4"
					sx={{ color: "text.secondary", mb: 2, fontWeight: "bold" }}>
					My Profile
				</Typography>

				{profileLoading ? (
					<Typography align="center" sx={{ m: 3 }} variant="h6">
						Loading...
					</Typography>
				) : (
					<MyInformation myProfile={myProfile} />
				)}

				<Box sx={{ display: "flex", gap: 4, justifyContent: "center", my: 5 }}>
					<Button
						onClick={() => setIsModalOpen(true)}
						startIcon={<EditIcon />}
						sx={{
							fontWeight: "bold",
							backgroundColor: "primary.main",
							"&:hover": {
								backgroundColor: "primary.dark",
							},
						}}>
						Edit Profile
					</Button>

					<Link href="/change-password">
						<Button
							startIcon={<KeyIcon />}
							sx={{
								fontWeight: "bold",
								backgroundColor: "rgba(32, 49, 69, 0.9)",
								"&:hover": {
									backgroundColor: "text.primary",
								},
							}}>
							Change Password
						</Button>
					</Link>
				</Box>
			</Box>

			{/* My claimed requests */}
			<MyClaimedRequests />

			{/* My lost items */}
			<MyLostItems />

			{/* My Found items */}
			<MyFoundItems />
		</Container>
	);
};

export default MyProfile;
