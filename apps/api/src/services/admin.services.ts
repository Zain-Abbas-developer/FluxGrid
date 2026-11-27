import { userRepository } from "../repositories/user.repository";
import { organizationRepository } from "../repositories/organization.repository";
import { jobRepository } from "../repositories/job.repository";

export const getSystemOverviewService = async () => {
  const [users, organizations, jobs] = await Promise.all([
    userRepository.count(),
    organizationRepository.count(),
    jobRepository.count(),
  ]);

  return {
    users,
    organizations,
    jobs,
    activeJobs: 0,
    failedJobs: 0,
    workers: 0,
  };
};

export const getSystemUsersService = async () => {
  return userRepository.findMany({
    page: 1,
    limit: 100,
  });
};

export const getSystemOrganizationsService = async () => {
  return organizationRepository.findMany();
};