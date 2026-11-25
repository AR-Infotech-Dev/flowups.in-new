
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { POST as sendEnquiry } from "./api/enquiry.js";

function localEnquiry() {
  return {
    name: "flowups-local-enquiry",
    configureServer(server) {
      server.middlewares.use("/api/enquiry", async (req, res) => {
        if (req.method !== "POST") {
          res.writeHead(405, { Allow: "POST" }).end();
          return;
        }

        try {
          const request = new Request(`http://${req.headers.host}/api/enquiry`, {
            method: "POST",
            headers: req.headers,
            body: req,
            duplex: "half",
          });
          const response = await sendEnquiry(request);
          res.writeHead(response.status, { "Content-Type": "application/json" });
          res.end(await response.text());
        } catch {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: false, error: "The online form is temporarily unavailable." }));
        }
      });
    },
  };
}

/* global process */
export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    const env = loadEnv(mode, process.cwd(), ["RESEND_API_KEY", "ENQUIRY_"]);
    for (const [name, value] of Object.entries(env)) process.env[name] ??= value;
  }
  return { plugins: [react(), tailwindcss(), localEnquiry()] };
});
