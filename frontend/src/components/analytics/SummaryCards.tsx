import type { Summary } from "@/types/analytics";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";

interface Props {
  summary: Summary;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);

const SummaryCards = ({ summary }: Props) => {
  const cards = [
    {
      label: "Total Income",
      value: formatCurrency(summary.totalIncome),
      icon: TrendingUp,
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-950/30",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(summary.totalExpenses),
      icon: TrendingDown,
      color: "text-red-500",
      bg: "bg-red-50 dark:bg-red-950/30",
    },
    {
      label: "Net Savings",
      value: formatCurrency(summary.netSavings),
      icon: Wallet,
      color: summary.netSavings >= 0 ? "text-green-500" : "text-red-500",
      bg:
        summary.netSavings >= 0
          ? "bg-green-50 dark:bg-green-950/30"
          : "bg-red-50 dark:bg-red-950/30",
    },
    {
      label: "Savings Rate",
      value: `${summary.savingsRate}%`,
      icon: PiggyBank,
      color: summary.savingsRate >= 20 ? "text-green-500" : "text-yellow-500",
      bg:
        summary.savingsRate >= 20
          ? "bg-green-50 dark:bg-green-950/30"
          : "bg-yellow-50 dark:bg-yellow-950/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-border bg-card p-5 flex items-center gap-4"
        >
          <div className={`p-3 rounded-full ${card.bg}`}>
            <card.icon className={`w-5 h-5 ${card.color}`} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="text-xl font-bold tracking-tight">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
