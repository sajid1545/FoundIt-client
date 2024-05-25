"use client";

// icons
import totalActiveUserIcon from "@/assets/icons/activeUsers.png";
import approvedClaims from "@/assets/icons/approvedClaimed.png";
import categoriesIcon from "@/assets/icons/categoriesIcon.png";
import claimsIcon from "@/assets/icons/claimedIcon.png";
import totalFoundItemsIcon from "@/assets/icons/itemsIcon.png";
import lostFoundItemIcon from "@/assets/icons/lostItemFound.png";
import lostItemsIcon from "@/assets/icons/lostItems.png";
import totalUsersIcon from "@/assets/icons/totalUserIcon.png";

import { useGetAllMetaDataQuery } from "@/redux/api/metaApi";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { DashboardCard } from "./components/DashboardCard";

const AdminDashboard = () => {
	const { data, isLoading } = useGetAllMetaDataQuery({});

	return (
		<Container sx={{ mt: 4 }}>
			{isLoading ? (
				<Typography align="center" sx={{ m: 3 }} variant="h6">
					Loading...
				</Typography>
			) : (
				<Grid container spacing={3}>
					<Grid lg={3} sm={6} xs={12}>
						<DashboardCard
							sx={{ height: "100%" }}
							value={data?.totalUsersCount}
							icon={totalUsersIcon}
							title="Total Users"
							iconColor="#FFDAB9"
						/>
					</Grid>
					<Grid lg={3} sm={6} xs={12}>
						<DashboardCard
							sx={{ height: "100%" }}
							value={data?.totalActiveUsersCount}
							icon={totalActiveUserIcon}
							title="Total Active Users"
							iconColor="#f8f8f8"
						/>
					</Grid>

					<Grid lg={3} sm={6} xs={12}>
						<DashboardCard
							sx={{ height: "100%" }}
							value={data?.totalCategoriesCount}
							icon={categoriesIcon}
							title="Total Item Categories "
							iconColor="#F0FFF0"
						/>
					</Grid>
					<Grid lg={3} sm={6} xs={12}>
						<DashboardCard
							sx={{ height: "100%" }}
							value={data?.foundItemsCount}
							icon={totalFoundItemsIcon}
							title="Total Found Items"
							iconColor="#F0FFF0"
						/>
					</Grid>
					<Grid lg={3} sm={6} xs={12}>
						<DashboardCard
							sx={{ height: "100%" }}
							value={data?.lostItemsCount}
							icon={lostItemsIcon}
							title="Total Lost Items"
							iconColor="#C8EDFD"
						/>
					</Grid>
					<Grid lg={3} sm={6} xs={12}>
						<DashboardCard
							sx={{ height: "100%" }}
							value={data?.foundLostItemsCount}
							icon={lostFoundItemIcon}
							title="Lost Item Found"
							iconColor="#800000"
						/>
					</Grid>
					<Grid lg={3} sm={6} xs={12}>
						<DashboardCard
							sx={{ height: "100%" }}
							value={data?.claimsCount}
							icon={claimsIcon}
							title="Total Claimed Items"
							iconColor="#FFDAB9"
						/>
					</Grid>
					<Grid lg={3} sm={6} xs={12}>
						<DashboardCard
							sx={{ height: "100%" }}
							value={data?.totalApprovedClaims}
							icon={approvedClaims}
							title="Claimed Approved Items"
							iconColor="#FFDAB9"
						/>
					</Grid>
				</Grid>
			)}
		</Container>
	);
};

export default AdminDashboard;
