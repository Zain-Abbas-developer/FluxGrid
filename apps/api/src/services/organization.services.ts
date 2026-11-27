import { organizationRepository } from "../repositories/organization.repository";

export const createOrganizationService = async (data: {
  name: string;
  slug?: string;
  ownerId?: string;
}) => {
  return organizationRepository.create(data);
};

export const getOrganizationsService = async () => {
  return organizationRepository.findMany();
};

export const getOrganizationByIdService = async (id: string) => {
  const organization = await organizationRepository.findById(id);

  if (!organization) {
    throw new Error("Organization not found");
  }

  return organization;
};

export const updateOrganizationService = async (
  id: string,
  data: Record<string, unknown>,
) => {
  const organization = await organizationRepository.findById(id);

  if (!organization) {
    throw new Error("Organization not found");
  }

  return organizationRepository.updateById(id, data);
};

export const deleteOrganizationService = async (id: string) => {
  const organization = await organizationRepository.findById(id);

  if (!organization) {
    throw new Error("Organization not found");
  }

  return organizationRepository.deleteById(id);
};