
export const featuredTdlModules = [
  {
    id: "warehouse-cold-storage", category: "Industry solutions", icon: "bi-box-seam",
    title: "Warehouse & Cold Storage",
    description: "Discuss a Tally workflow for stock receipts, storage locations, dispatches, and storage billing.",
  },
  {
    id: "school-college", category: "Industry solutions", icon: "bi-mortarboard",
    title: "School & College ERP",
    description: "Manage student records, fees, receipts, and accounting in Tally.",
    detailId: "school_college",
  },
  {
    id: "hospital", category: "Industry solutions", icon: "bi-heart-pulse",
    title: "Hospital Management",
    description: "Manage patient records, hospital billing, and operational reports in Tally.",
    detailId: "hospital_management",
  },
  {
    id: "petrol-pump", category: "Industry solutions", icon: "bi-fuel-pump",
    title: "Petrol Pump Management",
    description: "Track fuel purchases, sales, stock, and daily pump operations.",
    detailId: "petrol_pump",
  },
  {
    id: "apmc", category: "Industry solutions", icon: "bi-shop",
    title: "APMC / ADA Market Management",
    description: "Manage agricultural market transactions, commissions, and party accounts in Tally.",
    detailId: "apmc_ada",
  },
  {
    id: "glass", category: "Industry solutions", icon: "bi-grid-3x3-gap",
    title: "Glass Module",
    description: "Discuss a Tally setup for your glass inventory, measurements, and billing workflow.",
  },
  {
    id: "gst-reconciliation", category: "GST & tax", icon: "bi-file-earmark-check",
    title: "GST Return Reconciliation",
    description: "Compare Tally transactions with GSTR-1, GSTR-2A, and GSTR-2B data to identify mismatches.",
  },
  {
    id: "excel-import", category: "Data import & integration", icon: "bi-file-earmark-spreadsheet",
    title: "Excel to Tally Import",
    description: "Import spreadsheet data such as sales, receipts, payments, and ledger masters into Tally.",
  },
  {
    id: "voucher-approvals", category: "Controls & approvals", icon: "bi-shield-check",
    title: "Maker–Checker Voucher Approval",
    description: "Assign separate roles for voucher entry, review, and approval, with controls by user.",
  },
  {
    id: "msme-outstandings", category: "Reports & receivables", icon: "bi-calendar-check",
    title: "MSME Supplier Outstandings",
    description: "Review unpaid MSME supplier bills and their ageing in Tally.",
  },
  {
    id: "purchase-indent", category: "Inventory & purchasing", icon: "bi-clipboard-check",
    title: "Purchase Indent & Material Requirement",
    description: "Record internal material requirements and track purchase requests before ordering.",
    detailId: "purchase_note",
  },
  {
    id: "broker-commission", category: "Billing & sales", icon: "bi-people",
    title: "Salesperson & Broker Commission",
    description: "Track sales and receipts by salesperson, agent, or broker and review commissions.",
    detailId: "broker_salesman",
  },
  {
    id: "bank-import", category: "Data import & integration", icon: "bi-bank",
    title: "Bank Statement Import",
    description: "Import bank transactions and use narration or ledger information to help match entries.",
    detailId: "bank_statement",
  },
  {
    id: "inter-company-transfer", category: "Data import & integration", icon: "bi-arrow-left-right",
    title: "Intercompany Data Transfer",
    description: "Transfer selected records or batches of entries between Tally companies.",
  },
  {
    id: "job-work", category: "Inventory & purchasing", icon: "bi-box-seam",
    title: "Job Work & Material Movement",
    description: "Track material sent out and received back for job work using material movement vouchers.",
  },
  {
    id: "tds-tcs", category: "GST & tax", icon: "bi-calculator",
    title: "TDS & TCS Entries and Reports",
    description: "Record TDS and TCS entries and review deduction, collection, and ledger summaries.",
  },
  {
    id: "outstanding-ageing", category: "Reports & receivables", icon: "bi-bar-chart-line",
    title: "FIFO & Age-wise Outstandings",
    description: "Review receivable and payable balances by age and allocate receipts against earlier bills first.",
  },
  {
    id: "garment-barcode", category: "Industry solutions", icon: "bi-upc-scan",
    title: "Garment Inventory & Barcodes",
    description: "Track garment stock by variant and use barcodes in day-to-day inventory and billing workflows.",
    detailId: "wholesale_garment",
  },
  {
    id: "document-email", category: "Documents & communication", icon: "bi-envelope-paper",
    title: "Scheduled Email & Document Attachments",
    description: "Send selected ledgers, vouchers, and reports by email and attach documents where needed.",
    detailId: "auto_email",
  },
  {
    id: "invoice-formats", category: "Billing & sales", icon: "bi-receipt",
    title: "Custom Invoice & POS Formats",
    description: "Adapt invoice layouts and fields or print compact POS bills from Tally sales entries.",
    detailId: "normal_pos",
  },
  {
    id: "voucher-lock", category: "Controls & approvals", icon: "bi-lock",
    title: "Voucher, Master & Date Locks",
    description: "Control who can edit transactions and masters and restrict changes for selected dates.",
  },
];

export function modulePath(id) {
  return `/services/customization/${id}`;
}

export function moduleEnquiry(title, route = "general") {
  return `/contact-us?${new URLSearchParams({ subject: title, route })}#enquiry`;
}

export function tdlEnquiry(title) {
  return '/contact-us?' + new URLSearchParams({ module: title }) + '#enquiry';
}