import type { Transaction } from "../../types/transactions";
import { formatCurrency } from "../../lib/format";
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from "lucide-react";

interface Props {
  transactions: Transaction[];
}

const TransactionSummary = ({ transactions }: Props) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  if (transactions.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <ArrowUpCircle className="w-5 h-5 text-[var(--color-money)]" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Income</p>
            <p className="text-xl font-semibold text-[var(--color-money)]">
              {formatCurrency(totalIncome)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 dark:bg-red-950/30 rounded-lg">
            <ArrowDownCircle className="w-5 h-5 text-[var(--color-expense)]" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-xl font-semibold text-[var(--color-expense)]">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              balance >= 0
                ? "bg-green-50 dark:bg-green-950/30"
                : "bg-red-50 dark:bg-red-950/30"
            }`}
          >
            <DollarSign
              className={`w-5 h-5 ${
                balance >= 0
                  ? "text-[var(--color-money)]"
                  : "text-[var(--color-expense)]"
              }`}
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Balance</p>
            <p
              className={`text-xl font-semibold ${
                balance >= 0
                  ? "text-[var(--color-money)]"
                  : "text-[var(--color-expense)]"
              }`}
            >
              {formatCurrency(balance)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;
