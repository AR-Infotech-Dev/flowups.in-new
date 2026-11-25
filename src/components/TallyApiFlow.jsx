import { useState } from "react";
import "./TallyApiFlow.css";

const modes = {
  write: {
    label: "Send to Tally",
    icon: "bi-arrow-right",
    title: "Send records from your app to TallyPrime.",
    detail: "Your app calls the FlowupS API with the data it wants to send. The FlowupS connector passes it to TallyPrime.",
  },
  read: {
    label: "Read from Tally",
    icon: "bi-arrow-left",
    title: "Get TallyPrime data back into your app.",
    detail: "Your app requests data from the FlowupS API. The FlowupS connector reads from TallyPrime and returns the result to your app.",
  },
};

const nodes = [
  { icon: "bi-window", label: "Your software", note: "Calls our API" },
  { icon: "bi-braces", label: "FlowupS API", note: "Connects both sides" },
  { icon: "bi-database", label: "TallyPrime", note: "Accounting data" },
];

export default function TallyApiFlow() {
  const [mode, setMode] = useState("write");
  const current = modes[mode];

  return (
    <div className="tally-flow">
      <div className="tally-flow-head">
        <strong><i className="bi bi-braces" aria-hidden="true" /> Integration flow</strong>
        <span>Interactive example</span>
      </div>
      <div className="tally-flow-controls" role="group" aria-label="TallyPrime data direction">
        {Object.entries(modes).map(([key, { label, icon }]) => (
          <button key={key} type="button" aria-pressed={mode === key} onClick={() => setMode(key)}>
            <i className={"bi " + icon} aria-hidden="true" /> {label}
          </button>
        ))}
      </div>
      <div key={mode} className={"tally-flow-map tally-flow-map--" + mode} aria-hidden="true">
        {nodes.map(({ icon, label, note }, index) => (
          <div className="tally-flow-node" key={label}>
            {index > 0 && <i className={"tally-flow-arrow bi " + current.icon} />}
            <i className={"tally-flow-icon bi " + icon} />
            <strong>{label}</strong>
            <small>{note}</small>
          </div>
        ))}
      </div>
      <div className="tally-flow-detail" aria-live="polite" aria-atomic="true">
        <strong>{current.title}</strong>
        <p>{current.detail}</p>
      </div>
    </div>
  );
}