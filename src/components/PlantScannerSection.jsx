import React, { useState } from 'react';
import { interactivePlants } from '../data/plantData';
import { savePlantToUserGarden, getActiveUser } from '../data/userDatabase';
import { CameraIcon, SparklesIcon, LeafIcon, ThermometerIcon, DropletIcon, SunIcon, HeartPulseIcon, AlertTriangleIcon, RotateCwIcon, ShieldCheckIcon, ClockIcon, CheckCircleIcon } from './Icons';

export const PlantScannerSection = () => {
  const [selectedPlantId, setSelectedPlantId] = useState(interactivePlants[0].id);
  const [cameraAngle, setCameraAngle] = useState(0);
  const [activeViewMode, setActiveViewMode] = useState('general');
  const [activeDiagnosticIndex, setActiveDiagnosticIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const plant = interactivePlants.find((p) => p.id === selectedPlantId) || interactivePlants[0];
  const activeDiag = plant.diagnostics[activeDiagnosticIndex] || plant.diagnostics[0];

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 900);
  };

  const handleAddToMyCollection = () => {
    const user = getActiveUser();
    savePlantToUserGarden(user.id, plant);
    setToastMsg(`🌱 ¡${plant.name} añadida a la base de datos de ${user.name}!`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <section id="scanner" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#DCE7E0] text-[#2E6C45] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <SparklesIcon size={14} className="text-[#5CCF8D]" />
          FloraMetrics Institutional AI Engine
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans'] mb-3">
          Visor Analítico Central & <span className="text-[#2E6C45]">Flora AI Report</span>
        </h2>
        <p className="text-sm sm:text-base text-[#59695F]">
          Explora la planta en el visor institucional: mueve la cámara para activar el escaneo analítico en color menta IA y obtener el diagnóstico botánico completo.
        </p>
      </div>

      {/* Plant Selector Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {interactivePlants.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedPlantId(item.id);
              setActiveDiagnosticIndex(0);
              handleRunScan();
            }}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              selectedPlantId === item.id
                ? 'bg-[#2E6C45] text-white shadow-md'
                : 'bg-[#FFFFFF] text-[#1D1F1D] hover:bg-[#EAF3ED] border border-[#DCE7E0]'
            }`}
          >
            <LeafIcon size={16} className={selectedPlantId === item.id ? 'text-[#5CCF8D]' : 'text-[#2E6C45]'} />
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Institutional Scanner & Flora AI Report Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT: Institutional Central Viewfinder */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col justify-between">
          {/* Viewport Header */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5CCF8D] animate-ping" />
              <span className="text-xs font-mono font-bold text-[#2E6C45] uppercase tracking-widest">
                Visor Central | {plant.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F3F8F5] px-3 py-1 rounded-full border border-[#D8E5DD] text-xs font-semibold text-[#1D1F1D]">
              <ClockIcon size={13} className="text-[#2E6C45]" />
              <span>Vida Proyectada: <strong className="text-[#2E6C45]">{plant.lifeSpanYears}</strong></span>
            </div>
          </div>

          {/* Clean Central Viewfinder with Mint Overlay (#5CCF8D) */}
          <div className="relative w-full h-[340px] sm:h-[410px] flex items-center justify-center my-2 rounded-2xl bg-[#F3F8F5] border border-[#D6E4DB] overflow-hidden">
            {/* Soft Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#2E6C4510_1px,transparent_1px),linear-gradient(to_bottom,#2E6C4510_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

            {/* Smooth Mint Sweep Scanning Overlay (#5CCF8D) */}
            {isScanning && (
              <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-[#5CCF8D] to-transparent opacity-80 shadow-[0_0_24px_#5CCF8D] animate-[sweep_1.2s_ease-in-out_infinite] z-30" />
            )}

            {/* Plant Image Container */}
            <div
              className="relative transition-transform duration-500 ease-out flex items-center justify-center"
              style={{
                transform: `rotate(${cameraAngle * 0.15}deg) scale(${1 + Math.abs(cameraAngle) * 0.0008})`
              }}
            >
              <img
                src={plant.image}
                alt={plant.name}
                className="max-h-[270px] sm:max-h-[350px] w-auto object-contain drop-shadow-lg transition-all"
              />

              {/* Glowing Mint AI Nodes */}
              <div
                onClick={() => setActiveDiagnosticIndex(0)}
                className="absolute top-1/4 left-1/3 cursor-pointer group flex items-center gap-2 transform -translate-x-1/2"
              >
                <div className="w-8 h-8 rounded-full bg-[#5CCF8D]/40 border-2 border-[#5CCF8D] flex items-center justify-center animate-bounce shadow-md">
                  <span className="w-3 h-3 rounded-full bg-[#2E6C45]" />
                </div>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#FFFFFF]/95 border border-[#DCE7E0] text-[11px] font-bold text-[#1D1F1D] shadow-sm">
                  Hoja #1: Follaje & Clorofila
                </span>
              </div>
            </div>

            {/* Floating Top & Secondary Circular Controls (Linterna, Galería, Ángulo) */}
            <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
              <button
                onClick={handleRunScan}
                title="Linterna / Luz de Inspección"
                className="w-10 h-10 rounded-full bg-[#1D1F1D]/10 hover:bg-[#1D1F1D]/20 text-[#1D1F1D] flex items-center justify-center transition-all shadow-sm"
              >
                <SunIcon size={18} />
              </button>
              <button
                onClick={handleRunScan}
                title="Galería / Muestras"
                className="w-10 h-10 rounded-full bg-[#1D1F1D]/10 hover:bg-[#1D1F1D]/20 text-[#1D1F1D] flex items-center justify-center transition-all shadow-sm"
              >
                <RotateCwIcon size={18} />
              </button>
            </div>
          </div>

          {/* Camera Controls & Primary Pill Action Button */}
          <div className="mt-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F3F8F5] p-3.5 rounded-2xl border border-[#DAE6DF]">
              <div className="flex items-center gap-2">
                <CameraIcon size={16} className="text-[#2E6C45]" />
                <span className="text-xs font-bold text-[#1D1F1D]">Ángulo del Visor:</span>
              </div>
              <div className="flex items-center gap-3 flex-1 max-w-xs">
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={cameraAngle}
                  onChange={(e) => setCameraAngle(Number(e.target.value))}
                  className="w-full accent-[#2E6C45]"
                />
                <span className="text-xs font-mono font-bold text-[#2E6C45] min-w-[42px] text-right">
                  {cameraAngle}°
                </span>
              </div>
            </div>

            {/* PRIMARY PILL CTA BUTTON ("SCAN PLANT ✨") */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={handleRunScan}
                className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-full bg-[#2E6C45] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:bg-[#255838] transition-all"
              >
                <SparklesIcon size={18} className="text-[#5CCF8D]" />
                <span>SCAN PLANT ✨</span>
              </button>

              {/* SECONDARY OUTLINED PILL BUTTON ("ADD TO MY COLLECTION") */}
              <button
                onClick={handleAddToMyCollection}
                className="w-full sm:w-auto py-3.5 px-6 rounded-full border-2 border-[#2E6C45] text-[#2E6C45] font-bold text-xs sm:text-sm hover:bg-[#2E6C45] hover:text-white transition-all text-center flex items-center justify-center gap-1.5"
              >
                <CheckCircleIcon size={16} />
                <span>ADD TO MY COLLECTION</span>
              </button>
            </div>

            {toastMsg && (
              <div className="mt-3 bg-[#2E6C45] text-white p-3 rounded-2xl shadow-md flex items-center gap-2 text-xs font-bold animate-fadeIn">
                <CheckCircleIcon size={16} className="text-[#5CCF8D]" />
                <span>{toastMsg}</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Flora AI Report (Diagnostics & Recommendations Cards) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Flora AI Report Card */}
          <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3.5 py-1 rounded-full bg-[#F3F8F5] border border-[#DAE6DF] text-[#2E6C45] text-xs font-extrabold flex items-center gap-1.5">
                <SparklesIcon size={14} className="text-[#5CCF8D]" />
                Flora AI Report
              </span>
              <span className="text-xs font-mono text-[#5A6C61]">Confianza: <strong className="text-[#1D1F1D]">{activeDiag.aiConfidence}</strong></span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#1D1F1D] mb-4 flex items-center gap-2">
              <ShieldCheckIcon size={20} className="text-[#2E6C45]" />
              {activeDiag.title}
            </h3>

            {/* Health Score Metric Bar (#5CCF8D fill over soft #E4ECE7 track) */}
            <div className="mb-5 bg-[#F3F8F5] p-4 rounded-2xl border border-[#DAE6DF]">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-[#1D1F1D]">Índice de Salud Vegetal (Flora AI Health)</span>
                <span className="text-[#2E6C45] font-mono text-sm font-extrabold">{plant.healthScore}/100</span>
              </div>
              <div className="w-full h-3 bg-[#E4ECE7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5CCF8D] rounded-full transition-all duration-700"
                  style={{ width: `${plant.healthScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="bg-[#F3F8F5] p-3.5 rounded-2xl border border-[#DAE6DF]">
                <p className="text-[#59695F] font-semibold mb-1">Diagnóstico Analítico:</p>
                <p className="text-[#1D1F1D]">{activeDiag.cause}</p>
              </div>
            </div>
          </div>

          {/* Recommendation Cards (Watering, Light & Care Tips on pure #FFFFFF) */}
          <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 shadow-xl space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2E6C45] flex items-center gap-2">
              <ThermometerIcon size={16} />
              Recomendaciones Institucionales (Watering, Light & Care Tips)
            </h4>

            {/* Watering Card (Pure White Surface) */}
            <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#DCE7E0] shadow-sm flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F3F8F5] flex items-center justify-center shrink-0">
                <DropletIcon size={18} className="text-[#2E6C45]" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-[#1D1F1D] block">Watering Tip (Riego)</span>
                <span className="text-xs text-[#526057] mt-0.5 block leading-relaxed">{plant.climate.waterFreq}</span>
              </div>
            </div>

            {/* Light Card (Pure White Surface) */}
            <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#DCE7E0] shadow-sm flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F3F8F5] flex items-center justify-center shrink-0">
                <SunIcon size={18} className="text-[#5CCF8D]" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-[#1D1F1D] block">Light Requirement (Luminosidad)</span>
                <span className="text-xs text-[#526057] mt-0.5 block leading-relaxed">{plant.climate.light}</span>
              </div>
            </div>

            {/* Care Tips Card (Pure White Surface) */}
            <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#DCE7E0] shadow-sm flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F3F8F5] flex items-center justify-center shrink-0">
                <LeafIcon size={18} className="text-[#2E6C45]" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-[#1D1F1D] block">Care Method (Método de Cuidado)</span>
                <span className="text-xs text-[#526057] mt-0.5 block leading-relaxed">{activeDiag.solution}</span>
              </div>
            </div>

            {/* Nutrients & Source Card (Pure White Surface) */}
            {plant.nutrientsRequired && (
              <div className="bg-[#EBF5EF] p-4 rounded-2xl border border-[#2E6C45] shadow-sm flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2E6C45] text-white flex items-center justify-center shrink-0">
                  <SparklesIcon size={18} className="text-[#5CCF8D]" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#2E6C45] block">Nutrientes Requeridos ({plant.nutrientsRequired.npkFormula})</span>
                  </div>
                  <span className="text-xs text-[#1D1F1D] font-bold mt-0.5 block">🔬 Clave: {plant.nutrientsRequired.keyNutrient}</span>
                  <span className="text-xs text-[#526057] mt-0.5 block leading-relaxed">📍 <strong>Dónde conseguir / Aplicar:</strong> {plant.nutrientsRequired.whereToFind}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
