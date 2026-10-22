import mongoose, { Schema } from 'mongoose';

const jobSchema = new Schema({
    organizationId: {
        type: String,
        required: true,
        index: true,
    },

    type: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: [
            "pending",
            "queued",
            "processing",
            "completed",
            "failed",
            "cancelled",
        ],
        default: "pending",
        index: true,
    },

    payload: {
        type: Schema.Types.Mixed,
        required: true,
    },

    attempts: {
        type: Number,
        default: 0,
    },

    maxAttempts: {
        type: Number,
        default: 3,
    },

    result: {
        type: Schema.Types.Mixed,
    },

    error: {
        type: String,
    },

    startedAt: Date,
    completedAt: Date,

}, { timestamps: true });

export const Job = mongoose.model('Job', jobSchema);