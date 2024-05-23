import { UserRole } from "@/types";
import { drawerItems } from "@/utils/drawerItems";
import { getUserInfo } from "@/utils/localStorage";
import { Box, Stack, Typography } from "@mui/material";
import List from "@mui/material/List";
import Link from "next/link";
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
	const [userRole, setUserRole] = useState("");

	useEffect(() => {
		const { role } = getUserInfo() as any;
		setUserRole(role);
	}, []);

	return (
		<Box>
			<Stack
				sx={{
					py: 1,
					mt: 1,
				}}
				direction={"row"}
				gap={1}
				alignItems={"center"}
				component={Link}
				href="/"
				justifyContent={"center"}>
				<Typography
					variant="h5"
					noWrap
					sx={{
						mr: 2,
						display: { xs: "none", md: "flex" },
						fontFamily: "monospace",
						fontWeight: 900,
						letterSpacing: ".3rem",
						color: "primary.main",
						textDecoration: "none",
					}}>
					FoundIt
				</Typography>
			</Stack>
			<List>
				{drawerItems(userRole as UserRole).map((item: any, index: number) => (
					<SidebarItem key={index} item={item} />
				))}
			</List>
		</Box>
	);
};

export default Sidebar;
