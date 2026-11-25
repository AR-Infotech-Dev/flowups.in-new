import { Link, useLocation } from "react-router-dom";
import { salesProductionCrm, softwareProjects, tallyApi } from "../../data/softwareProjects";
import { moduleEnquiry } from "../../data/tdlModules";
import { CallDeskShowcase } from "./CallDeskShowcase";
import CrmSpotlight from "./CrmSpotlight";
import TallyApiFlow from "./TallyApiFlow";
import "./Product.css";

const products = [
  {
    id: "calldesk",
    title: "CallDesk",
    icon: "bi-headset",
    audience: "Customer support and service teams",
    description: "Turn customer calls into tickets, assign them, and track follow-ups through resolution.",
    demo: "products",
    enquiry: "CallDesk demo",
  },
  {
    ...salesProductionCrm,
    icon: "bi-diagram-3",
    audience: "Manufacturers and their sales teams",
    description: "Follow enquiries, quotes, and confirmed orders through production so sales can see what’s due.",
    demo: salesProductionCrm.id,
  },
  ...softwareProjects,
];

function ProductCard({ product }) {
  const { id, title, icon, audience, description, demo, enquiry } = product;

  return (
    <article className="product-list-card" id={demo === id ? undefined : id}>
      <div className="product-list-visual" aria-hidden="true">
        <i className={"bi " + icon} />
      </div>
      <div className="product-list-copy">
        <h3>{title}</h3>
        <p className="product-list-audience">{audience}</p>
        <p className="product-list-description">{description}</p>
        <div className="product-list-actions">
          {demo && (
            <Link className="flow-button product-demo-link" to={"/product#" + demo} aria-label={"View " + title + " demo"}>
              View demo <i className="bi bi-arrow-right" aria-hidden="true" />
            </Link>
          )}
          <Link className="flow-text-link" to={moduleEnquiry(enquiry ?? title, "product")} aria-label={"Enquire about " + title}>
            Enquire <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Product() {
  const { hash } = useLocation();
  const showCallDesk = hash === "#products";
  const showCrm = hash === "#" + salesProductionCrm.id;

  return (
    <div className="product-page">
      <section className="product-catalogue" aria-labelledby="product-page-title">
        <div className="container">
          <div className="product-list-heading">
            <h1 id="product-page-title">Products</h1>
            <p>Explore software for customer support, sales and production, clinics, order management, and TallyPrime integration.</p>
            <a className="flow-text-link product-list-jump" href="#software-projects">
              Browse software products <i className="bi bi-arrow-down" aria-hidden="true" />
            </a>
          </div>
          <section id={tallyApi.id} className="product-flagship" aria-labelledby="product-flagship-title">
            <div className="product-flagship-copy">
              <p className="product-flagship-label"><i className="bi bi-braces" aria-hidden="true" /> Flagship product</p>
              <h2 id="product-flagship-title">{tallyApi.title}</h2>
              <p>Integrate TallyPrime into the software you build. FlowupS provides the API, your app calls it, and our connector exchanges data with TallyPrime. Your team can read and send data without having to expose an API for us to call.</p>
              <Link className="flow-button product-flagship-action" to={moduleEnquiry(tallyApi.enquiry, "integration")}>
                Discuss API access <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </Link>
            </div>
            <TallyApiFlow />
          </section>
          <section id="software-projects" className="product-other" aria-labelledby="other-products-title">
            <h2 id="other-products-title">More FlowupS products</h2>
            <div className="product-list-grid">
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </section>
        </div>
      </section>

      {(showCallDesk || showCrm) && (
        <>
          {showCallDesk ? <CallDeskShowcase showProductLink={false} /> : <CrmSpotlight />}
          <div className="container product-demo-return">
            <Link className="flow-text-link" to="/product#software-projects">
              <i className="bi bi-arrow-left" aria-hidden="true" /> Back to products
            </Link>
          </div>
        </>
      )}

      <section className="product-integrations" aria-labelledby="product-integrations-title">
        <div className="container">
          <h2 id="product-integrations-title">Other integrations</h2>
          <div className="product-integration-list">
            <article id="sathi-connect">
              <h3>Sathi Connect</h3>
              <p>Connect SATHI workflows with TallyPrime.</p>
              <Link className="flow-text-link" to={moduleEnquiry("Sathi Connect", "integration")}>Ask about Sathi Connect <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
