import { useState, useEffect } from "react";
import type { Category } from "@/types/transactions";
import type { IAccount } from "@/types/accounts";
import type { TransactionFilters as TransactionFiltersType } from "@/services/transactionService";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { X, CalendarIcon, SlidersHorizontal } from "lucide-react";
import {
  Landmark,
  Wallet,
  PiggyBank,
  Banknote,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACCOUNT_ICONS: Record<string, React.ReactNode> = {
  cash: <Banknote className="w-3.5 h-3.5" />,
  bank: <Landmark className="w-3.5 h-3.5" />,
  savings: <PiggyBank className="w-3.5 h-3.5" />,
  ewallet: <Wallet className="w-3.5 h-3.5" />,
  credit: <CreditCard className="w-3.5 h-3.5" />,
};

interface Props {
  categories: Category[];
  accounts: IAccount[];
  filters: TransactionFiltersType;
  onFiltersChange: (filters: TransactionFiltersType) => void;
}

const TransactionFilters = ({
  categories,
  accounts,
  filters,
  onFiltersChange,
}: Props) => {
  const [searchValue, setSearchValue] = useState(filters.search ?? "");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const update = (patch: Partial<TransactionFiltersType>) =>
    onFiltersChange({ ...filters, ...patch, page: 1 });

  const reset = () => {
    setSearchValue("");
    setDateRange(undefined);
    onFiltersChange({ page: 1, limit: filters.limit });
    setMobileFiltersOpen(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      update({ search: searchValue || undefined });
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  const handleDateRange = (range: DateRange | undefined) => {
    setDateRange(range);
    update({
      startDate: range?.from ? format(range.from, "yyyy-MM-dd") : undefined,
      endDate: range?.to ? format(range.to, "yyyy-MM-dd") : undefined,
    });
  };

  const filteredCategories = filters.type
    ? categories.filter((cat) => cat.type === filters.type)
    : categories;

  const hasActiveFilters =
    filters.type || filters.accountId || filters.categoryId || dateRange;

  // Desktop filters component
  const DesktopFilters = () => (
    <>
      <Select
        value={filters.type ?? "all"}
        onValueChange={(val) =>
          update({
            type: val === "all" ? undefined : (val as "income" | "expense"),
            categoryId: undefined,
          })
        }
      >
        <SelectTrigger className="w-36 bg-background">
          <SelectValue placeholder="All types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          <SelectItem value="income" className="text-[var(--color-money)]">
            Income
          </SelectItem>
          <SelectItem
            value="expense"
            className="text-(--color-expense) hover:bg-(--color-expense)!"
          >
            Expense
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.accountId ?? "all"}
        onValueChange={(val) =>
          update({ accountId: val === "all" ? undefined : val })
        }
      >
        <SelectTrigger className="w-36 bg-background">
          <SelectValue placeholder="All accounts" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All accounts</SelectItem>
          {accounts.map((acc) => (
            <SelectItem key={acc._id} value={acc._id}>
              <span className="flex items-center gap-2">
                <span className={`p-0.5 rounded account-${acc.type}`}>
                  {ACCOUNT_ICONS[acc.type]}
                </span>
                {acc.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.categoryId ?? "all"}
        onValueChange={(val) =>
          update({ categoryId: val === "all" ? undefined : val })
        }
      >
        <SelectTrigger className="w-40 bg-background">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {filteredCategories.map((cat) => (
            <SelectItem
              key={cat._id}
              value={cat._id}
              className={cn(
                cat.type === "expense" && "hover:!bg-[var(--color-expense)]",
              )}
            >
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

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-56 justify-start text-left font-normal bg-background",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="w-3.5 h-3.5 mr-2" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "MMM d")} -{" "}
                  {format(dateRange.to, "MMM d, yyyy")}
                </>
              ) : (
                format(dateRange.from, "MMM d, yyyy")
              )
            ) : (
              "Pick a date range"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateRange}
            numberOfMonths={2}
            disabled={{ after: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </>
  );

  // Mobile filters popover content - improved with better positioning
  const MobileFiltersContent = () => (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Transaction Type
        </label>
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
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Account
        </label>
        <Select
          value={filters.accountId ?? "all"}
          onValueChange={(val) =>
            update({ accountId: val === "all" ? undefined : val })
          }
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="All accounts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All accounts</SelectItem>
            {accounts.map((acc) => (
              <SelectItem key={acc._id} value={acc._id}>
                <span className="flex items-center gap-2">
                  <span className={`p-0.5 rounded account-${acc.type}`}>
                    {ACCOUNT_ICONS[acc.type]}
                  </span>
                  {acc.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Category
        </label>
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
              <SelectItem
                key={cat._id}
                value={cat._id}
                className={cn(
                  cat.type === "expense" && "hover:text-(--color-expense)!",
                )}
              >
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
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Date Range
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-background",
                !dateRange && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="w-3.5 h-3.5 mr-2 shrink-0" />
              <span className="truncate">
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM d")} -{" "}
                      {format(dateRange.to, "MMM d, yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "MMM d, yyyy")
                  )
                ) : (
                  "Pick a date range"
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateRange}
              numberOfMonths={1}
              disabled={{ after: new Date() }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-2 pt-4 border-t">
        <Button variant="outline" onClick={reset} className="flex-1">
          <X className="w-4 h-4 mr-2" />
          Reset all
        </Button>
        <Button onClick={() => setMobileFiltersOpen(false)} className="flex-1">
          Apply filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Search input - visible on all devices */}
      <Input
        placeholder="Search transaction..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="flex-1 sm:w-48 bg-background border-input"
      />

      {/* Desktop filters - hidden on mobile */}
      <div className="hidden sm:flex sm:flex-wrap sm:gap-2 sm:items-center">
        <DesktopFilters />
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          className="gap-1.5 text-muted-foreground hover:text-black!"
        >
          <X className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      {/* Mobile filter button - visible only on mobile */}
      <Popover open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="sm:hidden relative">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[calc(100vw-2rem)] max-w-md p-0"
          align="end"
          side="bottom"
          sideOffset={8}
          alignOffset={0}
        >
          <MobileFiltersContent />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TransactionFilters;
