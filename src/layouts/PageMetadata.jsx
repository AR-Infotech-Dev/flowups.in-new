import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { customization_data, servicesData } from "../../data/serviceData";

const siteUrl = "https://flowups.in";
const brand = "FlowupS Technologies";

const pages = {
  "/": ["API for TallyPrime, TDL & Business Software", "Connect your software to TallyPrime with the FlowupS API. Explore TDL modules, software products, and business automation services."],
  "/services": ["Services", "Explore FlowupS services for TallyPrime customization, software development, process automation, and implementation support."],
  "/tdl-modules": ["TDL Modules for TallyPrime", "Search the FlowupS catalogue of TDL modules for billing, GST, inventory, reporting, and industry workflows."],
  "/product": ["Products", "Explore the FlowupS API for TallyPrime, CallDesk, Sales & Production CRM, OPD Desk, and Order Management."],
  "/about_us": ["About Us", "Meet FlowupS Technologies, a software development and TallyPrime customization company based in Sangamner, Maharashtra."],
  "/our-team": ["Our Team", "Meet the FlowupS team behind TallyPrime customization, software development, sales, and client support."],
  "/contact-us": ["Contact Us", "Contact FlowupS in Sangamner for TallyPrime customization, software, and integration enquiries."],
};

function pageDetails(path) {
  if (Object.hasOwn(pages, path)) return pages[path];

  const parts = path.split("/");
  if (parts[1] !== "services") return null;

  if (parts.length === 4 && parts[2] === "customization") {
    const item = customization_data.find(({ id }) => id === parts[3]);
    if (item) {
      const title = item.title.trim();
      return [title, item.subtitle?.trim() || `Explore the ${title} module for TallyPrime and discuss your requirements with FlowupS.`];
    }
  }

  if (parts.length === 3) {
    const service = servicesData.find(({ id }) => id === parts[2]);
    if (service) return [service.title, service.description.trim().replace(/\.{2,}$/, ".")];
  }

  return null;
}

export default function PageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const page = pageDetails(path);
    const [title, description] = page ?? ["Page not found", "Find FlowupS products, services, and TDL modules."];
    document.title = `${title} | ${brand}`;
    document.querySelector('meta[name="description"]').content = description;

    const tag = document.createElement(page ? "link" : "meta");
    if (page) {
      tag.rel = "canonical";
      tag.href = siteUrl + path;
    } else {
      tag.name = "robots";
      tag.content = "noindex";
    }
    document.head.append(tag);
    return () => tag.remove();
  }, [pathname]);

  return null;
}