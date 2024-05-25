"use client";

import loginIllustration from "@/assets/icons/register.png";
import FoundItForm from "@/components/Forms/FoundItForm";
import FoundItInput from "@/components/Forms/FoundItInput";
import { registerUser } from "@/services/actions/registerUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PasswordConfirmationAlert from "../components/PasswordConfirmationAlert/PasswordConfirmationAlert";

const validationSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(1, { message: "Password is required" }),
	confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
});

const defaultValues = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const RegisterPage = () => {
	const router = useRouter();
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const [loading, setLoading] = useState<boolean>(false);

	const handleRegister = async (values: FieldValues) => {
		const { confirmPassword, ...rest } = values;

		if (rest.password !== confirmPassword) {
			setIsDialogOpen(true);
		}

		setLoading(true);
		if (rest.password === confirmPassword) {
			try {
				const res = await registerUser(rest);
				if (res.statusCode === 201) {
					toast.success("User created successfully");
					setLoading(false);
					router.push("/login");
				} else {
					setLoading(false);
					toast.error("Something went wrong");
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
		setLoading(false);
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
					my: { xs: 10, md: 2 },
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
									Registration with FoundIt
								</Typography>
							</Box>
							<Box>
								<Image src={loginIllustration} width={100} height={100} alt="logo" />
							</Box>
						</Stack>
					</Box>

					<Box sx={{ px: 4, py: 2 }}>
						<FoundItForm
							onSubmit={handleRegister}
							resolver={zodResolver(validationSchema)}
							defaultValues={defaultValues}>
							<Grid container spacing={2} my={1}>
								<Grid item xs={12} md={6}>
									<FoundItInput label="Name" fullWidth={true} name="name" />
								</Grid>
								<Grid item xs={12} md={6}>
									<FoundItInput label="Email" type="email" fullWidth={true} name="email" />
								</Grid>
								<Grid item xs={12} md={6}>
									<FoundItInput label="Password" type="password" fullWidth={true} name="password" />
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
								fullWidth={true}
								type="submit">
								{loading ? "Registering..." : "Register"}
							</Button>
							<Typography component="p" fontWeight={300}>
								Do you already have an account?{" "}
								<Link style={{ color: "#2AB29F" }} href="/login">
									Login
								</Link>
							</Typography>
						</FoundItForm>
					</Box>
				</Box>
			</Stack>
		</Container>
	);
};

export default RegisterPage;
