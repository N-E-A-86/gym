export type Screen = 'dashboard' | 'onboarding' | 'alert' | 'history' | 'architect' | 'chat' | 'admin' | 'store' | 'routines' | 'membership';

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

// New types for AI Routines
export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  descanso: string;
  notas?: string;
}

export interface WorkoutDay {
  nombre: string;
  ejercicios: Exercise[];
}

export interface GeneratedRoutine {
  id: string;
  nombre: string;
  descripcion: string;
  dias: WorkoutDay[];
  createdAt: string;
  objetivo: string;
  nivel: string;
}

export interface RoutineFormData {
  objetivo: 'fuerza' | 'hipertrofia' | 'perdida_peso' | 'resistencia';
  nivel: 'principiante' | 'intermedio' | 'avanzado';
  dias: number;
  equipamiento: 'gym_completo' | 'basico' | 'calistenia' | 'manubrios';
  duracionSesion: number;
  limitaciones?: string;
}

// New types for Cart/Payments
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface PaymentPreference {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}
