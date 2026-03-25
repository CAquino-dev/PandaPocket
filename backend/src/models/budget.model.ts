import mongoose, { Document, Schema, Types } from "mongoose";

export interface IBudget extends Document {
    userId: mongoose.Types.ObjectId;
    categoryId: mongoose.Types.ObjectId;
    amount: number;
    month: number;
    year: number;
}

const budgetSchema = new Schema<IBudget>(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        month: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

budgetSchema.index({ userId: 1, categoryId: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model<IBudget>("Budget", budgetSchema);