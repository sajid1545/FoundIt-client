import Footer from "@/components/shared/Footer/Footer";
import NavBar from "@/components/shared/Navbar/Navbar";
import { Box } from "@mui/material";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box>
			<NavBar />
			<Box className="min-h-screen">{children}</Box>
			<Footer />
		</Box>
	);
};

export default CommonLayout;
