import React, { useState, useEffect } from 'react';
import { mockupUsers, getActiveUser, setActiveUserId, markPlantWateredToday, basicNeedsGuide } from '../data/userDatabase';
import { DatabaseIcon, HomeIcon, DropletIcon, SunIcon, SproutIcon, ShieldCheckIcon, CheckCircleIcon, BookOpenIcon, SparklesIcon, UsersIcon, AlertTriangleIcon } from './Icons';

export const UserDashboardSection = ({ onOpenScanner }) => {
  const [activeUser, setActiveUser] = useState(mockupUsers[0]);
  const [activeTab, setActiveTab] = useState('huerto'); // 'huerto' | 'necesidades'
  const [selectedPlantDetails, setSelectedPlantDetails] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const user = getActiveUser();
    if (user) {
      setActiveUser(user);
      if (user.myGarden && user.myGarden.length > 0) {
        setSelectedPlantDetails(user.myGarden[0]);
      }
    } else {
      // Fallback para visualización del mockup si no hay sesión
      setActiveUser(mockupUsers[0]);
      if (mockupUsers[0].myGarden && mockupUsers[0].myGarden.length > 0) {
        setSelectedPlantDetails(mockupUsers[0].myGarden[0]);
      }
    }
  }, []);

  const handleSwitchUser = (user) => {
    setActiveUser(user);
    setActiveUserId(user.id);
    if (user.myGarden && user.myGarden.length > 0) {
      setSelectedPlantDetails(user.myGarden[0]);
    } else {
      setSelectedPlantDetails(null);
    }
    showToast(`🟢 Has cambiado al usuario mockup: ${user.name}`);
  };

  const handleWaterToday = (plantId) => {
    const updatedGarden = markPlantWateredToday(activeUser.id, plantId);
    if (updatedGarden) {
      const updatedUser = { ...activeUser, myGarden: updatedGarden };
      setActiveUser(updatedUser);
      const updatedPlant = updatedGarden.find((p) => p.id === plantId);
      if (updatedPlant) setSelectedPlantDetails(updatedPlant);
      showToast('💧 ¡Riego registrado correctamente para tu huerto!');
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <section id="usuarios" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1D1F1D] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#5CCF8D] animate-bounce">
          <SparklesIcon size={18} className="text-[#5CCF8D]" />
          <span className="text-xs sm:text-sm font-bold">{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#DCE7E0] text-[#2E6C45] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <DatabaseIcon size={14} className="text-[#5CCF8D]" />
          Base de Datos & Panel de Usuarios Mockups
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans'] mb-3">
          Mi Huerto en Casa & <span className="text-[#2E6C45]">Necesidades Básicas</span>
        </h2>
        <p className="text-sm sm:text-base text-[#526057]">
          Explora la base de datos con perfiles de usuarios de hogar y sus cultivos en balcón o interior. Lleva el control analítico de riego, luz y cosecha con el escáner IA.
        </p>
      </div>

      {/* Mockup Users Selector Bar */}
      <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-5 sm:p-7 shadow-xl mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8EEEA] pb-5 mb-6">
          <div>
            <span className="text-xs font-bold text-[#2E6C45] uppercase tracking-wider block">
              👤 Base de Datos Mockups de Usuarios (Huertos en Casa)
            </span>
            <p className="text-xs sm:text-sm text-[#526057] mt-0.5">
              Selecciona un perfil para ver cómo FloraMetrics adapta el análisis al tipo de vivienda y espacio:
            </p>
          </div>
          <button
            onClick={onOpenScanner}
            className="px-5 py-2 rounded-full bg-[#2E6C45] text-white font-extrabold text-xs flex items-center gap-2 shadow-sm hover:bg-[#255838] transition-all whitespace-nowrap"
          >
            <SparklesIcon size={14} className="text-[#5CCF8D]" />
            Escanear Mi Propia Planta ✨
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockupUsers.map((user) => {
            const isSelected = activeUser.id === user.id;
            return (
              <div
                key={user.id}
                onClick={() => handleSwitchUser(user)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#F3F8F5] border-[#2E6C45] shadow-md scale-[1.01]'
                    : 'bg-[#FFFFFF] border-[#DCE7E0] hover:border-[#85B899]'
                }`}
              >
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#2E6C45]/15 border border-[#2E6C45] flex items-center justify-center font-bold text-[#2E6C45] shrink-0 overflow-hidden">
                    {user.name ? user.name.split(' ').map(n=>n[0]).join('') : 'U'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-[#1D1F1D]">{user.name}</h4>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full bg-[#2E6C45] text-white text-[10px] font-bold">
                          Activo
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#2E6C45] font-semibold mt-0.5">{user.profileTitle}</p>
                    <span className="inline-block text-[10px] bg-[#EAF3ED] text-[#405649] px-2 py-0.5 rounded-md mt-1 font-mono">
                      Nivel: {user.experienceLevel}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DCE7E0]/60 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-white p-2 rounded-xl border border-[#E8EEEA]">
                    <span className="text-[#64746A] block">Cultivos Activos</span>
                    <span className="font-bold text-[#1D1F1D] text-xs">{user.myGarden?.length || 0} Plantas</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#E8EEEA]">
                    <span className="text-[#64746A] block">Cosechas/Éxitos</span>
                    <span className="font-bold text-[#2E6C45] text-xs">{user.successfulHarvests} Cosechas</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Space Summary Banner */}
        <div className="mt-5 p-4 rounded-2xl bg-[#F3F8F5] border border-[#DAE6DF] flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <HomeIcon size={20} className="text-[#2E6C45] shrink-0" />
            <div>
              <span className="font-bold text-[#1D1F1D]">Espacio del Hogar Asignado: </span>
              <span className="text-[#526057]">{activeUser.spaceType} — {activeUser.spaceSummary}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher: Cultivos Activos vs Guía Necesidades Básicas */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setActiveTab('huerto')}
          className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'huerto'
              ? 'bg-[#2E6C45] text-white shadow-md'
              : 'bg-[#FFFFFF] text-[#1D1F1D] border border-[#DCE7E0] hover:bg-[#EAF3ED]'
          }`}
        >
          <SproutIcon size={16} className={activeTab === 'huerto' ? 'text-[#5CCF8D]' : 'text-[#2E6C45]'} />
          <span>Base de Datos: Mis Cultivos en Casa ({activeUser.myGarden?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('necesidades')}
          className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'necesidades'
              ? 'bg-[#2E6C45] text-white shadow-md'
              : 'bg-[#FFFFFF] text-[#1D1F1D] border border-[#DCE7E0] hover:bg-[#EAF3ED]'
          }`}
        >
          <BookOpenIcon size={16} className={activeTab === 'necesidades' ? 'text-[#5CCF8D]' : 'text-[#2E6C45]'} />
          <span>Guía: Cubrir Necesidades Básicas en el Hogar</span>
        </button>
      </div>

      {/* TAB 1: Base de Datos & Panel de Cultivos en Casa */}
      {activeTab === 'huerto' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
          {/* Left Column: List of user's active garden plants */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-base font-extrabold text-[#1D1F1D] flex items-center gap-2">
                <DatabaseIcon size={18} className="text-[#2E6C45]" />
                Registros de Cultivo de {activeUser.name}
              </h3>
              <span className="text-xs font-mono text-[#59695F]">Sincronizado con IA</span>
            </div>

            {(!activeUser.myGarden || activeUser.myGarden.length === 0) ? (
              <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-10 text-center space-y-3">
                <SproutIcon size={36} className="text-[#2E6C45] mx-auto" />
                <h4 className="text-base font-bold text-[#1D1F1D]">Tu huerto está vacío</h4>
                <p className="text-xs text-[#526057]">Toma una foto a una planta o maceta para añadirla a tu base de datos y comenzar el monitoreo de sus necesidades.</p>
                <button
                  onClick={onOpenScanner}
                  className="mt-2 px-6 py-2.5 rounded-full bg-[#2E6C45] text-white font-bold text-xs"
                >
                  Añadir Primera Planta ✨
                </button>
              </div>
            ) : (
              activeUser.myGarden.map((plant) => {
                const isSelected = selectedPlantDetails?.id === plant.id;
                return (
                  <div
                    key={plant.id}
                    onClick={() => setSelectedPlantDetails(plant)}
                    className={`bg-[#FFFFFF] border-2 rounded-2xl p-5 cursor-pointer transition-all shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isSelected ? 'border-[#2E6C45] bg-[#F3F8F5]' : 'border-[#DCE7E0] hover:border-[#85B899]'
                    }`}
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-2xl bg-[#EAF3ED] text-[#2E6C45] flex items-center justify-center font-bold shrink-0">
                        <SproutIcon size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-bold text-[#1D1F1D]">{plant.customName || plant.name}</h4>
                          <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#DCE7E0] text-[#526057] font-semibold">
                            {plant.name}
                          </span>
                        </div>
                        <p className="text-xs text-[#2E6C45] font-medium mt-0.5 flex items-center gap-1">
                          <HomeIcon size={13} /> {plant.locationInHome}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-[11px] text-[#59695F]">
                          <span className="flex items-center gap-1">
                            <SunIcon size={13} className="text-amber-500" /> {plant.lightReceived}
                          </span>
                          <span className="flex items-center gap-1">
                            <DropletIcon size={13} className={plant.wateringStatus === 'overdue' ? 'text-red-500' : 'text-[#2E6C45]'} />
                            {plant.nextWatering}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E8EEEA]">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${
                        plant.wateringStatus === 'optimal'
                          ? 'bg-[#5CCF8D]/20 text-[#2E6C45] border-[#5CCF8D]'
                          : plant.wateringStatus === 'due_today'
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-red-100 text-red-800 border-red-300 animate-pulse'
                      }`}>
                        {plant.wateringStatus === 'optimal' ? '🟢 Riego al día' : plant.wateringStatus === 'due_today' ? '🟡 Riego hoy' : '🔴 ¡Riego Urgente!'}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWaterToday(plant.id);
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-[#2E6C45] text-white hover:bg-[#255838] text-[11px] font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <DropletIcon size={12} className="text-[#5CCF8D]" />
                        <span>Regar Hoy</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Detailed analysis and basic needs of selected plant */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 shadow-xl space-y-5">
            {selectedPlantDetails ? (
              <>
                <div className="flex items-center justify-between border-b border-[#E8EEEA] pb-4">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#F3F8F5] border border-[#DAE6DF] text-[#2E6C45] font-extrabold text-xs">
                      Detalle Analítico de Planta
                    </span>
                    <h3 className="text-lg font-extrabold text-[#1D1F1D] mt-2">
                      {selectedPlantDetails.customName}
                    </h3>
                    <p className="text-xs text-[#59695F]">{selectedPlantDetails.name} — {selectedPlantDetails.locationInHome}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F3F8F5] border border-[#2E6C45] flex flex-col items-center justify-center font-mono font-bold text-xs text-[#2E6C45]">
                    <span>{selectedPlantDetails.healthScore}%</span>
                    <span className="text-[9px] text-[#59695F]">Salud</span>
                  </div>
                </div>

                {/* AI Scanner Report Box */}
                <div className="bg-[#F3F8F5] p-4 rounded-2xl border border-[#DAE6DF] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase text-[#2E6C45] flex items-center gap-1">
                      <SparklesIcon size={13} className="text-[#5CCF8D]" /> Último Diagnóstico por Escáner
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1D1F1D] flex items-center gap-1.5">
                    <ShieldCheckIcon size={15} className="text-[#2E6C45]" />
                    {selectedPlantDetails.lastAiScanResult?.title || 'Follaje en buenas condiciones'}
                  </h4>
                  <p className="text-xs text-[#526057] leading-relaxed">
                    {selectedPlantDetails.lastAiScanResult?.solution || 'Mantener luz indirecta y verificar humedad antes de regar.'}
                  </p>
                </div>

                {/* Progress bar to harvest */}
                {selectedPlantDetails.totalHarvestCycleDays > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#1D1F1D]">Ciclo de Cosecha / Madurez</span>
                      <span className="text-[#2E6C45]">
                        {selectedPlantDetails.daysToHarvest === 0
                          ? '✨ Lista para cosechar / poda'
                          : `Faltan ${selectedPlantDetails.daysToHarvest} días`}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-[#E4ECE7] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#5CCF8D] rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(100, Math.max(10, ((selectedPlantDetails.totalHarvestCycleDays - selectedPlantDetails.daysToHarvest) / selectedPlantDetails.totalHarvestCycleDays) * 100))}%`
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Specific Basic Needs Checklist for this plant */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2E6C45] flex items-center gap-1.5">
                    <CheckCircleIcon size={15} /> Necesidades Básicas en tu Hogar:
                  </h4>

                  <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#DCE7E0] text-xs space-y-2">
                    <div className="flex items-start gap-2">
                      <DropletIcon size={14} className="text-[#2E6C45] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1D1F1D] block">Frecuencia de Riego:</strong>
                        <span className="text-[#526057]">{selectedPlantDetails.basicNeeds?.waterFreq || 'Regar moderadamente según humedad'}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <HomeIcon size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1D1F1D] block">Maceta y Drenaje Ideal:</strong>
                        <span className="text-[#526057]">{selectedPlantDetails.basicNeeds?.potSize || 'Maceta con agujeros inferiores'}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <SproutIcon size={14} className="text-[#5CCF8D] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1D1F1D] block">Sustrato Recomendado:</strong>
                        <span className="text-[#526057]">{selectedPlantDetails.basicNeeds?.soilType || 'Mezcla orgánica con humus y perlita'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => handleWaterToday(selectedPlantDetails.id)}
                    className="flex-1 py-3 rounded-full bg-[#2E6C45] text-white font-extrabold text-xs shadow-md hover:bg-[#255838] transition-all flex items-center justify-center gap-2"
                  >
                    <DropletIcon size={15} className="text-[#5CCF8D]" />
                    Registrar Riego de Hoy
                  </button>
                  <button
                    onClick={onOpenScanner}
                    className="px-4 py-3 rounded-full border-2 border-[#2E6C45] text-[#2E6C45] font-bold text-xs hover:bg-[#2E6C45] hover:text-white transition-all"
                  >
                    📸 Escanear
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-10 text-xs text-[#526057]">
                Selecciona un cultivo a la izquierda para ver su reporte y cubrir sus necesidades básicas.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Guía Completa de Necesidades Básicas en el Hogar */}
      {activeTab === 'necesidades' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {basicNeedsGuide.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 sm:p-7 shadow-xl hover:border-[#2E6C45] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#F3F8F5] border border-[#DCE7E0] text-[#2E6C45] text-xs font-extrabold">
                    {item.badge}
                  </span>
                  <ShieldCheckIcon size={18} className="text-[#2E6C45]" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#1D1F1D] mb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5CCF8D]" />
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#526057] mb-5 leading-relaxed font-medium">
                  {item.summary}
                </p>

                <div className="space-y-2.5 bg-[#F3F8F5] p-4 rounded-2xl border border-[#DAE6DF]">
                  {item.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1D1F1D] leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-[#2E6C45] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-[#E8EEEA] flex items-center justify-between">
                <span className="text-xs text-[#59695F] font-semibold">Consejo FloraMetrics para Huertos en Casa</span>
                <button
                  onClick={onOpenScanner}
                  className="px-4 py-1.5 rounded-full bg-[#2E6C45] text-white text-xs font-bold hover:bg-[#255838] transition-all"
                >
                  Probar con mi Planta ✨
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
