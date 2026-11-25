# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# flowups.in

## Flagship product: FlowupS API for TallyPrime

FlowupS built a connector application and provides its own APIs to software vendors and developers. Their software calls the FlowupS API to read data from TallyPrime or send data into it. The vendor does not need to build or expose an API for FlowupS to call in this integration model. That direction of integration is the main selling point.

Keep this product prominent on the homepage and first on the Products page. Keep the interactive read/write diagram illustrative. Confirm supported records, endpoints, authentication, and deployment details before documenting them publicly. Refer to the API as a FlowupS product for TallyPrime and avoid claims that TallyPrime has no native integration options or that nobody else offers a connector.

## Enquiry email

Set `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL` in the Vercel project environment. The sender must be on a domain verified in Resend. Enquiries use admin@flowups.in by default. Configure these optional environment variables to send enquiries directly to team inboxes:

- Tally and TDL use ENQUIRY_TDL_INBOX.
- Products use ENQUIRY_PRODUCTS_INBOX.
- Services use ENQUIRY_SERVICES_INBOX.
- Integrations use ENQUIRY_INTEGRATIONS_INBOX.

The team notification includes the visitor’s reply address. After accepting the enquiry, the site sends a confirmation to that address with admin@flowups.in as its reply address. For local delivery, put those values in an untracked `.env.local` and restart Vite.

## Team portraits

Add each approved photo under `src/assets/team/` with the member name in lowercase and words joined by hyphens, for example `ranjit-ambare.webp` or `aniket-sonawane.jpg`. The page loads JPG, JPEG, PNG, WebP and AVIF. Use a single 4:5 portrait per member.
