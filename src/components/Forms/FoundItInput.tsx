import { SxProps, TextField, styled } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const CustomBorderTextField = styled(TextField)`
	& label.Mui-focused {
		color: #2ab29f;
	}
	& .MuiOutlinedInput-root {
		&.Mui-focused fieldset {
			border-color: #2ab29f;
		}
	}
`;

type TInputProps = {
	name: string;
	label?: string;
	type?: string;
	size?: "small" | "medium";
	fullWidth?: boolean;
	sx?: SxProps;
	placeholder?: string;
	required?: boolean;
};

const FoundItInput = ({
	name,
	label,
	type = "text",
	size = "small",
	fullWidth,
	sx,
	required,
	placeholder,
}: TInputProps) => {
	const { control } = useFormContext();
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<CustomBorderTextField
					{...field}
					sx={{ ...sx }}
					label={label}
					type={type}
					variant="outlined"
					size={size}
					fullWidth={fullWidth}
					placeholder={placeholder ? placeholder : label}
					required={required}
					error={!!error?.message}
					helperText={error?.message}
				/>
			)}
		/>
	);
};

export default FoundItInput;
