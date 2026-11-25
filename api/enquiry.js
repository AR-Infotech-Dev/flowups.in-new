
/* global process */
import { createHash } from "node:crypto";

const inbox = "admin@flowups.in";
const emailPattern = /^[a-z0-9.!#$%&'*+/=?^_{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i;
const teamSettings = {
  tdl: ["Tally & TDL", "ENQUIRY_TDL_INBOX"],
  product: ["Products", "ENQUIRY_PRODUCTS_INBOX"],
  service: ["Services", "ENQUIRY_SERVICES_INBOX"],
  integration: ["Integrations", "ENQUIRY_INTEGRATIONS_INBOX"],
  general: ["General", ""],
};

function error(status, message) {
  return Response.json({ ok: false, error: message }, { status });
}

function sendEmail(email, apiKey, key) {
  const headers = { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" };
  if (key) headers["Idempotency-Key"] = key;

  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    signal: AbortSignal.timeout(6000),
    body: JSON.stringify(email),
  });
}

async function sendConfirmation(email, sender, apiKey) {
  // Limit automatic confirmations to one per reply address per hour.
  const recipient = email.toLowerCase();
  const hash = createHash("sha256").update(recipient).digest("hex");
  const hour = Math.floor(Date.now() / 3600000);

  try {
    const response = await sendEmail({
      from: sender,
      to: [recipient],
      reply_to: inbox,
      subject: "FlowupS received your enquiry",
      text: "Thank you for contacting FlowupS. We’ve received your enquiry and our team will reply to this email address.\n\nFlowupS Technologies",
    }, apiKey, `flowups-confirmation/${hash}/${hour}`);
    return response.ok;
  } catch {
    return false;
  }
}

export async function POST(request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return error(403, "Please submit your enquiry from the FlowupS website.");
  }
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") {
    return error(415, "Please use the enquiry form.");
  }

  let fields;
  try {
    const raw = await request.text();
    if (raw.length > 24000) return error(413, "Your message is too long.");
    fields = JSON.parse(raw);
  } catch {
    return error(400, "Please check your enquiry details and try again.");
  }

  const value = (key) => typeof fields?.[key] === "string" ? fields[key].trim() : "";
  const name = value("name");
  const email = value("email");
  const subject = value("subject");
  const message = value("message");
  const module = value("module");
  const requestedRoute = value("route");
  if (value("companyWebsite")) return error(400, "Please check your enquiry details and try again.");
  if (!name || name.length > 100 || !emailPattern.test(email) || email.length > 254 ||
      !subject || subject.length > 180 || /[\r\n]/.test(subject) || !message ||
      message.length > 4000 || module.length > 150) {
    return error(400, "Please enter a valid name, email, subject, and message.");
  }

  const { RESEND_API_KEY, ENQUIRY_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_FROM_EMAIL) {
    return error(503, "The online form is temporarily unavailable. Please email admin@flowups.in or call us.");
  }

  const route = module ? "tdl" : requestedRoute;
  const [team, inboxSetting] = Object.hasOwn(teamSettings, route) ? teamSettings[route] : teamSettings.general;
  const teamInbox = inboxSetting ? process.env[inboxSetting]?.trim() : undefined;
  const to = teamInbox && emailPattern.test(teamInbox) ? teamInbox : inbox;
  const id = request.headers.get("idempotency-key");
  const key = id && /^[\da-f-]{36}$/i.test(id) ? `flowups-enquiry/${id}` : undefined;

  try {
    const result = await sendEmail({
      from: ENQUIRY_FROM_EMAIL,
      to: [to],
      reply_to: email,
      subject: `[${team}] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        ...(module ? [`TDL module: ${module}`] : []),
        "",
        message,
      ].join("\n"),
    }, RESEND_API_KEY, key);

    if (result.ok) {
      const confirmationSent = email.toLowerCase() === to.toLowerCase()
        ? false
        : await sendConfirmation(email, ENQUIRY_FROM_EMAIL, RESEND_API_KEY);
      return Response.json({ ok: true, confirmationSent });
    }
    if (result.status === 429) return error(429, "Please wait a moment and try again.");
  } catch {
    return error(502, "We couldn’t confirm your enquiry was sent. Please try again.");
  }
  return error(502, "Your enquiry couldn’t be sent. Please try again or email admin@flowups.in.");
}
