// Dashboard.tsx
import { useAnalytics } from "@/hooks/useAnalytics";
import SummaryCards from "@/components/analytics/SummaryCards";
import OverviewChart from "@/components/analytics/OverviewChart";
import CategoryPieChart from "@/components/analytics/CategoryPieChart";
import RecentTransactions from "@/components/analytics/RecentTransactions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransactions } from "@/hooks/useTransactions";
import { useAuth } from "@/context/AuthContext";

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const YEARS = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const Dashboard = () => {
  const {
    summary,
    overview,
    categoryBreakdown,
    year,
    month,
    type,
    setYear,
    setMonth,
    setType,
    loading,
    error,
  } = useAnalytics();
  const API_URL = import.meta.env.VITE_API_URL;
  const { token, user } = useAuth();
  if (!token) return <div>Loading...</div>;

  const { recentTransactions } = useTransactions(API_URL, token);
  console.log(recentTransactions);

  const greeting = getGreeting();
  const userName = user?.name?.split(" ")[0] || "";

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header with Greeting and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            {greeting}
            {userName ? `, ${userName}` : ""}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Here's your financial overview
          </p>
        </div>

        {/* Controls - Right side on desktop, bottom on mobile */}
        <div className="flex items-center gap-2">
          <Select
            value={String(month)}
            onValueChange={(val) => setMonth(Number(val))}
          >
            <SelectTrigger className="w-36 bg-background">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((m) => (
                <SelectItem key={m.value} value={String(m.value)}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(year)}
            onValueChange={(val) => setYear(Number(val))}
          >
            <SelectTrigger className="w-28 bg-background">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64 text-sm text-muted-foreground">
          Loading...
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          {summary && <SummaryCards summary={summary} />}

          {/* Overview Chart */}
          <OverviewChart data={overview} />

          {/* Two Column Layout for Category Breakdown and Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <RecentTransactions transactions={recentTransactions || []} />
            {/* Category Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Category Breakdown</h2>
                <Select
                  value={type}
                  onValueChange={(val) => setType(val as "income" | "expense")}
                >
                  <SelectTrigger className="w-36 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">Expenses</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CategoryPieChart data={categoryBreakdown} type={type} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
