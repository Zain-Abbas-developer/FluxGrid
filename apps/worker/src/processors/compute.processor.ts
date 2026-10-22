import { Job as BullJob } from "bullmq";
import { Job } from "../models/job.model.js";

const PYTHON_SERVICE_URL =
  process.env.PYTHON_SERVICE_URL || "http://compute-python:8000";

export async function processComputeJob(bullJob: BullJob) {
  console.log("Processing compute job:", bullJob.id);
  console.log("Attempt:", bullJob.attemptsMade + 1);
  console.log("Data:", bullJob.data);

  const { jobId, type, payload } = bullJob.data;

  if (!jobId) {
    throw new Error("jobId is required");
  }

  await Job.findByIdAndUpdate(jobId, {
    status: "processing",
    attempts: bullJob.attemptsMade + 1,
    startedAt: new Date(),
  });

  try {
    const response = await fetch(`${PYTHON_SERVICE_URL}/compute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job_id: jobId,
        type,
        payload,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Python service returned HTTP ${response.status}`
      );
    }

    const result = await response.json();

    await Job.findByIdAndUpdate(jobId, {
      status: "completed",
      completedAt: new Date(),
      result,
      error: null,
    });

    console.log("Compute job completed:", bullJob.id);

    return result;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    const currentAttempt = bullJob.attemptsMade + 1;
    const maxAttempts = bullJob.opts.attempts ?? 1;

    console.error(
      `Compute job failed - attempt ${currentAttempt}/${maxAttempts}:`,
      message
    );

    if (currentAttempt >= maxAttempts) {
      await Job.findByIdAndUpdate(jobId, {
        status: "failed",
        error: message,
      });

      console.error(
        `Compute job permanently failed: ${bullJob.id}`
      );
    } else {
      await Job.findByIdAndUpdate(jobId, {
        status: "queued",
        error: message,
      });

      console.log(
        `Compute job will retry: ${bullJob.id}`
      );
    }

    throw error;
  }
}