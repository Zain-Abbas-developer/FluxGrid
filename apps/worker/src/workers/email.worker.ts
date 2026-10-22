import { Worker } from "bullmq";
import { redis } from "../config/redis.js";
import { processEmailJob } from "../processors/email.processor.js";

export const emailWorker = new Worker(
  "email",
  processEmailJob,
  {
    connection: redis,
    concurrency: 5,
  }
);

emailWorker.on("completed", (job) => {
  console.log(`Email worker completed job: ${job.id}`);
});

emailWorker.on("failed", (job, error) => {
  console.error(
    `Email job ${job?.id} failed:`,
    error.message
  );
});

emailWorker.on("error", (error) => {
  console.error("Email worker error:", error);
});

console.log("Email worker started");