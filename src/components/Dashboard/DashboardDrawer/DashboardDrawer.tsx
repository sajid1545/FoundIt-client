"use client";

import { useGetMyProfileQuery } from "@/redux/api/myProfile";
import { logoutUser } from "@/services/actions/logoutUser";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import * as React from "react";
import Sidebar from "../Sidebar/Sidebar";

const drawerWidth = 240;

export default function DashboardDrawer({ children }: { children: React.ReactNode }) {
	const { data, isLoading } = useGetMyProfileQuery({});

	const router = useRouter();

	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [isClosing, setIsClosing] = React.useState(false);

	const handleDrawerClose = () => {
		setIsClosing(true);
		setMobileOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	};

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
	};

	const handleLogout = () => {
		logoutUser(router);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					background: "#F4F7FE",
					boxShadow: 0,
					borderBottom: "1px solid #ddd",
					py: 1,
				}}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}>
						<MenuIcon sx={{ color: "primary.main" }} />
					</IconButton>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
						}}>
						<Box>
							<Typography variant="body2" noWrap component="div" color="gray">
								Hello, {isLoading ? "Loading..." : data?.user?.name},
							</Typography>
							<Typography variant="h6" noWrap component="div" color="primary.main">
								Admin of, FoundIt !
							</Typography>
						</Box>

						<Box>
							<Button color="error" onClick={handleLogout}>
								Logout
							</Button>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onTransitionEnd={handleDrawerTransitionEnd}
					onClose={handleDrawerClose}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}>
					<Sidebar />
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}
					open>
					<Sidebar />
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
}
