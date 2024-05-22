import FoundItDatePicker from "@/components/Forms/FoundItDatePicker";
import FoundItForm from "@/components/Forms/FoundItForm";
import FoundItInput from "@/components/Forms/FoundItInput";
import { CustomBorderSelectField } from "@/components/Forms/FoundItSelect";
import FoundItModal from "@/components/shared/FoundItModal/FoundItModal";
import { useGetCategoriesQuery } from "@/redux/api/categoriesApi";
import { useGetSingleFoundItemQuery, useUpdateFoundItemMutation } from "@/redux/api/foundItems";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, MenuItem, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	data?: any;
	loading?: boolean;
	id?: string;
};

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

const EditFoundItemsModal = ({ open, setOpen, loading, id }: TProps) => {
	const { data, isLoading: itemsLoading } = useGetSingleFoundItemQuery(id, {
		skip: !id, // Skip the query if id is not defined
	});

	const defaultValues = {
		categoryId: data?.categoryId || "",
		foundItemName: data?.foundItemName || "",
		description: data?.description || "",
		foundDate: data?.foundDate || "",
		email: data?.email || "",
		name: data?.name || "",
		phone: data?.phone || "",
		location: data?.location || "",
	};
	const router = useRouter();
	const formContext = useFormContext();

	const { data: categories, isLoading } = useGetCategoriesQuery({});

	const [updateFoundItem, { isLoading: isLoadingUpdateFoundItem }] = useUpdateFoundItemMutation();

	const handleSubmit = async (values: FieldValues) => {
		values.foundDate = dayjs(values.lostDate).toISOString();

		try {
			const res = await updateFoundItem({ id: id, data: values }).unwrap();
			if (res?.id) {
				toast.success("Item updated successfully");
				setOpen(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<FoundItModal open={open} setOpen={setOpen} title="Edit Found Item">
			{itemsLoading ? (
				<Typography align="center" sx={{ m: 3 }} variant="h6">
					Loading...
				</Typography>
			) : (
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
							<FoundItInput label="Found Item name" fullWidth={true} name="foundItemName" />
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
							<FoundItDatePicker label="Found Date" name="foundDate" />
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
						disabled={isLoadingUpdateFoundItem}
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
						{isLoadingUpdateFoundItem ? "Submitting..." : "Update"}
					</Button>
				</FoundItForm>
			)}
		</FoundItModal>
	);
};

export default EditFoundItemsModal;
