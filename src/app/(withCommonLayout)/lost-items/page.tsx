"use client";

import { CustomBorderTextField } from "@/components/Forms/FoundItInput";
import { CustomBorderSelectField } from "@/components/Forms/FoundItSelect";
import { useGetCategoriesQuery } from "@/redux/api/categoriesApi";
import { useGetAllLostItemsQuery } from "@/redux/api/lostItemsApi";
import { useDebounced } from "@/redux/hooks";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { Box, Button, Container, MenuItem, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { useState } from "react";

const LostItems = () => {
	const query: Record<string, any> = {};

	const [searchTerm, setSearchTerm] = useState<string>("");
	const [category, setCategory] = useState<string>("");

	const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });

	if (!!debouncedTerm) {
		query["searchTerm"] = searchTerm;
	}

	query["category"] = category;

	const { data, isLoading, refetch } = useGetAllLostItemsQuery({ ...query });
	const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery({});

	const lostItems = data?.lostItems || [];
	const meta = data?.meta || {};

	return (
		<Container sx={{ my: 15 }} maxWidth="xl">
			<Stack
				direction={{ xs: "column", md: "row" }}
				gap={5}
				mb={5}
				justifyContent="space-between"
				alignItems={"center"}>
				<Typography
					align="center"
					variant="h3"
					sx={{ color: "text.secondary", m: 3, fontWeight: "bold" }}>
					All Lost Items
				</Typography>

				<Stack
					direction={{ xs: "column", md: "row" }}
					gap={2}
					sx={{ width: { xs: "100%", md: "500px" } }}>
					<CustomBorderSelectField
						size={"small"}
						select
						label="Filter by Category"
						disabled={categoriesLoading}
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						fullWidth={true}>
						{categories?.map((item: any) => (
							<MenuItem key={item.id} value={item.name}>
								{item.name}
							</MenuItem>
						))}
					</CustomBorderSelectField>

					<CustomBorderTextField
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search Lost Items"
						size="small"
						value={searchTerm}
						fullWidth
						variant="outlined"
						label="Search Lost Items"
					/>
				</Stack>
			</Stack>

			{lostItems?.length === 0 && !isLoading && (
				<Typography align="center" sx={{ m: 3 }} variant="h6">
					No Items Found
				</Typography>
			)}

			{isLoading ? (
				<Typography align="center" sx={{ m: 3 }} variant="h6">
					Loading...
				</Typography>
			) : (
				<Box>
					<Grid container spacing={3}>
						{lostItems?.map((item: any) => (
							<Grid key={item.id} lg={4} sm={6} xs={12}>
								<Card
									sx={{
										borderRadius: "12px",
										textAlign: "center",
									}}>
									<CardContent sx={{ p: 3 }}>
										<Stack spacing={1}>
											<Typography color="primary.main" sx={{ fontWeight: "bold" }} variant="h5">
												{item.lostItemName}
											</Typography>
											<Typography variant="subtitle1" fontWeight={600} mt={2}>
												{item.description}
											</Typography>
											<Typography variant="subtitle1" fontWeight={600} mt={2}>
												{item.location} - {dateFormatter(item.lostDate)}{" "}
												{timeFormatter(item.lostDate)}
											</Typography>

											<Link href={`/lost-items/${item.id}`}>
												<Button
													sx={{
														fontWeight: "bold",
														mt: "20px",
														backgroundColor: "text.secondary",
														"&:hover": {
															backgroundColor: "text.secondary",
														},
													}}>
													View Details
												</Button>
											</Link>
										</Stack>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>
			)}
		</Container>
	);
};

export default LostItems;
