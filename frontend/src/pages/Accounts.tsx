import { useState } from "react";
import { useAccounts } from "@/hooks/useAccounts";
import type { IAccount } from "@/types/accounts";
import AccountList from "@/components/accounts/AccountList";
import AddAccountDialog from "@/components/accounts/AddAccountDialog";
import EditAccountDialog from "@/components/accounts/EditAccountDialog";
import { deleteAccount } from "@/services/accountsService";
import { useAuth } from "@/context/AuthContext";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);

const Accounts = () => {
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  const { accounts, loading, error, refresh } = useAccounts();

  const [addOpen, setAddOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<IAccount | null>(null);

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  const handleDelete = async (accountId: string) => {
    try {
      await deleteAccount(API_URL, token!, accountId);
      refresh();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Accounts
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage your balances and accounts
          </p>
        </div>

        <Button
          size="sm"
          className="gap-1.5 w-full sm:w-auto"
          onClick={() => setAddOpen(true)}
        >
          <Plus className="w-3.5 h-3.5" />
          Add Account
        </Button>
      </div>

      {/* Total balance summary */}
      {accounts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-muted/50 p-4 sm:col-span-1">
            <p className="text-sm text-muted-foreground">Total balance</p>
            <p
              className={`text-2xl font-bold mt-1 ${
                totalBalance < 0 ? "text-red-500" : "text-foreground"
              }`}
            >
              {formatCurrency(totalBalance)}
            </p>
          </div>
          <div className="rounded-xl bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Total accounts</p>
            <p className="text-2xl font-bold mt-1">{accounts.length}</p>
          </div>
          <div className="rounded-xl bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Highest balance</p>
            <p className="text-2xl font-bold mt-1">
              {formatCurrency(Math.max(...accounts.map((a) => a.balance)))}
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
        <AccountList
          accounts={accounts}
          onEdit={setEditingAccount}
          onDelete={handleDelete}
          onAddClick={() => setAddOpen(true)}
        />
      )}

      <AddAccountDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onSuccess={refresh}
      />

      <EditAccountDialog
        open={!!editingAccount}
        onOpenChange={(val) => {
          if (!val) setEditingAccount(null);
        }}
        account={editingAccount}
        onSuccess={() => {
          refresh();
          setEditingAccount(null);
        }}
      />
    </div>
  );
};

export default Accounts;
