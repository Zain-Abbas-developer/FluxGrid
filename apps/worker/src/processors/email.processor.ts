import { Job as BullJob } from "bullmq";
import { Job } from "../models/job.model.js";

export async function processEmailJob(bullJob: BullJob) {
  console.log("Processing email job:", bullJob.id);
  console.log("Data:", bullJob.data);

  const { jobId } = bullJob.data;

  if (!jobId) {
    throw new Error("jobId is required");
  }

  await Job.findByIdAndUpdate(jobId, {
    status: "processing",
    attempts: bullJob.attemptsMade + 1,
    startedAt: new Date(),
  });

  // Simulate email processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await Job.findByIdAndUpdate(jobId, {
    status: "completed",
    completedAt: new Date(),
    result: {
      success: true,
      message: "Email processed successfully",
    },
  });

  console.log("Email job completed:", bullJob.id);

  return {
    success: true,
  };
}