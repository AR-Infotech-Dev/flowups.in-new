
import { useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { tallyApi } from "../../data/softwareProjects";
import { getSolutionDraft, requirementBriefLimit } from "../../data/solutionFinder";
import "../pages/CompanyPages.css";

const email = "admin@flowups.in";

function EnquiryForm({ subject, topic, solution, route, catalogueSearch, requirementBrief }) {
  const [feedback, setFeedback] = useState({ state: "idle", message: "" });
  const sending = useRef(false);
  const lastAttempt = useRef(null);
  const sent = feedback.state === "sent";
  const apiDraft = route === "integration" && subject === tallyApi.enquiry
    ? "Hi FlowupS, we’d like to connect our software to TallyPrime using your API.\n\nSoftware we want to connect:\nData we want to read from TallyPrime:\nData we want to send to TallyPrime:"
    : null;
  const defaultMessage = topic
    ? `Hi FlowupS, I’d like to know more about the ${topic} for Tally.\n\nCould you share what it supports and how we can arrange a demo?`
    : subject ? "Hi FlowupS, I would like to know more about " + subject + "." : "";
  const message = solution?.message ?? apiDraft ?? (requirementBrief || defaultMessage);

  async function sendEnquiry(event) {
    event.preventDefault();
    if (sending.current || sent) return;

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    values.module = topic;
    values.route = route;
    const body = JSON.stringify(values);
    const emailBody = [values.message, "", values.name, values.email].join("\n");
    const emailLink = `mailto:${email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(emailBody)}`;
    if (lastAttempt.current?.body !== body) {
      lastAttempt.current = { body, id: crypto.randomUUID() };
    }

    sending.current = true;
    setFeedback({ state: "sending", message: "Sending your enquiry…" });
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": lastAttempt.current.id },
        body,
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setFeedback({ state: "error", message: result.error || "Your enquiry couldn’t be sent. Please try again.", emailLink });
        return;
      }
      setFeedback({
        state: "sent",
        message: result.confirmationSent
          ? "Your enquiry was sent to FlowupS. A confirmation email is on its way."
          : "Your enquiry was sent to FlowupS.",
      });
    } catch {
      setFeedback({ state: "error", message: "We couldn’t confirm your enquiry was sent. Please try again.", emailLink });
    } finally {
      sending.current = false;
    }
  }

  return (
    <form id="enquiry" className="contact-sheet" onSubmit={sendEnquiry}>
      {topic && typeof catalogueSearch === "string" && (
        <Link className="flow-text-link contact-back" to={{ pathname: "/tdl-modules", search: catalogueSearch, hash: "#tdl-catalog" }}>
          <i className="bi bi-arrow-left" aria-hidden="true" /> Back to module catalogue
        </Link>
      )}
      <h2>{topic ? "Your module enquiry" : "Send an enquiry"}</h2>
      {(topic || solution || subject) && <p className="contact-module"><i className="bi bi-box-seam" aria-hidden="true" /> {topic || solution?.title || subject}</p>}
      <fieldset disabled={feedback.state === "sending" || sent}>
        <div className="contact-fields">
          <label>Name<input name="name" autoComplete="name" maxLength={100} required /></label>
          <label>Work email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
        </div>
        <label>Subject<input name="subject" defaultValue={subject} maxLength={180} required /></label>
        <label>Message<textarea name="message" defaultValue={message} placeholder="Tell us a little about your workflow and what you need." rows={6} maxLength={4000} required /></label>
        <div className="contact-trap" aria-hidden="true">
          <label>Leave this blank<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <button type="submit" className="flow-button contact-send">
          {sent ? "Enquiry sent" : feedback.state === "sending" ? "Sending…" : "Send enquiry"} <i className={sent ? "bi bi-check2" : "bi bi-arrow-up-right"} aria-hidden="true" />
        </button>
      </fieldset>
      {feedback.message && (
        <p className={`contact-feedback contact-feedback-${feedback.state}`} role={feedback.state === "error" ? "alert" : "status"}>
          {feedback.message}
          {feedback.state === "error" && feedback.emailLink && (
            <a href={feedback.emailLink}>Open this draft in your email app <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
          )}
        </p>
      )}
    </form>
  );
}

export default function ContactUs() {
  const [params] = useSearchParams();
  const { state } = useLocation();
  const topic = (params.get("module") ?? "").trim().slice(0, 150);
  const requirementBrief = !topic && typeof state?.requirementBrief === "string"
    ? state.requirementBrief.trim().slice(0, requirementBriefLimit)
    : "";
  const solution = topic ? null : getSolutionDraft(params, requirementBrief);
  const route = solution?.route ?? params.get("route") ?? "general";
  const subject = topic ? `TDL enquiry · ${topic}` : solution?.subject ?? (params.get("subject") ?? "").trim().slice(0, 180);

  return (
    <div className="contact-page">
      <div className="container contact-layout">
        <div className="contact-intro">
          <div className="contact-heading">
            <p className="contact-eyebrow">Contact FlowupS</p>
            <h1>Let’s talk about <em>your workflow.</em></h1>
          </div>
          <div className="contact-channels">
            <div>
              <i className="bi bi-envelope" aria-hidden="true" />
              <div><h2>Email</h2><a href={`mailto:${email}`}>{email}</a></div>
            </div>
            <div>
              <i className="bi bi-telephone" aria-hidden="true" />
              <div><h2>Phone</h2><a href="tel:+919665478057">+91 96654 78057</a><a href="tel:+917756923602">+91 77569 23602</a></div>
            </div>
            <div>
              <i className="bi bi-geo-alt" aria-hidden="true" />
              <div><h2>Office</h2><address>Padtani Complex, behind Joshi Palace,<br />opp. Panhale Pedha, Punjabi Colony,<br />Sangamner, Maharashtra 422605</address></div>
            </div>
          </div>
        </div>
        <EnquiryForm key={`${topic}|${subject}|${route}|${solution?.message ?? requirementBrief}`} subject={subject} topic={topic} solution={solution} route={route} catalogueSearch={state?.catalogueSearch} requirementBrief={requirementBrief} />
      </div>
    </div>
  );
}
