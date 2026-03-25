import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import type { BudgetWithCategory } from "@/types/budget";
import type { Category } from "@/types/transactions";
import { setBudget } from "@/services/budgetService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  editingBudget?: BudgetWithCategory | null;
  month: number;
  year: number;
  onSuccess: () => void;
}

const SetBudgetDialog = ({
  open,
  onOpenChange,
  categories,
  editingBudget,
  month,
  year,
  onSuccess,
}: Props) => {
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const expenseCategories = categories.filter((c) => c.type === "expense");

  useEffect(() => {
    if (editingBudget) {
      setCategoryId(editingBudget.categoryId._id);
      setAmount(String(editingBudget.amount));
    } else {
      setCategoryId("");
      setAmount("");
    }
    setError("");
  }, [editingBudget, open]);

  const handleSubmit = async () => {
    if (!categoryId) return setError("Please select a category.");
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0)
      return setError("Please enter a valid amount.");

    try {
      setLoading(true);
      setError("");
      await setBudget(API_URL, token!, {
        categoryId,
        amount: Number(amount),
        month,
        year,
      });
      onSuccess();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingBudget ? "Edit budget" : "Set budget"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select
              value={categoryId}
              onValueChange={setCategoryId}
              disabled={!!editingBudget}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Monthly limit (₱)</Label>
            <Input
              type="number"
              placeholder="e.g. 5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={1}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : editingBudget ? "Update" : "Set budget"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SetBudgetDialog;
