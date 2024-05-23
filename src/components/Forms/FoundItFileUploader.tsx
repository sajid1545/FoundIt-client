import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import { SxProps } from "@mui/material/styles";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
	name: string;
	label?: string;
	sx?: SxProps;
};

export default function FoundItFileUploader({ name, label, sx }: TProps) {
	const { control } = useFormContext();
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value, ...field } }) => (
				<Button
					component="label"
					role={undefined}
					variant="contained"
					tabIndex={-1}
					startIcon={<CloudUploadIcon />}>
					{label || "Upload file"}

					<Input
						{...field}
						type={name}
						value={value?.filename}
						onChange={(e) => onChange((e?.target as HTMLInputElement).files?.[0])}
						sx={{ display: "none" }}
					/>
				</Button>
			)}
		/>
	);
}
