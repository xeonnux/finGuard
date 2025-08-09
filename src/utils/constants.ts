export const APP_CONFIG = {
  NAME: 'FinGuard',
  VERSION: '1.0.0',
  TAGLINE: 'Beat inflation, every day.',
  SUPPORT_EMAIL: 'support@finguard.com',
  WEBSITE: 'https://finguard.com',
  PRIVACY_POLICY: 'https://finguard.com/privacy',
  TERMS_OF_SERVICE: 'https://finguard.com/terms',
};

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      'Track up to 10 products',
      'Basic price alerts',
      'Simple budgeting',
      'Community support',
    ],
    limits: {
      watchedProducts: 10,
      priceAlerts: 5,
      budgetCategories: 5,
    },
  },
  PREMIUM: {
    name: 'Premium',
    price: 6.99,
    features: [
      'Unlimited product tracking',
      'Advanced AI insights',
      'Smart budget adjustments',
      'Bill optimization',
      'What Can I Afford? mode',
      'Priority support',
      'Data export',
      'Advanced analytics',
    ],
    limits: {
      watchedProducts: -1, // unlimited
      priceAlerts: -1,
      budgetCategories: -1,
    },
  },
};

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
];

export const BUDGET_CATEGORIES = [
  { id: 'groceries', name: 'Groceries', icon: 'shopping-cart', color: '#4CAF50', isEssential: true },
  { id: 'dining', name: 'Dining Out', icon: 'restaurant', color: '#FF9800', isEssential: false },
  { id: 'transportation', name: 'Transportation', icon: 'directions-car', color: '#2196F3', isEssential: true },
  { id: 'entertainment', name: 'Entertainment', icon: 'movie', color: '#9C27B0', isEssential: false },
  { id: 'shopping', name: 'Shopping', icon: 'shopping-bag', color: '#E91E63', isEssential: false },
  { id: 'utilities', name: 'Utilities', icon: 'flash-on', color: '#FF5722', isEssential: true },
  { id: 'healthcare', name: 'Healthcare', icon: 'local-hospital', color: '#607D8B', isEssential: true },
  { id: 'education', name: 'Education', icon: 'school', color: '#795548', isEssential: true },
  { id: 'savings', name: 'Savings', icon: 'account-balance', color: '#009688', isEssential: true },
  { id: 'insurance', name: 'Insurance', icon: 'security', color: '#3F51B5', isEssential: true },
  { id: 'travel', name: 'Travel', icon: 'flight', color: '#00BCD4', isEssential: false },
  { id: 'fitness', name: 'Fitness', icon: 'fitness-center', color: '#8BC34A', isEssential: false },
];

export const BILL_CATEGORIES = [
  { id: 'utilities', name: 'Utilities', icon: 'flash-on' },
  { id: 'internet', name: 'Internet', icon: 'wifi' },
  { id: 'insurance', name: 'Insurance', icon: 'security' },
  { id: 'subscription', name: 'Subscriptions', icon: 'subscriptions' },
  { id: 'other', name: 'Other', icon: 'receipt' },
];

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Groceries',
  'Clothing',
  'Home & Garden',
  'Health & Beauty',
  'Sports & Outdoors',
  'Books & Media',
  'Toys & Games',
  'Automotive',
  'Office Supplies',
];

export const AFFORDABILITY_CATEGORIES = [
  { id: 'food', name: 'Food & Dining', icon: 'restaurant' },
  { id: 'entertainment', name: 'Entertainment', icon: 'movie' },
  { id: 'shopping', name: 'Shopping', icon: 'shopping-bag' },
  { id: 'transport', name: 'Transportation', icon: 'directions-car' },
  { id: 'health', name: 'Health & Wellness', icon: 'local-hospital' },
  { id: 'education', name: 'Education', icon: 'school' },
  { id: 'travel', name: 'Travel', icon: 'flight' },
  { id: 'other', name: 'Other', icon: 'category' },
];

export const NOTIFICATION_TYPES = {
  PRICE_ALERT: 'price_alert',
  BUDGET_WARNING: 'budget_warning',
  BILL_DUE: 'bill_due',
  SAVINGS_OPPORTUNITY: 'savings_opportunity',
  INFLATION_UPDATE: 'inflation_update',
  RECOMMENDATION: 'recommendation',
};

