import { SxProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

interface IDatePicker {
	name: string;
	size?: "small" | "medium";
	label?: string;
	required?: boolean;
	fullWidth?: boolean;
	sx?: SxProps;
}

const FoundItDatePicker = ({
	name,
	label,
	size = "small",
	required,
	fullWidth = true,
	sx,
}: IDatePicker) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={dayjs()}
			render={({ field: { value, onChange, ...field } }) => (
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DesktopDatePicker
						{...field}
						label={label}
						value={value ? dayjs(value) : null}
						onChange={(date) => onChange(date)}
						timezone="system"
						slotProps={{
							textField: {
								required: required,
								size: size,
								sx: {
									...sx,
								},
								variant: "outlined",
								fullWidth: fullWidth,
							},
						}}
					/>
				</LocalizationProvider>
			)}
		/>
	);
};

export default FoundItDatePicker;
