import os from "node:os";

export const getSystemHealthService = async () => {
  return {
    api: {
      status: "healthy",
    },
    database: {
      status: "unknown",
    },
    redis: {
      status: "unknown",
    },
    workers: {
      status: "unknown",
      active: 0,
    },
    timestamp: new Date().toISOString(),
  };
};

export const getSystemMetricsService = async () => {
  return {
    cpu: os.loadavg(),
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
      used: os.totalmem() - os.freemem(),
    },
    uptime: process.uptime(),
    activeWorkers: 0,
    queuedJobs: 0,
  };
};