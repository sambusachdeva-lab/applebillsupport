export type DeviceCategory = 
  | 'iphone'
  | 'mac'
  | 'ipad'
  | 'watch'
  | 'airpods'
  | 'vision-pro'
  | 'tv-home'
  | 'services';

export interface DeviceInfo {
  id: DeviceCategory;
  name: string;
  tagline: string;
  iconName: string;
  currentOS: string;
  popularIssues: string[];
  batteryReplacementCost: number;
  screenReplacementCost: number;
  tradeInUpTo: number;
}

export interface SupportArticle {
  id: string;
  title: string;
  category: DeviceCategory | 'general';
  summary: string;
  readTime: string;
  updatedDate: string;
  views: string;
  sections: {
    heading: string;
    content: string[];
    callout?: string;
  }[];
}

export interface DiagnosticStep {
  id: string;
  question: string;
  explanation: string;
  options: {
    label: string;
    nextStepId?: string;
    remedy?: string;
    recommendedAction?: 'resolve' | 'book_genius' | 'live_chat' | 'call_support';
  }[];
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  distance: string;
  hours: string;
  nextSlotToday: string;
}

export interface Appointment {
  id: string;
  product: string;
  issue: string;
  store: StoreLocation;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serialNumber?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface CoverageResult {
  serialNumber: string;
  deviceName: string;
  modelNumber: string;
  purchaseDate: string;
  hasAppleCare: boolean;
  planName: string;
  expirationDate: string;
  daysRemaining: number;
  telephoneSupport: 'Active' | 'Expired';
  repairsCoverage: 'Active' | 'Expired';
  accidentalDamageCoverage: boolean;
  theftAndLoss: boolean;
  batteryHealthCovered: boolean;
  incidentFee: string;
}

export interface SubscriptionItem {
  id: string;
  name: string;
  plan: string;
  price: string;
  renewsOn: string;
  iconBg: string;
  active: boolean;
}

export interface CommunityPost {
  id: string;
  title: string;
  author: string;
  avatar: string;
  date: string;
  product: DeviceCategory;
  repliesCount: number;
  meTooCount: number;
  question: string;
  recommendedAnswer?: {
    specialistName: string;
    badge: string;
    date: string;
    answerText: string;
    helpfulCount: number;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'specialist';
  text: string;
  timestamp: string;
  specialistName?: string;
}
