"use client";

import FoundItDatePicker from "@/components/Forms/FoundItDatePicker";
import FoundItForm from "@/components/Forms/FoundItForm";
import FoundItInput from "@/components/Forms/FoundItInput";
import { CustomBorderSelectField } from "@/components/Forms/FoundItSelect";
import { useGetCategoriesQuery } from "@/redux/api/categoriesApi";
import { useCreateFoundItemMutation } from "@/redux/api/foundItems";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, MenuItem, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z.object({
	categoryId: z.string().min(1, { message: "Category is required" }),
	foundItemName: z.string().min(1, { message: "Item Name is required" }),
	description: z.string().min(1, { message: "Description is required" }),
	location: z.string().min(1, { message: "Location is required" }),
	foundDate: z.unknown().optional(),
	email: z.string().optional(),
	name: z.string().optional(),
	phone: z.string().optional(),
});

const defaultValues = {
	categoryId: "",
	foundItemName: "",
	description: "",
	foundDate: "",
	email: "",
	name: "",
	phone: "",

	location: "",
};

const SubmitFoundItemsPage = () => {
	const router = useRouter();
	const formContext = useFormContext();

	const { data: categories, isLoading } = useGetCategoriesQuery({});

	const [createFoundItem, { isLoading: isLoadingCreateFoundItem }] = useCreateFoundItemMutation();

	const handleSubmit = async (values: FieldValues) => {
		values.foundDate = dayjs(values.lostDate).toISOString();

		try {
			const res = await createFoundItem(values).unwrap();
			if (res?.id) {
				toast.success("Item created successfully");
				router.push("/my-found-items");
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	return (
		<Container sx={{ my: 15 }} maxWidth="xl">
			<Typography variant="h6" sx={{ color: "text.secondary", fontWeight: "bold" }}>
				Report Found Items
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
								name={"categoryId"}
								render={({ field }) => (
									<CustomBorderSelectField
										{...field}
										size={"small"}
										select
										label="Category"
										disabled={isLoading}
										required={true}
										fullWidth={true}>
										{categories?.map((item: any) => (
											<MenuItem key={item.id} value={item.id}>
												{item.name}
											</MenuItem>
										))}
									</CustomBorderSelectField>
								)}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<FoundItInput label="Lost Item name" fullWidth={true} name="foundItemName" />
						</Grid>
						<Grid item xs={12} md={6}>
							<FoundItInput
								label="Description"
								fullWidth={true}
								name="description"
								placeholder="Detailed description including brand, color, and distinguishing marks."
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<FoundItInput label="Location" fullWidth={true} name="location" />
						</Grid>

						<Grid item xs={12} md={6}>
							<FoundItDatePicker label="Found Date" name="foundDate" required />
						</Grid>
					</Grid>

					<Typography variant="h6" sx={{ color: "text.secondary", fontWeight: "bold", my: 3 }}>
						Contact Information
					</Typography>

					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<FoundItInput label="Email" fullWidth={true} name="email" />
						</Grid>
						<Grid item xs={12} md={6}>
							<FoundItInput label="Name" fullWidth={true} name="name" />
						</Grid>
						<Grid item xs={12} md={6}>
							<FoundItInput label="Phone Number" fullWidth={true} name="phone" />
						</Grid>
					</Grid>

					<Button
						disabled={isLoadingCreateFoundItem}
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
						{isLoadingCreateFoundItem ? "Submitting..." : "Report"}
					</Button>
				</FoundItForm>
			</Box>
		</Container>
	);
};

export default SubmitFoundItemsPage;
