import type { Request, Response, NextFunction } from "express";

export const healthCheck = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      status: "ok",
      service: "fluxgrid-api",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const readinessCheck = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      status: "ready",
      checks: {
        database: "unknown",
        redis: "unknown",
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const livenessCheck = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      status: "alive",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};