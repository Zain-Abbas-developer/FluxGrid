import mongoose from "mongoose";

const Organization =
  mongoose.models.Organization ||
  mongoose.model(
    "Organization",
    new mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        slug: {
          type: String,
          unique: true,
          sparse: true,
          lowercase: true,
          trim: true,
        },
        ownerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
      {
        timestamps: true,
      },
    ),
  );

export const organizationRepository = {
  async create(data: Record<string, unknown>) {
    return Organization.create(data);
  },

  async findMany() {
    return Organization.find().sort({
      createdAt: -1,
    });
  },

  async findById(id: string) {
    return Organization.findById(id);
  },

  async updateById(id: string, data: Record<string, unknown>) {
    return Organization.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  },

  async deleteById(id: string) {
    return Organization.findByIdAndDelete(id);
  },

  async count() {
    return Organization.countDocuments();
  },
};