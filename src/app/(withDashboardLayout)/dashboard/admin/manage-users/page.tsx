"use client";

import { useGetAllUsersQuery } from "@/redux/api/userApi";
import { Box, Button, Chip, Pagination, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import UpdateUserStatusModal from "./components/UpdateUserStatusModal";

const ManageUsersPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [id, setId] = useState("");

	const { data, error, isLoading } = useGetAllUsersQuery({});

	const users = data?.data || [];
	const meta = data?.meta || {};

	const query: Record<string, any> = {};

	const [page, setPage] = useState(meta?.page || 1);
	const [limit, setLimit] = useState(meta?.limit || 10);

	query["page"] = page;
	query["limit"] = limit;

	let pageCount: number;
	if (meta?.total) {
		pageCount = Math.ceil(meta?.total / limit);
	}

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handleUpdateUserStatus = (id: string) => {
		setIsModalOpen(true);
		setId(id);
	};

	const columns: GridColDef[] = [
		{ field: "name", headerName: "Name", flex: 1 },
		{ field: "email", headerName: "Email", flex: 1 },
		{
			field: "status",
			headerName: "Status",
			flex: 1,
			renderCell: ({ value }) => (
				// <Typography
				// 	sx={{ fontWeight: "bold", mt: 2 }}
				// 	color={value === "ACTIVE" ? "success.main" : "error.main"}>
				// 	{value}
				// </Typography>
				<Chip
					variant="outlined"
					sx={{ fontWeight: "bold" }}
					label={value}
					color={value === "ACTIVE" ? "success" : "error"}
				/>
			),
		},
		{ field: "role", headerName: "Role", flex: 1 },

		{
			field: "action",
			headerName: "Action",
			flex: 1,
			headerAlign: "center",
			align: "center",
			renderCell: ({ row }) => {
				return (
					<Box>
						<Button
							sx={{ backgroundColor: "primary.main" }}
							onClick={() => handleUpdateUserStatus(row.id)}>
							Update User Status
						</Button>
					</Box>
				);
			},
		},
	];

	return (
		<Box>
			<UpdateUserStatusModal open={isModalOpen} setOpen={setIsModalOpen} id={id} />

			{!isLoading ? (
				<Box my={2}>
					<DataGrid
						rows={users}
						columns={columns}
						slots={{
							footer: () => {
								return (
									<Box
										sx={{
											mb: 2,
											display: "flex",
											justifyContent: "center",
										}}>
										<Pagination
											color="primary"
											count={pageCount}
											page={page}
											onChange={handleChange}
										/>
									</Box>
								);
							},
						}}
					/>
				</Box>
			) : (
				<Typography align="center" sx={{ m: 3 }} variant="h6">
					Loading...
				</Typography>
			)}
		</Box>
	);
};

export default ManageUsersPage;
