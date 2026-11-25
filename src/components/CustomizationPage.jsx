
import { Link, useParams } from "react-router-dom";
import { customization_data } from "../../data/serviceData";
import { tdlCatalogue } from "../../data/tdlCatalogue";
import { modulePath, tdlEnquiry } from "../../data/tdlModules";
import { PageHero } from "./InteriorPage";

const fallback = "/images/services.jpg";

function useFallbackImage(event) {
  if (!event.currentTarget.src.endsWith(fallback)) event.currentTarget.src = fallback;
}

export default function CustomizationPage() {
  const { id } = useParams();
  const service = customization_data.find((item) => item.id === id);
  const parent = { to: "/services/tally", label: "Tally services" };

  if (!service) {
    return (
      <PageHero title="Tally module not found" description="Browse the module catalogue or ask us about a specific customization." parent={parent}>
        <Link className="flow-button flow-button-primary" to="/tdl-modules">Browse TDL modules</Link>
      </PageHero>
    );
  }

  const features = service.features ?? [];
  const catalogueEntry = tdlCatalogue.find((item) => item.detailId === id);
  const related = tdlCatalogue
    .filter((item) => item.category === catalogueEntry?.category && item.detailId !== id)
    .slice(0, 3);

  return (
    <>
      <PageHero title={service.title.trim()} description={service.subtitle} parent={parent}>
        <Link className="flow-button flow-button-primary" to={tdlEnquiry(service.title.trim())}>Ask about this module <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
        {features.length > 0 && <a className="flow-button flow-button-secondary" href="#capabilities">See capabilities <i className="bi bi-arrow-down" aria-hidden="true" /></a>}
      </PageHero>
      <section id="capabilities" className="flow-section flow-tint">
        <div className="container">
          <div className="flow-section-head">
            <h2>Module capabilities</h2>
            <Link className="flow-text-link" to="/tdl-modules">Browse TDL modules <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
          </div>
          {features.length > 0 ? (
            <div className="flow-grid flow-grid-2">
              {features.map((feature, index) => (
                <article className="flow-card flow-module-feature" key={`${feature.title}-${index}`}>
                  <img src={feature.image || fallback} alt="" width="720" height="320" loading="lazy" decoding="async" onError={useFallbackImage} />
                  <div className="flow-card-body">
                    <h3>{feature.title}</h3>
                    {[feature.description, feature.description1, feature.description2, feature.description3].filter(Boolean).map((description, i) => <p key={i}>{description}</p>)}
                  </div>
                </article>
              ))}
            </div>
          ) : <p>Contact us to discuss the capabilities you need.</p>}
        </div>
      </section>
      {related.length > 0 && (
        <section className="flow-section" aria-labelledby="related-modules-title">
          <div className="container">
            <div className="flow-section-head"><h2 id="related-modules-title">Related TDL modules</h2></div>
            <div className="flow-grid flow-grid-3">
              {related.map((module) => (
                <article className="flow-card flow-card-body flow-module-card" key={module.id}>
                  <h3>{module.title}</h3>
                  {module.description && <p>{module.description}</p>}
                  <Link className="flow-text-link" to={module.detailId ? modulePath(module.detailId) : tdlEnquiry(module.title)}>
                    {module.detailId ? "View module" : "Enquire"} <i className="bi bi-arrow-up-right" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
