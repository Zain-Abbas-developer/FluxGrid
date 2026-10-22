import { Queue } from "bullmq";
import { redis } from "../config/redis.js";

export const computeQueue = new Queue("compute", {
  connection: redis,
});