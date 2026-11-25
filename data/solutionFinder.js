
import { salesProductionCrm, softwareProjects, tallyApi } from "./softwareProjects.js";
import { tdlCatalogue } from "./tdlCatalogue.js";
import { modulePath } from "./tdlModules.js";

export const industries = {
  manufacturing: "Manufacturing",
  trade: "Wholesale & retail",
  storage: "Warehouse & cold storage",
  healthcare: "Healthcare",
  education: "Education",
  agriculture: "Agriculture & APMC",
  other: "Other industry",
};

export const goals = {
  production: "Track orders and production",
  customers: "Manage customer requests and follow-ups",
  connect: "Connect business systems",
  inventory: "Manage stock and purchasing",
  accounts: "Simplify billing and accounting",
};

export const tallyOptions = {
  using: "We use TallyPrime",
  considering: "We’re considering TallyPrime",
  no: "We use other software",
};

const products = {
  [salesProductionCrm.id]: {
    title: salesProductionCrm.title,
    type: "Product",
    description: "Follow sales enquiries, confirmed orders, and production progress in one workflow.",
    to: "/product#sales-production-crm",
  },
  calldesk: {
    title: "CallDesk",
    type: "Product",
    description: "Track customer requests, follow-ups, and service tickets in one workspace.",
    to: "/product#products",
  },
  [tallyApi.id]: {
    title: tallyApi.title,
    description: tallyApi.description,
    type: "Product",
    route: "integration",
    to: tallyApi.to,
  },
  ...Object.fromEntries(softwareProjects.map(({ id, title, description, status }) => [
    id, { title, description, status, type: "Product", to: "/product#" + id },
  ])),
  custom: {
    title: "Custom Software Development",
    type: "Service",
    description: "Build a web app, mobile app, or business system around your team’s workflow.",
    to: "/services/crm",
  },
  automation: {
    title: "Business Process Automation",
    type: "Service",
    description: "Connect existing tools and automate recurring tasks, reports, and handoffs.",
    to: "/services/business_process_automation",
  },
};

const productsByGoal = {
  production: ["sales-production-crm", "custom"],
  customers: ["calldesk", "custom"],
  connect: ["automation", "custom"],
  inventory: ["custom", "automation"],
  accounts: ["automation", "custom"],
};

const modulesByGoal = {
  production: ["production-planning", "manufacturing-stock-journals"],
  customers: ["document-email", "whatsapp-document-sharing"],
  connect: ["api_integration", "excel-import"],
  inventory: ["godown-wise-stock-and-transfers", "purchase-indent"],
  accounts: ["gst-reconciliation", "bank-import"],
};

const industryMatches = {
  trade: { inventory: "garment-barcode", accounts: "invoice-formats" },
  storage: { inventory: "warehouse-cold-storage", accounts: "warehouse-cold-storage" },
  healthcare: { customers: "hospital", accounts: "hospital" },
  education: { accounts: "school-college" },
  agriculture: { inventory: "apmc", accounts: "apmc" },
};

const modulesById = new Map(tdlCatalogue.map((module) => [module.id, module]));

export function findSolutions({ industry, goal, tally }) {
  if (!Object.hasOwn(industries, industry) || !Object.hasOwn(goals, goal) || !Object.hasOwn(tallyOptions, tally)) return [];

  const productIds = [...productsByGoal[goal]];
  if (goal === "customers" && industry === "healthcare") productIds.unshift("opd-desk");
  if (tally === "using" && goal === "production") productIds.splice(1, 0, "order-management");
  if (tally !== "no" && goal === "connect") productIds.unshift(tallyApi.id);

  const matches = productIds.map((id) => ({ id, ...products[id] }));
  if (tally === "no") return matches;

  const industryModule = industryMatches[industry]?.[goal];
  const moduleIds = [...new Set([industryModule, ...modulesByGoal[goal]].filter(Boolean))];
  return matches.concat(moduleIds.map((id) => {
    const { title, detailId, description, category } = modulesById.get(id);
    return {
      id,
      title,
      type: "TDL module",
      description: description || category,
      to: detailId ? modulePath(detailId) : "/tdl-modules?" + new URLSearchParams({ q: title }) + "#tdl-catalog",
    };
  }));
}

export function solutionEnquiry(selection, solutionId) {
  return "/contact-us?" + new URLSearchParams({ ...selection, solution: solutionId }) + "#enquiry";
}

export const requirementBriefLimit = 1500;

export function getSolutionDraft(params, brief = "") {
  const selection = {
    industry: params.get("industry"),
    goal: params.get("goal"),
    tally: params.get("tally"),
  };
  const solution = findSolutions(selection).find(({ id }) => id === params.get("solution"));
  if (!solution) return null;

  const industry = industries[selection.industry];
  const goal = goals[selection.goal];
  const tally = tallyOptions[selection.tally];
  return {
    title: solution.title,
    route: solution.route ?? (solution.type === "TDL module" ? "tdl" : solution.type.toLowerCase()),
    subject: solution.title + " enquiry",
    message: [
      "Hi FlowupS, I’d like to discuss " + solution.title + " for our business.",
      "",
      "Industry: " + industry,
      "What we want to do: " + goal,
      "Current setup: " + tally,
      ...(brief ? ["", "Requirement:", brief] : []),
    ].join("\n"),
  };
}
