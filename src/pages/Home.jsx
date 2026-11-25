
import Hero from "../components/Hero";
import LandingSections from "../components/LandingSections";
import "./Home.css";
import "./PremiumHome.css";

export default function Home() {
  return (
    <div className="flow-home premium-home">
      <Hero />
      <LandingSections />
    </div>
  );
}
