"use client";

import changePasswordImage from "@/assets/svgs/changePassword.svg";
import FoundItForm from "@/components/Forms/FoundItForm";
import FoundItInput from "@/components/Forms/FoundItInput";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { logoutUser } from "@/services/actions/logoutUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PasswordConfirmationAlert from "../components/PasswordConfirmationAlert/PasswordConfirmationAlert";

const validationSchema = z.object({
	currentPassword: z.string().min(1, { message: "Current Password is required" }),
	newPassword: z.string().min(1, { message: "New Password is required" }),
	confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
});

const defaultValues = {
	currentPassword: "",
	newPassword: "",
	confirmPassword: "",
};

const ChangePassword = () => {
	const router = useRouter();
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [changePassword, { isLoading }] = useChangePasswordMutation();

	const handleChangePassword = async (values: FieldValues) => {
		const { confirmPassword, ...rest } = values;

		if (rest.newPassword !== confirmPassword) {
			setIsDialogOpen(true);
		}

		if (rest.newPassword === confirmPassword) {
			try {
				const res = await changePassword(rest).unwrap();

				if (res?.status === 200) {
					logoutUser(router);

					router.push("/login");
					toast.success("Password changed successfully");
				} else {
					throw new Error("Incorrect  Password");

					toast.error("Something went wrong");
				}
			} catch (error) {
				console.log(error);
				toast.error("Something went wrong");
			}
		}
	};

	const handleCancel = () => {
		setIsDialogOpen(false);
	};

	return (
		<Container>
			<PasswordConfirmationAlert
				open={isDialogOpen}
				setOpen={setIsDialogOpen}
				handleCancel={handleCancel}
			/>
			<Stack
				sx={{
					height: "100vh",
					justifyContent: "center",
					alignItems: "center",
					my: 2,
				}}>
				<Box
					sx={{
						maxWidth: 600,
						width: "100%",
						boxShadow: 1,
						borderRadius: 1,
						// p: 4,
						textAlign: "center",
					}}>
					<Box sx={{ backgroundColor: "#D9F6F1" }}>
						<Stack
							px={4}
							py={2}
							direction="row"
							spacing={2}
							alignItems="center"
							justifyContent="space-between">
							<Box my={2}>
								<Typography variant="h5" fontWeight={600} color={"#2B4D46"}>
									Change Password
								</Typography>
							</Box>
							<Box>
								<Image src={changePasswordImage} width={100} height={100} alt="logo" />
							</Box>
						</Stack>
					</Box>

					<Box sx={{ px: 4, py: 2 }}>
						<FoundItForm
							onSubmit={handleChangePassword}
							resolver={zodResolver(validationSchema)}
							defaultValues={defaultValues}>
							<Grid container spacing={2} my={1}>
								<Grid item xs={12}>
									<FoundItInput
										label="Current Password"
										type="password"
										fullWidth={true}
										name="currentPassword"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<FoundItInput
										label="New Password"
										type="password"
										fullWidth={true}
										name="newPassword"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<FoundItInput
										label="Confirm Password"
										type="password"
										fullWidth={true}
										name="confirmPassword"
									/>
								</Grid>
							</Grid>
							<Button
								sx={{
									margin: "20px 0px",
									backgroundColor: "#2AB29F",
									color: "white",
									"&:hover": {
										backgroundColor: "#2AB29F",
										color: "white",
									},
								}}
								disabled={isLoading}
								fullWidth={true}
								type="submit">
								{isLoading ? "Changing..." : "Change Password"}
							</Button>
						</FoundItForm>
					</Box>
				</Box>
			</Stack>
		</Container>
	);
};

export default ChangePassword;
