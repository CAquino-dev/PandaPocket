import mongoose, { Document, Schema, Types } from "mongoose";

export type CategoryType = "income" | "expense";

export interface ICategory extends Document {
  userId?: Types.ObjectId | null;
  name: string;
  type: CategoryType;

  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null, // NULL = system category
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// prevent duplicates
CategorySchema.index(
  { userId: 1, name: 1, type: 1 },
  { unique: true }
);

export default mongoose.model<ICategory>("Category", CategorySchema);