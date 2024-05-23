import FoundItForm from "@/components/Forms/FoundItForm";
import FoundItModal from "@/components/shared/FoundItModal/FoundItModal";
import { useUpdateUserStatusMutation } from "@/redux/api/userApi";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	data?: any;
	loading?: boolean;
	id?: string;
};
const UpdateUserStatusModal = ({ open, setOpen, loading, id }: TProps) => {
	const formContext = useFormContext();

	const [updateUserStatus, { isLoading }] = useUpdateUserStatusMutation();
	const handleSubmit = async (values: FieldValues) => {
		try {
			const res = await updateUserStatus({ id: id, status: values }).unwrap();
			if (res?.id) {
				toast.success("Status updated successfully");
				setOpen(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<FoundItModal open={open} setOpen={setOpen} title="Update User Status">
			<FoundItForm onSubmit={handleSubmit}>
				<Grid container spacing={2} sx={{ width: "300px" }}>
					<Grid item xs={12}>
						<Controller
							control={formContext?.control}
							name={"status"}
							render={({ field }) => (
								<TextField
									{...field}
									size={"small"}
									select
									label={"Status"}
									required={true}
									fullWidth={true}>
									<MenuItem value={"ACTIVE"}>ACTIVATE</MenuItem>
									<MenuItem value={"INACTIVE"}>DEACTIVATE</MenuItem>
								</TextField>
							)}
						/>
					</Grid>
				</Grid>
				<Button disabled={isLoading} variant="contained" sx={{ mt: 2 }} type="submit" fullWidth>
					{isLoading ? "Updating..." : "Update"}
				</Button>
			</FoundItForm>
		</FoundItModal>
	);
};

export default UpdateUserStatusModal;
