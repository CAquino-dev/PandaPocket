import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import type { IAccount, AccountType } from "@/types/accounts";
import { updateAccount } from "@/services/accountsService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Landmark,
  Wallet,
  PiggyBank,
  Banknote,
  CreditCard,
} from "lucide-react";

const ACCOUNT_TYPES: {
  value: AccountType;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "cash", label: "Cash", icon: <Banknote className="w-4 h-4" /> },
  { value: "bank", label: "Bank", icon: <Landmark className="w-4 h-4" /> },
  {
    value: "savings",
    label: "Savings",
    icon: <PiggyBank className="w-4 h-4" />,
  },
  { value: "ewallet", label: "E-Wallet", icon: <Wallet className="w-4 h-4" /> },
  {
    value: "credit",
    label: "Credit",
    icon: <CreditCard className="w-4 h-4" />,
  },
];

const CURRENCIES = [
  { code: "PHP", symbol: "₱", name: "Philippine Peso" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: IAccount | null;
  onSuccess: () => void;
}

const EditAccountDialog = ({
  open,
  onOpenChange,
  account,
  onSuccess,
}: Props) => {
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [type, setType] = useState<AccountType | "">("");
  const [currency, setCurrency] = useState("PHP");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account) {
      setName(account.name);
      setType(account.type);
      setCurrency(account.currency);
      setError("");
    }
  }, [account, open]);

  const handleSubmit = async () => {
    if (!account) return;
    if (!name.trim()) return setError("Name is required.");
    if (!type) return setError("Please select an account type.");

    try {
      setLoading(true);
      setError("");
      await updateAccount(API_URL, token!, account._id, {
        name,
        type,
        currency,
      });
      onSuccess();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input
              placeholder="e.g. BDO Savings"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {ACCOUNT_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  className={`flex items-center gap-2.5 p-3 rounded-lg border text-sm transition-all ${
                    type === t.value
                      ? "border-primary bg-primary/5 font-medium"
                      : "border-border hover:border-muted-foreground/30 hover:bg-muted/50"
                  }`}
                >
                  <div className={`p-1.5 rounded-md account-${t.value}`}>
                    {t.icon}
                  </div>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    <span className="flex items-center gap-2">
                      <span className="text-muted-foreground w-6">
                        {c.symbol}
                      </span>
                      {c.code} — {c.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountDialog;
