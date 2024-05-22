import { MenuItem, SxProps, TextField, styled } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const CustomBorderSelectField = styled(TextField)`
	& label.Mui-focused {
		color: #2ab29f;
	}
	& .MuiOutlinedInput-root {
		&.Mui-focused fieldset {
			border-color: #2ab29f;
		}
	}
`;

interface ITextField {
	name: string;
	size?: "small" | "medium";
	placeholder?: string;
	label?: string;
	required?: boolean;
	fullWidth?: boolean;
	sx?: SxProps;
	items: string[];
}

const FoundItSelectField = ({
	items,
	name,
	label,
	size = "small",
	required,
	fullWidth = true,
	sx,
}: ITextField) => {
	const { control, formState } = useFormContext();
	const isError = formState.errors[name] !== undefined;

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<TextField
					{...field}
					sx={{
						...sx,
					}}
					size={size}
					select
					label={label}
					required={required}
					fullWidth={fullWidth}
					error={isError}
					helperText={isError ? (formState.errors[name]?.message as string) : ""}>
					{items?.map((name) => (
						<MenuItem key={name} value={name}>
							{name}
						</MenuItem>
					))}
				</TextField>
			)}
		/>
	);
};

export default FoundItSelectField;
