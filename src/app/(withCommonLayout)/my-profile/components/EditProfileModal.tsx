import FoundItForm from "@/components/Forms/FoundItForm";
import FoundItInput from "@/components/Forms/FoundItInput";
import FoundItModal from "@/components/shared/FoundItModal/FoundItModal";
import { useUpdateMyProfileMutation } from "@/redux/api/myProfile";
import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	data: any;
	loading: boolean;
};

const EditProfileModal = ({ open, setOpen, data, loading }: TProps) => {
	const router = useRouter();

	const defaultValues = {
		email: data?.user?.email || "",
		age: data?.age || "",
		bio: data?.bio || "",
	};

	const [updateMyProfile, { isLoading }] = useUpdateMyProfileMutation({});

	const handleSubmit = async (values: FieldValues) => {
		values.age = Number(values.age);
		try {
			const res = await updateMyProfile(values).unwrap();
			if (res?.id) {
				toast.success("Profile updated successfully");
				setOpen(false);
				// logoutUser(router);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{loading ? (
				<Typography align="center" sx={{ m: 3 }} variant="h6">
					Loading...
				</Typography>
			) : (
				<FoundItModal open={open} setOpen={setOpen} title="Edit Profile">
					<FoundItForm onSubmit={handleSubmit} defaultValues={defaultValues}>
						<Grid sx={{ my: 1 }} container spacing={2}>
							<Grid item xs={12} md={6}>
								<FoundItInput label="Email" name="email" fullWidth={true} />
							</Grid>
							<Grid item xs={12} md={6}>
								<FoundItInput label="Age" name="age" fullWidth={true} />
							</Grid>
							<Grid item xs={12} md={6}>
								<FoundItInput label="Bio" name="bio" fullWidth={true} />
							</Grid>
						</Grid>

						<LoadingButton
							sx={{ mt: 2, display: "block", mx: "auto" }}
							type="submit"
							disabled={isLoading}
							color="primary"
							loading={isLoading}
							variant="outlined">
							Update Profile
						</LoadingButton>
					</FoundItForm>
				</FoundItModal>
			)}
		</>
	);
};

export default EditProfileModal;
