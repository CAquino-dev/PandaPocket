export type Summary = {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate: number;
};

export type OverviewData = {
  month: string;
  income: number;
  expenses: number;
};

export type CategoryBreakdown = {
  category: string;
  total: number;
};