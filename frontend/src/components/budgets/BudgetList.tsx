import type { BudgetWithCategory } from "@/types/budget";
import BudgetItem from "./budgetItem";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Props {
  budgets: BudgetWithCategory[];
  onEdit: (budget: BudgetWithCategory) => void;
  onDelete: (budgetId: string) => void;
  onAddClick: () => void;
}

const BudgetList = ({ budgets, onEdit, onDelete, onAddClick }: Props) => {
  if (budgets.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <Wallet className="w-6 h-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium text-foreground">No budgets set</p>
          <p className="text-sm text-muted-foreground mt-1">
            Set a limit per category to start tracking your spending.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddClick}
          className="gap-1.5 mt-1"
        >
          <Plus className="w-3.5 h-3.5" />
          Set your first budget
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {budgets.map((budget) => (
        <BudgetItem
          key={budget._id}
          budget={budget}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BudgetList;
