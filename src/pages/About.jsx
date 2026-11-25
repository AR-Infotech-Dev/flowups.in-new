
import { Link } from "react-router-dom";
import "./CompanyPages.css";

const capabilities = [
  { title: "Adapt Tally to your business", text: "Add the modules, reports, and controls your team needs inside TallyPrime.", to: "/tdl-modules", label: "Explore TDL modules", icon: "bi-sliders" },
  { title: "Build software for your team", text: "Give people a workspace for tasks like support, order management, and day-to-day operations.", to: "/product", label: "Explore our products", icon: "bi-window" },
  { title: "Connect your existing systems", text: "Integrate TallyPrime and your other software so the same information moves between them.", to: "/services/business_process_automation", label: "Explore automation", icon: "bi-diagram-3" },
];

export default function About() {
  return (
    <div className="about-page">
      <header className="container about-intro">
        <div className="about-copy">
          <p className="flow-kicker">About FlowupS Technologies</p>
          <h1>Software built around <em>real work.</em></h1>
          <p>Based in Sangamner, Maharashtra, we customize Tally, connect business systems, and build software around the way people actually work.</p>
          <Link className="flow-text-link" to="/our-team">Meet the team <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
        </div>
        <figure className="about-visual">
          <img src="/images/aboutuss.jpg" alt="" width="512" height="279" fetchPriority="high" />
        </figure>
      </header>
      <section className="about-capabilities">
        <div className="container about-capabilities-layout">
          <h2>Where we can help</h2>
          <div>
            {capabilities.map(({ title, text, to, label, icon }) => (
              <article className="about-capability" key={title}>
                <i className={`bi ${icon}`} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link className="flow-text-link" to={to}>{label} <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="about-process">
        <div className="container">
          <h2>From the first conversation to rollout</h2>
          <p>We start by mapping your workflow with you, then build and test against the work your team does every day. After launch, we help with training, support, and changes as your needs evolve.</p>
          <Link className="flow-button flow-button-primary" to="/contact-us">Discuss your workflow <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  );
}
