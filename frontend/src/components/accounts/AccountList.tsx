import type { IAccount } from "@/types/accounts";
import AccountCard from "./AccountCard";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Props {
  accounts: IAccount[];
  onEdit: (account: IAccount) => void;
  onDelete: (accountId: string) => void;
  onAddClick: () => void;
}

const AccountList = ({ accounts, onEdit, onDelete, onAddClick }: Props) => {
  if (accounts.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <Wallet className="w-6 h-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium text-foreground">No accounts yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add an account to start tracking your balances.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddClick}
          className="gap-1.5 mt-1"
        >
          <Plus className="w-3.5 h-3.5" />
          Add your first account
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {accounts.map((account) => (
        <AccountCard
          key={account._id}
          account={account}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AccountList;
