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
    { id: 1, description: 'Grocery Store', category: 'Food', amount: -156.32, date: '2024-01-15', icon: ShoppingCartIcon, color: 'bg-blue-100 text-blue-600' },
    { id: 2, description: 'Monthly Rent', category: 'Housing', amount: -1200.00, date: '2024-01-14', icon: HomeIcon, color: 'bg-purple-100 text-purple-600' },
    { id: 3, description: 'Car Insurance', category: 'Auto', amount: -85.50, date: '2024-01-13', icon: HomeIcon, color: 'bg-green-100 text-green-600' },
    { id: 4, description: 'Salary Deposit', category: 'Income', amount: 5200.00, date: '2024-01-12', icon: BriefcaseIcon, color: 'bg-emerald-100 text-emerald-600' },
    { id: 5, description: 'Restaurant Dinner', category: 'Food', amount: -65.80, date: '2024-01-11', icon: HomeIcon, color: 'bg-orange-100 text-orange-600' },
    { id: 6, description: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, date: '2024-01-10', icon: FilmIcon, color: 'bg-red-100 text-red-600' },
    { id: 7, description: 'Mobile Bill', category: 'Utilities', amount: -45.00, date: '2024-01-09', icon: PhoneIcon, color: 'bg-indigo-100 text-indigo-600' },
  ];

  const accounts: Account[] = [
    { id: 1, name: 'Checking Account', type: 'Bank', balance: 5840.25, number: '**** 4567', icon: BanknotesIcon },
    { id: 2, name: 'Savings Account', type: 'Bank', balance: 12740.50, number: '**** 7890', icon: BanknotesIcon },
    { id: 3, name: 'Credit Card', type: 'Credit', balance: -2340.00, number: '**** 2341', icon: CreditCardIcon },
    { id: 4, name: 'Investment Portfolio', type: 'Investment', balance: 8340.00, number: 'INV-001', icon: ArrowTrendingUpIcon },
  ];

  const spendingByCategory: SpendingCategory[] = [
    { category: 'Housing', amount: 1200.00, percentage: 35, color: 'bg-purple-500' },
    { category: 'Food', amount: 450.00, percentage: 13, color: 'bg-blue-500' },
    { category: 'Transportation', amount: 320.00, percentage: 9, color: 'bg-green-500' },
    { category: 'Utilities', amount: 280.00, percentage: 8, color: 'bg-yellow-500' },
    { category: 'Entertainment', amount: 180.00, percentage: 5, color: 'bg-red-500' },
    { category: 'Others', amount: 1020.25, percentage: 30, color: 'bg-gray-500' },
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
      // Check if date is valid
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Financial Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome back, John! Here's your financial overview.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-indigo-100 p-3 rounded-xl">
              <BanknotesIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-full">
              +{financialSummary.savingsRate}%
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-1">Total Balance</p>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(financialSummary.totalBalance)}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <ArrowUpIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">Monthly Income</p>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(financialSummary.monthlyIncome)}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-xl">
              <ArrowDownIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">Monthly Expenses</p>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(financialSummary.monthlyExpenses)}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <CreditCardIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">Active Accounts</p>
          <p className="text-2xl font-bold text-gray-800">{financialSummary.activeAccounts}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => {
              const Icon = transaction.icon;
              return (
                <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${transaction.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="mt-4 w-full bg-gray-50 text-gray-600 py-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-medium">
            View All Transactions
          </button>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Accounts Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Accounts</h2>
            <div className="space-y-4">
              {accounts.map((account) => {
                const Icon = account.icon;
                return (
                  <div key={account.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-indigo-200 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <Icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{account.name}</p>
                        <p className="text-xs text-gray-500">{account.number}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${account.balance < 0 ? 'text-red-600' : 'text-gray-800'}`}>
                      {formatCurrency(account.balance)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Spending by Category */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Spending by Category</h2>
            <div className="space-y-3">
              {spendingByCategory.map((category) => (
                <div key={category.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{category.category}</span>
                    <span className="font-medium text-gray-800">{formatCurrency(category.amount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${category.color} h-2 rounded-full transition-all duration-500`}
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
        <button className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-2">
          <div className="bg-indigo-100 p-3 rounded-full">
            <BanknotesIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Transfer Money</span>
        </button>
        <button className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-2">
          <div className="bg-green-100 p-3 rounded-full">
            <ArrowUpIcon className="h-6 w-6 text-green-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Add Money</span>
        </button>
        <button className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-2">
          <div className="bg-purple-100 p-3 rounded-full">
            <CreditCardIcon className="h-6 w-6 text-purple-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Pay Bills</span>
        </button>
        <button className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-2">
          <div className="bg-blue-100 p-3 rounded-full">
            <ArrowTrendingUpIcon className="h-6 w-6 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">View Reports</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;