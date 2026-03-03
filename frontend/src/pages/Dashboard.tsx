// pages/Dashboard.tsx
import React from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  CreditCardIcon, 
  BanknotesIcon,
  ShoppingCartIcon,
  HomeIcon,
  FilmIcon,
  PhoneIcon,
  BriefcaseIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

// Define TypeScript interfaces
interface Transaction {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

interface Account {
  id: number;
  name: string;
  type: string;
  balance: number;
  number: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
  darkColor: string;
}

const Dashboard = () => {
  // Static data for the dashboard with proper typing
  const financialSummary = {
    totalBalance: 24580.75,
    monthlyIncome: 5200.00,
    monthlyExpenses: 3450.25,
    savingsRate: 33.65,
    activeAccounts: 4
  };

  const recentTransactions: Transaction[] = [
    { id: 1, description: 'Grocery Store', category: 'Food', amount: -156.32, date: '2024-01-15', icon: ShoppingCartIcon, color: 'bg-expense/10 text-expense-dark dark:bg-expense-light/20 dark:text-expense-light' },
    { id: 2, description: 'Monthly Rent', category: 'Housing', amount: -1200.00, date: '2024-01-14', icon: HomeIcon, color: 'bg-expense/10 text-expense-dark dark:bg-expense-light/20 dark:text-expense-light' },
    { id: 3, description: 'Car Insurance', category: 'Auto', amount: -85.50, date: '2024-01-13', icon: HomeIcon, color: 'bg-expense/10 text-expense-dark dark:bg-expense-light/20 dark:text-expense-light' },
    { id: 4, description: 'Salary Deposit', category: 'Income', amount: 5200.00, date: '2024-01-12', icon: BriefcaseIcon, color: 'bg-money/10 text-money dark:bg-money/20 dark:text-money-light' },
    { id: 5, description: 'Restaurant Dinner', category: 'Food', amount: -65.80, date: '2024-01-11', icon: HomeIcon, color: 'bg-expense/10 text-expense-dark dark:bg-expense-light/20 dark:text-expense-light' },
    { id: 6, description: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, date: '2024-01-10', icon: FilmIcon, color: 'bg-expense/10 text-expense-dark dark:bg-expense-light/20 dark:text-expense-light' },
    { id: 7, description: 'Mobile Bill', category: 'Utilities', amount: -45.00, date: '2024-01-09', icon: PhoneIcon, color: 'bg-expense/10 text-expense-dark dark:bg-expense-light/20 dark:text-expense-light' },
  ];

  const accounts: Account[] = [
    { id: 1, name: 'Checking Account', type: 'Bank', balance: 5840.25, number: '**** 4567', icon: BanknotesIcon },
    { id: 2, name: 'Savings Account', type: 'Bank', balance: 12740.50, number: '**** 7890', icon: BanknotesIcon },
    { id: 3, name: 'Credit Card', type: 'Credit', balance: -2340.00, number: '**** 2341', icon: CreditCardIcon },
    { id: 4, name: 'Investment Portfolio', type: 'Investment', balance: 8340.00, number: 'INV-001', icon: ArrowTrendingUpIcon },
  ];

  const spendingByCategory: SpendingCategory[] = [
    { category: 'Housing', amount: 1200.00, percentage: 35, color: 'bg-primary', darkColor: 'bg-primary-dark' },
    { category: 'Food', amount: 450.00, percentage: 13, color: 'bg-primary-light', darkColor: 'bg-primary' },
    { category: 'Transportation', amount: 320.00, percentage: 9, color: 'bg-money', darkColor: 'bg-money-dark' },
    { category: 'Utilities', amount: 280.00, percentage: 8, color: 'bg-expense', darkColor: 'bg-expense-light' },
    { category: 'Entertainment', amount: 180.00, percentage: 5, color: 'bg-expense-dark', darkColor: 'bg-expense' },
    { category: 'Others', amount: 1020.25, percentage: 30, color: 'bg-primary-dark', darkColor: 'bg-primary-light' },
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-background dark:to-background p-4 md:p-6 lg:p-8 font-poppins transition-colors duration-300">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-dark dark:text-primary-light mb-2">
          Financial Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Welcome back, John! Here's your financial overview.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-2xl shadow-lg dark:shadow-none border p-6 transform hover:scale-105 transition-all duration-300 border-t-4 border-primary dark:border-primary-light">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl">
              <BanknotesIcon className="h-6 w-6 text-primary dark:text-primary-light" />
            </div>
            <span className="text-xs font-semibold text-money bg-money/10 dark:bg-money/20 dark:text-money-light px-2 py-1 rounded-full">
              +{financialSummary.savingsRate}%
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-1">Total Balance</p>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(financialSummary.totalBalance)}</p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg dark:shadow-none border p-6 transform hover:scale-105 transition-all duration-300 border-t-4 border-money dark:border-money-light">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-money/10 dark:bg-money/20 p-3 rounded-xl">
              <ArrowUpIcon className="h-6 w-6 text-money dark:text-money-light" />
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-1">Monthly Income</p>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(financialSummary.monthlyIncome)}</p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg dark:shadow-none border p-6 transform hover:scale-105 transition-all duration-300 border-t-4 border-expense-dark dark:border-expense-light">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-expense/10 dark:bg-expense-light/20 p-3 rounded-xl">
              <ArrowDownIcon className="h-6 w-6 text-expense-dark dark:text-expense-light" />
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-1">Monthly Expenses</p>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(financialSummary.monthlyExpenses)}</p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg dark:shadow-none border p-6 transform hover:scale-105 transition-all duration-300 border-t-4 border-primary-light dark:border-primary">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl">
              <CreditCardIcon className="h-6 w-6 text-primary-light dark:text-primary" />
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-1">Active Accounts</p>
          <p className="text-2xl font-bold text-foreground">{financialSummary.activeAccounts}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-card rounded-2xl shadow-lg dark:shadow-none border border-border p-6 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => {
              const Icon = transaction.icon;
              return (
                <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-xl transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${transaction.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.amount > 0 
                        ? 'text-money dark:text-money-light' 
                        : 'text-expense-dark dark:text-expense-light'
                    }`}>
                      {transaction.amount > 0 ? '+' : '- '}{formatCurrency(Math.abs(transaction.amount))}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="mt-4 w-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light py-2 rounded-xl hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors duration-200 font-medium">
            View All Transactions
          </button>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Accounts Overview */}
          <div className="bg-card rounded-2xl shadow-lg dark:shadow-none border border-border p-6 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-foreground mb-4">Your Accounts</h2>
            <div className="space-y-4">
              {accounts.map((account) => {
                const Icon = account.icon;
                return (
                  <div key={account.id} className="flex items-center justify-between p-3 border border-border rounded-xl hover:border-primary dark:hover:border-primary-light transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
                        <Icon className="h-5 w-5 text-primary dark:text-primary-light" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{account.name}</p>
                        <p className="text-xs text-muted-foreground">{account.number}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${
                      account.balance < 0 
                        ? 'text-expense-dark dark:text-expense-light' 
                        : 'text-foreground'
                    }`}>
                      {account.balance < 0 ? '- ' : ''}{formatCurrency(Math.abs(account.balance))}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Spending by Category */}
          <div className="bg-card rounded-2xl shadow-lg dark:shadow-none border border-border p-6 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-foreground mb-4">Spending by Category</h2>
            <div className="space-y-3">
              {spendingByCategory.map((category) => (
                <div key={category.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{category.category}</span>
                    <span className="font-medium text-foreground">{formatCurrency(category.amount)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`${category.color} dark:${category.darkColor} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-card rounded-xl shadow-lg dark:shadow-none border border-border p-4 hover:shadow-xl dark:hover:bg-muted/50 transition-all duration-300 flex flex-col items-center space-y-2 group">
          <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-200">
            <BanknotesIcon className="h-6 w-6 text-primary dark:text-primary-light" />
          </div>
          <span className="text-sm font-medium text-foreground">Transfer Money</span>
        </button>
        <button className="bg-card rounded-xl shadow-lg dark:shadow-none border border-border p-4 hover:shadow-xl dark:hover:bg-muted/50 transition-all duration-300 flex flex-col items-center space-y-2 group">
          <div className="bg-money/10 dark:bg-money/20 p-3 rounded-full group-hover:bg-money/20 dark:group-hover:bg-money/30 transition-colors duration-200">
            <ArrowUpIcon className="h-6 w-6 text-money dark:text-money-light" />
          </div>
          <span className="text-sm font-medium text-foreground">Add Money</span>
        </button>
        <button className="bg-card rounded-xl shadow-lg dark:shadow-none border border-border p-4 hover:shadow-xl dark:hover:bg-muted/50 transition-all duration-300 flex flex-col items-center space-y-2 group">
          <div className="bg-expense/10 dark:bg-expense-light/20 p-3 rounded-full group-hover:bg-expense/20 dark:group-hover:bg-expense-light/30 transition-colors duration-200">
            <CreditCardIcon className="h-6 w-6 text-expense-dark dark:text-expense-light" />
          </div>
          <span className="text-sm font-medium text-foreground">Pay Bills</span>
        </button>
        <button className="bg-card rounded-xl shadow-lg dark:shadow-none border border-border p-4 hover:shadow-xl dark:hover:bg-muted/50 transition-all duration-300 flex flex-col items-center space-y-2 group">
          <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-200">
            <ArrowTrendingUpIcon className="h-6 w-6 text-primary-dark dark:text-primary-light" />
          </div>
          <span className="text-sm font-medium text-foreground">View Reports</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;