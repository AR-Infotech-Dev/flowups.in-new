
import { useState } from "react";
import { Link } from "react-router-dom";
import { salesProductionCrm } from "../../data/softwareProjects";
import { moduleEnquiry } from "../../data/tdlModules";
import "./CrmSpotlight.css";

const stages = [
  { icon: "bi-inbox", title: "Enquiry", description: "Capture the customer’s requirement and set the next follow-up." },
  { icon: "bi-file-earmark-text", title: "Quote", description: "Record the scope and price discussed with the customer." },
  { icon: "bi-clipboard-check", title: "Order", description: "Confirm quantities and the date promised to the customer." },
  { icon: "bi-gear", title: "Production", description: "Follow work in progress and keep sales updated on order status." },
];

export default function CrmSpotlight() {
  const { id, title, action } = salesProductionCrm;
  const [activeStage, setActiveStage] = useState(0);
  const stage = stages[activeStage];

  return (
    <section id={id} className="crm-spotlight" aria-labelledby="crm-spotlight-title">
      <div className="container crm-spotlight-grid">
        <div>
          <h2 id="crm-spotlight-title">{title}</h2>
          <p className="crm-spotlight-description">
            Follow an enquiry from the first conversation to the production floor.
            Give sales and production teams one place to see what was promised, what’s due, and where each order stands.
          </p>
          <Link className="flow-button flow-button-primary" to={moduleEnquiry(title, "product")}>
            {action} <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </Link>
        </div>
        <div className="crm-workflow">
          <div className="crm-workflow-controls" role="group" aria-label="Example CRM workflow">
            {stages.map(({ title, icon }, index) => (
              <button key={title} type="button" aria-pressed={activeStage === index} onClick={() => setActiveStage(index)}>
                <i className={"bi " + icon} aria-hidden="true" /> {title}
              </button>
            ))}
          </div>
          <div className="crm-workflow-detail" aria-live="polite">
            <strong>{stage.title}</strong>
            <p>{stage.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
