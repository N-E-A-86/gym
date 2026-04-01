import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from './Layout';

const plans = [
  {
    id: 'basic',
    name: 'Plan Básico',
    price: 29.99,
    description: 'Acceso esencial al gimnasio',
    features: [
      'Acceso a sala de musculación',
      'Horario: 6am - 10pm',
      'Vestuarios y duchas',
      'App móvil básica',
    ],
  },
  {
    id: 'premium',
    name: 'Plan Premium',
    price: 49.99,
    description: 'La experiencia completa',
    popular: true,
    features: [
      'Todo lo del plan Básico',
      'Acceso ilimitado 24/7',
      'Clases grupales incluidas',
      'Sauna y spa',
      '1 sesión con entrenador/mes',
      'Rutinas IA ilimitadas',
    ],
  },
  {
    id: 'elite',
    name: 'Plan Élite',
    price: 79.99,
    description: 'Entrenamiento personalizado',
    features: [
      'Todo lo del plan Premium',
      '4 sesiones con entrenador/mes',
      'Nutrición personalizada',
      'Evaluación mensual de composición',
      'Toalla y locker exclusivo',
      'Acceso prioritario a clases',
    ],
  },
];

export default function Membership() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowPaymentModal(true);
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-3">Membresía</h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Elige el plan que mejor se adapte a tus objetivos. Todos incluyen acceso a nuestra app con IA.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 p-1 bg-surface rounded-xl border border-white/5">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              billingCycle === 'monthly'
                ? "bg-primary text-surface"
                : "text-slate-400 hover:text-white"
            )}
          >
            Mensual
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
              billingCycle === 'annual'
                ? "bg-primary text-surface"
                : "text-slate-400 hover:text-white"
            )}
          >
            Anual
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">-20%</span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ y: -4 }}
            className={cn(
              "relative p-6 rounded-2xl border transition-all duration-300",
              plan.popular
                ? "bg-surface border-primary/30"
                : "bg-surface/50 border-white/5 hover:border-white/10"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 bg-primary text-surface text-xs font-medium rounded-full">
                  Más Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <p className="text-sm text-slate-400">{plan.description}</p>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold">
                ${billingCycle === 'annual' ? (plan.price * 0.8 * 12).toFixed(0) : plan.price.toFixed(2)}
              </span>
              <span className="text-slate-400">
                /{billingCycle === 'annual' ? 'año' : 'mes'}
              </span>
              {billingCycle === 'annual' && (
                <p className="text-xs text-emerald-400 mt-1">
                  Ahorras ${(plan.price * 12 * 0.2).toFixed(2)} al año
                </p>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectPlan(plan.id)}
              className={cn(
                "w-full py-3 rounded-xl font-medium transition-all",
                plan.popular
                  ? "bg-primary text-surface hover:brightness-110"
                  : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
              )}
            >
              Elegir Plan
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <BenefitCard
          icon="auto_awesome"
          title="Rutinas IA"
          description="Generadas personalizadas para ti"
        />
        <BenefitCard
          icon="monitoring"
          title="Seguimiento"
          description="Métricas y progreso en tiempo real"
        />
        <BenefitCard
          icon="support_agent"
          title="Coach Virtual"
          description="Disponible 24/7 para consultas"
        />
        <BenefitCard
          icon="sync"
          title="Cancela Cuando Quieras"
          description="Sin compromisos ni penalizaciones"
        />
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlanData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border border-white/10 rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Confirmar Suscripción</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-4 bg-white/5 rounded-xl mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400">{selectedPlanData.name}</span>
                <span className="font-semibold">
                  ${billingCycle === 'annual'
                    ? (selectedPlanData.price * 0.8 * 12).toFixed(2)
                    : selectedPlanData.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Facturación</span>
                <span className="text-slate-400">
                  {billingCycle === 'annual' ? 'Anual' : 'Mensual'}
                </span>
              </div>
              <div className="border-t border-white/10 mt-3 pt-3 flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold text-primary">
                  ${billingCycle === 'annual'
                    ? (selectedPlanData.price * 0.8 * 12).toFixed(2)
                    : selectedPlanData.price.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 mb-6">
              Serás redirigido a Mercado Pago para completar el pago de forma segura.
            </p>

            <button
              onClick={() => {
                // TODO: Integrate with Mercado Pago
                alert('Redirigiendo a Mercado Pago...');
                setShowPaymentModal(false);
              }}
              className="w-full py-3 bg-primary text-surface font-medium rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">payments</span>
              Pagar con Mercado Pago
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function BenefitCard({ icon, title, description }: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 bg-surface/50 border border-white/5 rounded-xl hover:border-primary/20 transition-colors">
      <span className="material-symbols-outlined text-primary text-2xl mb-2">{icon}</span>
      <h4 className="font-medium text-sm mb-1">{title}</h4>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
}
