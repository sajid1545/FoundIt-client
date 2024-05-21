"use client";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../assets/found-logo.jpeg";

function NavBar() {
	const [anchorElNav, setAnchorElNav] = useState<HTMLButtonElement | null>(null);
	const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement | null>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box>
			<AppBar
				position="static"
				sx={{
					backgroundColor: "transparent",
					color: "white",
					boxShadow: "none",
					p: 1,
				}}>
				<Box>
					<Toolbar
						disableGutters
						sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 5 }}>
						{/* LARGE DISPLAY LOGO */}
						<Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
							<Image src={logo} alt="logo" width={60} height={60} style={{ borderRadius: "50%" }} />
						</Box>

						<Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
							<Link href="/about">
								<Typography
									sx={{
										color: "secondary.main",
										fontWeight: "bold",
										"&:hover": {
											color: "white",
											transition: "all 0.5s ease",
										},
									}}
									textAlign="center">
									Home
								</Typography>
							</Link>
							<Link href="/about">
								<Typography
									sx={{
										color: "secondary.main",
										fontWeight: "bold",
										"&:hover": {
											color: "white",
											transition: "all 0.5s ease",
										},
									}}
									textAlign="center">
									About Us
								</Typography>
							</Link>
							<Link href="/about">
								<Typography
									sx={{
										color: "secondary.main",
										fontWeight: "bold",
										"&:hover": {
											color: "white",
											transition: "all 0.5s ease",
										},
									}}
									textAlign="center">
									My profile
								</Typography>
							</Link>
						</Box>

						{/* hamburger icon */}
						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}>
								<MenuIcon sx={{ color: "black" }} />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}>
								<MenuItem onClick={handleCloseNavMenu}>
									<Link href="/about">
										<Typography textAlign="center">About</Typography>
									</Link>
								</MenuItem>
							</Menu>
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<Button>Login</Button>
						</Box>
					</Toolbar>
				</Box>
			</AppBar>
		</Box>
	);
}
export default NavBar;
