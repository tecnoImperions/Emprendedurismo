import React from 'react';
import { CameraIcon, SparklesIcon, SproutIcon, ThermometerIcon, ShieldCheckIcon, HeartPulseIcon } from './Icons';

export const HeroSection = ({ onOpenScanner, onNavigate }) => {
  return (
    <section className="relative pt-8 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* LEFT COPY */}
        <div className="lg:col-span-7 text-center lg:text-left">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#DCE7E0] text-[#2E6C45] text-xs sm:text-sm font-bold tracking-wide mb-6 shadow-sm">
            <SparklesIcon size={16} className="text-[#5CCF8D]" />
            <span>Precisión Analítica Institucional & Visión Botánica IA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans'] leading-[1.12] mb-6">
            Diagnóstico con Cámara IA, <span className="text-[#2E6C45]">Climatización</span> y Huertos en Casa
          </h1>

          <p className="text-sm sm:text-lg text-[#526057] max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            Analiza tu planta frente a la cámara inteligente para detectar al instante problemas de estado, requerimientos de climatización y optimizar su tiempo de vida con grado institucional.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-10">
            <button
              onClick={onOpenScanner}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#2E6C45] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:bg-[#255838] hover:shadow-lg transition-all"
            >
              <SparklesIcon size={18} className="text-[#5CCF8D]" />
              <span>Escanear con Cámara IA ✨</span>
            </button>

            <button
              onClick={() => onNavigate('huertos')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FFFFFF] hover:bg-[#EAF3ED] text-[#1D1F1D] border border-[#D1E0D7] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <SproutIcon size={18} className="text-[#2E6C45]" />
              <span>Verduras & Huertos en Casa</span>
            </button>
          </div>

          {/* Institutional Metrics Badges */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#DCE7E0]">
            <div className="text-left">
              <span className="text-lg sm:text-2xl font-extrabold text-[#1D1F1D] font-mono block">99.4%</span>
              <span className="text-[11px] sm:text-xs text-[#637368]">Precisión Analítica IA</span>
            </div>
            <div className="text-left">
              <span className="text-lg sm:text-2xl font-extrabold text-[#2E6C45] font-mono block">35+ Años</span>
              <span className="text-[11px] sm:text-xs text-[#637368]">Longevidad Récord</span>
            </div>
            <div className="text-left">
              <span className="text-lg sm:text-2xl font-extrabold text-[#1D1F1D] font-mono block">6+ Especies</span>
              <span className="text-[11px] sm:text-xs text-[#637368]">Huertos Comestibles</span>
            </div>
          </div>
        </div>

        {/* RIGHT HERO VISUAL (Institutional Clean White Card) */}
        <div className="lg:col-span-5 relative">
          <div className="relative bg-[#FFFFFF] border border-[#DAE6DF] rounded-3xl p-5 sm:p-6 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5CCF8D] animate-pulse" />
                <span className="text-xs font-mono font-bold text-[#2E6C45] uppercase">Visor Central IA en Vivo</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#F3F8F5] border border-[#D2E2D8] text-xs font-bold text-[#1D1F1D]">
                Monstera Deliciosa
              </span>
            </div>

            {/* Hero Graphic Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-[#DCE7E0] bg-[#F3F8F5] aspect-4/3 flex items-center justify-center">
              <img
                src="./images/scanner_hero.png"
                alt="AI Plant Diagnostic Scanner"
                className="w-full h-full object-cover"
              />

              {/* Mint Accent Overlays */}
              <div className="absolute top-4 left-4 bg-[#FFFFFF]/95 backdrop-blur-md border border-[#DCE7E0] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#1D1F1D] shadow-md flex items-center gap-1.5">
                <ShieldCheckIcon size={14} className="text-[#2E6C45]" />
                Clima: 22°C | Humedad 65%
              </div>

              <div className="absolute bottom-4 right-4 bg-[#FFFFFF]/95 backdrop-blur-md border border-[#DCE7E0] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#1D1F1D] shadow-md flex items-center gap-1.5">
                <HeartPulseIcon size={14} className="text-[#5CCF8D]" />
                Salud Excelente: 94%
              </div>
            </div>

            {/* Bottom Card Summary */}
            <div className="mt-4 flex items-center justify-between bg-[#F3F8F5] p-3.5 rounded-2xl border border-[#DAE6DF]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2E6C45]/10 text-[#2E6C45] flex items-center justify-center">
                  <ThermometerIcon size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1D1F1D]">Reporte Analítico FloraMetrics</p>
                  <p className="text-[11px] text-[#5A6C61]">Monitoreo de sustrato y follaje</p>
                </div>
              </div>
              <button
                onClick={onOpenScanner}
                className="px-4 py-1.5 rounded-full bg-[#2E6C45] text-white font-extrabold text-xs shadow-sm hover:bg-[#255838]"
              >
                Analizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
