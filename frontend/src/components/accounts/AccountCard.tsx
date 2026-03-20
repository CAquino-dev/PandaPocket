import type { IAccount } from "@/types/accounts";
import {
  Landmark,
  Wallet,
  PiggyBank,
  Banknote,
  Pencil,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  account: IAccount;
  onEdit: (account: IAccount) => void;
  onDelete: (accountId: string) => void;
}

const ACCOUNT_ICONS: Record<string, React.ReactNode> = {
  cash: <Banknote className="w-5 h-5" />,
  bank: <Landmark className="w-5 h-5" />,
  savings: <PiggyBank className="w-5 h-5" />,
  ewallet: <Wallet className="w-5 h-5" />,
  credit: <Banknote className="w-5 h-5" />,
};

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

const AccountCard = ({ account, onEdit, onDelete }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg account-${account.type}`}>
            {ACCOUNT_ICONS[account.type]}
          </div>
          <div>
            <p className="font-medium text-sm">{account.name}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {account.type}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onEdit(account)}
          >
            <Pencil className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={() => onDelete(account._id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-1">Balance</p>
        <p
          className={`text-2xl font-bold tracking-tight ${
            account.balance < 0 ? "text-red-500" : "text-foreground"
          }`}
        >
          {formatCurrency(account.balance, account.currency)}
        </p>
      </div>

      <button
        onClick={() => navigate(`/transactions?accountId=${account._id}`)}
        className="flex items-center justify-between w-full pt-3 border-t border-border text-xs text-muted-foreground hover:text-foreground transition-colors group"
      >
        <span>View transactions</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};

export default AccountCard;
