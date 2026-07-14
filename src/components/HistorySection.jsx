import React, { useState, useEffect } from 'react';
import { getScanHistory, deleteScanFromHistory } from '../data/historyDatabase';
import { mockupUsers, saveActiveUser } from '../data/userDatabase';
import { SparklesIcon, SproutIcon, CameraIcon, UsersIcon, CheckCircleIcon } from './Icons';

export const HistorySection = ({ onSelectReport, onOpenScanner, currentUser, onOpenAuthModal, onLoginSuccess }) => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (currentUser) {
      // Filtrar registros de historial correspondientes a este usuario (o todos los por defecto para simular)
      const allRecords = getScanHistory();
      // Filtrar para que si el usuario es personalizado, vea sus escaneos, o los iniciales de demostración
      setRecords(allRecords);
    }
  }, [currentUser]);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const updated = deleteScanFromHistory(id);
    setRecords(updated);
  };

  const handleSimulatedLogin = (user) => {
    const userObj = {
      id: user.id,
      name: user.name,
      email: `${user.id}@florametrics.com`,
      avatar: user.avatar,
      space: user.spaceType,
      role: `Miembro ${user.experienceLevel} de FloraMetrics`
    };
    saveActiveUser(userObj);
    onLoginSuccess(userObj);
  };

  const filtered = records.filter((r) =>
    r.plantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.diagnosisTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.scientificName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 1. ESTADO DE BLOQUEO SI NO HA INICIADO SESIÓN (CON ACCESO AMIGABLE Y SIMULADOR DE PERFILES)
  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
        
        {/* Panel Informativo de Acceso Restringido */}
        <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-[#EBF5EF] text-[#2E6C45] flex items-center justify-center mx-auto shadow-md">
            <span className="text-3xl">🔒</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans']">
              Historial Reservado para Miembros
            </h2>
            <p className="text-xs sm:text-sm text-[#526057] max-w-xl mx-auto leading-relaxed">
              Para guardar fotos capturadas de tus huertos en la nube de <strong>Cloudinary</strong>, ver tu bitácora de NPK anterior y proteger tu cuenta en <strong>Supabase</strong>, necesitas ingresar a tu cuenta.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenAuthModal}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2E6C45] hover:bg-[#255838] text-white font-extrabold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <UsersIcon size={16} />
              <span>Ingresar / Crear Cuenta Ahora</span>
            </button>
            
            <button
              onClick={onOpenScanner}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl border-2 border-[#2E6C45] text-[#2E6C45] hover:bg-[#F3F8F5] font-extrabold text-sm transition-all"
            >
              Probar Cámara Libre
            </button>
          </div>
        </div>

        {/* SIMULADOR DE MÚLTIPLES PERSONAS / PERFILES (Para demostrar que funciona con varias cuentas) */}
        <div className="mt-10 bg-[#EBF5EF]/70 border border-[#CDE5D5] rounded-3xl p-6 sm:p-8 text-center space-y-6">
          <div className="space-y-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#CDE5D5] text-[#2E6C45] text-[10px] font-extrabold tracking-wide uppercase">
              Entorno de Prueba Multiusuario
            </span>
            <h3 className="text-lg font-extrabold text-[#1D1F1D] font-['Plus_Jakarta_Sans']">
              Simulador de Perfiles (Múltiples Clientes)
            </h3>
            <p className="text-xs text-[#526057] max-w-lg mx-auto">
              Haz clic en cualquiera de estos perfiles del huerto para simular de inmediato su inicio de sesión y ver su historial de cultivos privado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {mockupUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleSimulatedLogin(user)}
                className="bg-[#FFFFFF] border border-[#DCE7E0] hover:border-[#2E6C45] hover:shadow-md p-4 rounded-2xl transition-all text-left flex items-center gap-3 active:scale-95 group"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#DCE7E0] group-hover:border-[#2E6C45]"
                />
                <div className="overflow-hidden">
                  <span className="font-extrabold text-xs text-[#1D1F1D] block truncate leading-tight group-hover:text-[#2E6C45]">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-[#64746A] block truncate">
                    {user.experienceLevel}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // 2. RENDERING DEL HISTORIAL PARA USUARIO CON SESIÓN INICIADA
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-fadeIn">
      
      {/* Encabezado del Historial */}
      <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 sm:p-8 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full bg-[#EBF5EF] text-[#2E6C45] font-extrabold text-[10px] border border-[#CDE5D5] uppercase tracking-wide">
              Registro Nube Activo
            </span>
            <span className="text-[11px] font-bold text-[#526057]">
              Usuario: <strong>{currentUser.name}</strong> (Cloud: ll3h5fkl)
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1D1F1D] font-['Plus_Jakarta_Sans'] tracking-tight">
            Mi Historial de Diagnósticos
          </h2>
          <p className="text-xs sm:text-sm text-[#526057] mt-1 max-w-2xl">
            Tus fotos y reportes botánicos almacenados. Haz clic en cualquier tarjeta para abrir sus detalles en pantalla completa.
          </p>
        </div>

        <button
          onClick={onOpenScanner}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#2E6C45] hover:bg-[#255838] text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <CameraIcon size={18} className="text-[#5CCF8D]" />
          <span>📸 Diagnosticar en Vivo</span>
        </button>
      </div>

      {/* Barra de Búsqueda, Filtrado y Selector Rápido de Perfiles de Prueba */}
      <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Buscar por planta o diagnóstico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCE7E0] bg-[#FFFFFF] text-xs font-semibold focus:outline-none focus:border-[#2E6C45]"
            />
            <span className="absolute left-3.5 top-3 text-xs">🔍</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#64746A]">Simular cambio de cuenta:</span>
            {mockupUsers.map((u) => (
              <button
                key={u.id}
                onClick={() => handleSimulatedLogin(u)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition-all ${
                  currentUser.id === u.id
                    ? 'bg-[#2E6C45] text-white border-[#2E6C45]'
                    : 'bg-[#F3F8F5] text-[#526057] border-[#DCE7E0] hover:bg-[#E4ECE7]'
                }`}
              >
                {u.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de Tarjetas del Historial */}
      {filtered.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-[#F3F8F5] text-[#526057] flex items-center justify-center mx-auto text-3xl mb-4">
            🌱
          </div>
          <h3 className="text-lg font-extrabold text-[#1D1F1D]">No hay registros para este perfil</h3>
          <p className="text-xs text-[#526057] mt-1 max-w-md mx-auto">
            Aún no has guardado escaneos con esta cuenta o la búsqueda no coincide.
          </p>
          <button
            onClick={onOpenScanner}
            className="mt-6 px-6 py-3 rounded-xl bg-[#2E6C45] text-white font-extrabold text-xs shadow-md"
          >
            Comenzar Diagnóstico
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((r) => (
            <div
              key={r.id}
              onClick={() => onSelectReport(r)}
              className="bg-[#FFFFFF] border border-[#DCE7E0] hover:border-[#2E6C45] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              {/* Imagen */}
              <div className="relative aspect-16/9 bg-[#F3F8F5] overflow-hidden">
                <img
                  src={r.imageUrl}
                  alt={r.plantName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#1D1F1D]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[10px] font-bold">
                  {r.date?.split('a las')[0] || 'Reciente'}
                </div>
                <div className="absolute top-3 right-3 bg-[#EBF5EF] border border-[#CDE5D5] px-2.5 py-1 rounded-full text-[#2E6C45] font-extrabold text-xs font-mono shadow-xs">
                  {r.healthScore}/100
                </div>
              </div>

              {/* Contenido */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2E6C45]">
                    {r.scientificName}
                  </span>
                  <h3 className="text-base font-extrabold text-[#1D1F1D] tracking-tight group-hover:text-[#2E6C45] transition-colors">
                    {r.plantName}
                  </h3>
                  <p className="text-xs text-[#526057] line-clamp-2 mt-1.5 font-medium">
                    {r.diagnosisTitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F3F8F5] flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#2E6C45] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Ver Reporte Completo</span>
                    <span>→</span>
                  </span>
                  <button
                    onClick={(e) => handleDelete(e, r.id)}
                    className="p-1.5 rounded-lg text-[#64746A] hover:text-red-600 hover:bg-red-50 transition-colors text-xs"
                    title="Eliminar del historial"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
