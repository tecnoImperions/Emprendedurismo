import React from 'react';
import { ThermometerIcon, DropletIcon, SunIcon, ShieldCheckIcon } from './Icons';

export const ClimatizationSection = () => {
  return (
    <section id="climatizacion" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 sm:p-10 shadow-md relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-4 py-1.5 rounded-full bg-[#EBF5EF] text-[#2E6C45] font-extrabold text-xs border border-[#CDE5D5] inline-flex items-center gap-1.5 uppercase tracking-wider">
            <SunIcon size={12} className="text-[#2E6C45]" />
            <span>Guía de Ambiente y Climatización Doméstica</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans'] mt-4 leading-tight">
            El Clima Ideal para tus Plantas
          </h2>
          <p className="text-sm sm:text-base text-[#526057] mt-3">
            Conoce los rangos óptimos de luz y temperatura en el hogar para asegurar el crecimiento saludable de tus cultivos domésticos.
          </p>
        </div>

        {/* 3 Rangos Óptimos Centrales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Temperatura */}
          <div className="p-6 rounded-2xl bg-[#F3F8F5] border border-[#DCE7E0] flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#DCE7E0] text-[#2E6C45] flex items-center justify-center shrink-0">
              <ThermometerIcon size={20} className="text-[#2E6C45]" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#1D1F1D] uppercase tracking-wider">Temperatura</h3>
              <p className="text-xs text-[#526057] mt-1">Rango óptimo: <strong className="text-[#2E6C45]">18°C a 26°C</strong></p>
              <p className="text-[11px] text-[#64746A] mt-1.5 leading-relaxed">
                Evita corrientes heladas de aire acondicionado y fuentes directas de calefacción doméstica.
              </p>
            </div>
          </div>

          {/* Humedad */}
          <div className="p-6 rounded-2xl bg-[#F3F8F5] border border-[#DCE7E0] flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#DCE7E0] text-[#2E6C45] flex items-center justify-center shrink-0">
              <DropletIcon size={20} className="text-[#2E6C45]" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#1D1F1D] uppercase tracking-wider">Humedad</h3>
              <p className="text-xs text-[#526057] mt-1">Rango óptimo: <strong className="text-[#2E6C45]">55% a 75%</strong></p>
              <p className="text-[11px] text-[#64746A] mt-1.5 leading-relaxed">
                En ambientes secos, agrupa tus macetas o coloca un plato con agua y guijarros debajo de ellas.
              </p>
            </div>
          </div>

          {/* Iluminación */}
          <div className="p-6 rounded-2xl bg-[#F3F8F5] border border-[#DCE7E0] flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#DCE7E0] text-[#2E6C45] flex items-center justify-center shrink-0">
              <SunIcon size={20} className="text-[#2E6C45]" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#1D1F1D] uppercase tracking-wider">Luz Solar</h3>
              <p className="text-xs text-[#526057] mt-1">Requisito mínimo: <strong className="text-[#2E6C45]">4 horas diarias</strong></p>
              <p className="text-[11px] text-[#64746A] mt-1.5 leading-relaxed">
                La iluminación indirecta brillante es la más segura para prevenir quemaduras en las hojas tiernas.
              </p>
            </div>
          </div>
        </div>

        {/* Las 4 Zonas de Luz en el Hogar */}
        <div>
          <h3 className="text-lg font-extrabold text-[#1D1F1D] mb-6 border-b border-[#E8EEEA] pb-2 flex items-center gap-2">
            <ShieldCheckIcon size={18} className="text-[#2E6C45]" />
            <span>Zonas de Iluminación en el Hogar</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Zona 1 */}
            <div className="p-5 bg-white border border-[#DCE7E0] rounded-2xl space-y-3">
              <span className="text-[10px] font-extrabold uppercase bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md">Sol Directo</span>
              <h4 className="text-sm font-bold text-[#1D1F1D]">Ventanas al Sur / Balcón</h4>
              <p className="text-[11px] text-[#526057] leading-relaxed">
                Recibe más de 5 horas de luz solar directa. Ideal para hortalizas, suculentas, romero y cactus.
              </p>
            </div>

            {/* Zona 2 */}
            <div className="p-5 bg-white border border-[#DCE7E0] rounded-2xl space-y-3">
              <span className="text-[10px] font-extrabold uppercase bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded-md">Luz Indirecta</span>
              <h4 className="text-sm font-bold text-[#1D1F1D]">Cerca de Ventana Grande</h4>
              <p className="text-[11px] text-[#526057] leading-relaxed">
                Luz brillante filtrada por cortina. Ideal para Monsteras, Anturios, Potus y la mayoría de plantas tropicales.
              </p>
            </div>

            {/* Zona 3 */}
            <div className="p-5 bg-white border border-[#DCE7E0] rounded-2xl space-y-3">
              <span className="text-[10px] font-extrabold uppercase bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-md">Semisombra</span>
              <h4 className="text-sm font-bold text-[#1D1F1D]">Habitaciones Interiores</h4>
              <p className="text-[11px] text-[#526057] leading-relaxed">
                Luz moderada alejada de la ventana. Ideal para helechos, Sansevierias (Lengua de suegra) y Spathiphyllum.
              </p>
            </div>

            {/* Zona 4 */}
            <div className="p-5 bg-white border border-[#DCE7E0] rounded-2xl space-y-3">
              <span className="text-[10px] font-extrabold uppercase bg-gray-50 text-gray-800 border border-gray-200 px-2 py-0.5 rounded-md">Sombra</span>
              <h4 className="text-sm font-bold text-[#1D1F1D]">Pasillos o Baños</h4>
              <p className="text-[11px] text-[#526057] leading-relaxed">
                Luz escasa o artificial. Pocas especies toleran esto de forma prolongada sin lámparas de cultivo específicas.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
