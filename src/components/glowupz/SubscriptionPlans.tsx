'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';

type Plan = 'weekly' | 'monthly' | 'semester';

export function SubscriptionPlans() {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<Plan>('monthly');
  const [processing, setProcessing] = useState(false);

  const plans = [
    {
      id: 'weekly' as Plan,
      name: t.subscription.weekly,
      price: 19.9,
      period: t.subscription.perWeek,
      total: 19.9,
      popular: false
    },
    {
      id: 'monthly' as Plan,
      name: t.subscription.monthly,
      price: 49.9,
      period: t.subscription.perMonth,
      total: 49.9,
      popular: true
    },
    {
      id: 'semester' as Plan,
      name: t.subscription.semester,
      price: 33.32,
      period: t.subscription.perMonth,
      total: 199.9,
      popular: false,
      savings: '33%'
    }
  ];

  const benefits = [
    t.subscription.benefit1,
    t.subscription.benefit2,
    t.subscription.benefit3,
    t.subscription.benefit4,
    t.subscription.benefit5
  ];

  const handleSubscribe = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      alert('Pagamento simulado! Em produção, integrar com gateway de pagamento.');
      setProcessing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-800">{t.subscription.title}</h2>
        <p className="text-gray-600 text-lg">
          Escolha o plano perfeito para você e desbloqueie todo o potencial do GlowUpZ! ✨
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`relative bg-white rounded-3xl p-8 cursor-pointer transition-all duration-300 ${
              selectedPlan === plan.id
                ? 'shadow-2xl scale-105 border-4 border-pink-500'
                : 'shadow-lg hover:shadow-xl border-2 border-gray-100 hover:border-pink-300'
            }`}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {t.subscription.mostPopular}
                </div>
              </div>
            )}

            {/* Savings badge */}
            {plan.savings && (
              <div className="absolute -top-4 right-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {t.subscription.save} {plan.savings}
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Plan name */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
              </div>

              {/* Price */}
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-gray-600">R$</span>
                  <span className="text-5xl font-bold text-gray-800">
                    {plan.price.toFixed(2).split('.')[0]}
                  </span>
                  <span className="text-2xl text-gray-600">
                    ,{plan.price.toFixed(2).split('.')[1]}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{plan.period}</p>
                {plan.id === 'semester' && (
                  <p className="text-sm text-gray-500 mt-2">
                    {t.subscription.total}: R$ {plan.total.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Select indicator */}
              <div className="flex justify-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedPlan === plan.id
                      ? 'border-pink-500 bg-pink-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedPlan === plan.id && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t.subscription.benefits}
        </h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-700">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribe button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSubscribe}
          disabled={processing}
          size="lg"
          className="px-12 py-6 text-xl font-semibold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110"
        >
          {processing ? (
            <>
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              {t.subscription.subscribe}
            </>
          )}
        </Button>
      </div>

      {/* Payment placeholder notice */}
      <div className="text-center text-sm text-gray-500 max-w-2xl mx-auto">
        <p>
          💳 Gateway de pagamento será integrado em produção. Esta é uma demonstração funcional.
        </p>
      </div>
    </div>
  );
}
