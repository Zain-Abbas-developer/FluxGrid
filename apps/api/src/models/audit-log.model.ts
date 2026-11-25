import mongoose, { Document, Schema } from "mongoose";

export interface IAuditLog extends Document {
  organizationId?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;

  action: string;
  resource?: string;
  resourceId?: string;

  metadata?: Record<string, unknown>;

  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    action: {
      type: String,
      required: true,
      trim: true,
    },

    resource: {
      type: String,
      trim: true,
    },

    resourceId: {
      type: String,
      trim: true,
    },

    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

auditLogSchema.index({ createdAt: -1 });

export const AuditLog =
  mongoose.model<IAuditLog>("AuditLog", auditLogSchema);