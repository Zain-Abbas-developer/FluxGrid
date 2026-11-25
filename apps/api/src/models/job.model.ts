import mongoose, { Document, Schema } from "mongoose";

export type JobStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled";

export interface IJob extends Document {
  organizationId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;

  name: string;
  description?: string;

  status: JobStatus;

  priority: number;

  retryCount: number;

  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    status: {
      type: String,
      enum: [
        "queued",
        "running",
        "completed",
        "failed",
        "cancelled",
      ],
      default: "queued",
      index: true,
    },

    priority: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    retryCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.index({ organizationId: 1, status: 1 });
jobSchema.index({ createdAt: -1 });

export const Job = mongoose.model<IJob>("Job", jobSchema);