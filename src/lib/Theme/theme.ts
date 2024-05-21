import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#4169E1",
			light: "#D6EBFF",
		},
		secondary: {
			main: "#D3D3D3",
			light: "#f8f8f8",
		},
	},

	components: {
		MuiButton: {
			defaultProps: {
				variant: "contained",
			},
			styleOverrides: {
				root: {
					padding: "8px 24px",
				},
			},
		},
		MuiContainer: {
			defaultProps: {
				maxWidth: "lg",
			},
		},
	},
	typography: {
		body1: {
			color: "#0B1134CC",
		},
	},
});

theme.shadows[1] = "0px 5px 22px lightgray";
