import { Link } from "react-router-dom";
import { developmentServices } from "../../data/developmentServices";

export default function DevelopmentServices() {
  return (
    <div className="flow-grid flow-grid-2 development-services">
      {developmentServices.map(({ id, icon, title, description }) => (
        <article className="flow-card flow-card-body" key={id}>
          <i className={`flow-service-icon bi ${icon}`} aria-hidden="true" />
          <h3>
            <Link className="flow-text-link" to={`/services/crm#${id}`}>
              {title} <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </Link>
          </h3>
          <p>{description}</p>
        </article>
      ))}
    </div>
  );
}