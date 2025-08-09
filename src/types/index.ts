export interface User {
  id: string;
  email: string;
  name: string;
  location: string;
  currency: string;
  monthlyIncome?: number;
  createdAt: Date;
  subscriptionStatus: 'free' | 'premium';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand?: string;
  description?: string;
  imageUrl?: string;
}

export interface PricePoint {
  id: string;
  productId: string;
  store: string;
  price: number;
  currency: string;
  url?: string;
  location: string;
  timestamp: Date;
  isOnline: boolean;
}

export interface PriceAlert {
  id: string;
  userId: string;
  productId: string;
  targetPrice: number;
  currentPrice: number;
  isActive: boolean;
  createdAt: Date;
}

export interface Budget {
  id: string;
  userId: string;
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  month: string; // YYYY-MM format
  isAdjusted: boolean;
  inflationRate?: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  isEssential: boolean;
}

export interface Bill {
  id: string;
  userId: string;
  name: string;
  category: 'utilities' | 'internet' | 'insurance' | 'subscription' | 'other';
  amount: number;
  currency: string;
  provider: string;
  dueDate: Date;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  isActive: boolean;
}

export interface BillRecommendation {
  id: string;
  billId: string;
  provider: string;
  newAmount: number;
  potentialSavings: number;
  switchingBonus?: number;
  rating: number;
  description: string;
  switchUrl?: string;
}

export interface AffordabilityQuery {
  availableAmount: number;
  category: 'food' | 'entertainment' | 'shopping' | 'transport' | 'other';
  location?: string;
  preferences?: string[];
}

export interface AffordabilitySuggestion {
  id: string;
  title: string;
  description: string;
  estimatedCost: number;
  category: string;
  rating?: number;
  imageUrl?: string;
  location?: string;
  url?: string;
}

export interface InflationData {
  country: string;
  category: string;
  rate: number;
  month: string; // YYYY-MM format
  source: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'price_alert' | 'budget_warning' | 'bill_due' | 'savings_opportunity';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface Store {
  id: string;
  name: string;
  type: 'online' | 'physical';
  location?: string;
  website?: string;
  apiEndpoint?: string;
}

export interface UserPreferences {
  userId: string;
  preferredStores: string[];
  budgetAlertThreshold: number; // percentage
  priceAlertFrequency: 'instant' | 'daily' | 'weekly';
  categories: string[];
  currency: string;
  location: string;
}
