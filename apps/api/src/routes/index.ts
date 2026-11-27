import { Router } from "express";

import authRoutes from "./auth.routes";
import jobRoutes from "./job.routes";
import userRoutes from "./user.routes";
import organizationRoutes from "./organization.routes";
import adminRoutes from "./admin.routes";
import analyticsRoutes from "./analytics.routes";
import healthRoutes from "./health.routes";
import systemRoutes from "./system.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);
router.use("/users", userRoutes);
router.use("/organizations", organizationRoutes);
router.use("/admin", adminRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/health", healthRoutes);
router.use("/system", systemRoutes);

export default router;