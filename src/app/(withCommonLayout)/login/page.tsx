"use client";

import loginIllustration from "@/assets/icons/register.png";
import FoundItForm from "@/components/Forms/FoundItForm";
import FoundItInput from "@/components/Forms/FoundItInput";
import { authKey } from "@/constants/auth";
import { userLogin } from "@/services/actions/userLogin";
import { setToLocalStorage } from "@/utils/localStorage";
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
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(1, { message: "Password is required" }),
	confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
});

const defaultValues = {
	email: "",
	password: "",
	confirmPassword: "",
};

const LoginPage = () => {
	const router = useRouter();

	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const [loading, setLoading] = useState<boolean>(false);

	// const [error, setError] = useState<string>("");

	const handleLogin = async (values: FieldValues) => {
		const { confirmPassword, ...rest } = values;

		if (rest.password !== confirmPassword) {
			setIsDialogOpen(true);
		}

		setLoading(true);
		if (rest.password === confirmPassword) {
			try {
				const res = await userLogin(rest);
				if (res?.data?.token) {
					setToLocalStorage(authKey, res?.data?.token);
					router.push("/");
					router.refresh();
					toast.success("Logged in successfully");
					setLoading(false);
				} else {
					// setError("Invalid credentials");
					toast.error("Invalid credentials");
					setLoading(false);
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
									Login with FoundIt
								</Typography>
							</Box>
							<Box>
								<Image src={loginIllustration} width={100} height={100} alt="logo" />
							</Box>
						</Stack>
					</Box>

					<Box sx={{ px: 4, py: 2 }}>
						<FoundItForm
							onSubmit={handleLogin}
							resolver={zodResolver(validationSchema)}
							defaultValues={defaultValues}>
							<Grid container spacing={2} my={1}>
								<Grid item xs={12}>
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
								disabled={loading}
								fullWidth={true}
								type="submit">
								{loading ? "Loading..." : "Login"}
							</Button>
							<Typography component="p" fontWeight={300}>
								Don&apos;t have an account?{" "}
								<Link style={{ color: "#2AB29F" }} href="/register">
									Create an account
								</Link>
							</Typography>
						</FoundItForm>
					</Box>
				</Box>
			</Stack>
		</Container>
	);
};

export default LoginPage;
