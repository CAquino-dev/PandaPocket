// components/analytics/RecentTransactions.tsx
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: {
    name: string;
    color?: string;
  };
  description?: string;
  date: string;
}

interface Props {
  transactions: Transaction[];
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Invalid date";
  }
};

const RecentTransactions = ({ transactions }: Props) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Recent Transactions</h2>
        <span className="text-xs text-muted-foreground">
          Last {transactions.length} transactions
        </span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rounded">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Icon based on transaction type */}
              <div
                className={`p-2 rounded-full flex-shrink-0 ${
                  transaction.type === "income"
                    ? "bg-green-50 dark:bg-green-950/30"
                    : "bg-red-50 dark:bg-red-950/30"
                }`}
              >
                {transaction.type === "income" ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">
                  {transaction.description || transaction.category.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="truncate">{transaction.category.name}</span>
                  <span className="flex-shrink-0">•</span>
                  <span className="flex-shrink-0">
                    {formatDate(transaction.date)}
                  </span>
                </div>
              </div>
            </div>

            <p
              className={`font-semibold text-sm flex-shrink-0 ml-2 ${
                transaction.type === "income"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        ))}

        {transactions.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">
            No recent transactions
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
