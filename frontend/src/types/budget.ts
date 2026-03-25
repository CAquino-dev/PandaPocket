export type Budget = {
  _id: string;
  userId: string;
  categoryId: string;
  amount: number;
  month: number;
  year: number;
  spent: number;
};

export type BudgetWithCategory = Omit<Budget, "categoryId"> & {
  categoryId: {
    _id: string;
    name: string;
    type: "income" | "expense";
  };
  spent: number;
};

export type BudgetStatus = "ok" | "warning" | "danger";

export const getBudgetStatus = (spent: number, amount: number): BudgetStatus => {
  const pct = spent / amount;
  if (pct >= 1) return "danger";
  if (pct >= 0.8) return "warning";
  return "ok";
};

export const getBudgetPercentage = (spent: number, amount: number): number => {
  return Math.min(Math.round((spent / amount) * 100), 100);
};

export const getRemainingAmount = (spent: number, amount: number): number => {
  return amount - spent;
};