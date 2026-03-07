export interface Category {
  _id: string;
  name: string;
  type: "income" | "expense";
}

export interface Transaction {
  _id: string;
  userId: string;
  type: "income" | "expense";
  amount: number;
  category: {
    _id: string;
    name: string;
    type: "income" | "expense";
  };
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}