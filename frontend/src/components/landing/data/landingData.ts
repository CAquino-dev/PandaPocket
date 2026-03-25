import {
  TrendingUp,
  Shield,
  PieChart,
  Target,
  BarChart3,
  Smartphone,
} from "lucide-react";
import type { Feature, Testimonial, HowItWorkStep, FooterLinks } from "../../../types/landing";

export const features: Feature[] = [
  {
    icon: TrendingUp,
    title: "Track Expenses",
    description:
      "Automatically categorize and track every transaction in real-time",
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
  {
    icon: PieChart,
    title: "Smart Budgeting",
    description:
      "Create personalized budgets that adapt to your spending habits",
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description:
      "Set and track financial goals with visual progress indicators",
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description:
      "Your data is encrypted and protected with enterprise-grade security",
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-900/30",
  },
  {
    icon: BarChart3,
    title: "Insights & Analytics",
    description: "Get detailed insights with beautiful charts and reports",
    color: "text-yellow-500",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Access your finances anywhere with our responsive design",
    color: "text-indigo-500",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content:
      "This app transformed how I manage my business finances. Saved 10+ hours monthly!",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    content:
      "Finally found a finance app that's both powerful and easy to use. The insights are incredible.",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Emily Rodriguez",
    role: "Freelancer",
    content:
      "Tracking expenses and taxes used to be a nightmare. Now it's effortless!",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=3",
  },
];

export const howItWorks: HowItWorkStep[] = [
  {
    step: "01",
    title: "Create Account",
    description: "Sign up for free and connect your accounts securely",
  },
  {
    step: "02",
    title: "Track Spending",
    description: "Automatically categorize and monitor your transactions",
  },
  {
    step: "03",
    title: "Achieve Goals",
    description: "Get insights and reach your financial goals faster",
  },
];

export const footerLinks: FooterLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#" },
  ],
};

export const navLinks = [
  { name: "Get Started", href: "#hero" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Testimonials", href: "#testimonials" },
];