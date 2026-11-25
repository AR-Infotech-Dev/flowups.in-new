
import { Link } from "react-router-dom";
import { tallyApi } from "../../data/softwareProjects";
import { servicesData } from "../../data/serviceData";
import { PageHero, PageContact } from "../components/InteriorPage";
import DevelopmentServices from "../components/DevelopmentServices";
import SolutionFinder from "../components/SolutionFinder";

const steps = [
  ["Understand your workflow", "Map how your team works today, which tools you use, and where the work slows down."],
  ["Agree on the solution", "Review the requirements, screens, reports, and integrations before development begins."],
  ["Build and test", "Test with realistic workflows and review the results with your team."],
  ["Launch and support", "Set up the solution, train your users, and plan ongoing improvements."],
];

export default function Services() {
  return (
    <>
      <PageHero title="Services" description="Customize TallyPrime, build a website or mobile app, or connect the systems your team already uses.">
        <a className="flow-button flow-button-primary" href="#find-your-solution">Find your solution <i className="bi bi-arrow-down" aria-hidden="true" /></a>
        <Link className="flow-button flow-button-secondary" to={tallyApi.to}>Explore the FlowupS API <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
      </PageHero>
      <SolutionFinder />
      <section id="services-2" className="flow-section">
        <div className="container">
          <div className="flow-section-head">
            <h2>What we can build for you</h2>
            <Link className="flow-text-link" to="/tdl-modules">Browse TDL modules <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
          </div>
          <DevelopmentServices />
          <div className="flow-grid flow-grid-2">
            {servicesData.map((service) => (
              <article className="flow-card flow-service-detail-card" key={service.id}>
                <img src={service.image ?? `/images/${service.img}`} alt="" loading="lazy" decoding="async" />
                <div className="flow-card-body">
                  <i className={`flow-service-icon bi ${service.icon}`} aria-hidden="true" />
                  <h3><Link to={`/services/${service.id}`}>{service.title}</Link></h3>
                  <p>{service.description}</p>
                  <ul className="flow-check-list">{service.points.map((point) => <li key={point}>{point}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="flow-section flow-tint">
        <div className="container">
          <div className="flow-section-head"><h2>How we work</h2></div>
          <ol className="flow-grid flow-grid-4 flow-process">
            {steps.map(([title, description]) => <li className="flow-card flow-card-body" key={title}><h3>{title}</h3><p>{description}</p></li>)}
          </ol>
        </div>
      </section>
      <PageContact />
    </>
  );
}
