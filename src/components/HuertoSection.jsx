import React, { useState } from 'react';
import { huertoCatalog } from '../data/plantData';
import { SproutIcon, SunIcon, DropletIcon, SparklesIcon } from './Icons';

export const HuertoSection = () => {
  const [filter, setFilter] = useState('Todos');
  const [potCount, setPotCount] = useState(4);
  const [selectedCrop, setSelectedCrop] = useState(huertoCatalog[0]);

  const spaces = ['Todos', 'Balcón / Maceta', 'Ventana', 'Jardinera'];

  const filteredItems = filter === 'Todos'
    ? huertoCatalog
    : huertoCatalog.filter((item) => item.space.toLowerCase().includes(filter.split(' ')[0].toLowerCase()));

  const estimatedHarvestGrams = potCount * 450;

  return (
    <section id="huertos" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#DCE7E0] text-[#2E6C45] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <SproutIcon size={14} className="text-[#5CCF8D]" />
          Huertos Urbanos Institucionales
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans'] mb-3">
          Verduras y Alimentos que Puedes <span className="text-[#2E6C45]">Cultivar en Casa</span>
        </h2>
        <p className="text-sm sm:text-base text-[#526057]">
          Convierte tu balcón o ventana en una despensa vegetal con el respaldo de FloraMetrics. Conoce su climatización y ciclo de cosecha.
        </p>
      </div>

      {/* Interactive Harvest Space Calculator Banner */}
      <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#F3F8F5] border border-[#DAE6DF] text-[#2E6C45] font-bold text-xs inline-flex items-center gap-1.5">
              <SparklesIcon size={14} className="text-[#5CCF8D]" />
              Calculadora Analítica de Rendimiento
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1D1F1D]">
              ¿Cuánto alimento fresco puedes cosechar por temporada?
            </h3>
            <p className="text-xs sm:text-sm text-[#526057]">
              Selecciona el número de macetas o jardineras para proyectar tu producción orgánica sin pesticidas.
            </p>

            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#1D1F1D] mb-1.5">
                <span>Espacios o Macetas asignadas:</span>
                <span className="text-[#2E6C45] font-mono text-base">{potCount} Macetas</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={potCount}
                onChange={(e) => setPotCount(Number(e.target.value))}
                className="w-full accent-[#2E6C45]"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F3F8F5] border border-[#DCE7E0] rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#526057]">Producción Estimada Mensual:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#5CCF8D]/20 text-[#2E6C45] text-xs font-bold border border-[#5CCF8D]/40">
                100% Orgánico
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1D1F1D] font-mono">
                {(estimatedHarvestGrams / 1000).toFixed(1)} kg
              </span>
              <span className="text-xs text-[#526057]">de hortalizas frescas / mes</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#DCE7E0]">
                <p className="text-[#64746A]">Relleno de Progreso</p>
                <p className="font-bold text-[#2E6C45] mt-0.5">Óptimo #5CCF8D</p>
              </div>
              <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#DCE7E0]">
                <p className="text-[#64746A]">Primeras Cosechas</p>
                <p className="font-bold text-[#2E6C45] mt-0.5">28 a 45 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {spaces.map((sp) => (
          <button
            key={sp}
            onClick={() => setFilter(sp)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              filter === sp
                ? 'bg-[#2E6C45] text-white shadow-sm'
                : 'bg-[#FFFFFF] text-[#1D1F1D] hover:bg-[#EAF3ED] border border-[#DCE7E0]'
            }`}
          >
            {sp}
          </button>
        ))}
      </div>

      {/* Vegetable Catalog Grid on pure white #FFFFFF */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((crop) => (
          <div
            key={crop.id}
            onClick={() => setSelectedCrop(crop)}
            className={`group bg-[#FFFFFF] border rounded-3xl p-6 transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md ${
              selectedCrop.id === crop.id
                ? 'border-[#2E6C45] shadow-md scale-[1.01]'
                : 'border-[#DCE7E0] hover:border-[#2E6C45]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#F3F8F5] border border-[#DCE7E0] text-[#2E6C45] text-xs font-bold">
                  {crop.badge}
                </span>
                <span className="text-xs font-mono text-[#526057]">
                  Cosecha: <strong className="text-[#1D1F1D]">{crop.daysToHarvest} días</strong>
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#1D1F1D] mb-2 group-hover:text-[#2E6C45] transition-colors">
                {crop.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#526057] mb-4 line-clamp-2 leading-relaxed">
                {crop.description}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#EAEFEA]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#59695F] flex items-center gap-1.5 font-semibold">
                  <SunIcon size={14} className="text-[#5CCF8D]" /> Luz requerida:
                </span>
                <span className="font-semibold text-[#1D1F1D]">{crop.sunlight}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#59695F] flex items-center gap-1.5 font-semibold">
                  <DropletIcon size={14} className="text-[#2E6C45]" /> Riego óptimo:
                </span>
                <span className="font-semibold text-[#1D1F1D]">{crop.water}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#59695F] font-semibold">Espacio ideal:</span>
                <span className="font-bold text-[#2E6C45]">{crop.space}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
