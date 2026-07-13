import React from 'react';
import { SproutIcon, SparklesIcon } from './Icons';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[#DCE7E0] pt-12 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8 text-[#526057]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2E6C45] text-white flex items-center justify-center font-bold">
              <SproutIcon size={20} />
            </div>
            <span className="text-xl font-extrabold text-[#1D1F1D] font-['Plus_Jakarta_Sans']">FloraMetrics</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#5CCF8D]/20 text-[#2E6C45] font-bold border border-[#5CCF8D]/40">
              AI Vision Pro
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#526057] max-w-sm leading-relaxed">
            Plataforma institucional de diagnóstico botánico IA, control de climatización de interiores, proyección de vida vegetal y guía analítica para cultivar verduras en tu propio huerto urbano.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#1D1F1D] mb-3">Secciones Analíticas</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('scanner')} className="hover:text-[#2E6C45] transition-colors">
                Cámara IA & Diagnóstico
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('climatizacion')} className="hover:text-[#2E6C45] transition-colors">
                Control de Climatización
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('huertos')} className="hover:text-[#2E6C45] transition-colors">
                Verduras para Huerto en Casa
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('comunidad')} className="hover:text-[#2E6C45] transition-colors">
                Especialistas & Tiempo de Vida
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#1D1F1D] mb-3">Tecnología & Longevidad</h4>
          <p className="text-xs text-[#526057] leading-relaxed mb-3">
            Desarrollado con React + Vite + Supabase + Cloudinary para máxima velocidad y precisión.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5CCF8D] animate-ping" />
            <span className="text-xs font-semibold text-[#2E6C45]">IA Activa 24/7 en Móvil & Computadora</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#DCE7E0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7A70] gap-4">
        <p>© 2026 FloraMetrics AI. Todos los derechos reservados.</p>
        <p className="flex items-center gap-1">
          Precisión Analítica y Frescura Orgánica <SparklesIcon size={14} className="text-[#2E6C45]" />
        </p>
      </div>
    </footer>
  );
};
