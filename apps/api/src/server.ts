import express from "express";
import {
  emailQueue,
  reportQueue,
  dataQueue,
  computeQueue,
} from "./queues/job.queue.js";
import { deadLetterQueue } from './queues/DLQ.js'
import { connectDatabase } from "./config/database.js";
import { Job } from "./models/job.model.js";

const app = express();

const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

await connectDatabase();

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    service: "fluxgrid-api",
  });
});

app.post("/api/v1/jobs", async (req, res) => {
  try {
    const job = await Job.create({
      organizationId: "demo-org",
      type: req.body.type,
      payload: req.body,
      status: "pending",
    });

    const jobData = {
  jobId: job._id.toString(),
  type: job.type,
  payload: job.payload,
};

const jobOptions = {
  attempts: 3,
  backoff: {
    type: "exponential" as const,
    delay: 1000,
  },
  removeOnComplete: 1000,
  removeOnFail: false,
};

switch (job.type) {
  case "email":
    await emailQueue.add("process-email", jobData, jobOptions);
    break;

  case "report":
    await reportQueue.add("process-report", jobData, jobOptions);
    break;

  case "data":
    await dataQueue.add("process-data", jobData, jobOptions);
    break;

  case "compute":
    await computeQueue.add("process-compute", jobData, jobOptions);
    break;

  default:
    throw new Error(`Unsupported job type: ${job.type}`);
}

    job.status = "queued";
    await job.save();

    res.status(202).json({
      success: true,
      data: {
        jobId: job._id,
        status: "queued",
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to queue job",
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});