import FoundItAlert from "@/components/shared/FoundItModal/FoundItAlert/FoundItAlert";
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
			title="Password and Confirm Password do not match. Please Try again with correct password "
			handleCancel={handleCancel}
		/>
	);
};

export default PasswordConfirmationAlert;
