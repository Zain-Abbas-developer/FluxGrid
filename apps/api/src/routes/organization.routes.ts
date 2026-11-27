import { Router } from "express";

import {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from "../controllers/organization.controller";

import { validate } from "../middleware/validate.middleware";

import {
  createOrganizationSchema,
  updateOrganizationSchema,
  organizationIdSchema,
} from "../validators/organization.validator";

const router = Router();

router.post(
  "/",
  validate(createOrganizationSchema),
  createOrganization,
);

router.get("/", getOrganizations);

router.get(
  "/:id",
  validate(organizationIdSchema, "params"),
  getOrganizationById,
);

router.patch(
  "/:id",
  validate(organizationIdSchema, "params"),
  validate(updateOrganizationSchema),
  updateOrganization,
);

router.delete(
  "/:id",
  validate(organizationIdSchema, "params"),
  deleteOrganization,
);

export default router;