import mongoose, { Document, Schema, Types } from "mongoose";

export type TransactionType = "income" | "expense"; 

export interface ITransaction extends Document {
    userId: Types.ObjectId;
    type: TransactionType;
    categoryId: Types.ObjectId;

    amount: number;
    description?: string;

    transactionDate: Date;

    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
    },

    transactionDate: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for faster filtering
TransactionSchema.index({ userId: 1, transactionDate: -1 });

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);