import { useState } from "react";
import { Link } from "react-router-dom";
import { salesProductionCrm, softwareProjects } from "../../data/softwareProjects";
import { featuredTdlModules, moduleEnquiry, modulePath } from "../../data/tdlModules";
import "./WorkflowExplorer.css";

const products = [salesProductionCrm, ...softwareProjects];

function productLink(id) {
  const { title } = products.find((product) => product.id === id);
  return { title, type: "Product", to: "/product#" + id };
}

function tdlLink(id) {
  const { title, detailId } = featuredTdlModules.find((module) => module.id === id);
  const to = detailId
    ? modulePath(detailId)
    : "/tdl-modules?" + new URLSearchParams({ q: title }) + "#tdl-catalog";
  return { title, type: "TDL module", to };
}

const workflows = [
  {
    id: "sales-production",
    title: "Sales & Production",
    icon: "bi-diagram-3",
    description: "Follow a customer enquiry through to production and keep sales and operations working from the same order details.",
    steps: [
      ["Enquiry", "Capture what the customer needs."],
      ["Quote", "Agree on scope, price, and dates."],
      ["Order", "Confirm quantities and delivery."],
      ["Production", "Track work and update sales."],
    ],
    links: [productLink("sales-production-crm"), productLink("order-management")],
    route: "product",
  },
  {
    id: "clinic-operations",
    title: "Clinic Operations",
    icon: "bi-heart-pulse",
    description: "Organize patient visits from the front desk, with options for registration, visit coordination, and billing.",
    steps: [
      ["Register", "Capture the patient’s details."],
      ["Check in", "Record the visit at the front desk."],
      ["Coordinate", "Guide the patient through the visit."],
      ["Bill", "Record charges and receipts."],
    ],
    links: [productLink("opd-desk"), tdlLink("hospital")],
    route: "general",
  },
  {
    id: "warehouse-storage",
    title: "Warehouse & Cold Storage",
    icon: "bi-box-seam",
    description: "Keep a record of what comes in, where it is stored, and what goes out, alongside your Tally workflow.",
    steps: [
      ["Receive", "Record incoming stock."],
      ["Store", "Assign a storage location."],
      ["Dispatch", "Record goods leaving storage."],
      ["Bill", "Prepare storage charges."],
    ],
    links: [tdlLink("warehouse-cold-storage")],
    route: "tdl",
  },
];

export default function WorkflowExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);

  function moveTab(event, index) {
    const lastIndex = workflows.length - 1;
    const nextByKey = {
      ArrowLeft: index === 0 ? lastIndex : index - 1,
      ArrowRight: index === lastIndex ? 0 : index + 1,
      Home: 0,
      End: lastIndex,
    };
    if (!Object.hasOwn(nextByKey, event.key)) return;

    event.preventDefault();
    const next = nextByKey[event.key];
    setActiveIndex(next);
    event.currentTarget.parentElement.children[next].focus();
  }

  return (
    <section className="flow-section workflow-explorer" id="explore-by-workflow" aria-labelledby="workflows-title">
      <div className="container">
        <div className="workflow-heading">
          <h2 id="workflows-title">Explore by workflow</h2>
          <p>See how FlowupS products and TDL modules fit into the work your team does every day.</p>
        </div>
        <div className="workflow-shell">
          <div className="workflow-tabs" role="tablist" aria-label="Business workflows">
            {workflows.map(({ id, title, icon }, index) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`workflow-tab-${id}`}
                aria-controls={`workflow-panel-${id}`}
                aria-selected={activeIndex === index}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => moveTab(event, index)}
              >
                <i className={`bi ${icon}`} aria-hidden="true" />
                {title}
              </button>
            ))}
          </div>
          {workflows.map(({ id, title, description, steps, links, route }, index) => (
            <div
              key={id}
              className="workflow-panel"
              role="tabpanel"
              id={`workflow-panel-${id}`}
              aria-labelledby={`workflow-tab-${id}`}
              tabIndex={0}
              hidden={activeIndex !== index}
            >
              <div className="workflow-main">
                <p className="workflow-description">{description}</p>
                <ol className="workflow-steps" aria-label={`${title} example steps`}>
                  {steps.map(([step, detail]) => (
                    <li key={step}>
                      <strong>{step}</strong>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="workflow-related">
                <h3>Related solutions</h3>
                <ul>
                  {links.map(({ title: linkTitle, type, to }) => (
                    <li key={to}>
                      <Link to={to}>
                        <span><small>{type}</small><strong>{linkTitle}</strong></span>
                        <i className="bi bi-arrow-up-right" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  className="flow-button premium-primary"
                  to={moduleEnquiry(title + " workflow", route)}
                  state={{ requirementBrief: `Hi FlowupS, I’d like to discuss our ${title} workflow.\n\nCurrent setup:\nWhat we’d like to improve:` }}
                >
                  Discuss this workflow <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}