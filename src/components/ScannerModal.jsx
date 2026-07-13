import React, { useState, useEffect } from 'react';
import { interactivePlants } from '../data/plantData';
import { CameraIcon, SparklesIcon, LeafIcon, ShieldCheckIcon, ThermometerIcon, DropletIcon, RotateCwIcon, AlertTriangleIcon } from './Icons';

export const ScannerModal = ({ isOpen, onClose }) => {
  const [selectedPlant, setSelectedPlant] = useState(interactivePlants[0]);
  const [customImage, setCustomImage] = useState(null);
  const [scanState, setScanState] = useState('ready'); // 'ready' | 'scanning' | 'done' | 'error'
  const [statusText, setStatusText] = useState('');
  const [customDiagnosis, setCustomDiagnosis] = useState(null);

  // API Key state (persisted in localStorage or VITE_GEMINI_API_KEY)
  const [apiKey, setApiKey] = useState('');
  const [showKeyConfig, setShowKeyConfig] = useState(false);

  const CENTRAL_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

  useEffect(() => {
    const savedKey = localStorage.getItem('FLORAMETRICS_GEMINI_KEY') || CENTRAL_API_KEY;
    setApiKey(savedKey);
  }, []);

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('FLORAMETRICS_GEMINI_KEY', key);
    setShowKeyConfig(false);
  };

  if (!isOpen) return null;

  // Helper para convertir archivo a Base64 puro sin encabezado de data URL
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve({ base64: base64String, mimeType: file.type || 'image/jpeg' });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Función de Análisis REAL con Google Gemini Vision API
  const analyzeImageWithGemini = async (file) => {
    const activeKey = apiKey || CENTRAL_API_KEY;

    if (!activeKey) {
      // Si el usuario no ha puesto su API Key, abrimos la configuración y avisamos
      setShowKeyConfig(true);
      setStatusText('⚠️ Por favor ingresa tu API Key de Gemini para activar la IA Real');
      return null;
    }

    try {
      setStatusText('Conectando con Google Gemini Vision AI...');
      const { base64, mimeType } = await fileToBase64(file);

      setStatusText('Analizando clorofila, follaje y microclima...');
      const prompt = `Actúa como un fitopatólogo y botánico institucional de FloraMetrics AI. Analiza la imagen de esta planta o verdura y devuelve ÚNICAMENTE un objeto JSON válido (sin formato Markdown adicional ni comillas invertidas) con la siguiente estructura exacta:
      {
        "name": "Nombre común y científico de la planta o verdura detectada",
        "healthScore": 88,
        "title": "Diagnóstico principal de estado (ej. Follaje saludable o Signos leves de estrés hídrico)",
        "solution": "Recomendación institucional detallada de riego, iluminación y cuidado para extender su ciclo vital",
        "climate": {
          "temperature": "Rango térmico ideal en °C (ej. 18°C - 24°C)",
          "waterFreq": "Frecuencia ideal de riego (ej. Cada 4-5 días según humedad)"
        },
        "lifeSpanYears": "Proyección de longevidad estimada (ej. 15+ Años o Ciclo productivo anual)"
      }`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${activeKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  { inline_data: { mime_type: mimeType, data: base64 } }
                ]
              }
            ]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Error en API de Gemini (${response.status})`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      // Limpiar backticks o texto extra
      const jsonStr = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(jsonStr);
      return parsed;
    } catch (error) {
      console.error('Error procesando imagen con Gemini Vision AI:', error);
      setStatusText('⚠️ No se pudo procesar la IA. Verifica tu API Key.');
      return null;
    }
  };

  const startCatalogScan = (plant) => {
    setCustomImage(null);
    setSelectedPlant(plant);
    setScanState('scanning');
    setStatusText('Analizando muestra institucional FloraMetrics...');
    setTimeout(() => {
      setCustomDiagnosis(null);
      setScanState('done');
    }, 1200);
  };

  const handleImageCapture = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setCustomImage(imageUrl);
    setScanState('scanning');
    setCustomDiagnosis(null);

    // Ejecutar análisis IA real si hay API key, de lo contrario solicitarla o mostrar resultado inteligente
    const aiResult = await analyzeImageWithGemini(file);

    if (aiResult) {
      setCustomDiagnosis(aiResult);
      setScanState('done');
    } else if (apiKey) {
      setScanState('error');
    } else {
      // Si no hay API key, se mantiene el modal de configuración visible
      setScanState('ready');
    }
  };

  const currentDisplayImage = customImage || selectedPlant.image;
  const currentName = customDiagnosis ? customDiagnosis.name : selectedPlant.name;
  const currentScore = customDiagnosis ? customDiagnosis.healthScore : selectedPlant.healthScore;
  const currentTitle = customDiagnosis ? customDiagnosis.title : selectedPlant.diagnostics[0].title;
  const currentSolution = customDiagnosis ? customDiagnosis.solution : selectedPlant.diagnostics[0].solution;
  const currentTemp = customDiagnosis ? customDiagnosis.climate.temperature : selectedPlant.climate.temperature;
  const currentWater = customDiagnosis ? customDiagnosis.climate.waterFreq : selectedPlant.climate.waterFreq;
  const currentLife = customDiagnosis ? customDiagnosis.lifeSpanYears : selectedPlant.lifeSpanYears;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1D1F1D]/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#DCE7E0] bg-[#F3F8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#2E6C45] text-white flex items-center justify-center">
              <CameraIcon size={18} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#1D1F1D]">
                FloraMetrics AI | Visión Botánica Real
              </h3>
              <p className="text-xs text-[#2E6C45] font-semibold">Conectado con Google Gemini Vision API</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                apiKey
                  ? 'bg-[#5CCF8D]/20 text-[#2E6C45] border-[#5CCF8D]'
                  : 'bg-amber-100 text-amber-800 border-amber-300'
              }`}
            >
              {apiKey ? '🟢 IA Conectada' : '⚙️ Conectar API Key'}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#E5EFE9] text-[#1D1F1D] hover:bg-[#D4E4D9] flex items-center justify-center font-bold text-sm"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Panel Config API Key Flotante */}
        {showKeyConfig && (
          <div className="bg-[#F3F8F5] border-b border-[#DCE7E0] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
            <div className="flex-1 w-full">
              <span className="text-xs font-bold text-[#1D1F1D] block">
                🔑 Configurar API Key de Google Gemini Vision
              </span>
              <p className="text-[11px] text-[#526057]">
                Ingresa tu clave de Gemini (AIza...) para analizar fotos reales con visión de inteligencia artificial. Se guardará de forma segura en tu navegador.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="password"
                placeholder="AIzaSy..."
                defaultValue={apiKey}
                id="gemini-key-input"
                className="px-3 py-1.5 rounded-full border border-[#DCE7E0] text-xs font-mono bg-white focus:outline-none focus:border-[#2E6C45] w-full sm:w-48"
              />
              <button
                onClick={() => {
                  const input = document.getElementById('gemini-key-input');
                  handleSaveApiKey(input ? input.value : '');
                }}
                className="px-4 py-1.5 rounded-full bg-[#2E6C45] text-white font-bold text-xs whitespace-nowrap hover:bg-[#255838]"
              >
                Guardar
              </button>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Botón Principal de Cámara Real para Móvil & Carga de Imagen */}
          <div className="bg-[#F3F8F5] border border-[#DCE7E0] p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-[#2E6C45] uppercase tracking-wide block">
                📸 Modo Cámara en Celular / Galería con IA Real
              </span>
              <p className="text-xs sm:text-sm text-[#526057] mt-0.5">
                Toma una foto en vivo o sube una imagen y Gemini Vision AI diagnosticará su estado de salud al instante.
              </p>
            </div>
            <label className="cursor-pointer px-6 py-3 rounded-full bg-[#2E6C45] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:bg-[#255838] transition-all whitespace-nowrap">
              <SparklesIcon size={16} className="text-[#5CCF8D]" />
              <span>SCAN PLANT ✨</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageCapture}
                className="hidden"
              />
            </label>
          </div>

          {/* Selector Rápido del Catálogo */}
          <div>
            <p className="text-xs font-bold text-[#1D1F1D] mb-2">O inspecciona muestras institucionales:</p>
            <div className="flex flex-wrap gap-2">
              {interactivePlants.map((plant) => (
                <button
                  key={plant.id}
                  onClick={() => startCatalogScan(plant)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                    !customImage && selectedPlant.id === plant.id
                      ? 'bg-[#2E6C45] text-white shadow-sm'
                      : 'bg-[#FFFFFF] text-[#1D1F1D] hover:bg-[#EAF3ED] border border-[#DCE7E0]'
                  }`}
                >
                  <LeafIcon size={14} className={!customImage && selectedPlant.id === plant.id ? 'text-[#5CCF8D]' : 'text-[#2E6C45]'} />
                  {plant.name}
                </button>
              ))}
            </div>
          </div>

          {/* Institutional AR Camera Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 relative rounded-2xl bg-[#F3F8F5] border border-[#DCE7E0] overflow-hidden aspect-square flex items-center justify-center">
              <img
                src={currentDisplayImage}
                alt={currentName}
                className={`max-h-[280px] object-contain transition-all duration-700 ${
                  scanState === 'scanning' ? 'scale-105' : 'scale-100'
                }`}
              />

              {/* Láser de Escaneo Menta (#5CCF8D) */}
              {scanState === 'scanning' && (
                <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-[#5CCF8D] to-transparent opacity-80 shadow-[0_0_24px_#5CCF8D] animate-[sweep_1.2s_ease-in-out_infinite]" />
              )}

              {/* Status Overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-[#FFFFFF]/95 backdrop-blur-md border border-[#DCE7E0] p-3 rounded-xl flex items-center justify-between shadow-md">
                <span className="text-xs font-bold text-[#1D1F1D] flex items-center gap-1.5">
                  <SparklesIcon size={14} className="text-[#5CCF8D]" />
                  {scanState === 'scanning' ? statusText || 'Procesando con Gemini Vision...' : 'Flora AI Report Completo'}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#2E6C45] text-white font-bold text-xs">
                  {currentScore}% Salud
                </span>
              </div>
            </div>

            {/* Flora AI Report Output */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-[#F3F8F5] border border-[#DCE7E0] rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#2E6C45] uppercase">Diagnóstico Detectado</span>
                  <span className="text-xs font-mono text-[#5A6C61]">
                    {customDiagnosis ? '🟢 Gemini Vision AI' : 'Flora AI Engine'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#1D1F1D] flex items-center gap-1.5">
                  <AlertTriangleIcon size={16} className="text-[#2E6C45]" />
                  {currentTitle}
                </h4>
                <p className="text-xs text-[#526057] leading-relaxed">
                  {currentSolution}
                </p>

                {/* Mint Progress Bar (#5CCF8D) over soft grey (#E4ECE7) */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#1D1F1D]">Nivel de Vitalidad</span>
                    <span className="text-[#2E6C45]">{currentScore}/100</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#E4ECE7] rounded-full overflow-hidden">
                    <div className="h-full bg-[#5CCF8D] rounded-full transition-all duration-700" style={{ width: `${currentScore}%` }} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#FFFFFF] p-3.5 rounded-xl border border-[#DCE7E0] shadow-sm">
                  <span className="text-[#59695F] flex items-center gap-1 mb-1 font-semibold">
                    <ThermometerIcon size={14} className="text-[#2E6C45]" /> Clima ideal
                  </span>
                  <span className="font-bold text-[#1D1F1D]">{currentTemp}</span>
                </div>
                <div className="bg-[#FFFFFF] p-3.5 rounded-xl border border-[#DCE7E0] shadow-sm">
                  <span className="text-[#59695F] flex items-center gap-1 mb-1 font-semibold">
                    <DropletIcon size={14} className="text-[#5CCF8D]" /> Riego sugerido
                  </span>
                  <span className="font-bold text-[#1D1F1D]">{currentWater}</span>
                </div>
              </div>

              <button
                className="w-full py-3 px-6 rounded-full border-2 border-[#2E6C45] text-[#2E6C45] font-bold text-xs hover:bg-[#2E6C45] hover:text-white transition-all"
              >
                ADD TO MY COLLECTION
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F3F8F5] border-t border-[#DCE7E0] flex items-center justify-between rounded-b-3xl text-xs text-[#526057]">
          <span>FloraMetrics Vision AI Engine v3.1</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#2E6C45] text-white font-extrabold text-xs sm:text-sm shadow-sm hover:bg-[#255838]"
          >
            Cerrar Visor
          </button>
        </div>
      </div>
    </div>
  );
};
