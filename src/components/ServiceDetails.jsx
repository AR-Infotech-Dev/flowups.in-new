
import { Link, useParams } from "react-router-dom";
import { developmentServices } from "../../data/developmentServices";
import { customization_data, servicesData } from "../../data/serviceData";
import { moduleEnquiry, modulePath, tdlEnquiry } from "../../data/tdlModules";
import { PageContact, PageHero } from "./InteriorPage";

const serviceOffers = {
  crm: [
    ...developmentServices.map(({ id, icon, title, description }) => [icon, title, description, id]),
    ["bi-people", "CRM systems", "Track sales leads, customer interactions, follow-ups, and service requests."],
    ["bi-box-seam", "ERP modules", "Manage inventory, HR, accounting, and other operations with connected modules."],
    ["bi-bar-chart", "Dashboards and MIS", "Give teams reports and dashboards tailored to the decisions they make."],
    ["bi-diagram-3", "API development", "Connect your software with third-party services and internal tools."],
  ],
  business_process_automation: [
    ["bi-diagram-3", "Workflow automation", "Set up approval steps, reminders, and task handoffs based on the rules your team uses."],
    ["bi-graph-up", "Report automation", "Collect data from the systems you use and generate recurring reports."],
    ["bi-arrow-left-right", "Data synchronization", "Connect applications so teams can share customer, inventory, and accounting data."],
  ],
  support_implementation: [
    ["bi-sliders", "Deployment and configuration", "Set up your software and configure it around roles and daily processes."],
    ["bi-bug", "TDL and software fixes", "Investigate issues in custom modules, reports, and software applications."],
    ["bi-mortarboard", "User training", "Walk your team through the new workflows and prepare them for launch."],
    ["bi-diagram-3", "Integration monitoring", "Help identify failures in data exchange between connected applications."],
    ["bi-printer", "Reports and print formats", "Update reports, vouchers, and invoice layouts as requirements change."],
    ["bi-headset", "Ongoing technical support", "Get help with enhancements, data correction guidance, and remote coordination."],
  ],
};

const tallyModules = new Set(customization_data.map((module) => module.id));
const tallyProducts = [
  ["bi-calculator", "Tally accounting software", "Manage business accounting and inventory in Tally."],
  ["bi-bar-chart", "TallyPrime", "Work with accounting, inventory, and business reporting in TallyPrime."],
  ["bi-arrow-repeat", "Tally Software Services (TSS)", "Ask about updates and subscription options for your Tally setup."],
  ["bi-cloud", "Tally on Cloud", "Discuss cloud hosting and remote access for your team."],
];

function TallyServices({ service }) {
  const groups = service.categories.find(({ id }) => id === "tally-customise").items;

  return (
    <>
      <section className="flow-section">
        <div className="container">
          <div className="flow-section-head"><h2>Tally software and cloud</h2></div>
          <div className="flow-grid flow-grid-4">
            {tallyProducts.map(([icon, title, description]) => (
              <article className="flow-card flow-card-body flow-module-card" key={title}>
                <i className={`flow-service-icon bi ${icon}`} aria-hidden="true" />
                <h3>{title}</h3><p>{description}</p>
                <Link to={moduleEnquiry(title, "tdl")} className="flow-text-link">Enquire <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="service-details" className="flow-section flow-tint">
        <div className="container flow-stack">
          <div className="flow-example-panel">
            <div>
              <p className="flow-kicker">Tally Definition Language</p>
              <h2>TDL Modules</h2>
              <p>Find ready-to-discuss customizations for GST, data imports, approvals, billing, and reporting.</p>
              <Link to="/tdl-modules" className="flow-text-link">Explore the TDL catalogue <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
            </div>
            <ul className="flow-check-list">
              <li>GST return reconciliation</li>
              <li>Excel to Tally import</li>
              <li>Maker–checker voucher approval</li>
            </ul>
          </div>
          <div>
            <div className="flow-section-head"><h2>Tally customization categories</h2></div>
            <div className="flow-module-groups">
              {groups.map((group, index) => {
                const modules = [...new Map(group.services.map((item) => [item.slug, item])).values()];
                return (
                  <details className="flow-card" key={group.category} open={index === 0}>
                    <summary>{group.category}<i className="bi bi-chevron-down" aria-hidden="true" /></summary>
                    <ul className="flow-module-links">
                      {modules.map((item) => (
                        <li key={item.slug}>
                          <Link to={tallyModules.has(item.slug) ? modulePath(item.slug) : tdlEnquiry(item.name)}>
                            <i className={`bi ${item.icon || "bi-grid"}`} aria-hidden="true" />{item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ServiceDetails() {
  const { id } = useParams();
  const service = servicesData.find((item) => item.id === id);
  const parent = { to: "/services", label: "Services" };

  if (!service) {
    return (
      <PageHero title="Service not found" description="Browse the services available from FlowupS." parent={parent}>
        <Link className="flow-button flow-button-primary" to="/services">View services</Link>
      </PageHero>
    );
  }

  return (
    <>
      <PageHero title={service.title} description={service.description.replace(/\.{2,}$/, ".")} parent={parent}>
        <Link className="flow-button flow-button-primary" to={moduleEnquiry(service.title, id === "tally" ? "tdl" : "service")}>Discuss your requirements <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
        {id === "tally" && <Link className="flow-button flow-button-secondary" to="/tdl-modules">Browse TDL modules</Link>}
      </PageHero>
      {id === "tally" ? <TallyServices service={service} /> : (
        <section id="service-details" className="flow-section flow-tint">
          <div className="container">
            <div className="flow-section-head"><h2>What we can help with</h2></div>
            <div className="flow-grid flow-grid-3">
              {serviceOffers[id].map(([icon, title, description, anchor]) => (
                <article className="flow-card flow-card-body" id={anchor} key={title}>
                  <i className={`flow-service-icon bi ${icon}`} aria-hidden="true" />
                  <h3>{title}</h3><p>{description}</p>
                  {anchor && (
                    <Link className="flow-text-link development-enquiry" to={moduleEnquiry(title, "service")} aria-label={"Enquire about " + title}>
                      Enquire <i className="bi bi-arrow-up-right" aria-hidden="true" />
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      <PageContact />
    </>
  );
}
