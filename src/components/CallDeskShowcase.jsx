
import { useState } from "react";
import { Link } from "react-router-dom";

const screens = [
  { label: "Ticket table", icon: "bi-list-task", text: "Filter requests, assign ownership, and see which tickets need attention." },
  { label: "Kanban board", icon: "bi-kanban", text: "See the status of each request from open through closed." },
  { label: "Dashboard", icon: "bi-bar-chart", text: "Review workload, open tickets, and resolved work in one view." },
];

const demoTickets = [
  { id: "CD-1042", company: "Demo Company A", issue: "Update invoice format", status: "Open" },
  { id: "CD-1041", company: "Demo Company B", issue: "Check report totals", status: "In progress" },
  { id: "CD-1040", company: "Demo Company C", issue: "Review user access", status: "Pending" },
  { id: "CD-1039", company: "Demo Company D", issue: "Confirm voucher import", status: "Closed" },
];

function TicketDemo({ kanban }) {
  return (
    <div className="flow-ticket-demo">
      <div className="flow-ticket-heading">
        <strong><i className="bi bi-headset" aria-hidden="true" /> Tickets</strong>
        <span>Sample data</span>
      </div>
      {kanban ? (
        <div className="flow-ticket-board">
          {demoTickets.map(({ id, company, issue, status }) => (
            <div key={id}>
              <h3>{status}</h3>
              <p><small>{id}</small><strong>{issue}</strong><small>{company}</small></p>
            </div>
          ))}
        </div>
      ) : (
        <table>
          <thead><tr><th scope="col">Request</th><th scope="col">Customer</th><th scope="col">Status</th></tr></thead>
          <tbody>{demoTickets.map(({ id, company, issue, status }) => (
            <tr key={id}><td>{issue}</td><td>{company}</td><td><span>{status}</span></td></tr>
          ))}</tbody>
        </table>
      )}
    </div>
  );
}

export function CallDeskShowcase({ title = "CallDesk", showProductLink = true }) {
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <section id="products" className="flow-section flow-product" aria-labelledby="calldesk-title">
      <div className="container flow-product-grid">
        <div className="flow-product-copy">
          <h2 id="calldesk-title">{title}</h2>
          <p>Manage customer calls, follow-ups, and service tickets from one workspace.</p>
          <div className="flow-product-controls" role="group" aria-label="CallDesk preview">
            {screens.map(({ label, icon }, index) => (
              <button key={label} type="button" aria-pressed={index === activeScreen} aria-controls="calldesk-preview" onClick={() => setActiveScreen(index)}>
                <i className={`bi ${icon}`} aria-hidden="true" /> {label}
              </button>
            ))}
          </div>
          {showProductLink && <Link className="flow-text-link" to="/product">Explore CallDesk <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>}
        </div>
        <figure className="flow-product-media" id="calldesk-preview">
          {activeScreen === 2 ? (
            <div className="flow-product-image">
              <img src="/images/flowups-dashboard.png" alt="CallDesk dashboard showing ticket status and team workload" loading="lazy" decoding="async" />
            </div>
          ) : <TicketDemo key={activeScreen} kanban={activeScreen === 1} />}
          <figcaption aria-live="polite">{screens[activeScreen].text}</figcaption>
        </figure>
      </div>
    </section>
  );
}
