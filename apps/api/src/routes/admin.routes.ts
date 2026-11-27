import { Router } from "express";

import {
  getSystemOverview,
  getSystemUsers,
  getSystemOrganizations,
} from "../controllers/admin.controller";

const router = Router();

router.get("/overview", getSystemOverview);

router.get("/users", getSystemUsers);

router.get(
  "/organizations",
  getSystemOrganizations,
);

export default router;