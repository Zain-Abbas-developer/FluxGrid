import { connectDatabase } from "./config/database.js";
import { emailWorker } from "./workers/email.worker.js";
import { computeWorker } from "./workers/compute.worker.js";

async function startWorker() {
  try {
    await connectDatabase();

    console.log("FluxGrid Worker started");
    console.log("Email worker is listening...");
    console.log("Compute worker is listening...");
  } catch (error) {
    console.error("Failed to start worker:", error);
    process.exit(1);
  }
}

await startWorker();

async function shutdown(signal: string) {
  console.log(`${signal} received. Shutting down workers...`);

  await Promise.all([
    emailWorker.close(),
    computeWorker.close(),
  ]);

  console.log("Workers shutdown complete");

  process.exit(0);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));