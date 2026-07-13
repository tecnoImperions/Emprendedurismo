import React, { useState } from 'react';
import { expertsCommunity } from '../data/plantData';
import { UsersIcon, ClockIcon, SparklesIcon } from './Icons';

export const ExpertsSection = () => {
  const [plantAgeInput, setPlantAgeInput] = useState('3 años');
  const [plantTypeInput, setPlantTypeInput] = useState('Monstera Deliciosa');
  const [showPrognosis, setShowPrognosis] = useState(false);

  return (
    <section id="comunidad" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#DCE7E0] text-[#2E6C45] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <UsersIcon size={14} className="text-[#5CCF8D]" />
          Red Institucional & Longevidad Botánica
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans'] mb-3">
          Asesórate con Especialistas en <span className="text-[#2E6C45]">Tiempo de Vida</span>
        </h2>
        <p className="text-sm sm:text-base text-[#526057]">
          Descubre cómo alargar el ciclo vital de tus plantas décadas enteras con el asesoramiento de curadores con historiales de longevidad verificados en FloraMetrics.
        </p>
      </div>

      {/* Interactive Lifespan Calculator Widget */}
      <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-bold text-[#2E6C45] uppercase tracking-wider block mb-2">
              Evaluación IA + Curaduría Institucional
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1D1F1D] mb-2">
              Calcula la Proyección de Vida de tu Planta
            </h3>
            <p className="text-xs sm:text-sm text-[#526057] mb-4">
              Ingresa los años o meses que lleva contigo y su especie para conocer cuántos años de esplendor puede alcanzar con el método de cuidado FloraMetrics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs font-semibold text-[#1D1F1D] block mb-1">Especie / Planta:</label>
                <select
                  value={plantTypeInput}
                  onChange={(e) => setPlantTypeInput(e.target.value)}
                  className="w-full bg-[#F3F8F5] border border-[#DCE7E0] rounded-xl px-3 py-2 text-xs text-[#1D1F1D] font-medium focus:outline-none focus:border-[#2E6C45]"
                >
                  <option>Monstera Deliciosa</option>
                  <option>Tomate Cherry en Maceta</option>
                  <option>Calathea Ornata</option>
                  <option>Albahaca Gourmet</option>
                  <option>Ficus Lyrata</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1D1F1D] block mb-1">Edad Actual:</label>
                <select
                  value={plantAgeInput}
                  onChange={(e) => setPlantAgeInput(e.target.value)}
                  className="w-full bg-[#F3F8F5] border border-[#DCE7E0] rounded-xl px-3 py-2 text-xs text-[#1D1F1D] font-medium focus:outline-none focus:border-[#2E6C45]"
                >
                  <option>Menos de 1 año</option>
                  <option>1 - 3 años</option>
                  <option>3 - 7 años</option>
                  <option>Más de 10 años</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowPrognosis(true)}
              className="px-6 py-3 rounded-full bg-[#2E6C45] text-white font-extrabold text-xs sm:text-sm shadow-md hover:bg-[#255838] transition-all"
            >
              Calcular Tiempo de Vida & Plan Mentor
            </button>
          </div>

          <div className="lg:col-span-6 bg-[#F3F8F5] border border-[#DCE7E0] rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ClockIcon size={18} className="text-[#2E6C45]" />
                <span className="text-xs font-bold text-[#1D1F1D]">Reporte de Longevidad</span>
              </div>
              <span className="px-3 py-0.5 rounded-full bg-[#5CCF8D]/20 text-[#2E6C45] text-xs font-bold border border-[#5CCF8D]/40">
                Verificado por FloraMetrics
              </span>
            </div>

            <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#DCE7E0] space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#59695F]">Especie Seleccionada:</span>
                <span className="text-xs font-bold text-[#1D1F1D]">{plantTypeInput}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#59695F]">Potencial de Vida Óptimo:</span>
                <span className="text-sm font-extrabold text-[#2E6C45]">
                  {plantTypeInput.includes('Tomate') || plantTypeInput.includes('Albahaca')
                    ? '1 temporada continua + Re-siembra anual'
                    : '15 a 35+ Años'}
                </span>
              </div>
              <div className="pt-2 border-t border-[#EAEFEA] text-xs text-[#526057] leading-relaxed">
                {showPrognosis ? (
                  <span className="text-[#1D1F1D] animate-fadeIn">
                    ✨ <strong>Plan Longevidad:</strong> Tu {plantTypeInput} ({plantAgeInput}) está en la fase donde la renovación de sustrato y el control de pH extienden su vitalidad por décadas. Un especialista de FloraMetrics revisará sus raíces en el próximo escaneo.
                  </span>
                ) : (
                  <span>
                    Haz clic en calcular para obtener la proyección de esperanza de vida y las recomendaciones de nuestros botánicos.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expert Mentors Cards on pure #FFFFFF */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {expertsCommunity.map((expert) => (
          <div
            key={expert.id}
            className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 hover:border-[#2E6C45] transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#2E6C45] shadow-sm"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D1F1D]">{expert.name}</h3>
                  <p className="text-xs text-[#2E6C45] font-medium">{expert.role}</p>
                </div>
              </div>

              <div className="bg-[#F3F8F5] p-3 rounded-xl border border-[#DCE7E0] mb-4 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#59695F]">Récord Longevidad:</span>
                  <span className="font-bold text-[#2E6C45]">{expert.lifespanRecord}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#59695F]">Trayectoria:</span>
                  <span className="font-semibold text-[#1D1F1D]">{expert.experience}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#526057] italic leading-relaxed mb-4">
                "{expert.quote}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#EAEFEA]">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#2E6C45]">
                <span className="w-2 h-2 rounded-full bg-[#5CCF8D] animate-pulse" />
                {expert.status}
              </span>
              <button className="px-4 py-1.5 rounded-full border border-[#2E6C45] text-[#2E6C45] hover:bg-[#2E6C45] hover:text-white text-xs font-bold transition-all">
                Consultar Caso
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
