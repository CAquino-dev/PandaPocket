import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/hooks/useTransactions";

import TransactionList from "@/components/transactions/TransactionList";
import TransactionSummary from "@/components/transactions/TransactionSummary";
import AddTransactionDialog from "@/components/transactions/AddTransactionDialog";

const Transactions = () => {
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!token) {
    return <div>Loading...</div>;
  }

  const { transactions, categories, refresh } = useTransactions(API_URL, token);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header with styling from original */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Transactions
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track your income and expenses
          </p>
        </div>

        <AddTransactionDialog
          categories={categories}
          onSuccess={refresh}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>

      {/* Summary Cards */}
      <TransactionSummary transactions={transactions} />

      {/* Transactions List */}
      <TransactionList
        transactions={transactions}
        onAddClick={() => setDialogOpen(true)}
      />
    </div>
  );
};

export default Transactions;
