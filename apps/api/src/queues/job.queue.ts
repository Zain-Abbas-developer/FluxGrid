import { Queue } from "bullmq";
import { redis } from "./redis.js";

export const emailQueue = new Queue("email", {
  connection: redis,
});

export const reportQueue = new Queue("report", {
  connection: redis,
});

export const dataQueue = new Queue("data", {
  connection: redis,
});

export const computeQueue = new Queue("compute", {
  connection: redis,
});