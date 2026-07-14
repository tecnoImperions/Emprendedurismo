import React, { useState } from 'react';
import { nutrientDirectoryCatalog } from '../data/plantData';
import { SparklesIcon, LeafIcon, DropletIcon, AlertTriangleIcon, CheckCircleIcon } from './Icons';

export const NutrientsSection = () => {
  const [activeTab, setActiveTab] = useState('viveros-fisicos');
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const currentCategory = nutrientDirectoryCatalog.find(c => c.id === activeTab) || nutrientDirectoryCatalog[0];

  return (
    <section id="nutrientes" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header institucional */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#DCE7E0] text-[#2E6C45] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <LeafIcon size={14} className="text-[#5CCF8D]" />
          Directorio & Base de Datos de Nutrientes Vegetales
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans'] mb-3">
          ¿Dónde Buscar <span className="text-[#2E6C45]">Nutrientes</span> para tu Huerto en Casa?
        </h2>
        <p className="text-sm sm:text-base text-[#526057]">
          Consulta nuestra base de datos detallada de viveros físicos, abonos comerciales orgánicos y recetas caseras de cocina para cubrir las deficiencias exactas de NPK (Nitrógeno, Fósforo y Potasio).
        </p>
      </div>

      {/* Selector de Categoría (Pestañas / Tabs) */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {nutrientDirectoryCatalog.map((cat) => {
          const isSelected = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setSelectedItemIndex(0);
              }}
              className={`py-3 px-6 rounded-2xl font-extrabold text-xs sm:text-sm transition-all border shadow-sm ${
                isSelected
                  ? 'bg-[#2E6C45] text-white border-[#2E6C45] shadow-md scale-105'
                  : 'bg-[#FFFFFF] text-[#526057] border-[#DCE7E0] hover:border-[#2E6C45] hover:text-[#1D1F1D]'
              }`}
            >
              {cat.category}
            </button>
          );
        })}
      </div>

      {/* Contenido principal de la Categoría */}
      <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="border-b border-[#E4ECE7] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-xs font-extrabold text-[#2E6C45] uppercase tracking-wider block">
              Base de Datos FloraMetrics Verificada
            </span>
            <h3 className="text-lg sm:text-2xl font-bold text-[#1D1F1D]">
              {currentCategory.category}
            </h3>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-[#EBF5EF] text-[#2E6C45] text-xs font-bold w-fit border border-[#DCE7E0]">
            {currentCategory.items.length} Fuentes Registradas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentCategory.items.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                selectedItemIndex === idx
                  ? 'bg-[#F3F8F5] border-[#2E6C45] shadow-md ring-2 ring-[#2E6C45]/20'
                  : 'bg-[#FFFFFF] border-[#DCE7E0] hover:border-[#5CCF8D]'
              }`}
              onClick={() => setSelectedItemIndex(idx)}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-base font-extrabold text-[#1D1F1D]">
                    {item.name}
                  </h4>
                  <span className="w-6 h-6 rounded-full bg-[#2E6C45] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                </div>

                {/* Si es ubicación física */}
                {item.location && (
                  <div className="space-y-2 bg-[#FFFFFF] p-3 rounded-xl border border-[#E4ECE7] text-xs">
                    <p className="text-[#1D1F1D] font-medium">
                      <strong className="text-[#2E6C45]">Dirección:</strong> {item.location}
                    </p>
                    <p className="text-[#526057]">
                      <strong className="text-[#1D1F1D]">Nutrientes Disponibles:</strong> {item.availableNutrients}
                    </p>
                    <p className="text-[#526057] pt-1 border-t border-[#E4ECE7]">
                      <strong>Horario & Contacto:</strong> {item.contactOrHours}
                    </p>
                  </div>
                )}

                {/* Si es nutriente casero */}
                {item.howToMake && (
                  <div className="space-y-2 text-xs">
                    <div className="bg-[#EBF5EF] px-3 py-1.5 rounded-lg text-[#2E6C45] font-bold">
                      Fórmula / Equivalente NPK: {item.npkEquivalent}
                    </div>
                    <p className="text-[#1D1F1D] font-semibold">
                      Ideal para: <span className="font-normal text-[#526057]">{item.bestFor}</span>
                    </p>
                    <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#DCE7E0] text-[#526057] leading-relaxed">
                      <strong className="text-[#1D1F1D] block mb-1">Preparación en Casa:</strong>
                      {item.howToMake}
                    </div>
                  </div>
                )}

                {/* Si es abono comercial */}
                {item.application && (
                  <div className="space-y-2 text-xs">
                    <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#DCE7E0] space-y-1.5">
                      <p className="text-[#1D1F1D] font-semibold">
                        <strong className="text-[#2E6C45]">Instrucciones de Uso:</strong> {item.application}
                      </p>
                      <p className="text-[#526057] pt-1 border-t border-[#E4ECE7]">
                        <strong>Beneficio Científico:</strong> {item.benefits}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#E4ECE7] flex items-center justify-between text-xs">
                <span className="text-[#2E6C45] font-bold flex items-center gap-1">
                  <CheckCircleIcon size={14} className="text-[#5CCF8D]" /> Verificado NPK
                </span>
                <span className="text-xs text-[#59695F] font-mono">Guía Huerto en Casa</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Caja de Ayuda Rápida para Identificar Qué Nutriente te Falta */}
      <div className="mt-8 bg-[#EBF5EF] border border-[#2E6C45] rounded-3xl p-6 sm:p-8 text-xs sm:text-sm text-[#1D1F1D]">
        <h4 className="text-base sm:text-lg font-extrabold text-[#2E6C45] flex items-center gap-2 mb-3">
          <AlertTriangleIcon size={20} className="text-[#2E6C45]" />
          Guía de Diagnóstico Rápido: ¿Cómo saber qué nutriente buscar?
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#DCE7E0] shadow-sm">
            <strong className="text-[#2E6C45] text-sm block mb-1">🟢 Si las Hojas se Vuelven Amarillas (Abajo)</strong>
            <p className="text-[#526057] mb-2">
              Indica falta de <strong>Nitrógeno (N)</strong> o Clorosis. La planta no puede producir clorofila y gasta sus reservas en las hojas nuevas.
            </p>
            <span className="text-xs font-bold text-[#1D1F1D] bg-[#F3F8F5] px-2.5 py-1 rounded-md block">
              👉 Solución: Humus de lombriz o posos de café secos.
            </span>
          </div>

          <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#DCE7E0] shadow-sm">
            <strong className="text-[#2E6C45] text-sm block mb-1">🟣 Si las Hojas Tienen Tonos Morados/Oscuros</strong>
            <p className="text-[#526057] mb-2">
              Indica falta de <strong>Fósforo (P)</strong>. Las raíces se estancan y la planta no puede desarrollar flores ni cuajar frutos.
            </p>
            <span className="text-xs font-bold text-[#1D1F1D] bg-[#F3F8F5] px-2.5 py-1 rounded-md block">
              👉 Solución: Guano de murciélago o ceniza de leña limpia.
            </span>
          </div>

          <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#DCE7E0] shadow-sm">
            <strong className="text-[#2E6C45] text-sm block mb-1">🟤 Si los Bordes de las Hojas se Quemaron o el Tomate se pudre abajo</strong>
            <p className="text-[#526057] mb-2">
              Indica falta de <strong>Potasio (K)</strong> y <strong>Calcio (Ca)</strong>. El fruto pierde azúcares y sufre pudrición apical.
            </p>
            <span className="text-xs font-bold text-[#1D1F1D] bg-[#F3F8F5] px-2.5 py-1 rounded-md block">
              👉 Solución: Té de cáscara de plátano + Harina de huevo.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
