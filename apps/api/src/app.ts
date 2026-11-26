import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";

const app: Express = express();

/*
 * Security
 */
app.use(helmet());

/*
 * CORS
 */
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  })
);

/*
 * Body parsing
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
 * Health Check
 */
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "FluxGrid API is running",
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

/*
 * 404 Handler
 */
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
