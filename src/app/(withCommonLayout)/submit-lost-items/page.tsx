"use client";

import FoundItForm from "@/components/Forms/FoundItForm";
import FoundItInput from "@/components/Forms/FoundItInput";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";

const SubmitLostItemsPage = () => {
	const handleSubmit = async (values: FieldValues) => {
		console.log(values);
	};

	return (
		<Container sx={{ my: 15 }} maxWidth="xl">
			<Typography
				align="center"
				variant="h4"
				sx={{ color: "text.secondary", m: 3, fontWeight: "bold" }}>
				Submit Lost Items
			</Typography>

			<Box>
				<FoundItForm onSubmit={handleSubmit}>
					<Grid container spacing={2} my={1}>
						<Grid item xs={12} md={6}>
							<FoundItInput label="Email" type="email" fullWidth={true} name="email" />
						</Grid>
						<Grid item xs={12} md={6}>
							<FoundItInput label="Email" type="email" fullWidth={true} name="email" />
						</Grid>
					</Grid>
					<Button
						sx={{
							margin: "20px 0px",
							display: "block",
							mx: "auto",
							backgroundColor: "#2AB29F",
							color: "white",
							"&:hover": {
								backgroundColor: "#2AB29F",
								color: "white",
							},
						}}
						type="submit">
						Report
					</Button>
				</FoundItForm>
			</Box>
		</Container>
	);
};

export default SubmitLostItemsPage;
