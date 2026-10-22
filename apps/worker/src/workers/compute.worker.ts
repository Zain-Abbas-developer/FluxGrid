import { Queue, Worker } from "bullmq";
import { redis } from "../config/redis.js";
import { processComputeJob } from "../processors/compute.processor.js";

const deadLetterQueue = new Queue("dead-letter", {
  connection: redis,
});

export const computeWorker = new Worker(
  "compute",
  processComputeJob,
  {
    connection: redis,
    concurrency: 5,
  }
);

computeWorker.on("failed", async (job, error) => {
  if (!job) return;

  console.error(
    `Compute job ${job.id} failed:`,
    error.message
  );

  const maxAttempts = job.opts.attempts ?? 1;

  if (job.attemptsMade >= maxAttempts) {
    console.log(
      `Moving compute job ${job.id} to DLQ`
    );

    await deadLetterQueue.add("failed-compute-job", {
      originalJobId: job.id,
      jobData: job.data,
      error: error.message,
      attempts: job.attemptsMade,
      failedAt: new Date().toISOString(),
    });

    console.log(
      `Compute job ${job.id} moved to DLQ`
    );
  }
});

computeWorker.on("completed", (job) => {
  console.log(
    `Compute worker completed job: ${job.id}`
  );
});

computeWorker.on("error", (error) => {
  console.error(
    "Compute worker error:",
    error
  );
});

console.log("Compute worker started");