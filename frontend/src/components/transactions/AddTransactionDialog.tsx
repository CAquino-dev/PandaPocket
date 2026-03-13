import React, { useState } from "react";
import { useAuthToken } from "@/context/AuthContext";
import type { Category } from "../../types/transactions";
import { createTransaction } from "@/services/transactionService";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Plus,
  TrendingUp,
  TrendingDown,
  Tag,
  DollarSign,
  FileText,
  Calendar,
  ChevronRight,
} from "lucide-react";

import { CategorySelectionDialog } from "./CategorySelectionDialog";

interface Props {
  categories: Category[];
  onSuccess: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AddTransactionDialog: React.FC<Props> = ({
  categories,
  onSuccess,
  open: externalOpen,
  onOpenChange,
}) => {
  const token = useAuthToken();
  const API_URL = import.meta.env.VITE_API_URL;

  const [internalOpen, setInternalOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  // Use external control if provided, otherwise use internal state
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "income" as "income" | "expense",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isIncome = form.type === "income";

  const selectedCategory = categories.find((c) => c._id === form.category);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSelectChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const resetForm = () => {
    setForm({
      description: "",
      amount: "",
      type: "income",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const selectedCategory = categories.find((c) => c._id === form.category);

      if (!selectedCategory) {
        throw new Error("Please select a category");
      }

      const requestBody = {
        type: form.type,
        amount: Number(form.amount),
        categoryId: selectedCategory._id,
        description: form.description,
        date: form.date,
      };

      await createTransaction(API_URL, token, requestBody);

      resetForm();
      setOpen(false);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white shadow-sm">
            <Plus className="w-4 h-4" />
            Add Transaction
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0">
          <DialogDescription className="sr-only">
            Form to add a new income or expense transaction
          </DialogDescription>

          {/* Modal color bar */}
          <div
            className={`h-1.5 w-full transition-colors duration-300 ${
              isIncome ? "bg-[var(--color-money)]" : "bg-[var(--color-expense)]"
            }`}
          />

          <div className="p-6">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    isIncome
                      ? "bg-green-50 dark:bg-green-950/30 text-[var(--color-money)]"
                      : "bg-red-50 dark:bg-red-950/30 text-[var(--color-expense)]"
                  }`}
                >
                  {isIncome ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <DialogTitle className="text-lg font-semibold">
                    New Transaction
                  </DialogTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Record a new financial entry
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-5">
              {/* Type toggle */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Type *</Label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectChange("type", "income");
                      setForm((prev) => ({ ...prev, category: "" }));
                    }}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      isIncome
                        ? "bg-white dark:bg-card shadow-sm text-[var(--color-money)] border border-green-100 dark:border-green-900/50"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    Income
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectChange("type", "expense");
                      setForm((prev) => ({ ...prev, category: "" }));
                    }}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      !isIncome
                        ? "bg-white dark:bg-card shadow-sm text-[var(--color-expense)] border border-red-100 dark:border-red-900/50"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <TrendingDown className="w-3.5 h-3.5" />
                    Expense
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="description"
                    name="description"
                    placeholder="e.g. Monthly salary, Groceries…"
                    value={form.description}
                    onChange={handleChange}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-1.5">
                <Label htmlFor="amount" className="text-sm font-medium">
                  Amount *
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={handleChange}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <Label htmlFor="date" className="text-sm font-medium">
                  Date *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10 pointer-events-none" />
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="pl-9"
                    required
                    max={new Date().toISOString().split("T")[0]} // Can't select future dates
                  />
                </div>
              </div>

              {/* Category - Now as a button that opens a dialog */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Category *</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setCategoryDialogOpen(true)}
                    className="flex items-center justify-between w-full h-10 px-3 py-2 pl-9 text-sm bg-background border border-input rounded-md ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {selectedCategory ? (
                      <span className="flex items-center gap-2">
                        {selectedCategory.name}
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                            selectedCategory.type === "income"
                              ? "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                              : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400"
                          }`}
                        >
                          {selectedCategory.type}
                        </span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Select a category
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="text-sm text-[var(--color-expense)] bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-md px-3 py-2">
                  {error}
                </div>
              )}
            </div>

            <DialogFooter className="mt-6 gap-2">
              <DialogClose asChild>
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleSubmit}
                disabled={
                  loading ||
                  !form.amount ||
                  !form.category ||
                  !form.date ||
                  Number(form.amount) <= 0
                }
                className={`flex-1 text-white transition-colors ${
                  isIncome
                    ? "bg-[var(--color-money)] hover:bg-[var(--color-money-dark)]"
                    : "bg-[var(--color-expense)] hover:bg-[var(--color-expense-dark)]"
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Saving…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Transaction
                  </span>
                )}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Category Selection Dialog */}
      <CategorySelectionDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        categories={categories}
        selectedType={form.type}
        selectedCategoryId={form.category}
        onSelectCategory={(categoryId) => {
          handleSelectChange("category", categoryId);
          setCategoryDialogOpen(false);
        }}
      />
    </>
  );
};

export default AddTransactionDialog;
