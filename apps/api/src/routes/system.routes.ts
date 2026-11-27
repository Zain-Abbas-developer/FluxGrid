import { Router } from "express";

import {
  getSystemHealth,
  getSystemMetrics,
} from "../controllers/system.controller";

const router = Router();

router.get("/health", getSystemHealth);

router.get("/metrics", getSystemMetrics);

export default router;