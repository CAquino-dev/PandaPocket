import type { Transaction } from "../../types/transactions";
import { formatCurrency, formatDate } from "../../lib/format";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: Props) => {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        <div
          className={`p-2 rounded-lg ${
            transaction.type === "income"
              ? "bg-green-50 dark:bg-green-950/30"
              : "bg-red-50 dark:bg-red-950/30"
          }`}
        >
          {transaction.type === "income" ? (
            <TrendingUp className="w-5 h-5 text-[var(--color-money)]" />
          ) : (
            <TrendingDown className="w-5 h-5 text-[var(--color-expense)]" />
          )}
        </div>
        <div>
          <p className="font-medium text-foreground">
            {transaction.description || "Untitled"}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
              {transaction.category.name}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {formatDate(transaction.date)}
            </span>
          </div>
        </div>
      </div>
      <div
        className={`font-semibold ${
          transaction.type === "income"
            ? "text-[var(--color-money)]"
            : "text-[var(--color-expense)]"
        }`}
      >
        {transaction.type === "income" ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </div>
    </div>
  );
};

export default TransactionItem;
