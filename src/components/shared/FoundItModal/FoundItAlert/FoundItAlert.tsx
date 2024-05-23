import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import * as React from "react";
type TProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children?: React.ReactNode;
	title: string;
	handleConfirm?: any;
	handleCancel?: any;
	text?: string;
	loading?: boolean;
};

export default function FoundItAlert({
	open,
	setOpen,
	children,
	title,
	handleConfirm,
	handleCancel,
	text,
	loading,
}: TProps) {
	return (
		<React.Fragment>
			<Dialog
				open={open}
				onClose={handleCancel}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>

				<DialogContent>{children}</DialogContent>

				<DialogActions>
					<Button onClick={handleCancel} autoFocus color="primary">
						{"Cancel"}
					</Button>
					{handleConfirm && (
						<Button onClick={handleConfirm} autoFocus color="error">
							{loading ? "Loading..." : "Ok"}
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
