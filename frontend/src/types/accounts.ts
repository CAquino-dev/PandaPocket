export type AccountType = "cash" | "bank" | "savings" | "ewallet" | "credit";

export interface IAccount {
  _id: string;
  userId: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}