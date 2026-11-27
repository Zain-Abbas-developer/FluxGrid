import { jobRepository } from "../repositories/job.repository";

export const getJobAnalyticsService = async () => {
  const totalJobs = await jobRepository.count();

  return {
    totalJobs,
    completedJobs: 0,
    failedJobs: 0,
    pendingJobs: 0,
    runningJobs: 0,
    successRate: 0,
  };
};

export const getUsageAnalyticsService = async () => {
  const totalJobs = await jobRepository.count();

  return {
    totalRequests: 0,
    totalJobs,
    computeUsage: 0,
    storageUsage: 0,
  };
};

export const getPerformanceAnalyticsService = async () => {
  return {
    averageExecutionTime: 0,
    averageQueueTime: 0,
    throughput: 0,
    errorRate: 0,
  };
};