
import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { tdlCatalogue } from "../../data/tdlCatalogue";
import { featuredTdlModules, modulePath, tdlEnquiry } from "../../data/tdlModules";
import { PageHero, PageContact } from "../components/InteriorPage";

const pageSize = 18;
const categories = [...new Set(tdlCatalogue.map(({ category }) => category))].sort();
const allModules = [...tdlCatalogue].sort((first, second) => first.title.localeCompare(second.title));

function searchableText(text) {
  return text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function ModuleCard({ module, search }) {
  return (
    <article className="flow-card flow-card-body flow-module-card">
      <i className={`flow-service-icon bi ${module.icon}`} aria-hidden="true" />
      <p className="flow-kicker">{module.category}</p>
      <h3>{module.title}</h3>
      {module.description && <p>{module.description}</p>}
      <div className="tdl-card-actions">
        <Link className="flow-text-link" to={tdlEnquiry(module.title)} state={{ catalogueSearch: search }} aria-label={'Enquire about ' + module.title}>
          Enquire <i className="bi bi-arrow-up-right" aria-hidden="true" />
        </Link>
        {module.detailId && <Link className="flow-text-link" to={modulePath(module.detailId)}>View module</Link>}
      </div>
    </article>
  );
}

export default function TdlModules() {
  const [params] = useSearchParams();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const query = params.get("q") ?? "";
  const requestedCategory = params.get("category");
  const category = categories.includes(requestedCategory) ? requestedCategory : "";
  const [pagination, setPagination] = useState(null);
  const [showAllFeatured, setShowAllFeatured] = useState(false);
  const search = params.toString();
  const visible = pagination?.search === search ? pagination.limit : pageSize;

  function updateFilters(nextQuery, nextCategory) {
    const next = new URLSearchParams(params);
    if (nextQuery) next.set("q", nextQuery);
    else next.delete("q");
    if (nextCategory) next.set("category", nextCategory);
    else next.delete("category");
    setPagination(null);
    navigate({ search: next.toString(), hash }, { replace: true, preventScrollReset: true });
  }
  const words = searchableText(query).split(" ").filter(Boolean);
  const isFiltered = words.length > 0 || category !== "";
  const results = allModules.filter((module) => {
    const text = searchableText(`${module.title} ${module.category} ${module.description ?? ""}`);
    return (!category || module.category === category) && words.every((word) => text.includes(word));
  });

  return (
    <>
      <PageHero
        title="TDL Modules for Tally"
        description="Explore Tally customizations for your industry, GST, data imports, approvals, billing, inventory, and reporting."
        parent={{ to: "/services/tally", label: "Tally services" }}
      >
        <a className="flow-button flow-button-primary" href="#tdl-catalog">Browse all modules <i className="bi bi-arrow-down" aria-hidden="true" /></a>
      </PageHero>
      <section className="flow-section" id="tdl-catalog">
        <div className="container">
          <div className="flow-section-head"><h2>TDL module catalogue</h2></div>
          <div className="flow-filter">
            <label>Search modules<input type="search" value={query} onChange={(event) => updateFilters(event.target.value, category)} placeholder="Try GST, glass, or Excel" /></label>
            <label>Category<select value={category} onChange={(event) => updateFilters(query, event.target.value)}>
              <option value="">All categories</option>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select></label>
            {isFiltered && (
              <button type="button" className="flow-text-link flow-filter-reset" onClick={() => updateFilters("", "")}>
                Clear filters <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            )}
          </div>
          {!isFiltered && (
            <div className="flow-catalog-group">
              <div className="flow-section-head">
                <h3>Featured modules</h3>
                <button type="button" className="flow-text-link flow-featured-toggle" aria-expanded={showAllFeatured} aria-controls="featured-modules" onClick={() => setShowAllFeatured(!showAllFeatured)}>
                  {showAllFeatured ? "Show fewer featured modules" : "Show all featured modules"}
                </button>
              </div>
              <div id="featured-modules" className="flow-grid flow-grid-3">{featuredTdlModules.slice(0, showAllFeatured ? featuredTdlModules.length : 6).map((module) => <ModuleCard key={module.id} module={module} search={search} />)}</div>
            </div>
          )}
          <div className="flow-catalog-group">
            <h3>{isFiltered ? "Search results" : "All modules"}</h3>
            <p className="flow-result-count" role="status">{results.length} {results.length === 1 ? "module" : "modules"}</p>
            <div className="flow-grid flow-grid-3">{results.slice(0, visible).map((module) => <ModuleCard key={module.id} module={module} search={search} />)}</div>
            {results.length === 0 && <p>Try a different search or choose another category.</p>}
            {results.length > visible && (
              <button type="button" className="flow-button flow-button-outline flow-catalog-more" onClick={() => setPagination({ search, limit: visible + pageSize })}>
                Show more modules <i className="bi bi-arrow-down" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </section>
      <PageContact title="Need a TDL module for a different workflow?" />
    </>
  );
}
