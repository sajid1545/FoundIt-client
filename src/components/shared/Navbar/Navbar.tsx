"use client";

import { getUserInfo } from "@/utils/localStorage";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../../../assets/found-logo.jpeg";

function NavBar() {
	const AuthButton = dynamic(() => import("@/components/UI/AuthButton/AuthButton"), { ssr: false });
	const AuthLinks = dynamic(() => import("@/components/UI/AuthLinks/AuthLinks"), { ssr: false });
	const AuthMenuItems = dynamic(() => import("@/components/UI/AuthMenuItems/AuthMenuItems"), {
		ssr: false,
	});
	const router = useRouter();
	const [anchorElNav, setAnchorElNav] = useState<HTMLButtonElement | null>(null);
	const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement | null>(null);

	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		setUser(getUserInfo());
	}, []);

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
				position="absolute"
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
						<Box sx={{ mr: 2, mx: 4, display: { xs: "none", md: "flex" } }}>
							<Link href={"/"}>
								<Image
									src={logo}
									alt="logo"
									width={60}
									height={60}
									style={{ borderRadius: "50%" }}
								/>
							</Link>
						</Box>

						<Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
							<Link href="/">
								<Typography
									sx={{
										color: "primary.main",
										fontWeight: "bold",
										"&:hover": {
											color: "#739bff",
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
										color: "primary.main",
										fontWeight: "bold",
										"&:hover": {
											color: "#739bff",
											transition: "all 0.5s ease",
										},
									}}
									textAlign="center">
									About Us
								</Typography>
							</Link>
							<Link href="/found-items">
								<Typography
									sx={{
										color: "primary.main",
										fontWeight: "bold",
										"&:hover": {
											color: "#739bff",
											transition: "all 0.5s ease",
										},
									}}
									textAlign="center">
									Found Items
								</Typography>
							</Link>

							<AuthLinks />
						</Box>

						{/* hamburger icon */}
						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}>
								<MenuIcon sx={{ color: "primary.main" }} />
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
									<Link href="/home">
										<Typography textAlign="center">Home</Typography>
									</Link>
								</MenuItem>
								<MenuItem onClick={handleCloseNavMenu}>
									<Link href="/about">
										<Typography textAlign="center">About Us</Typography>
									</Link>
								</MenuItem>
								<MenuItem onClick={handleCloseNavMenu}>
									<Link href="/found-items">
										<Typography textAlign="center">Found Items</Typography>
									</Link>
								</MenuItem>

								<AuthMenuItems handleCloseNavMenu={handleCloseNavMenu} />
							</Menu>
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<AuthButton />
						</Box>
					</Toolbar>
				</Box>
			</AppBar>
		</Box>
	);
}
export default NavBar;
