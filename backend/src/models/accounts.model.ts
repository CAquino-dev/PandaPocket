import mongoose, { Document, Schema } from "mongoose";

export type accountType = "ewallet" | "bank" | "cash" | "savings" | "credit";

export interface IAccount extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  type: accountType;
  balance: number;
  currency: string;
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["ewallet", "bank", "cash", "savings", "credit"],
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    currency: {
      type: String,
      required: true,
      default: "PHP",
    },
  },
  { timestamps: true }
);

AccountSchema.index({ userId: 1, name: 1 }, { unique: true });

export default mongoose.model<IAccount>("Accounts", AccountSchema);