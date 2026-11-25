
import { useLayoutEffect, useRef } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import OurTeam from "./components/OurTeam";
import Product from "./components/Product";
import Services from "./pages/Services";
import TdlModules from "./pages/TdlModules";
import ServiceDetails from "./components/ServiceDetails";
import CustomizationPage from "./components/CustomizationPage";
import { PageHero } from "./components/InteriorPage";

function PageScroll() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(null);

  useLayoutEffect(() => {
    const samePage = previousPath.current === pathname;
    previousPath.current = pathname;

    const target = hash && document.getElementById(hash.slice(1));
    if (target) {
      const behavior = samePage ? "auto" : "instant";
      target.scrollIntoView({ behavior, block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}

function NotFound() {
  return (
    <PageHero title="Page not found" description="This page may have moved.">
      <Link className="flow-button flow-button-primary" to="/">Back to home</Link>
    </PageHero>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PageScroll />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/customization" element={<Navigate to="/services/tally" replace />} />
          <Route path="services/customization/:id" element={<CustomizationPage />} />
          <Route path="services/:id" element={<ServiceDetails />} />
          <Route path="tdl-modules" element={<TdlModules />} />
          <Route path="about_us" element={<About />} />
          <Route path="our-team" element={<OurTeam />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="product" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
