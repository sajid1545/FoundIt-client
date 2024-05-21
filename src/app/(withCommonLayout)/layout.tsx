import NavBar from "@/components/shared/Navbar/Navbar";
import { Box, Container } from "@mui/material";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box>
			<NavBar />
			<Box className="min-h-screen">{children}</Box>
		</Box>
	);
};

export default CommonLayout;
