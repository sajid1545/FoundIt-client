import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import * as React from "react";
type TProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children?: React.ReactNode;
	title: string;
	handleConfirm?: () => void;
	handleCancel: () => void;
};

export default function FoundItAlert({
	open,
	setOpen,
	children,
	title,
	handleConfirm,
	handleCancel,
}: TProps) {
	return (
		<React.Fragment>
			<Dialog
				open={open}
				onClose={handleCancel}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>

				<DialogActions>
					<Button onClick={handleCancel} autoFocus color="error">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
