import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useBudgets } from "@/hooks/useBudgets";
import type { BudgetWithCategory } from "@/types/budget";
import { getBudgetStatus } from "@/types/budget";
import BudgetList from "../components/budgets/BudgetList";
import SetBudgetDialog from "../components/budgets/SetBudgetDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Plus } from "lucide-react";

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const YEARS = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);

const Budgets = () => {
  const { token } = useAuth();

  if (!token) return <div>Loading...</div>;

  const {
    budgets,
    categories,
    month,
    year,
    setMonth,
    setYear,
    refresh,
    deleteBudget,
    loading,
    error,
  } = useBudgets();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<BudgetWithCategory | null>(
    null,
  );

  const overBudget = budgets.filter(
    (b) => getBudgetStatus(b.spent, b.amount) === "danger",
  );
  const totalBudgeted = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;

  const handleEdit = (budget: BudgetWithCategory) => {
    setEditingBudget(budget);
    setDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) setEditingBudget(null);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Budgets
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Set limits and track your spending
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={String(month)}
            onValueChange={(val) => setMonth(Number(val))}
          >
            <SelectTrigger className="w-[calc(50%-0.25rem)] sm:w-36 bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((m) => (
                <SelectItem key={m.value} value={String(m.value)}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(year)}
            onValueChange={(val) => setYear(Number(val))}
          >
            <SelectTrigger className="w-[calc(50%-0.25rem)] sm:w-28 bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="w-3.5 h-3.5" />
            Set budget
          </Button>
        </div>
      </div>

      {/* Over budget warning */}
      {overBudget.length > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-red-300 bg-red-50 dark:bg-red-950/20 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-red-700 dark:text-red-400">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>
            {overBudget.length}{" "}
            {overBudget.length === 1 ? "category has" : "categories have"}{" "}
            exceeded their budget this month
          </span>
        </div>
      )}

      {/* Summary cards */}
      {budgets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-xl bg-muted/50 p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Total budgeted
            </p>
            <p className="text-xl sm:text-2xl font-bold mt-1">
              {formatCurrency(totalBudgeted)}
            </p>
          </div>
          <div className="rounded-xl bg-muted/50 p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Total spent
            </p>
            <p
              className={`text-xl sm:text-2xl font-bold mt-1 ${
                totalSpent > totalBudgeted ? "text-red-500" : "text-amber-500"
              }`}
            >
              {formatCurrency(totalSpent)}
            </p>
          </div>
          <div className="rounded-xl bg-muted/50 p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Remaining
            </p>
            <p
              className={`text-xl sm:text-2xl font-bold mt-1 ${
                totalRemaining >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {formatCurrency(totalRemaining)}
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
          Loading...
        </div>
      ) : (
        <BudgetList
          budgets={budgets}
          onEdit={handleEdit}
          onDelete={deleteBudget}
          onAddClick={() => setDialogOpen(true)}
        />
      )}

      <SetBudgetDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        categories={categories}
        editingBudget={editingBudget}
        month={month}
        year={year}
        onSuccess={refresh}
      />
    </div>
  );
};

export default Budgets;