export const PRICE_ALERT_THRESHOLDS = {
  INSTANT: 0, // Alert immediately when target price is reached
  DAILY: 1, // Send daily digest of price changes
  WEEKLY: 7, // Send weekly digest of price changes
};

export const BUDGET_ALERT_THRESHOLDS = {
  CONSERVATIVE: 75, // Alert at 75% of budget
  MODERATE: 85, // Alert at 85% of budget
  AGGRESSIVE: 95, // Alert at 95% of budget
};

export const SUPPORTED_STORES = [
  { id: 'amazon', name: 'Amazon', type: 'online', logo: 'https://logo.clearbit.com/amazon.com' },
  { id: 'walmart', name: 'Walmart', type: 'both', logo: 'https://logo.clearbit.com/walmart.com' },
  { id: 'target', name: 'Target', type: 'both', logo: 'https://logo.clearbit.com/target.com' },
  { id: 'bestbuy', name: 'Best Buy', type: 'both', logo: 'https://logo.clearbit.com/bestbuy.com' },
  { id: 'costco', name: 'Costco', type: 'physical', logo: 'https://logo.clearbit.com/costco.com' },
  { id: 'wholefoods', name: 'Whole Foods', type: 'physical', logo: 'https://logo.clearbit.com/wholefoodsmarket.com' },
  { id: 'ebay', name: 'eBay', type: 'online', logo: 'https://logo.clearbit.com/ebay.com' },
  { id: 'etsy', name: 'Etsy', type: 'online', logo: 'https://logo.clearbit.com/etsy.com' },
];

export const INFLATION_CATEGORIES = [
  'All Items',
  'Food',
  'Energy',
  'Transportation',
  'Housing',
  'Medical Care',
  'Recreation',
  'Education',
  'Apparel',
];

export const DEMO_DATA = {
  PRODUCTS: [
    {
      name: 'iPhone 15 Pro',
      category: 'Electronics',
      brand: 'Apple',
      currentPrice: 999.99,
      targetPrice: 899.99,
      lowestPrice: 949.99,
    },
    {
      name: 'Organic Whole Milk',
      category: 'Groceries',
      brand: 'Horizon',
      currentPrice: 4.99,
      targetPrice: 4.50,
      lowestPrice: 4.29,
    },
    {
      name: 'Nike Air Max 270',
      category: 'Clothing',
      brand: 'Nike',
      currentPrice: 129.99,
      targetPrice: 100.00,
      lowestPrice: 109.99,
    },
  ],
  BUDGETS: [
    { category: 'Groceries', allocated: 600, spent: 450, inflationAdjusted: true },
    { category: 'Dining Out', allocated: 300, spent: 280, inflationAdjusted: false },
    { category: 'Transportation', allocated: 200, spent: 150, inflationAdjusted: true },
    { category: 'Entertainment', allocated: 150, spent: 120, inflationAdjusted: false },
  ],
  BILLS: [
    { name: 'Electricity', provider: 'ConEd', amount: 120.50, category: 'utilities', dueDate: '2024-02-15' },
    { name: 'Internet', provider: 'Verizon', amount: 79.99, category: 'internet', dueDate: '2024-02-20' },
    { name: 'Car Insurance', provider: 'State Farm', amount: 150.00, category: 'insurance', dueDate: '2024-02-28' },
  ],
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/user/profile',
    PREFERENCES: '/user/preferences',
    SUBSCRIPTION: '/user/subscription',
  },
  PRODUCTS: {
    SEARCH: '/products/search',
    WATCHLIST: '/products/watchlist',
    PRICES: '/products/prices',
  },
  BUDGETS: {
    LIST: '/budgets',
    INSIGHTS: '/budgets/insights',
    ADJUST: '/budgets/adjust',
  },
  BILLS: {
    LIST: '/bills',
    RECOMMENDATIONS: '/bills/recommendations',
    SWITCH: '/bills/switch',
  },
  ANALYTICS: {
    SAVINGS: '/analytics/savings',
    SPENDING: '/analytics/spending',
    EXPORT: '/analytics/export',
  },
};
