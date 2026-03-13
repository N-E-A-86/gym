export type Screen = 'dashboard' | 'onboarding' | 'alert' | 'history' | 'architect' | 'chat' | 'admin' | 'store';

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
  status?: 'warning' | 'success' | 'info' | 'indigo';
}

export interface WorkoutSession {
  id: string;
  name: string;
  date: string;
  duration: string;
  tonnage: number;
  effectiveSets: number;
  totalSets: number;
  avgRpe: number;
  junkVolume: number;
  flexScore: number;
  status: string;
  topExercises: { name: string; result: string }[];
}

export interface BiometricData {
  date: string;
  weight: number;
  fatPercentage: number;
  hrv: number;
  volumeQuality: number;
  fatigue: 'Baja' | 'Media' | 'Alta';
  status: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'suplementos' | 'merch' | 'vitaminas' | 'otros';
  stock: number;
  image: string;
}

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}
