import { Router } from "express";

import {
  getJobAnalytics,
  getUsageAnalytics,
  getPerformanceAnalytics,
} from "../controllers/analytics.controller";

const router = Router();

router.get("/jobs", getJobAnalytics);

router.get("/usage", getUsageAnalytics);

router.get(
  "/performance",
  getPerformanceAnalytics,
);

export default router;