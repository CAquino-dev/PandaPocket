import { useState, useEffect } from "react";
import type { Category } from "@/types/transactions";
import type { TransactionFilters as TransactionFiltersType } from "@/services/transactionService";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Props {
  categories: Category[];
  filters: TransactionFiltersType;
  onFiltersChange: (filters: TransactionFiltersType) => void;
}

const TransactionFilters = ({
  categories,
  filters,
  onFiltersChange,
}: Props) => {
  const [searchValue, setSearchValue] = useState(filters.search ?? "");

  const update = (patch: Partial<TransactionFiltersType>) =>
    onFiltersChange({ ...filters, ...patch, page: 1 });

  const reset = () => {
    setSearchValue("");
    onFiltersChange({ page: 1, limit: filters.limit });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      update({ search: searchValue || undefined });
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  const filteredCategories = filters.type
    ? categories.filter((cat) => cat.type === filters.type)
    : categories;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
      <Input
        placeholder="Search description..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full bg-background border-input"
      />

      <Select
        value={filters.type ?? "all"}
        onValueChange={(val) =>
          update({
            type: val === "all" ? undefined : (val as "income" | "expense"),
            categoryId: undefined,
          })
        }
      >
        <SelectTrigger className="w-full bg-background">
          <SelectValue placeholder="All types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          <SelectItem value="income" className="text-[var(--color-money)]">
            Income
          </SelectItem>
          <SelectItem value="expense" className="text-[var(--color-expense)]">
            Expense
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.categoryId ?? "all"}
        onValueChange={(val) =>
          update({ categoryId: val === "all" ? undefined : val })
        }
      >
        <SelectTrigger className="w-full bg-background">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {filteredCategories.map((cat) => (
            <SelectItem key={cat._id} value={cat._id}>
              <span className="flex items-center gap-2">
                {cat.name}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                    cat.type === "income"
                      ? "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                      : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400"
                  }`}
                >
                  {cat.type}
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="date"
        value={filters.startDate ?? ""}
        onChange={(e) => update({ startDate: e.target.value || undefined })}
        className="w-full bg-background border-input"
      />
      <Input
        type="date"
        value={filters.endDate ?? ""}
        onChange={(e) => update({ endDate: e.target.value || undefined })}
        className="w-full bg-background border-input"
      />

      <Button
        variant="outline"
        onClick={reset}
        className="w-full hover:bg-accent hover:text-white transition-colors"
      >
        Reset
      </Button>
    </div>
  );
};

export default TransactionFilters;
