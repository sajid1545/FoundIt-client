import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#4169E1",
			light: "#C8EDFD",
			dark: "#2E4BA1",
			"100": "#739bff",
		},
		secondary: {
			main: "#D3D3D3",
			light: "#f8f8f8",
			dark: "#B0B0B0",
		},
		text: {
			primary: "#203145",
			secondary: "#2AB29F",
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
		fontFamily: "Roboto Condensed",
	},
});

theme.shadows[1] = "0px 5px 22px lightgray";
