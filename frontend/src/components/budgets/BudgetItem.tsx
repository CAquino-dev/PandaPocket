import type { BudgetWithCategory } from "@/types/budget";
import {
  getBudgetStatus,
  getBudgetPercentage,
  getRemainingAmount,
} from "@/types/budget";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  budget: BudgetWithCategory;
  onEdit: (budget: BudgetWithCategory) => void;
  onDelete: (budgetId: string) => void;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);

const statusStyles = {
  danger: {
    card: "border-red-400 bg-red-50 dark:bg-red-950/20",
    badge: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    bar: "bg-red-500",
    text: "text-red-700 dark:text-red-400",
    label: "Over budget",
  },
  warning: {
    card: "border-amber-400 bg-amber-50 dark:bg-amber-950/20",
    badge:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    bar: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    label: "Nearing limit",
  },
  ok: {
    card: "border-border bg-card",
    badge:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    bar: "bg-green-500",
    text: "text-muted-foreground",
    label: "On track",
  },
};

const BudgetItem = ({ budget, onEdit, onDelete }: Props) => {
  const status = getBudgetStatus(budget.spent, budget.amount);
  const pct = getBudgetPercentage(budget.spent, budget.amount);
  const remaining = getRemainingAmount(budget.spent, budget.amount);
  const styles = statusStyles[status];

  return (
    <div className={`rounded-xl border p-4 ${styles.card}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{budget.categoryId.name}</span>
          <span
            className={`text-xs px-2 py-0.5 rounded font-medium ${styles.badge}`}
          >
            {styles.label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {formatCurrency(budget.spent)}
            </span>{" "}
            / {formatCurrency(budget.amount)}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => onEdit(budget)}
            >
              <Pencil className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:text-destructive"
              onClick={() => onDelete(budget._id)}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${styles.bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className={`flex justify-between mt-1.5 text-xs ${styles.text}`}>
        <span>{pct}% used</span>
        <span>
          {remaining >= 0
            ? `${formatCurrency(remaining)} left`
            : `${formatCurrency(Math.abs(remaining))} over`}
        </span>
      </div>
    </div>
  );
};

export default BudgetItem;
