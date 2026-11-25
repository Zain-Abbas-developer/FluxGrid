import mongoose, { Document, Schema } from "mongoose";

export type UserRole =
  | "super_admin"
  | "organization_admin"
  | "operator"
  | "analyst"
  | "guest";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  organizationId?: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
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
      minlength: 8,
    },

    role: {
      type: String,
      enum: [
        "super_admin",
        "organization_admin",
        "operator",
        "analyst",
        "guest",
      ],
      default: "guest",
    },

    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);