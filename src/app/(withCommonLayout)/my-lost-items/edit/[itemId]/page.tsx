"use client";

import FoundItDatePicker from "@/components/Forms/FoundItDatePicker";
import FoundItForm from "@/components/Forms/FoundItForm";
import FoundItInput from "@/components/Forms/FoundItInput";
import { CustomBorderSelectField } from "@/components/Forms/FoundItSelect";
import { useGetCategoriesQuery } from "@/redux/api/categoriesApi";
import { useGetSingleLostItemQuery, useUpdateLostItemMutation } from "@/redux/api/lostItemsApi";
import { Box, Container, Typography } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TProps = {
	params: { itemId: string };
};

const validationSchema = z.object({
	categoryId: z.string().min(1, { message: "Category is required" }),
	lostItemName: z.string().min(1, { message: "Item Name is required" }),
	description: z.string().min(1, { message: "Description is required" }),
	location: z.string().min(1, { message: "Location is required" }),
	lostDate: z.unknown().optional(),
	email: z.string().optional(),
	name: z.string().optional(),
	phone: z.string().optional(),
});

const LostItemEditPage = ({ params }: TProps) => {
	const id = params.itemId;

	const { data, isLoading: itemsLoading, refetch } = useGetSingleLostItemQuery(id);

	const defaultValues = {
		categoryId: data?.categoryId || "",
		lostItemName: data?.lostItemName || "",
		description: data?.description || "",
		lostDate: data?.lostDate || "",
		email: data?.email || "",
		name: data?.name || "",
		phone: data?.phone || "",

		location: data?.location || "",
	};

	const router = useRouter();
	const formContext = useFormContext();

	const { data: categories, isLoading } = useGetCategoriesQuery({});

	const [updateLostItem, { isLoading: isLoadingUpdateLostItem }] = useUpdateLostItemMutation();

	const handleSubmit = async (values: FieldValues) => {
		values.lostDate = dayjs(values.lostDate).toISOString();

		try {
			const res = await updateLostItem({ id: id, data: values }).unwrap();
			if (res?.id) {
				toast.success("Item updated successfully");

				router.push("/my-lost-items");
			}

			refetch();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container sx={{ my: 15 }} maxWidth="xl">
			{itemsLoading ? (
				<Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
					Loading...
				</Typography>
			) : (
				<>
					<Typography align="center" variant="h4" sx={{ fontWeight: "bold", my: 4 }}>
						Edit {data?.lostItemName}
					</Typography>

					<Box
						sx={{
							width: { xs: "100%", md: "80%" },
							mx: "auto",
							boxShadow: 1,
							p: 3,
							mb: 3,
							borderRadius: 3,
						}}>
						<FoundItForm
							onSubmit={handleSubmit}
							resolver={zodResolver(validationSchema)}
							defaultValues={defaultValues}>
							<Typography variant="h6" sx={{ color: "text.secondary", fontWeight: "bold", my: 1 }}>
								Item Information
							</Typography>
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
									<FoundItInput label="Lost Item name" fullWidth={true} name="lostItemName" />
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
									<FoundItDatePicker label="Lost Date" name="lostDate" />
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
								disabled={isLoadingUpdateLostItem}
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
								{isLoadingUpdateLostItem ? "Submitting..." : "Update Item"}
							</Button>
						</FoundItForm>
					</Box>
				</>
			)}
		</Container>
	);
};

export default LostItemEditPage;
