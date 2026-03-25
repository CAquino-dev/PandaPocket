import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { AccountType } from "@/types/accounts";
import { createAccount } from "@/services/accountsService";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Plus,
  Landmark,
  Wallet,
  PiggyBank,
  Banknote,
  CreditCard,
  DollarSign,
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
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess: () => void;
}

const AddAccountDialog = ({
  open: externalOpen,
  onOpenChange,
  onSuccess,
}: Props) => {
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const [name, setName] = useState("");
  const [type, setType] = useState<AccountType | "">("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("PHP");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedType = ACCOUNT_TYPES.find((t) => t.value === type);
  const selectedCurrency = CURRENCIES.find((c) => c.code === currency);

  const reset = () => {
    setName("");
    setType("");
    setBalance("");
    setCurrency("PHP");
    setError("");
  };

  const handleSubmit = async () => {
    if (!name.trim()) return setError("Name is required.");
    if (!type) return setError("Please select an account type.");
    if (balance === "" || isNaN(Number(balance)))
      return setError("Please enter a valid balance.");

    try {
      setLoading(true);
      setError("");
      await createAccount(API_URL, token!, {
        name,
        type,
        balance: Number(balance),
        currency,
      });
      reset();
      setOpen(false);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="gap-2 bg-(--color-primary) hover:bg-[var(--color-primary-dark)] text-white shadow-sm">
          <Plus className="w-4 h-4" />
          Add Account
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl w-[calc(100vw-2rem)] max-w-md mx-auto p-0 overflow-hidden gap-0">
        <DialogDescription className="sr-only">
          Form to add a new account
        </DialogDescription>

        <div
          className={`h-1.5 w-full transition-colors duration-300 ${
            type ? `account-${type}-bar` : "bg-primary"
          }`}
        />

        <div className="p-4 sm:p-6">
          <DialogHeader className="mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                {selectedType ? (
                  selectedType.icon
                ) : (
                  <DollarSign className="w-5 h-5" />
                )}
              </div>
              <div>
                <DialogTitle className="text-base sm:text-lg font-semibold">
                  New Account
                </DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Add a new account to track your balance
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-5">
            {/* Account type selector */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Type *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {ACCOUNT_TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => {
                      setType(t.value);
                      setError("");
                    }}
                    className={`flex flex-col items-center gap-1 sm:gap-1.5 py-2 sm:py-3 px-1 sm:px-2 rounded-lg border text-xs sm:text-sm font-medium transition-all duration-200 ${
                      type === t.value
                        ? "border-primary bg-primary/5 dark:bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-muted-foreground/30 hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    <div
                      className={`p-1 sm:p-1.5 rounded-md ${type === t.value ? `account-${t.value}` : ""}`}
                    >
                      {t.icon}
                    </div>
                    <span className="text-[11px] sm:text-xs">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Currency selector */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Currency *</Label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setCurrency(c.code);
                      setError("");
                    }}
                    className={`flex flex-col items-center gap-0.5 py-1.5 sm:py-2.5 px-1 sm:px-2 rounded-lg border text-xs sm:text-sm transition-all duration-200 ${
                      currency === c.code
                        ? "border-primary bg-primary/5 dark:bg-primary/10 text-primary font-medium"
                        : "border-border text-muted-foreground hover:border-muted-foreground/30 hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    <span className="text-sm sm:text-base font-semibold">
                      {c.symbol}
                    </span>
                    <span className="text-[10px] sm:text-xs">{c.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name and Balance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium">
                  Account Name *
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. BDO Savings"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  className="text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="balance" className="text-sm font-medium">
                  Starting Balance *
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                    {selectedCurrency?.symbol ?? "₱"}
                  </span>
                  <Input
                    id="balance"
                    type="number"
                    placeholder="0.00"
                    value={balance}
                    onChange={(e) => {
                      setBalance(e.target.value);
                      setError("");
                    }}
                    className="pl-9 text-sm"
                    min={0}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="text-sm text-[var(--color-expense)] bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-md px-3 py-2">
                {error}
              </div>
            )}
          </div>

          <DialogFooter className="mt-4 sm:mt-6 gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="flex-1 text-sm">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              disabled={
                loading ||
                !name.trim() ||
                !type ||
                balance === "" ||
                isNaN(Number(balance))
              }
              className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Creating…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Account
                </span>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccountDialog;
