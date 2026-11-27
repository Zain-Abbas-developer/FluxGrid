import { jobRepository } from "../repositories/job.repository";

export interface CreateJobInput {
  name: string;
  type: string;
  payload: unknown;
  priority?: number;
  timeout?: number;
}

export const createJobService = async (
  input: CreateJobInput,
  userId?: string,
) => {
  const job = await jobRepository.create({
    ...input,
    createdBy: userId,
    status: "pending",
  });

  return job;
};

export const getJobsService = async (options: {
  page?: number;
  limit?: number;
  status?: string;
  userId?: string;
}) => {
  return jobRepository.findMany(options);
};

export const getJobByIdService = async (id: string) => {
  return jobRepository.findById(id);
};

export const getJobStatusService = async (id: string) => {
  const job = await jobRepository.findById(id);

  if (!job) {
    throw new Error("Job not found");
  }

  return {
    id: job._id,
    status: job.status,
  };
};

export const cancelJobService = async (id: string) => {
  const job = await jobRepository.findById(id);

  if (!job) {
    throw new Error("Job not found");
  }

  if (["completed", "failed", "cancelled"].includes(job.status)) {
    throw new Error(`Job cannot be cancelled from ${job.status} state`);
  }

  return jobRepository.updateStatus(id, "cancelled");
};

export const retryJobService = async (id: string) => {
  const job = await jobRepository.findById(id);

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.status !== "failed") {
    throw new Error("Only failed jobs can be retried");
  }

  return jobRepository.updateStatus(id, "pending");
};

export const deleteJobService = async (id: string) => {
  const job = await jobRepository.findById(id);

  if (!job) {
    throw new Error("Job not found");
  }

  return jobRepository.deleteById(id);
};