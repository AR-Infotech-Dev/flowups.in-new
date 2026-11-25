import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { developmentServices } from "../../data/developmentServices";
import { tallyApi } from "../../data/softwareProjects";
import "./Header.css";

const menus = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "TDL Modules", path: "/tdl-modules" },
  { name: "Products", path: "/product" },
  { name: "About Us", path: "/about_us" },
  { name: "Our Team", path: "/our-team" },
  { name: "Contact", path: "/contact-us" },
];

const serviceLinks = [
  { title: "Tally Customization", icon: "bi-sliders", to: "/services/tally" },
  { title: "TDL Modules", icon: "bi-grid", to: "/tdl-modules#tdl-catalog" },
  tallyApi,
  ...developmentServices.map(({ id, title, icon }) => ({
    title,
    icon,
    to: "/services/crm#" + id,
  })),
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenuAt, setOpenMenuAt] = useState(null);
  const [openServicesAt, setOpenServicesAt] = useState(null);
  const menuToggle = useRef(null);
  const servicesToggle = useRef(null);
  const servicesItem = useRef(null);
  const navigation = useRef(null);
  const location = useLocation();
  const menuOpen = openMenuAt === location;
  const servicesOpen = openServicesAt === location;

  function closeMenus() {
    setOpenMenuAt(null);
    setOpenServicesAt(null);
  }

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 40);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!menuOpen && !servicesOpen) return;

    function closeOnEscape(event) {
      if (event.key !== "Escape") return;
      if (servicesOpen && servicesItem.current?.contains(document.activeElement)) {
        setOpenServicesAt(null);
        servicesToggle.current?.focus();
      } else {
        closeMenus();
        if (menuOpen) menuToggle.current?.focus();
      }
    }

    function closeOnOutsidePress(event) {
      if (!servicesItem.current?.contains(event.target)) setOpenServicesAt(null);
      if (!navigation.current?.contains(event.target)) setOpenMenuAt(null);
    }

    const desktop = window.matchMedia("(min-width: 1200px)");
    function closeOnDesktop(event) {
      setOpenServicesAt(null);
      if (event.matches) setOpenMenuAt(null);
    }

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePress);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen, servicesOpen]);

  return (
    <header className={`header d-flex align-items-center fixed-top flow-header${isScrolled ? " scrolled" : ""}`}>
      <div className="container-fluid container-xl d-flex align-items-center">
        <Link to="/" className="logo d-flex align-items-center me-auto flow-brand" aria-label="FlowupS Technologies Pvt. Ltd. home">
            <img className="flow-brand-image" src="/images/flowups-logo.png" width="4668" height="1740" alt="" />
          </Link>

        <nav ref={navigation} className={`navmenu${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <button
            ref={menuToggle}
            className="header-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="flowups-navigation"
            onClick={() => {
              if (menuOpen) closeMenus();
              else setOpenMenuAt(location);
            }}
          >
            <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`} aria-hidden="true" />
          </button>
          <ul id="flowups-navigation">
            {menus.map(({ name, path }) => path === "/services" ? (
              <li key={path} ref={servicesItem} className="header-services" onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpenServicesAt(null);
              }}>
                <div className="header-services-row">
                  <NavLink to={path} className="nav-link" onClick={closeMenus}>{name}</NavLink>
                  <button
                    ref={servicesToggle}
                    className="header-services-toggle"
                    type="button"
                    aria-label="Service links"
                    aria-expanded={servicesOpen}
                    aria-controls="flowups-service-links"
                    onClick={() => setOpenServicesAt(servicesOpen ? null : location)}
                  >
                    <i className="bi bi-chevron-down" aria-hidden="true" />
                  </button>
                </div>
                <ul id="flowups-service-links" className="header-services-links" hidden={!servicesOpen}>
                  {serviceLinks.map(({ title, icon, to }) => (
                    <li key={to}>
                      <Link to={to} onClick={closeMenus}>
                        <i className={`bi ${icon}`} aria-hidden="true" />
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={path}>
                <NavLink to={path} className="nav-link" onClick={closeMenus}>{name}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Link className="cta-btn" to="/contact-us" onClick={closeMenus}>Talk to Us</Link>

      </div>
    </header>
  );
}
