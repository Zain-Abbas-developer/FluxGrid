import mongoose from "mongoose";

export const getHealthService = async () => {
  const database =
    mongoose.connection.readyState === 1 ? "healthy" : "unhealthy";

  return {
    status: database === "healthy" ? "ok" : "degraded",
    service: "fluxgrid-api",
    database,
    timestamp: new Date().toISOString(),
  };
};

export const getReadinessService = async () => {
  const database = mongoose.connection.readyState === 1;

  return {
    ready: database,
    checks: {
      database: database ? "healthy" : "unhealthy",
      redis: "unknown",
    },
  };
};

export const getLivenessService = async () => {
  return {
    alive: true,
    timestamp: new Date().toISOString(),
  };
};