import Job from "../models/job.model";

export const jobRepository = {
  async create(data: Record<string, unknown>) {
    return Job.create(data);
  },

  async findById(id: string) {
    return Job.findById(id);
  },

  async findMany(options: {
    page?: number;
    limit?: number;
    status?: string;
    userId?: string;
  }) {
    const page = Math.max(options.page ?? 1, 1);
    const limit = Math.min(options.limit ?? 20, 100);
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (options.status) {
      filter.status = options.status;
    }

    if (options.userId) {
      filter.createdBy = options.userId;
    }

    const [jobs, total] = await Promise.all([
      Job.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Job.countDocuments(filter),
    ]);

    return {
      jobs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  },

  async updateStatus(id: string, status: string) {
    return Job.findByIdAndUpdate(
      id,
      {
        status,
        updatedAt: new Date(),
      },
      {
        new: true,
      },
    );
  },

  async deleteById(id: string) {
    return Job.findByIdAndDelete(id);
  },

  async count() {
    return Job.countDocuments();
  },
};