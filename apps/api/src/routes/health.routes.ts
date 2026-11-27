import { Router } from "express";

import {
  healthCheck,
  readinessCheck,
  livenessCheck,
} from "../controllers/health.controller";

const router = Router();

router.get("/", healthCheck);

router.get("/live", livenessCheck);

router.get("/ready", readinessCheck);

export default router;