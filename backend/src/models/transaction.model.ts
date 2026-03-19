import mongoose, { Document, Schema, Types } from "mongoose";
import { CategoryType } from "../models/category.model"; 

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  accountId: mongoose.Types.ObjectId;
  type: CategoryType;
  amount: number;
  category: mongoose.Types.ObjectId; // reference
  description?: string;
  date: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, 
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Accounts",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: String,
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>("Transaction",transactionSchema);