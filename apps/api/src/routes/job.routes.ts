import { Router } from "express";
import {
  createJob,
  getJobs,
  getJobById,
  getJobStatus,
  cancelJob,
  retryJob,
  deleteJob,
} from "../controllers/job.controller";

import { validate } from "../middleware/validate.middleware";

import {
  createJobSchema,
  jobIdSchema,
  jobQuerySchema,
} from "../validators/job.validator";

const router = Router();

router.post(
  "/",
  validate(createJobSchema),
  createJob,
);

router.get(
  "/",
  validate(jobQuerySchema, "query"),
  getJobs,
);

router.get(
  "/:id",
  validate(jobIdSchema, "params"),
  getJobById,
);

router.get(
  "/:id/status",
  validate(jobIdSchema, "params"),
  getJobStatus,
);

router.post(
  "/:id/cancel",
  validate(jobIdSchema, "params"),
  cancelJob,
);

router.post(
  "/:id/retry",
  validate(jobIdSchema, "params"),
  retryJob,
);

router.delete(
  "/:id",
  validate(jobIdSchema, "params"),
  deleteJob,
);

export default router;