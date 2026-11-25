
import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageMetadata from "./PageMetadata";
import "./InteriorPages.css";
import "./FlowupSTheme.css";

export default function MainLayout() {
  const { pathname } = useLocation();
  const main = useRef(null);

  function skipToContent(event) {
    event.preventDefault();
    main.current?.focus({ preventScroll: true });
    main.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }

  return (
    <>
      <PageMetadata />
      <a className="flow-skip-link" href="#main-content" onClick={skipToContent}>Skip to content</a>
      <Header />
      <main id="main-content" ref={main} tabIndex={-1} className={pathname === "/" ? "flow-main" : "flow-main flow-home flow-inner"}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
