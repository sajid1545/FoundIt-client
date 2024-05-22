import FoundItForm from "@/components/Forms/FoundItForm";
import FoundItSelectField from "@/components/Forms/FoundItSelect";
import FoundItModal from "@/components/shared/FoundItModal/FoundItModal";
import { useUpdateFoundItemClaimStatusMutation } from "@/redux/api/claimItems";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	data?: any;
	loading?: boolean;
	id?: string;
};
const UpdateStatusModal = ({ open, setOpen, loading, id }: TProps) => {
	const [updateStatus, { isLoading }] = useUpdateFoundItemClaimStatusMutation();
	const handleSubmit = async (values: FieldValues) => {
		try {
			const res = await updateStatus({ id: id, status: values }).unwrap();
			if (res?.id) {
				toast.success("Status updated successfully");
				setOpen(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<FoundItModal open={open} setOpen={setOpen} title="Update Status">
			<FoundItForm onSubmit={handleSubmit}>
				<Grid container spacing={2} sx={{ width: "300px" }}>
					<Grid item xs={12}>
						<FoundItSelectField
							name="status"
							label="Status"
							items={["APPROVED", "REJECTED"]}
							required
							fullWidth
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

export default UpdateStatusModal;
