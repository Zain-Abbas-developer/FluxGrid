import mongoose from "mongoose";

const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
        },
        password: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          enum: [
            "SUPER_ADMIN",
            "ORG_ADMIN",
            "OPERATOR",
            "ANALYST",
            "GUEST",
          ],
          default: "GUEST",
        },
      },
      {
        timestamps: true,
      },
    ),
  );

export const userRepository = {
  async create(data: Record<string, unknown>) {
    return User.create(data);
  },

  async findByEmail(email: string) {
    return User.findOne({
      email: email.toLowerCase(),
    });
  },

  async findById(id: string) {
    return User.findById(id).select("-password");
  },

  async findMany(options: {
    page?: number;
    limit?: number;
  }) {
    const page = Math.max(options.page ?? 1, 1);
    const limit = Math.min(options.limit ?? 20, 100);
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find().select("-password").skip(skip).limit(limit),
      User.countDocuments(),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  },

  async updateById(id: string, data: Record<string, unknown>) {
    return User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).select("-password");
  },

  async deleteById(id: string) {
    return User.findByIdAndDelete(id).select("-password");
  },

  async count() {
    return User.countDocuments();
  },
};