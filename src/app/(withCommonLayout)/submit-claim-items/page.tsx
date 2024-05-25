"use client";

import FoundItDatePicker from "@/components/Forms/FoundItDatePicker";
import FoundItForm from "@/components/Forms/FoundItForm";
import FoundItInput from "@/components/Forms/FoundItInput";
import { CustomBorderSelectField } from "@/components/Forms/FoundItSelect";
import { useCreateClaimItemMutation } from "@/redux/api/claimItems";
import { useGetAllFoundItemsQuery } from "@/redux/api/foundItems";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, MenuItem, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z.object({
	foundItemId: z.string().min(1, { message: "Found Item ID is required" }),
	distinguishingFeatures: z.string().min(1, { message: "Item Name is required" }),
	lostDate: z.unknown().optional(),
});

const defaultValues = {
	foundItemId: "",
	distinguishingFeatures: "",
	lostDate: "",
};

const SubmitClaimItemsPage = () => {
	const router = useRouter();

	const formContext = useFormContext();

	const { data, isLoading } = useGetAllFoundItemsQuery({});

	const foundItems = data?.foundItems;

	const [createClaim, { isLoading: isLoadingCreateClaim }] = useCreateClaimItemMutation();

	const handleSubmit = async (values: FieldValues) => {
		values.lostDate = dayjs(values.lostDate).toISOString();

		try {
			const res = await createClaim(values).unwrap();
			if (res?.id) {
				toast.success(" Item  claimed successfully");

				router.push("/my-claim-requests");
			}
		} catch (error) {
			console.log(error);

			toast.error("Something went wrong");
		}
	};

	return (
		<Container sx={{ my: 15 }} maxWidth="xl">
			<Typography variant="h6" sx={{ color: "text.secondary", fontWeight: "bold" }}>
				Submit Claim Items
			</Typography>

			<Box>
				<FoundItForm
					onSubmit={handleSubmit}
					resolver={zodResolver(validationSchema)}
					defaultValues={defaultValues}>
					<Grid container spacing={2} my={1}>
						<Grid item xs={12} md={6}>
							<Controller
								control={formContext?.control}
								name={"foundItemId"}
								render={({ field }) => (
									<CustomBorderSelectField
										{...field}
										size={"small"}
										select
										label="Found Items"
										disabled={isLoading}
										required={true}
										fullWidth={true}>
										{foundItems?.map((item: any) => (
											<MenuItem key={item.id} value={item.id}>
												{item.foundItemName} - {item.description} - {item.location}
											</MenuItem>
										))}
									</CustomBorderSelectField>
								)}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<FoundItInput
								label="Distinguishing Features"
								fullWidth={true}
								name="distinguishingFeatures"
								placeholder="Enter the distinguishing features of the lost item so that we can identify it"
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<FoundItDatePicker label="Lost Date" name="lostDate" required />
						</Grid>
					</Grid>

					<Button
						disabled={isLoadingCreateClaim}
						sx={{
							margin: "20px 0px",
							display: "block",
							mx: "auto",
							backgroundColor: "#2AB29F",
							color: "white",
							"&:hover": {
								backgroundColor: "#2AB29F",
								color: "white",
							},
						}}
						type="submit">
						{isLoadingCreateClaim ? "Submitting..." : "Claim Item"}
					</Button>
				</FoundItForm>
			</Box>
		</Container>
	);
};

export default SubmitClaimItemsPage;
