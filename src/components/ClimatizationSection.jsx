import React, { useState } from 'react';
import { ThermometerIcon, DropletIcon, SunIcon, ShieldCheckIcon, AlertTriangleIcon } from './Icons';

export const ClimatizationSection = () => {
  const [temperature, setTemperature] = useState(22);
  const [humidity, setHumidity] = useState(65);
  const [lightHours, setLightHours] = useState(6);

  const isTempOptimal = temperature >= 18 && temperature <= 26;
  const isHumidityOptimal = humidity >= 55;
  const isLightOptimal = lightHours >= 4;

  const score = [isTempOptimal, isHumidityOptimal, isLightOptimal].filter(Boolean).length;

  return (
    <section id="climatizacion" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Climatization Sliders */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-[#F3F8F5] border border-[#DAE6DF] text-[#2E6C45] text-xs font-bold inline-flex items-center gap-1.5 mb-3">
                <ThermometerIcon size={14} />
                Simulador Analítico de Climatización & Cuidado
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1D1F1D] font-['Plus_Jakarta_Sans']">
                ¿Tu Hogar Tiene la Climatización Adecuada?
              </h2>
              <p className="text-sm text-[#526057] mt-2">
                Ajusta los parámetros de tu ambiente para comprobar si el microclima es ideal y conocer los métodos preventivos institucionales.
              </p>
            </div>

            {/* Sliders container on soft surface */}
            <div className="space-y-4 bg-[#F3F8F5] p-5 rounded-2xl border border-[#DCE7E0]">
              {/* Temperature Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#1D1F1D] flex items-center gap-1.5">
                    <ThermometerIcon size={16} className="text-[#2E6C45]" />
                    Temperatura Ambiente actual:
                  </span>
                  <span className="font-mono font-bold text-sm text-[#2E6C45]">{temperature}°C</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="38"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-[#2E6C45]"
                />
                <div className="flex justify-between text-[10px] text-[#59695F] mt-1">
                  <span>10°C (Frío excesivo)</span>
                  <span className="text-[#2E6C45] font-semibold">18-26°C (Óptimo)</span>
                  <span>38°C (Estrés térmico)</span>
                </div>
              </div>

              {/* Humidity Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#1D1F1D] flex items-center gap-1.5">
                    <DropletIcon size={16} className="text-[#5CCF8D]" />
                    Humedad Relativa del Aire:
                  </span>
                  <span className="font-mono font-bold text-sm text-[#2E6C45]">{humidity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="95"
                  value={humidity}
                  onChange={(e) => setHumidity(Number(e.target.value))}
                  className="w-full accent-[#5CCF8D]"
                />
                <div className="flex justify-between text-[10px] text-[#59695F] mt-1">
                  <span>20% (Puntas secas)</span>
                  <span className="text-[#2E6C45] font-semibold">&gt; 55% (Tropical & Huerto)</span>
                  <span>95% (Húmedo)</span>
                </div>
              </div>

              {/* Light Hours Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#1D1F1D] flex items-center gap-1.5">
                    <SunIcon size={16} className="text-[#2E6C45]" />
                    Horas de Luz Natural Directa / Indirecta:
                  </span>
                  <span className="font-mono font-bold text-sm text-[#2E6C45]">{lightHours}h / día</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="14"
                  value={lightHours}
                  onChange={(e) => setLightHours(Number(e.target.value))}
                  className="w-full accent-[#2E6C45]"
                />
                <div className="flex justify-between text-[10px] text-[#59695F] mt-1">
                  <span>0h (Sombra profunda)</span>
                  <span className="text-[#2E6C45] font-semibold">4-8h (Excelente fotosíntesis)</span>
                  <span>14h (Sol intenso)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live Climatization Report */}
          <div className="lg:col-span-5 bg-[#F3F8F5] border border-[#DCE7E0] rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#DCE7E0] pb-4">
              <div>
                <span className="text-xs text-[#526057] font-medium">Diagnóstico Ambiental Institucional:</span>
                <h3 className="text-lg font-bold text-[#1D1F1D] mt-0.5">
                  {score === 3 ? 'Ambiente de Cultivo Excelente' : score === 2 ? 'Buen Ambiente con Ajuste' : 'Requiere Intervención'}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-lg bg-[#FFFFFF] text-[#2E6C45] border border-[#2E6C45] shadow-sm">
                {score}/3
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                {isTempOptimal ? (
                  <ShieldCheckIcon size={18} className="text-[#2E6C45] shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangleIcon size={18} className="text-[#5CCF8D] shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold text-[#1D1F1D]">
                    Temperatura: {isTempOptimal ? 'Óptima para el metabolismo vegetal' : 'Ajustar Climatización'}
                  </p>
                  <p className="text-[#59695F] text-xs mt-0.5">
                    {isTempOptimal
                      ? 'La respiración celular y fotosíntesis operan a la máxima eficiencia.'
                      : 'Evitar corrientes directas de aire acondicionado o calefacción cercana.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                {isHumidityOptimal ? (
                  <ShieldCheckIcon size={18} className="text-[#2E6C45] shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangleIcon size={18} className="text-[#5CCF8D] shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold text-[#1D1F1D]">
                    Humedad: {isHumidityOptimal ? 'Nivel Saludable Anti-sequedad' : 'Riesgo de Puntas Marrones'}
                  </p>
                  <p className="text-[#59695F] text-xs mt-0.5">
                    {isHumidityOptimal
                      ? 'Previene el ataque de ácaros y mantiene el follaje turgente.'
                      : 'Recomendación: Colocar platillo con agua y piedras alrededor o pulverizar follaje.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                {isLightOptimal ? (
                  <ShieldCheckIcon size={18} className="text-[#2E6C45] shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangleIcon size={18} className="text-[#5CCF8D] shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold text-[#1D1F1D]">
                    Luminosidad: {isLightOptimal ? 'Adecuada para huertos y follaje' : 'Luz insuficiente'}
                  </p>
                  <p className="text-[#59695F] text-xs mt-0.5">
                    {isLightOptimal
                      ? 'Suficiente para cosechar tomates cherry, albahaca y mantener follaje frondoso.'
                      : 'Considerar mover hacia ventana orientada al Sur/Este o apoyar con lámpara LED full-spectrum.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
