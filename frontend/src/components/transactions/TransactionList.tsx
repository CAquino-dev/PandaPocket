import type { Transaction } from "../../types/transactions";
import type { PaginatedTransactions } from "@/services/transactionService";
import TransactionItem from "./TransactionItem";
import { DollarSign, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  transactions: Transaction[];
  pagination: PaginatedTransactions["pagination"] | null;
  onPageChange: (page: number) => void;
  onAddClick?: () => void;
}

const TransactionList = ({
  transactions,
  pagination,
  onPageChange,
  onAddClick,
}: Props) => {
  if (transactions.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium text-foreground">No transactions yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Click "Add Transaction" to record your first entry.
          </p>
        </div>
        {onAddClick && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAddClick}
            className="gap-1.5 mt-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add your first transaction
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="divide-y divide-border">
        {transactions.map((tx) => (
          <TransactionItem key={tx._id} transaction={tx} />
        ))}
      </div>

      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.pages} &mdash;{" "}
            {pagination.total} total
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
