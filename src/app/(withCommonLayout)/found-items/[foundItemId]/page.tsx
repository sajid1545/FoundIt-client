"use client";

import { useGetSingleFoundItemQuery } from "@/redux/api/foundItems";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

type TProps = {
	params: {
		foundItemId: string;
	};
};

const SingleFoundItemPage = ({ params }: TProps) => {
	const { data, isLoading } = useGetSingleFoundItemQuery(params.foundItemId);
	console.log("🚀 ~ SingleFoundItemPage ~ data:", data);

	return (
		<Container sx={{ my: 15 }} maxWidth="xl">
			{isLoading ? (
				<Typography align="center" sx={{ m: 3 }} variant="h6">
					Loading...
				</Typography>
			) : (
				<>
					<Typography
						align="center"
						variant="h4"
						sx={{ color: "text.secondary", m: 3, fontWeight: "bold" }}>
						{data?.foundItemName} details
					</Typography>
					<Box sx={{ backgroundColor: "#f8f8f8", borderRadius: "10px", p: 5 }}>
						<Grid container spacing={3}>
							<Grid sm={4} xs={12}>
								<Typography variant="caption" sx={{ fontWeight: "bold" }}>
									Description
								</Typography>
								<Typography sx={{ fontWeight: "bold", fontSize: "18px", mb: 3 }}>
									{data?.description}
								</Typography>
							</Grid>
							<Grid sm={4} xs={12}>
								<Typography variant="caption" sx={{ fontWeight: "bold" }}>
									Location & Date
								</Typography>
								<Typography sx={{ fontWeight: "bold", fontSize: "18px", mb: 3 }}>
									{data?.location} - {dateFormatter(data?.foundDate)}{" "}
									{timeFormatter(data?.foundDate)}
								</Typography>
							</Grid>
							<Grid sm={4} xs={12}>
								<Typography variant="caption" sx={{ fontWeight: "bold" }}>
									Category
								</Typography>
								<Typography sx={{ fontWeight: "bold", fontSize: "18px", mb: 3 }}>
									{data?.category?.name}
								</Typography>
							</Grid>
							<Grid sm={4} xs={12}>
								<Typography variant="caption" sx={{ fontWeight: "bold" }}>
									Found User Name
								</Typography>
								<Typography sx={{ fontWeight: "bold", fontSize: "18px", mb: 3 }}>
									{data?.user?.name}
								</Typography>
							</Grid>
							<Grid sm={4} xs={12}>
								<Typography variant="caption" sx={{ fontWeight: "bold" }}>
									Found User Email
								</Typography>
								<Typography sx={{ fontWeight: "bold", fontSize: "18px", mb: 3 }}>
									{data?.user?.email}
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</>
			)}
		</Container>
	);
};

export default SingleFoundItemPage;
