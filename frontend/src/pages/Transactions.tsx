import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/hooks/useTransactions";
import { useAccounts } from "@/hooks/useAccounts";
import { useSearchParams } from "react-router-dom";

import TransactionList from "@/components/transactions/TransactionList";
import TransactionSummary from "@/components/transactions/TransactionSummary";
import AddTransactionDialog from "@/components/transactions/AddTransactionDialog";
import TransactionFilters from "@/components/transactions/TransactionFilters";

const Transactions = () => {
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchParams] = useSearchParams();

  if (!token) return <div>Loading...</div>;

  const accountIdFromUrl = searchParams.get("accountId") ?? undefined;

  const { transactions, categories, pagination, filters, setFilters, refresh } =
    useTransactions(API_URL, token, { accountId: accountIdFromUrl });

  const { accounts } = useAccounts();

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Transactions
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Track your income and expenses
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <AddTransactionDialog
            categories={categories}
            accounts={accounts}
            onSuccess={refresh}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
          />
        </div>
      </div>

      <TransactionSummary transactions={transactions} />

      <TransactionFilters
        categories={categories}
        accounts={accounts}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <TransactionList
        transactions={transactions}
        pagination={pagination}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        onAddClick={() => setDialogOpen(true)}
      />
    </div>
  );
};

export default Transactions;
