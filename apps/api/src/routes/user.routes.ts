import { Router } from "express";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

import { validate } from "../middleware/validate.middleware";

import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} from "../validators/user.validator";

const router = Router();

router.post(
  "/",
  validate(createUserSchema),
  createUser,
);

router.get("/", getUsers);

router.get(
  "/:id",
  validate(userIdSchema, "params"),
  getUserById,
);

router.patch(
  "/:id",
  validate(userIdSchema, "params"),
  validate(updateUserSchema),
  updateUser,
);

router.delete(
  "/:id",
  validate(userIdSchema, "params"),
  deleteUser,
);

export default router;