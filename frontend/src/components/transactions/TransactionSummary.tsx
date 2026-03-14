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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {/* Income Card */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-green-50 dark:bg-green-950/30 rounded-lg shrink-0">
            <ArrowUpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-money)]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              Total Income
            </p>
            <p className="text-base sm:text-xl font-semibold text-[var(--color-money)] truncate">
              {formatCurrency(totalIncome)}
            </p>
          </div>
        </div>
      </div>

      {/* Expenses Card */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-red-50 dark:bg-red-950/30 rounded-lg shrink-0">
            <ArrowDownCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-expense)]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              Total Expenses
            </p>
            <p className="text-base sm:text-xl font-semibold text-[var(--color-expense)] truncate">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-5 col-span-1 sm:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`p-1.5 sm:p-2 rounded-lg shrink-0 ${
              balance >= 0
                ? "bg-green-50 dark:bg-green-950/30"
                : "bg-red-50 dark:bg-red-950/30"
            }`}
          >
            <DollarSign
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                balance >= 0
                  ? "text-[var(--color-money)]"
                  : "text-[var(--color-expense)]"
              }`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              Balance
            </p>
            <p
              className={`text-base sm:text-xl font-semibold truncate ${
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
