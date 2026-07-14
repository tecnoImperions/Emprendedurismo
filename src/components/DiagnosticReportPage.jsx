import React, { useState } from 'react';
import { savePlantToUserGarden, getActiveUser } from '../data/userDatabase';
import { SparklesIcon, SproutIcon, ThermometerIcon, LeafIcon, DropletIcon, CheckCircleIcon } from './Icons';

export const DiagnosticReportPage = ({ reportData, onNavigate, onScanAgain }) => {
  const [savedFeedback, setSavedFeedback] = useState(false);
  const activeUser = getActiveUser();

  if (!reportData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="bg-white border border-[#DCE7E0] rounded-3xl p-8 shadow-md">
          <h3 className="text-xl font-extrabold text-[#1D1F1D] mb-2">No hay reporte botánico seleccionado</h3>
          <p className="text-xs text-[#526057] mb-6">Realiza un nuevo escaneo en vivo con tu cámara o selecciona uno del historial.</p>
          <button
            onClick={onScanAgain}
            className="px-6 py-3 rounded-2xl bg-[#2E6C45] text-white font-extrabold text-xs shadow-md"
          >
            📸 Abrir Cámara Ahora
          </button>
        </div>
      </div>
    );
  }

  const {
    plantName = reportData.name || 'Planta Escaneada',
    scientificName = reportData.scientificName || 'Especie identificada por IA',
    healthScore = reportData.healthScore || 90,
    imageUrl = reportData.imageUrl || 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&auto=format&fit=crop&q=80',
    cloudinaryId = reportData.cloudinaryId || 'cloud_live',
    diagnosisTitle = reportData.title || reportData.diagnosisTitle || 'Análisis botánico completado con éxito',
    diagnosisSolution = reportData.solution || reportData.diagnosisSolution || 'Revisar humedad y mantener monitoreo constante en el hogar.',
    nutrientsRequired = reportData.nutrientsRequired || {},
    care = reportData.care || {},
    climate = reportData.climate || {},
    lifeSpanYears = reportData.lifeSpanYears || 'Longevidad estable con cuidados en hogar'
  } = reportData;

  const handleSaveToMyGarden = () => {
    if (!activeUser) return;
    savePlantToUserGarden(activeUser.id, {
      name: plantName,
      customName: `${plantName} del Hogar`,
      locationInHome: activeUser.spaceType || 'Balcón Soleado / Ventana',
      healthScore: healthScore,
      lastAiScanResult: {
        title: diagnosisTitle,
        solution: diagnosisSolution,
        isPlantOrGarden: true
      },
      climate: climate,
      imageUrl: imageUrl
    });
    setSavedFeedback(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-fadeIn">
      
      {/* Barra superior de regreso e insignias */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={() => onNavigate('historial')}
          className="px-4 py-2 rounded-xl bg-white border border-[#DCE7E0] hover:bg-[#F3F8F5] text-xs font-extrabold text-[#1D1F1D] flex items-center gap-2 transition-all shadow-2xs"
        >
          <span>←</span>
          <span>Volver al Historial de Escaneos</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#EBF5EF] border border-[#CDE5D5] text-xs font-extrabold text-[#2E6C45] flex items-center gap-1.5">
            <span>☁️</span>
            <span>Cloudinary: <strong>ll3h5fkl</strong></span>
          </span>
          <span className="px-3 py-1 rounded-full bg-[#1D1F1D] text-white text-xs font-extrabold font-mono">
            ID: {cloudinaryId.slice(0, 16)}
          </span>
        </div>
      </div>

      {/* ENCABEZADO Y TARJETA PRINCIPAL DEL REPORTE (PÁGINA COMPLETA) */}
      <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 sm:p-8 shadow-lg mb-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* FOTO DE ALTA RESOLUCIÓN SUBIDA A CLOUDINARY */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden border-2 border-[#DCE7E0] bg-[#F3F8F5] shadow-md relative group">
              <img
                src={imageUrl}
                alt={plantName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#1D1F1D]/85 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold tracking-wider uppercase border border-white/20">
                Muestra Fotográfica Nube
              </div>
            </div>
          </div>

          {/* DATOS GENERALES Y PUNTUACIÓN BOTÁNICA */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2E6C45]">
                  {scientificName}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1D1F1D] font-['Plus_Jakarta_Sans'] tracking-tight mt-1">
                  {plantName}
                </h1>
              </div>

              {/* Anillo de Salud Botánica */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#F3F8F5] border border-[#CDE5D5] shadow-xs text-center shrink-0">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#2E6C45] font-mono">{healthScore}/100</span>
                <span className="text-[10px] font-bold text-[#526057] uppercase">Índice de Salud</span>
              </div>
            </div>

            {/* Diagnóstico IA */}
            <div className="p-5 rounded-2xl bg-[#F9FBF9] border-l-4 border-[#2E6C45] border-y border-r border-y-[#DCE7E0] border-r-[#DCE7E0]">
              <div className="flex items-center gap-2 mb-2">
                <SparklesIcon size={18} className="text-[#2E6C45]" />
                <h3 className="text-sm font-extrabold text-[#1D1F1D]">Diagnóstico Botánico de Estado</h3>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#1D1F1D] mb-2">{diagnosisTitle}</p>
              <p className="text-xs sm:text-sm text-[#526057] leading-relaxed">
                <strong>💡 Recomendación institucional:</strong> {diagnosisSolution}
              </p>
            </div>

            {/* Longevidad y Clima */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#F3F8F5] border border-[#DCE7E0]">
                <span className="text-[11px] font-bold text-[#64746A] block">Tiempo de Vida / Longevidad</span>
                <span className="text-xs sm:text-sm font-extrabold text-[#1D1F1D]">{lifeSpanYears}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F3F8F5] border border-[#DCE7E0]">
                <span className="text-[11px] font-bold text-[#64746A] block">Rango Térmico de Hogar</span>
                <span className="text-xs sm:text-sm font-extrabold text-[#2E6C45]">{climate.temperature || '18°C - 26°C'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4 PILARES DE CUIDADO EN HOGAR */}
      <h3 className="text-lg font-extrabold text-[#1D1F1D] mb-4 flex items-center gap-2">
        <SproutIcon size={20} className="text-[#2E6C45]" />
        <span>Los 4 Pilares Fundamentales del Cuidado en Hogar</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Riego */}
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#DCE7E0] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#EBF5EF] text-[#2E6C45] flex items-center justify-center text-xl mb-3">💧</div>
            <h4 className="text-xs font-extrabold text-[#1D1F1D] uppercase tracking-wider mb-1">Riego Óptimo</h4>
            <p className="text-xs text-[#526057] leading-relaxed">{care.water || climate.waterFreq || 'Regar cuando el tercio superior esté seco al tacto.'}</p>
          </div>
          <span className="text-[10px] font-bold text-[#2E6C45] mt-3 block">Sin encharcar raíces</span>
        </div>

        {/* Luz */}
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#DCE7E0] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#FFF9E6] text-[#D99A00] flex items-center justify-center text-xl mb-3">☀️</div>
            <h4 className="text-xs font-extrabold text-[#1D1F1D] uppercase tracking-wider mb-1">Exposición a la Luz</h4>
            <p className="text-xs text-[#526057] leading-relaxed">{care.light || 'Sol matutino brillante o luz indirecta (4-6 horas).'}</p>
          </div>
          <span className="text-[10px] font-bold text-[#D99A00] mt-3 block">Fotosíntesis saludable</span>
        </div>

        {/* Sustrato */}
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#DCE7E0] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#8C5D2A] flex items-center justify-center text-xl mb-3">🌱</div>
            <h4 className="text-xs font-extrabold text-[#1D1F1D] uppercase tracking-wider mb-1">Sustrato & Maceta</h4>
            <p className="text-xs text-[#526057] leading-relaxed">{care.soil || 'Mezcla suelta con compost orgánico y perlita para drenar fluídamente.'}</p>
          </div>
          <span className="text-[10px] font-bold text-[#8C5D2A] mt-3 block">Raíces oxigenadas</span>
        </div>

        {/* Plagas */}
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#DCE7E0] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#FEECEB] text-[#D93829] flex items-center justify-center text-xl mb-3">🛡️</div>
            <h4 className="text-xs font-extrabold text-[#1D1F1D] uppercase tracking-wider mb-1">Protección Sin Tóxicos</h4>
            <p className="text-xs text-[#526057] leading-relaxed">{care.fertilizer || 'Revisión quincenal. Pulverizar jabón potásico diluido al atardecer ante plagas.'}</p>
          </div>
          <span className="text-[10px] font-bold text-[#D93829] mt-3 block">100% ecológico en casa</span>
        </div>

      </div>

      {/* NUTRIENTES NPK & DÓNDE CONSEGUIRLOS */}
      <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 sm:p-8 shadow-md mb-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#2E6C45] text-white flex items-center justify-center">
            <LeafIcon size={22} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#1D1F1D]">Nutrientes NPK Requeridos & Fórmulas Caseras</h3>
            <p className="text-xs text-[#526057]">Qué necesita tu planta en este momento para potenciar su verdor y floración.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="p-4 rounded-2xl bg-[#EBF5EF]/70 border border-[#CDE5D5]">
            <span className="text-xs font-extrabold text-[#2E6C45] uppercase tracking-wider block mb-1">Fórmula Principal NPK</span>
            <p className="text-sm font-extrabold text-[#1D1F1D]">{nutrientsRequired.npk || 'Humus de Lombriz (Nitrógeno orgánico N balanceado)'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9E6]/70 border border-[#F3E2AB]">
            <span className="text-xs font-extrabold text-[#B8860B] uppercase tracking-wider block mb-1">Receta Casera Orgánica 🍌🥚</span>
            <p className="text-xs sm:text-sm text-[#1D1F1D] leading-relaxed">
              {nutrientsRequired.homemadeSource || 'Té de cáscara de plátano hervida (Potasio K) + cáscara de huevo triturada (Calcio) aplicada una vez al mes.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F3F8F5] border border-[#DCE7E0]">
            <span className="text-xs font-extrabold text-[#526057] uppercase tracking-wider block mb-1">Qué Pedir en Vivero 🏪</span>
            <p className="text-xs sm:text-sm text-[#1D1F1D] leading-relaxed">
              {nutrientsRequired.commercialSource || 'Abono vegetal líquido orgánico o fertilizante universal soluble NPK 10-10-10.'}
            </p>
          </div>

        </div>
      </div>

      {/* BOTONES DE ACCIÓN DEL REPORTE COMPLETO */}
      <div className="bg-[#EBF5EF] border border-[#CDE5D5] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-extrabold text-[#1D1F1D]">¿Deseas asignar esta planta a tu hogar permanente?</h4>
          <p className="text-xs text-[#526057]">Se vinculará a la habitación o balcón de tu perfil para programar alarmas de riego y cosecha.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {savedFeedback ? (
            <div className="px-5 py-3 rounded-2xl bg-[#2E6C45] text-white font-bold text-xs flex items-center gap-2 shadow-sm">
              <CheckCircleIcon size={16} />
              <span>¡Guardado en Mi Huerto con éxito!</span>
            </div>
          ) : (
            <button
              onClick={handleSaveToMyGarden}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#2E6C45] hover:bg-[#255838] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              💾 Guardar en Mi Huerto
            </button>
          )}

          <button
            onClick={onScanAgain}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-[#2E6C45] text-[#2E6C45] hover:bg-[#F9FBF9] font-extrabold text-xs sm:text-sm transition-all"
          >
            📸 Nuevo Escaneo en Vivo
          </button>
        </div>
      </div>

    </div>
  );
};
