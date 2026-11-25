
import { Link } from "react-router-dom";
import { servicesData } from "../../data/serviceData";
import { salesProductionCrm, softwareProjects, tallyApi } from "../../data/softwareProjects";
import { CallDeskShowcase } from "./CallDeskShowcase";
import DevelopmentServices from "./DevelopmentServices";
import WorkflowExplorer from "./WorkflowExplorer";
import SolutionFinder from "./SolutionFinder";

const serviceDescriptions = {
  tally: "Adapt TallyPrime with custom TDL modules, reports, approvals, and integrations.",
  crm: "Track leads, follow up with customers, and connect sales with order management and production. We also build web apps, mobile apps, and dashboards.",
  business_process_automation: "Connect your tools and automate repeat tasks such as data entry, reporting, and follow-ups.",
  support_implementation: "Get help with deployment, training, technical issues, and ongoing improvements.",
};

const faqs = [
  [
    "Can you customize TallyPrime for our business?",
    "Yes. We build TDL modules and TallyPrime customizations for billing, inventory, reports, permissions, and approvals.",
  ],
  [
    "Can you connect Tally to software we already use?",
    "Yes. If you build or maintain a CRM, ERP, POS, or e-commerce platform, your app can call the API we provide to read from and send data to TallyPrime.",
  ],
  [
    "Can you build custom software from scratch?",
    "Yes. We can map your workflow and build the web apps, mobile apps, dashboards, or business systems you need.",
  ],
  [
    "Do you provide support after launch?",
    "Yes. We help with training, fixes, enhancements, reporting changes, and integration monitoring after implementation.",
  ],
];

export default function LandingSections() {
  return (
    <>
      <section id="features" className="premium-section premium-services" aria-labelledby="services-title">
        <div className="container">
          <div className="premium-section-heading">
            <h2 id="services-title">What we can build for you</h2>
            <div className="premium-section-links">
              <a className="premium-text-link" href="#find-your-solution">Find your solution <i className="bi bi-arrow-down" aria-hidden="true" /></a>
              <Link className="premium-text-link" to="/services">View all services <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
            </div>
          </div>
          <div id="services" className="premium-services-grid">
            {servicesData.map((service) => {
              const isCrm = service.id === "crm";

              return (
                <article
                  className={isCrm ? "premium-service premium-service--crm" : "premium-service"}
                  id={isCrm ? salesProductionCrm.id : undefined}
                  key={service.id}
                >
                  <img src={service.image ?? ("/images/" + service.img)} alt="" loading="lazy" decoding="async" />
                  <div className="premium-service-copy">
                    <i className={"bi " + service.icon} aria-hidden="true" />
                    <h3>
                      <Link to={"/services/" + service.id}>{isCrm ? "Custom Software & CRM" : service.title}</Link>
                    </h3>
                    <p>{serviceDescriptions[service.id] ?? service.description}</p>
                    {isCrm && (
                      <Link className="premium-service-product" to={"/product#" + salesProductionCrm.id}>
                        {salesProductionCrm.title} <i className="bi bi-arrow-up-right" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                  <i className="premium-service-arrow bi bi-arrow-up-right" aria-hidden="true" />
                </article>
              );
            })}
          </div>
          <DevelopmentServices />
        </div>
      </section>

      <WorkflowExplorer />

      <SolutionFinder />

      <CallDeskShowcase />

      <section className="premium-section premium-projects" aria-labelledby="home-projects">
        <div className="container">
          <div className="premium-section-heading">
            <h2 id="home-projects">More FlowupS products.</h2>
            <Link className="premium-text-link" to="/product">Explore products <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
          </div>
          <div className="premium-project-list">
            {[salesProductionCrm, ...softwareProjects].map(({ id, title, icon = "bi-diagram-3", description = "Track leads, quotes, and orders through to production." }) => (
              <Link className="premium-project" to={`/product#${id}`} key={id}>
                <i className={`bi ${icon}`} aria-hidden="true" />
                <span><strong>{title}</strong><small>{description}</small></span>
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section premium-faq flow-faq" aria-labelledby="faq-title">
        <div className="container flow-faq-grid">
          <div>
            <h2 id="faq-title">Frequently asked questions</h2>
            <Link className="premium-text-link" to="/about_us">About FlowupS <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
          </div>
          <div>
            {faqs.map(([question, answer], index) => (
              <details key={question}>
                <summary>{question}<i className="bi bi-plus-lg" aria-hidden="true" /></summary>
                <p>{answer}</p>
                {index === 1 && <Link className="premium-text-link" to={tallyApi.to}>Explore the FlowupS API <i className="bi bi-arrow-right" aria-hidden="true" /></Link>}
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-cta" aria-labelledby="contact-title">
        <div className="container">
          <h2 id="contact-title">What would you like to simplify?</h2>
          <Link className="flow-button premium-primary" to="/contact-us">
            Discuss your workflow <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
