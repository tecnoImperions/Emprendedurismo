import React, { useState, useEffect } from 'react';
import { mockupUsers, getActiveUser, setActiveUserId, markPlantWateredToday, basicNeedsGuide } from '../data/userDatabase';
import { DatabaseIcon, HomeIcon, DropletIcon, SunIcon, SproutIcon, ShieldCheckIcon, CheckCircleIcon, BookOpenIcon, SparklesIcon, UsersIcon, AlertTriangleIcon } from './Icons';

export const UserDashboardSection = ({ onOpenScanner, currentUser, onNavigate }) => {
  const [activeUser, setActiveUser] = useState(mockupUsers[0]);
  const [activeTab, setActiveTab] = useState('huerto'); // 'huerto' | 'necesidades'
  const [selectedPlantDetails, setSelectedPlantDetails] = useState(null);
  const [notification, setNotification] = useState(null);

  // Tabs de detalle simplificadas
  const [detailTab, setDetailTab] = useState('estado'); // 'estado' | 'cuidados' | 'viveros'
  const [noteText, setNoteText] = useState('');

  // Estados para comentarios de la comunidad
  const [commentText, setCommentText] = useState('');
  const [commentRating, setCommentRating] = useState(5);

  useEffect(() => {
    if (currentUser) {
      const savedGarden = localStorage.getItem(`FLORAMETRICS_GARDEN_${currentUser.id}`);
      let userGarden = currentUser.myGarden || [];
      if (savedGarden) {
        try {
          userGarden = JSON.parse(savedGarden);
        } catch (e) {
          console.error(e);
        }
      }
      const active = { ...currentUser, myGarden: userGarden };
      setActiveUser(active);
      if (userGarden && userGarden.length > 0) {
        setSelectedPlantDetails(userGarden[0]);
      } else {
        setSelectedPlantDetails(null);
      }
    } else {
      setActiveUser(null);
      setSelectedPlantDetails(null);
    }
  }, [currentUser]);

  const handleWaterToday = (plantId) => {
    const updatedGarden = markPlantWateredToday(activeUser.id, plantId);
    if (updatedGarden) {
      const updatedUser = { ...activeUser, myGarden: updatedGarden };
      setActiveUser(updatedUser);
      const updatedPlant = updatedGarden.find((p) => p.id === plantId);
      if (updatedPlant) setSelectedPlantDetails(updatedPlant);
      showToast('Riego registrado correctamente para tu huerto.');
    }
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!noteText.trim() || !selectedPlantDetails) return;

    try {
      const plantId = selectedPlantDetails.id;
      const customGardenJson = localStorage.getItem(`FLORAMETRICS_GARDEN_${activeUser.id}`);
      let currentGarden = customGardenJson ? JSON.parse(customGardenJson) : [...activeUser.myGarden];

      const updatedGarden = currentGarden.map((p) => {
        if (p.id === plantId) {
          const prevNotes = p.notes || [];
          return {
            ...p,
            notes: [
              ...prevNotes,
              {
                id: `note-${Date.now()}`,
                date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                text: noteText.trim()
              }
            ]
          };
        }
        return p;
      });

      const updatedUser = { ...activeUser, myGarden: updatedGarden };
      setActiveUser(updatedUser);
      localStorage.setItem(`FLORAMETRICS_GARDEN_${activeUser.id}`, JSON.stringify(updatedGarden));

      const updatedPlant = updatedGarden.find((p) => p.id === plantId);
      if (updatedPlant) setSelectedPlantDetails(updatedPlant);

      setNoteText('');
      showToast('Nota guardada en la bitácora de la planta.');
    } catch (err) {
      console.error('Error al guardar nota:', err);
      showToast('No se pudo guardar la nota.');
    }
  };

  const handleSaveCommunityComment = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedPlantDetails) return;

    try {
      const plantId = selectedPlantDetails.id;
      const customGardenJson = localStorage.getItem(`FLORAMETRICS_GARDEN_${activeUser.id}`);
      let currentGarden = customGardenJson ? JSON.parse(customGardenJson) : [...activeUser.myGarden];

      const newComment = {
        id: `comment-${Date.now()}`,
        user: activeUser.name || 'Horticultor Local',
        rating: commentRating,
        date: new Date().toLocaleDateString('es-ES'),
        text: commentText.trim()
      };

      const updatedGarden = currentGarden.map((p) => {
        if (p.id === plantId) {
          const prevComments = p.communityComments || [];
          return {
            ...p,
            communityComments: [newComment, ...prevComments]
          };
        }
        return p;
      });

      const updatedUser = { ...activeUser, myGarden: updatedGarden };
      setActiveUser(updatedUser);
      localStorage.setItem(`FLORAMETRICS_GARDEN_${activeUser.id}`, JSON.stringify(updatedGarden));

      const updatedPlant = updatedGarden.find((p) => p.id === plantId);
      if (updatedPlant) setSelectedPlantDetails(updatedPlant);

      setCommentText('');
      setCommentRating(5);
      showToast('Comentario publicado en el catálogo de la comunidad.');
    } catch (err) {
      console.error('Error al guardar comentario:', err);
      showToast('No se pudo guardar el comentario.');
    }
  };



  const handleDeletePlant = (plantId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta planta de tu jardín?')) return;
    try {
      const customGardenJson = localStorage.getItem(`FLORAMETRICS_GARDEN_${activeUser.id}`);
      let currentGarden = customGardenJson ? JSON.parse(customGardenJson) : [...activeUser.myGarden];

      const updatedGarden = currentGarden.filter((p) => p.id !== plantId);
      const updatedUser = { ...activeUser, myGarden: updatedGarden };
      
      setActiveUser(updatedUser);
      localStorage.setItem(`FLORAMETRICS_GARDEN_${activeUser.id}`, JSON.stringify(updatedGarden));

      if (updatedGarden.length > 0) {
        setSelectedPlantDetails(updatedGarden[0]);
      } else {
        setSelectedPlantDetails(null);
      }
      showToast('Planta eliminada de tu huerto.');
    } catch (err) {
      console.error(err);
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Ayudantes de Fallback Botánico para campos PictureThis
  const getPlantDescription = (plant) => {
    if (plant.description) return plant.description;
    if (plant.name.toLowerCase().includes('tomate')) {
      return 'Variedad hortícola muy valorada por sus frutos jugosos y ricos en vitaminas, ideal para cultivar en macetones en el balcón o terrazas soleadas.';
    }
    if (plant.name.toLowerCase().includes('albahaca')) {
      return 'Hierba aromática anual de la familia de las lamiáceas, esencial para la cocina mediterránea y un repelente natural de insectos en el huerto.';
    }
    if (plant.name.toLowerCase().includes('fresa')) {
      return 'Planta rastrera que produce frutos dulces y perfumados de color rojo intenso. Se adapta perfectamente a macetas colgantes y jardines verticales.';
    }
    if (plant.name.toLowerCase().includes('zanahoria')) {
      return 'Hortaliza de raíz dulce y crujiente, rica en betacaroteno. Requiere sustrato muy suelto y profundo para un desarrollo óptimo.';
    }
    return 'Planta hortícola u ornamental seleccionada para el cultivo doméstico en departamentos o huertos de espacio reducido.';
  };

  const getPlantToxicity = (plant) => {
    if (plant.toxicity) return plant.toxicity;
    if (plant.name.toLowerCase().includes('tomate')) {
      return 'Las hojas y tallos contienen solanina, que es tóxica para perros y gatos. El fruto maduro es seguro de consumir.';
    }
    if (plant.name.toLowerCase().includes('albahaca')) {
      return 'No tóxica para perros, gatos ni humanos. Completamente segura para cultivar en cocinas e interiores.';
    }
    if (plant.name.toLowerCase().includes('fresa')) {
      return 'No tóxica para mascotas. Las hojas y frutos son inocuos para perros y gatos.';
    }
    return 'No tóxica en general, pero se recomienda vigilar que las mascotas no mastiquen grandes cantidades de follaje.';
  };

  const getPlantPropagation = (plant) => {
    if (plant.propagation) return plant.propagation;
    if (plant.name.toLowerCase().includes('tomate')) {
      return 'Siembra de semillas en almácigo a finales de invierno o esquejes de chupones laterales en agua.';
    }
    if (plant.name.toLowerCase().includes('albahaca')) {
      return 'Esquejes de tallos jóvenes introducidos en agua (echan raíces en 7 días) o mediante siembra de semillas.';
    }
    if (plant.name.toLowerCase().includes('fresa')) {
      return 'Fácil propagación mediante estolones (tallos rastreros) que echan raíces al tocar tierra nueva.';
    }
    return 'Propagación mediante esquejes de tallo sano en agua o mediante siembra de semillas en primavera.';
  };

  const getPlantTrivia = (plant) => {
    if (plant.trivia) return plant.trivia;
    if (plant.name.toLowerCase().includes('tomate')) {
      return 'Asociar albahaca junto a tus tomateras potencia el sabor del tomate y ahuyenta moscas y pulgones.';
    }
    if (plant.name.toLowerCase().includes('albahaca')) {
      return 'En la antigua Grecia, la albahaca era considerada un símbolo de realeza y se utilizaba en rituales sagrados.';
    }
    if (plant.name.toLowerCase().includes('fresa')) {
      return 'Las fresas son la única fruta que tiene sus semillas en la parte exterior, con un promedio de 200 semillas por fruto.';
    }
    return 'Cultivar tus propios vegetales en el hogar reduce la huella de carbono y aporta vitaminas frescas de alta densidad alimentaria.';
  };

  const getMockComments = (plant) => {
    const baseComments = [
      { id: 'mock-1', user: 'Laura Gómez', rating: 5, date: '18/07/2026', text: '¡Excelente desarrollo! La combinación de abono NPK y el riego recomendado cada 3 días le dio una fuerza increíble.' },
      { id: 'mock-2', user: 'Carlos Silva', rating: 4, date: '15/07/2026', text: 'Al principio las hojas se pusieron amarillas, pero usando el té de cáscaras de plátano se recuperó por completo.' }
    ];
    const userComments = plant.communityComments || [];
    return [...userComments, ...baseComments];
  };

  if (!currentUser || !activeUser) {
    return (
      <section id="usuarios" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#DCE7E0] text-[#2E6C45] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <DatabaseIcon size={14} className="text-[#5CCF8D]" />
            Mi Jardín FloraMetrics
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans'] mb-3">
            Mi Jardín & <span className="text-[#2E6C45]">Necesidades de Cuidado</span>
          </h2>
          <p className="text-sm sm:text-base text-[#526057]">
            Administra tu espacio, lleva la bitácora de tus plantas y monitorea su salud de forma privada.
          </p>
        </div>

        <div className="max-w-md mx-auto text-center bg-white border border-[#DCE7E0] rounded-3xl p-8 shadow-md">
          <ShieldCheckIcon size={40} className="text-[#2E6C45] mx-auto mb-4" />
          <h3 className="text-base font-extrabold text-[#1D1F1D] mb-2">Acceso Reservado</h3>
          <p className="text-xs text-[#526057] mb-6 leading-relaxed">
            Inicia sesión con tu cuenta para registrar tus plantas, consultar sus diagnósticos y hacer un seguimiento privado de su salud.
          </p>
          <button
            onClick={onOpenAuthModal}
            className="px-6 py-2.5 rounded-full bg-[#2E6C45] hover:bg-[#255838] text-white text-xs font-extrabold shadow-xs transition-all active:scale-95"
          >
            Iniciar Sesión
          </button>
        </div>
      </section>
    );
  }

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
      <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#DCE7E0] text-[#2E6C45] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <DatabaseIcon size={14} className="text-[#5CCF8D]" />
          Mi Jardín FloraMetrics
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans'] mb-3">
          Mi Jardín & <span className="text-[#2E6C45]">Necesidades de Cuidado</span>
        </h2>
        <p className="text-sm sm:text-base text-[#526057] mb-6">
          Lleva el control de tus plantas y monitorea su salud de forma fácil. Escanea con nuestra IA para obtener diagnósticos y recomendaciones.
        </p>
        
        <button
          onClick={onOpenScanner}
          className="px-6 py-3 rounded-full bg-[#2E6C45] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:bg-[#255838] transition-all active:scale-95"
        >
          <SparklesIcon size={14} className="text-[#5CCF8D]" />
          Escanear Nueva Planta
        </button>
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
          <span>Mi Jardín / Mis Plantas ({activeUser.myGarden?.length || 0})</span>
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
          <span>Guías de Cuidado en el Hogar</span>
        </button>
      </div>

      {/* TAB 1: Base de Datos & Panel de Cultivos en Casa */}
      {activeTab === 'huerto' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
          {/* Left Column: List of user's active garden plants */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2">
              <h3 className="text-base font-extrabold text-[#1D1F1D] flex items-center gap-2">
                <DatabaseIcon size={18} className="text-[#2E6C45]" />
                Lista de Plantas en Jardín de {activeUser.name}
              </h3>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => onNavigate?.('historial')}
                  className="text-xs bg-white border border-[#DCE7E0] px-3 py-1 rounded-full text-[#2E6C45] font-extrabold hover:bg-[#F3F8F5] transition-all shadow-xs"
                >
                  Ver Historial
                </button>
                <span className="text-xs font-mono text-[#59695F] bg-[#EAF3ED] px-2 py-1 rounded-full border border-[#DCE7E0]">
                  {activeUser.myGarden?.length || 0}
                </span>
              </div>
            </div>

            {(!activeUser.myGarden || activeUser.myGarden.length === 0) ? (
              <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-10 text-center space-y-3">
                <SproutIcon size={36} className="text-[#2E6C45] mx-auto animate-pulse" />
                <h4 className="text-base font-bold text-[#1D1F1D]">Tu jardín está vacío</h4>
                <p className="text-xs text-[#526057]">Escanea una planta con la cámara para guardarla en tu diario de cultivo y diagnosticar su salud.</p>
                <div className="flex justify-center pt-2">
                  <button
                    onClick={onOpenScanner}
                    className="px-5 py-2 rounded-full bg-[#2E6C45] hover:bg-[#255838] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Escanear Planta
                  </button>
                </div>
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
                            <SunIcon size={13} className="text-amber-500" /> {plant.lightReceived || 'Luz del hogar'}
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
                        {plant.wateringStatus === 'optimal' ? 'Al día' : plant.wateringStatus === 'due_today' ? 'Riego hoy' : 'Riego Urgente'}
                      </span>

                      <div className="flex gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWaterToday(plant.id);
                          }}
                          className="px-3 py-1.5 rounded-full bg-[#2E6C45] text-white hover:bg-[#255838] text-[11px] font-bold flex items-center gap-1 shadow-sm"
                        >
                          <DropletIcon size={12} className="text-[#5CCF8D]" />
                          <span>Regar</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePlant(plant.id);
                          }}
                          className="p-1.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-[11px] transition-all px-2.5 font-bold"
                          title="Eliminar planta"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: PictureThis-style Multitab Panel & Journal */}
          <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 shadow-xl space-y-6">
            {selectedPlantDetails ? (
              <>
                {/* Plant details header */}
                <div className="flex items-center justify-between border-b border-[#E8EEEA] pb-4">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#EAF3ED] text-[#2E6C45] font-extrabold text-[10px] uppercase tracking-wide border border-[#CDE5D5]">
                      Ficha Botánica Premium
                    </span>
                    <h3 className="text-xl font-extrabold text-[#1D1F1D] mt-2">
                      {selectedPlantDetails.customName}
                    </h3>
                    <p className="text-xs text-[#59695F] font-medium">{selectedPlantDetails.name} — {selectedPlantDetails.locationInHome}</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F3F8F5] border border-[#2E6C45] flex flex-col items-center justify-center font-mono font-bold text-xs text-[#2E6C45]">
                    <span>{selectedPlantDetails.healthScore}%</span>
                    <span className="text-[9px] text-[#59695F] uppercase font-bold">Salud</span>
                  </div>
                </div>

                {/* Sub-Tabs Selector (Simplified) */}
                <div className="flex border-b border-[#E8EEEA] gap-4">
                  <button
                    onClick={() => setDetailTab('estado')}
                    className={`flex-1 pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap text-center ${
                      detailTab === 'estado' ? 'border-[#2E6C45] text-[#2E6C45]' : 'border-transparent text-[#64746A]'
                    }`}
                  >
                    Estado de Planta
                  </button>
                  <button
                    onClick={() => setDetailTab('cuidados')}
                    className={`flex-1 pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap text-center ${
                      detailTab === 'cuidados' ? 'border-[#2E6C45] text-[#2E6C45]' : 'border-transparent text-[#64746A]'
                    }`}
                  >
                    Cuidados Caseros
                  </button>
                  <button
                    onClick={() => setDetailTab('viveros')}
                    className={`flex-1 pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap text-center ${
                      detailTab === 'viveros' ? 'border-[#2E6C45] text-[#2E6C45]' : 'border-transparent text-[#64746A]'
                    }`}
                  >
                    Contacto Viveros
                  </button>
                </div>

                {/* SUB-TAB CONTENTS */}
                <div className="space-y-4 min-h-[200px] animate-fadeIn">
                  
                  {/* ESTADO TAB */}
                  {detailTab === 'estado' && (
                    <div className="space-y-4 animate-fadeIn">
                      {/* AI Diagnostic Summary Banner */}
                      <div className="bg-gradient-to-r from-[#F3F8F5] to-[#EAF3ED] p-4 rounded-xl border border-[#DAE6DF] space-y-1">
                        <span className="text-[10px] font-extrabold uppercase text-[#2E6C45] flex items-center gap-1">
                          <SparklesIcon size={12} className="text-[#5CCF8D]" /> Diagnóstico Botánico por IA
                        </span>
                        <h4 className="text-xs font-extrabold text-[#1D1F1D]">
                          {selectedPlantDetails.lastAiScanResult?.title || 'Follaje en óptimas condiciones'}
                        </h4>
                        <p className="text-[11px] text-[#526057] leading-relaxed">
                          {selectedPlantDetails.lastAiScanResult?.solution || 'Continuar cuidados normales.'}
                        </p>
                      </div>

                      {/* Vitality graph */}
                      <div className="bg-[#F9FBF9] p-4 rounded-2xl border border-[#E8EEEA] space-y-3">
                        <strong className="text-xs text-[#1D1F1D] block flex items-center gap-1.5">
                          Curva de Vitalidad (Salud Histórica)
                        </strong>
                        <div className="flex items-end justify-between h-20 pt-4 px-3 bg-white border border-[#E8EEEA] rounded-xl relative">
                          <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none opacity-20">
                            <div className="border-b border-gray-400 w-full"></div>
                            <div className="border-b border-gray-400 w-full"></div>
                            <div className="border-b border-gray-400 w-full"></div>
                          </div>
                          
                          <div className="flex flex-col items-center z-10">
                            <span className="text-[9px] text-[#64746A] font-bold">75%</span>
                            <div className="w-3 h-3 rounded-full bg-[#85B899] border-2 border-white shadow-xs mt-1"></div>
                            <span className="text-[9px] text-[#64746A] font-bold mt-1">Abr</span>
                          </div>
                          <div className="flex flex-col items-center z-10">
                            <span className="text-[9px] text-[#64746A] font-bold">80%</span>
                            <div className="w-3 h-3 rounded-full bg-[#5CCF8D] border-2 border-white shadow-xs mt-1"></div>
                            <span className="text-[9px] text-[#64746A] font-bold mt-1">May</span>
                          </div>
                          <div className="flex flex-col items-center z-10">
                            <span className="text-[9px] text-[#64746A] font-bold">85%</span>
                            <div className="w-3 h-3 rounded-full bg-[#2E6C45] border-2 border-white shadow-xs mt-1"></div>
                            <span className="text-[9px] text-[#64746A] font-bold mt-1">Jun</span>
                          </div>
                          <div className="flex flex-col items-center z-10">
                            <span className="text-[9px] text-[#2E6C45] font-extrabold">{selectedPlantDetails.healthScore}%</span>
                            <div className="w-3.5 h-3.5 rounded-full bg-[#2E6C45] border-2 border-white shadow-xs mt-1 animate-pulse"></div>
                            <span className="text-[9px] text-[#2E6C45] font-extrabold mt-1">Hoy</span>
                          </div>
                        </div>
                      </div>

                      {/* Vitality details */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-[#F3F8F5] p-3 rounded-xl border border-[#DAE6DF] space-y-1">
                          <span className="text-[#64746A] block text-[10px] uppercase font-bold">Fecha de Siembra</span>
                          <span className="font-extrabold text-[#1D1F1D]">{selectedPlantDetails.plantedDate || 'Hace unas semanas'}</span>
                        </div>
                        <div className="bg-[#F3F8F5] p-3 rounded-xl border border-[#DAE6DF]">
                          <span className="text-[#64746A] block text-[10px] uppercase font-bold">Último Riego</span>
                          <span className="font-extrabold text-[#2E6C45]">{selectedPlantDetails.lastWatered}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CUIDADOS CASEROS TAB */}
                  {detailTab === 'cuidados' && (
                    <div className="space-y-4 animate-fadeIn text-xs">
                      <div>
                        <strong className="text-xs text-[#1D1F1D] block mb-1">Descripción de Especie:</strong>
                        <p className="text-xs text-[#526057] leading-relaxed font-medium">
                          {getPlantDescription(selectedPlantDetails)}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-xl border border-[#E8EEEA]">
                          <strong className="text-[#1D1F1D] block">Riego Sugerido:</strong>
                          <span className="text-[#526057]">{selectedPlantDetails.basicNeeds?.waterFreq || selectedPlantDetails.nextWatering || 'Seguir humedad del sustrato'}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-[#E8EEEA]">
                          <strong className="text-[#1D1F1D] block">Luz / Sol Ideal:</strong>
                          <span className="text-[#526057]">{selectedPlantDetails.lightReceived || 'Luz solar indirecta brillante'}</span>
                        </div>
                      </div>

                      {/* Homemade remedies & NPK */}
                      {selectedPlantDetails.nutrientsRequired?.npkFormula && (
                        <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 space-y-1 text-xs">
                          <strong className="text-amber-950 font-bold block">
                            Abono Casero Sugerido:
                          </strong>
                          <p className="text-[11px] text-amber-900 leading-relaxed">
                            <strong>Fórmula NPK:</strong> {selectedPlantDetails.nutrientsRequired.npkFormula}.
                          </p>
                          <p className="text-[11px] text-[#526057] leading-relaxed">
                            <strong>Remedio Casero:</strong> {selectedPlantDetails.nutrientsRequired.whereToFind}
                          </p>
                        </div>
                      )}

                      {/* Extra info (trivia / safety) */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-[#526057] bg-[#F9FBF9] p-3 rounded-xl border border-[#E8EEEA]">
                        <div>
                          <strong className="text-[#1D1F1D] block">Mascotas:</strong>
                          <span>{getPlantToxicity(selectedPlantDetails)}</span>
                        </div>
                        <div>
                          <strong className="text-[#1D1F1D] block">Propagación:</strong>
                          <span>{getPlantPropagation(selectedPlantDetails)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CONTACTO VIVEROS TAB */}
                  {detailTab === 'viveros' && (
                    <div className="space-y-4 animate-fadeIn text-xs">
                      <div className="bg-[#F3F8F5] p-3.5 rounded-xl border border-[#DAE6DF] space-y-1">
                        <strong className="text-[#2E6C45] font-extrabold block">Asistencia y Nutrientes Profesionales</strong>
                        <p className="text-[#526057] leading-tight">
                          Si prefieres adquirir abono formulado ({selectedPlantDetails.nutrientsRequired?.npkFormula || 'NPK Orgánico'}) o requieres ayuda agrónoma especializada, chatea directo por WhatsApp con viveros afiliados:
                        </p>
                      </div>

                      <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
                        {[
                          { name: 'Vivero Central / El Clavel Verde', zone: 'Zona Metropolitana', contact: '+5215512345678', products: 'NPK solubles, Humus' },
                          { name: 'Sustratos y Tierras del Norte', zone: 'Bodega Central / Envíos', contact: '+573001234567', products: 'Tierras preparadas, Coco' }
                        ].map((nursery, idx) => (
                          <div key={idx} className="p-3 bg-white border border-[#E8EEEA] rounded-xl flex items-center justify-between gap-3">
                            <div>
                              <h4 className="font-extrabold text-[#1D1F1D]">{nursery.name}</h4>
                              <p className="text-[9px] text-[#64746A] mt-0.5">{nursery.zone} — Insumos: {nursery.products}</p>
                            </div>
                            <button
                              onClick={() => {
                                if (!currentUser) {
                                  onOpenAuthModal?.();
                                  return;
                                }
                                const cleanNum = nursery.contact.replace(/\+/g, '');
                                const msg = encodeURIComponent(`Hola, vi tu vivero en FloraMetrics. Quisiera consultar sobre abonos y tierras para mi huerto.`);
                                window.open(`https://api.whatsapp.com/send?phone=${cleanNum}&text=${msg}`, '_blank');
                              }}
                              className="px-3 py-2 rounded-xl bg-[#2E6C45] hover:bg-[#255838] text-white font-extrabold text-[10px] transition-all whitespace-nowrap shadow-xs"
                            >
                              WhatsApp
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Progress bar to harvest */}
                {selectedPlantDetails.totalHarvestCycleDays > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-[#E8EEEA]">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#1D1F1D]">Ciclo de Cosecha / Madurez</span>
                      <span className="text-[#2E6C45]">
                        {selectedPlantDetails.daysToHarvest === 0
                          ? 'Listo para cosechar / podar!'
                          : `Faltan ${selectedPlantDetails.daysToHarvest} días`}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#E4ECE7] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#5CCF8D] rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(100, Math.max(10, ((selectedPlantDetails.totalHarvestCycleDays - selectedPlantDetails.daysToHarvest) / selectedPlantDetails.totalHarvestCycleDays) * 100))}%`
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* JOURNAL / NOTES SYSTEM */}
                <div className="border-t border-[#E8EEEA] pt-4 space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2E6C45] flex items-center gap-1.5">
                    Bitácora de Progreso y Notas:
                  </h4>

                  {/* List of saved notes */}
                  <div className="max-h-[140px] overflow-y-auto space-y-2 pr-1 text-xs">
                    {(!selectedPlantDetails.notes || selectedPlantDetails.notes.length === 0) ? (
                      <p className="text-[#64746A] italic text-[11px] py-1 text-center bg-gray-50 rounded-lg border border-[#E8EEEA]">
                        Aún no hay notas registradas para esta planta. Añade observaciones sobre su crecimiento o abonos.
                      </p>
                    ) : (
                      selectedPlantDetails.notes.map((note) => (
                        <div key={note.id} className="bg-gray-50 border border-[#E8EEEA] p-2.5 rounded-xl space-y-1">
                          <div className="flex items-center justify-between text-[9px] text-[#64746A] font-bold">
                            <span>Fecha: {note.date}</span>
                          </div>
                          <p className="text-[#1D1F1D] leading-relaxed font-medium">{note.text}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Note creation input */}
                  <form onSubmit={handleSaveNote} className="flex gap-2">
                    <input
                      type="text"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Ej. Hoy regué con té de plátano..."
                      className="flex-1 px-4 py-2 border border-[#DCE7E0] rounded-xl text-xs text-[#1D1F1D] focus:outline-none focus:border-[#2E6C45]"
                    />
                    <button
                      type="submit"
                      disabled={!noteText.trim()}
                      className="px-4 py-2 rounded-xl bg-[#2E6C45] text-white text-xs font-bold hover:bg-[#255838] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anotar
                    </button>
                  </form>
                </div>

                {/* Interactive Action Buttons */}
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
                    className="px-4 py-3 rounded-full border-2 border-[#2E6C45] text-[#2E6C45] font-bold text-xs hover:bg-[#2E6C45] hover:text-white transition-all flex items-center justify-center"
                  >
                    Escanear
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
                  Probar con mi Planta
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};
