import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface HowItWorkStep {
  step: string;
  title: string;
  description: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterLinks {
  product: FooterLink[];
  company: FooterLink[];
  legal: FooterLink[];
}

export interface NavLink {
  name: string;
  href: string;
}