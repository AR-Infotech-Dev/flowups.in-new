
import { useState } from "react";
import { Link } from "react-router-dom";
import { findSolutions, goals, industries, requirementBriefLimit, solutionEnquiry, tallyOptions } from "../../data/solutionFinder";
import "./SolutionFinder.css";

const questions = [
  { name: "industry", label: "Industry", options: industries },
  { name: "goal", label: "What do you want to improve?", options: goals },
  { name: "tally", label: "Do you use TallyPrime?", options: tallyOptions },
];

export default function SolutionFinder() {
  const [selection, setSelection] = useState({ industry: "", goal: "", tally: "" });
  const [submitted, setSubmitted] = useState(null);
  const [brief, setBrief] = useState("");
  const enquiryState = { requirementBrief: brief.trim() };
  const results = submitted ? findSolutions(submitted) : [];

  function submit(event) {
    event.preventDefault();
    setSubmitted(selection);
  }

  return (
    <section id="find-your-solution" className="flow-section solution-finder" aria-labelledby="solution-finder-title">
      <div className="container">
        <div className="solution-finder-panel">
          <div className="solution-finder-intro">
            <h2 id="solution-finder-title">Find your solution</h2>
            <p>Tell us what you want to improve. We’ll suggest FlowupS products, services, and TDL modules that fit.</p>
          </div>
          <form onSubmit={submit} className="solution-finder-form">
            {questions.map(({ name, label, options }) => (
              <label key={name}>
                {label}
                <select
                  name={name}
                  value={selection[name]}
                  onChange={(event) => {
                    setSelection({ ...selection, [name]: event.target.value });
                    setSubmitted(null);
                  }}
                  required
                >
                  <option value="" disabled>Select an option</option>
                  {Object.entries(options).map(([value, text]) => <option key={value} value={value}>{text}</option>)}
                </select>
              </label>
            ))}
            <label className="solution-finder-brief">
              <span>Briefly describe your requirement <small>(optional)</small></span>
              <textarea
                name="requirementBrief"
                rows={3}
                maxLength={requirementBriefLimit}
                placeholder="For example, we need to track orders from enquiry through production."
                value={brief}
                onChange={(event) => setBrief(event.target.value)}
              />
            </label>
            <div className="solution-finder-actions">
              <button className="flow-button flow-button-primary" type="submit">
                Show matches <i className="bi bi-arrow-down" aria-hidden="true" />
              </button>
              {enquiryState.requirementBrief && (
                <Link className="flow-text-link" to="/contact-us?subject=Custom+requirement#enquiry" state={enquiryState}>
                  Send a custom enquiry <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </Link>
              )}
            </div>
          </form>
          <div role="status" className="solution-finder-status">{submitted && <h3>{results.length} suggested solutions</h3>}</div>
          {submitted && (
            <ul className="solution-results">
              {results.map(({ id, title, type, description, status, to }) => (
                <li className="solution-result" key={id}>
                  <p className="flow-kicker">{status ? type + " · " + status : type}</p>
                  <h4>{title}</h4>
                  <p>{description}</p>
                  <div>
                    <Link className="flow-text-link" to={to} aria-label={"View " + title}>View details</Link>
                    <Link className="flow-text-link" to={solutionEnquiry(submitted, id)} state={enquiryState} aria-label={"Enquire about " + title}>
                      Enquire <i className="bi bi-arrow-up-right" aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
