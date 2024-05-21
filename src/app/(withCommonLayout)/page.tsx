import AboutUs from "@/components/UI/HomePage/AboutUs/AboutUs";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import RecentLostItems from "@/components/UI/HomePage/RecentLostItems/RecentLostItems";

const Home = () => {
	return (
		<>
			<HeroSection />
			<AboutUs />
			<RecentLostItems />
		</>
	);
};

export default Home;
