import React, { useState } from 'react';
import { CheckCircleIcon, SparklesIcon, LeafIcon, UsersIcon } from './Icons';

export const PricingSection = ({ onOpenAuthModal, currentUser }) => {
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' | 'yearly'

  const plans = [
    {
      name: 'Plan Cultivador Libre',
      price: 0,
      description: 'Ideal para personas que están iniciando su primer huerto aromático en casa.',
      features: [
        'Hasta 3 diagnósticos botánicos al mes',
        'Fórmulas NPK básicas recomendadas',
        'Directorio público de especialistas',
        'Historial de guardado local básico'
      ],
      ctaText: 'Comenzar Gratis',
      popular: false,
      badge: 'Básico'
    },
    {
      name: 'Plan Huerto VIP',
      price: billingPeriod === 'monthly' ? 4.90 : 3.90,
      description: 'Ideal para familias con huertos comestibles que buscan asegurar sus cosechas orgánicas.',
      features: [
        'Diagnósticos de Cámara IA ilimitados',
        'Historial en la Nube ilimitado (Cloudinary)',
        'Consultas directas con especialistas botánicos',
        'Guías avanzadas de control de plagas ecológicas',
        'Notificaciones de riego y fertilización'
      ],
      ctaText: currentUser ? 'Suscribirse a VIP' : 'Iniciar Sesión & Activar',
      popular: true,
      badge: 'Recomendado'
    },
    {
      name: 'Plan Vivero & Vendedor Premium',
      price: billingPeriod === 'monthly' ? 24.90 : 19.90,
      description: 'Ideal para negocios, viveros y agrónomos que quieren vender abonos NPK y plantas.',
      features: [
        'Aparecer destacado en el directorio de mentores',
        'Recomendación automática de tus abonos en los diagnósticos del área',
        'Contacto directo por WhatsApp con clientes calificados',
        'Soporte corporativo y estadísticas de consumo local',
        'Cero comisiones por ventas referenciadas'
      ],
      ctaText: 'Registrar Mi Vivero',
      popular: false,
      badge: 'Negocios'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Cabecera del Modelo de Negocio */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="px-3.5 py-1 rounded-full bg-[#EBF5EF] text-[#2E6C45] font-extrabold text-xs border border-[#CDE5D5] inline-flex items-center gap-1.5 uppercase tracking-wider">
          <SparklesIcon size={12} />
          <span>Modelo de Monetización</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans'] mt-3 leading-tight">
          Nuestras Suscripciones de Valor
        </h2>
        <p className="text-sm sm:text-base text-[#526057] mt-3">
          ¿Por qué nos pagan? Ofrecemos almacenamiento permanente en la nube de fotos, recomendación inteligente de insumos agrícolas y visibilidad a viveros recomendados.
        </p>

        {/* Toggle Mensual / Anual */}
        <div className="inline-flex items-center gap-3 bg-[#F3F8F5] border border-[#DCE7E0] rounded-full p-1.5 mt-8 shadow-2xs">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              billingPeriod === 'monthly'
                ? 'bg-[#2E6C45] text-white shadow-sm'
                : 'text-[#526057] hover:text-[#1D1F1D]'
            }`}
          >
            Facturación Mensual
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              billingPeriod === 'yearly'
                ? 'bg-[#2E6C45] text-white shadow-sm'
                : 'text-[#526057] hover:text-[#1D1F1D]'
            }`}
          >
            Facturación Anual (Ahorra 20%)
          </button>
        </div>
      </div>

      {/* Grid de Planes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-10">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`bg-[#FFFFFF] border rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
              plan.popular
                ? 'border-[#2E6C45] shadow-lg ring-2 ring-[#2E6C45]/20 scale-102 z-10'
                : 'border-[#DCE7E0] shadow-sm hover:border-[#2E6C45]/50 hover:shadow-md'
            }`}
          >
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                  plan.popular
                    ? 'bg-[#2E6C45] text-white'
                    : 'bg-[#F3F8F5] text-[#526057] border border-[#DCE7E0]'
                }`}>
                  {plan.badge}
                </span>
                {plan.popular && (
                  <span className="text-[10px] font-extrabold text-[#2E6C45] flex items-center gap-1">
                    <SparklesIcon size={12} className="text-[#5CCF8D]" />
                    Más Popular
                  </span>
                )}
              </div>

              {/* Título y Precio */}
              <h3 className="text-xl font-extrabold text-[#1D1F1D] font-['Plus_Jakarta_Sans']">{plan.name}</h3>
              <p className="text-xs text-[#526057] mt-1.5 leading-relaxed">{plan.description}</p>
              
              <div className="my-6 flex items-baseline gap-1">
                <span className="text-3xl sm:text-5xl font-mono font-extrabold text-[#1D1F1D]">${plan.price.toFixed(2)}</span>
                <span className="text-xs font-bold text-[#64746A]">/ {billingPeriod === 'monthly' ? 'mes' : 'mes (anual)'}</span>
              </div>

              {/* Lista de características (con ícono vectorial, sin stickers) */}
              <ul className="space-y-3.5 border-t border-[#F3F8F5] pt-5">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#1D1F1D] font-medium leading-tight">
                    <CheckCircleIcon size={14} className="text-[#2E6C45] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botón de Acción */}
            <button
              onClick={plan.price > 0 && !currentUser ? onOpenAuthModal : undefined}
              className={`w-full mt-8 py-3.5 px-6 rounded-2xl font-extrabold text-xs sm:text-sm shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 ${
                plan.popular
                  ? 'bg-[#2E6C45] hover:bg-[#255838] text-white shadow-md'
                  : 'bg-[#F3F8F5] hover:bg-[#E4ECE7] text-[#1D1F1D] border border-[#DCE7E0]'
              }`}
            >
              <span>{plan.ctaText}</span>
              <span>→</span>
            </button>
          </div>
        ))}
      </div>

      {/* Modelo de Valor Adicional */}
      <div className="bg-[#EBF5EF]/70 border border-[#CDE5D5] rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#2E6C45] text-white flex items-center justify-center shrink-0">
              <LeafIcon size={24} />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-extrabold text-[#1D1F1D]">Ecosistema Cooperativo Hortícola</h4>
              <p className="text-xs sm:text-sm text-[#526057] mt-1 leading-relaxed">
                Cuando la IA detecta que la planta de un usuario necesita fertilizante de Fósforo (P) o un sustrato específico, el sistema le sugiere viveros locales premium del directorio para que compre el abono NPK adecuado directamente por WhatsApp.
              </p>
            </div>
          </div>
          <div className="bg-[#FFFFFF] px-4 py-3 rounded-2xl border border-[#DCE7E0] text-center font-mono font-extrabold text-[#2E6C45] text-xs shrink-0 shadow-2xs">
            🎯 Afiliados Directos & Lead Capture
          </div>
        </div>
      </div>

    </div>
  );
};
