import React from "react";
import type { Category } from "../../types/transactions";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

interface CategorySelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  selectedType: "income" | "expense";
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySelectionDialog: React.FC<
  CategorySelectionDialogProps
> = ({
  open,
  onOpenChange,
  categories,
  selectedType,
  selectedCategoryId,
  onSelectCategory,
}) => {
  const filteredCategories = categories.filter((c) => c.type === selectedType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select a Category</DialogTitle>
          <DialogDescription>
            Choose a category for your {selectedType}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[400px] overflow-y-auto py-2">
          {filteredCategories.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              No categories found for {selectedType}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredCategories.map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => onSelectCategory(category._id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                    selectedCategoryId === category._id
                      ? category.type === "income"
                        ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                        : "border-red-500 bg-red-50 dark:bg-red-950/20"
                      : "border-transparent hover:border-muted-foreground/20 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        category.type === "income"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                          : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                      }`}
                    >
                      <Tag className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {category.type === "income" ? "Income" : "Expense"}{" "}
                        category
                      </div>
                    </div>
                  </div>
                  {selectedCategoryId === category._id && (
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
