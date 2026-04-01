// Servicio de integración con Mercado Pago
// Para desarrollo, usar el SDK de Mercado Pago Checkout Pro

export interface PaymentItem {
  title: string;
  description: string;
  quantity: number;
  unit_price: number;
}

export interface PaymentPreference {
  items: PaymentItem[];
  back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
  auto_return: 'approved' | 'all';
  external_reference?: string;
}

// URL del backend - en producción cambiar por la URL real
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Crea una preferencia de pago para checkout de Mercado Pago
 * En desarrollo, esto debería llamar a tu backend Express
 */
export const createPaymentPreference = async (
  items: PaymentItem[],
  externalReference?: string
): Promise<{ init_point: string; sandbox_init_point: string }> => {
  try {
    // Para desarrollo, simulamos la respuesta
    // En producción, descomenta el código fetch y conecta tu backend

    /*
    const response = await fetch(`${API_URL}/create-preference`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        external_reference: externalReference,
      }),
    });

    if (!response.ok) {
      throw new Error('Error creando preferencia de pago');
    }

    return await response.json();
    */

    // Simulación para desarrollo
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      init_point: 'https://www.mercadopago.com',
      sandbox_init_point: 'https://sandbox.mercadopago.com',
    };
  } catch (error) {
    console.error('Error creating payment preference:', error);
    throw error;
  }
};

/**
 * Crea una suscripción recurrente (membresía mensual)
 */
export const createSubscription = async (
  planId: string,
  payerEmail: string
): Promise<{ init_point: string }> => {
  try {
    /*
    const response = await fetch(`${API_URL}/create-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan_id: planId,
        payer_email: payerEmail,
      }),
    });

    if (!response.ok) {
      throw new Error('Error creando suscripción');
    }

    return await response.json();
    */

    // Simulación para desarrollo
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      init_point: 'https://www.mercadopago.com/subscriptions',
    };
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

/**
 * Verifica el estado de un pago
 */
export const verifyPayment = async (paymentId: string): Promise<{
  status: 'approved' | 'pending' | 'rejected';
  external_reference?: string;
}> => {
  try {
    /*
    const response = await fetch(`${API_URL}/verify-payment/${paymentId}`);

    if (!response.ok) {
      throw new Error('Error verificando pago');
    }

    return await response.json();
    */

    // Simulación para desarrollo
    return {
      status: 'approved',
      external_reference: 'test-ref',
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

/**
 * Configuración de planes de suscripción predefinidos en Mercado Pago
 * Estos IDs deben crearse en el dashboard de Mercado Pago
 */
export const SUBSCRIPTION_PLANS = {
  basic: {
    planId: process.env.MERCADO_PAGO_BASIC_PLAN_ID || 'basic_plan',
    name: 'Plan Básico',
    price: 29.99,
  },
  premium: {
    planId: process.env.MERCADO_PAGO_PREMIUM_PLAN_ID || 'premium_plan',
    name: 'Plan Premium',
    price: 49.99,
  },
  elite: {
    planId: process.env.MERCADO_PAGO_ELITE_PLAN_ID || 'elite_plan',
    name: 'Plan Élite',
    price: 79.99,
  },
};
