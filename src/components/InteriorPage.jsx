
import { Link } from "react-router-dom";

export function PageHero({ title, description, parent, children }) {
  return (
    <section className="flow-hero flow-page-hero">
      <div className="container flow-page-intro">
        <nav aria-label="Breadcrumb" className="flow-crumbs">
          <Link to="/">Home</Link>
          {parent && <Link to={parent.to}>{parent.label}</Link>}
          <span aria-current="page">{title}</span>
        </nav>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {children && <div className="flow-actions">{children}</div>}
      </div>
    </section>
  );
}

export function PageContact({ title = "Tell us what you’d like to build", label = "Discuss your workflow" }) {
  return (
    <section className="flow-cta">
      <div className="container">
        <h2>{title}</h2>
        <Link to="/contact-us" className="flow-button flow-button-primary">
          {label} <i className="bi bi-arrow-up-right" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
