import mongoose, { Document, Schema } from "mongoose";

export type ExecutionStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled";

export interface IExecution extends Document {
  jobId: mongoose.Types.ObjectId;

  status: ExecutionStatus;

  startedAt?: Date;
  completedAt?: Date;

  error?: string;

  result?: unknown;

  createdAt: Date;
  updatedAt: Date;
}

const executionSchema = new Schema<IExecution>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
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

    startedAt: Date,

    completedAt: Date,

    error: {
      type: String,
    },

    result: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

executionSchema.index({ jobId: 1, createdAt: -1 });

export const Execution =
  mongoose.model<IExecution>("Execution", executionSchema);