import FoundItAlert from "@/components/shared/FoundItModal/FoundItAlert/FoundItAlert";
import { Typography } from "@mui/material";
import React from "react";

type TProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleCancel: () => void;
};

const PasswordConfirmationAlert = ({ open, setOpen, handleCancel }: TProps) => {
	return (
		<FoundItAlert
			open={open}
			setOpen={setOpen}
			title="Password mismatch error ⚠️⚠️⚠️⚠️ "
			handleCancel={handleCancel}>
			<Typography variant="body2" color="error" align="center">
				Password and Confirm Password do not match. Please Try again with correct password
			</Typography>
		</FoundItAlert>
	);
};

export default PasswordConfirmationAlert;
