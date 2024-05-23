import AboutUs from "@/components/UI/HomePage/AboutUs/AboutUs";
import HelpSection from "@/components/UI/HomePage/HelpSection/HelpSection";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import RecentLostItems from "@/components/UI/HomePage/RecentLostItems/RecentLostItems";
import ReportItem from "@/components/UI/HomePage/ReportItem/ReportItem";

const Home = () => {
	return (
		<>
			<HeroSection />
			<AboutUs />
			<RecentLostItems />
			<HelpSection />
			<ReportItem />
		</>
	);
};

export default Home;
