import React from 'react';
import { CameraIcon, SproutIcon, ThermometerIcon, UsersIcon, SparklesIcon, DatabaseIcon, LeafIcon, ClipboardIcon, UserIcon, HomeIcon, CloudIcon } from './Icons';

export const Navbar = ({ activeModule, onSelectModule, onOpenScanner, onOpenAuthModal, currentUser, onLogout }) => {
  const isAdmin = currentUser && (
    currentUser.email === 'juanrevollo001@gmail.com' ||
    currentUser.email === 'tecnoimperions@gmail.com' ||
    currentUser.email?.includes('admin') ||
    currentUser.role === 'admin'
  );

  const modules = [
    { id: 'home', label: 'Inicio', icon: <HomeIcon size={17} /> },
    { id: 'huertos', label: 'Mi Jardín', icon: <DatabaseIcon size={17} /> },
    { id: 'guias', label: 'Clima & Sol', icon: <CloudIcon size={17} /> },
    { id: 'comunidad', label: 'Proveedores', icon: <UsersIcon size={17} /> },
  ];

  if (isAdmin) {
    modules.push({ id: 'admin', label: 'Panel Admin', icon: <UsersIcon size={17} /> });
  }

  const firstName = currentUser ? currentUser.name.split(' ')[0] : null;

  return (
    <>
      {/* Barra de Cabecera Superior (Limpia, elegante y sin miedo) */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FFFFFF]/95 border-b border-[#E1EAE4] transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          
          {/* Logo institucional amigable */}
          <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => onSelectModule('home')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2E6C45] to-[#3B8255] flex items-center justify-center shadow-md text-white">
              <SproutIcon size={22} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-[#1D1F1D] font-['Plus_Jakarta_Sans']">FloraMetrics</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EBF5EF] text-[#2E6C45] border border-[#CDE5D5]">AI Cloud</span>
              </div>
              <p className="text-[11px] text-[#59695F] font-medium hidden sm:block">Respaldo Cloudinary & Cuidado en Hogar</p>
            </div>
          </div>

          {/* Navegación por Módulos en Desktop (Evita el scroll infinito) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F3F8F5] px-2.5 py-1.5 rounded-full border border-[#DCE7E0]">
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                  activeModule === mod.id
                    ? 'bg-[#2E6C45] text-white shadow-md scale-[1.02]'
                    : 'text-[#526057] hover:text-[#1D1F1D] hover:bg-white/80'
                }`}
              >
                {mod.icon}
                <span>{mod.label}</span>
              </button>
            ))}
          </nav>

          {/* Acciones de Usuario y Escáner Rápido */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* BOTÓN AMIGABLE DE MI CUENTA */}
            {currentUser ? (
              <div className="flex items-center gap-2.5 bg-[#F3F8F5] border border-[#DCE7E0] pl-2 pr-3 py-1.5 rounded-full shadow-2xs">
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border-2 border-[#2E6C45]"
                />
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-extrabold text-[#1D1F1D] leading-tight">{firstName}</span>
                  <button
                    onClick={onLogout}
                    className="text-[9px] font-bold text-[#64746A] hover:text-red-600 underline text-left"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-4 py-2.5 rounded-2xl bg-[#EBF5EF] hover:bg-[#DCECE2] text-[#2E6C45] font-extrabold text-xs sm:text-sm flex items-center gap-2 border border-[#CDE5D5] shadow-xs transition-all active:scale-95"
                title="Acceder o Crear mi perfil de huerto"
              >
                <div className="w-5 h-5 rounded-full bg-[#2E6C45] text-white flex items-center justify-center">
                  <UserIcon size={12} />
                </div>
                <span>Mi Cuenta</span>
              </button>
            )}

            {/* BOTÓN ESCANEAR DESKTOP (Abre directo el visor full screen) */}
            <button
              onClick={onOpenScanner}
              className="hidden sm:flex px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2E6C45] to-[#3B8255] text-white font-extrabold text-xs sm:text-sm items-center gap-2 shadow-md hover:shadow-lg hover:from-[#255838] transition-all shrink-0 active:scale-95"
            >
              <CameraIcon size={17} className="text-[#5CCF8D]" />
              <span>Cámara QR</span>
            </button>
          </div>
        </div>
      </header>

      {/* 
        =============================================================================
        BOTTOM DOCK ESTILO BANCARIO PARA CELULARES (CON CÍRCULO CENTRAL ELEVADO)
        =============================================================================
      */}
      <div className="lg:hidden fixed bottom-3 left-3 right-3 z-50">
        <div className="relative bg-[#FFFFFF]/95 backdrop-blur-xl border border-[#DCE7E0] rounded-3xl px-2 py-2 shadow-2xl flex items-center justify-between">
          
          {/* Módulo 1: Inicio */}
          <button
            onClick={() => onSelectModule('home')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              activeModule === 'home' ? 'text-[#2E6C45] font-extrabold scale-105' : 'text-[#64746A]'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${activeModule === 'home' ? 'bg-[#EBF5EF]' : ''}`}>
              <HomeIcon size={18} />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 font-bold">Inicio</span>
          </button>

          {/* Módulo 2: Mi Jardín */}
          <button
            onClick={() => onSelectModule('huertos')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              activeModule === 'huertos' ? 'text-[#2E6C45] font-extrabold scale-105' : 'text-[#64746A]'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${activeModule === 'huertos' ? 'bg-[#EBF5EF]' : ''}`}>
              <DatabaseIcon size={18} />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 font-bold">Mi Jardín</span>
          </button>

          {/* 
            ========================================================================
            SLOT 3: BOTÓN CENTRAL DE CÁMARA ELEVADO (ESTILO APP BANCARIA / QR DIRECTO)
            ========================================================================
          */}
          <div className="flex-1 flex flex-col items-center justify-center relative -top-3">
            <button
              onClick={onOpenScanner}
              aria-label="Abrir cámara IA para escanear planta o cultivo"
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#2E6C45] via-[#357B4E] to-[#4DB578] text-white shadow-xl hover:shadow-2xl flex items-center justify-center border-4 border-[#FFFFFF] active:scale-90 transition-transform"
            >
              <CameraIcon size={24} className="text-white animate-pulse" />
            </button>
            <span className="text-[10px] tracking-tight mt-1 font-bold text-[#64746A]">
              Escanear
            </span>
          </div>

          {/* Módulo 4: Clima */}
          <button
            onClick={() => onSelectModule('guias')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              activeModule === 'guias' ? 'text-[#2E6C45] font-extrabold scale-105' : 'text-[#64746A]'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${activeModule === 'guias' ? 'bg-[#EBF5EF]' : ''}`}>
              <CloudIcon size={18} />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 font-bold">Clima</span>
          </button>

          {/* Módulo 5: Proveedores */}
          <button
            onClick={() => onSelectModule('comunidad')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              activeModule === 'comunidad' ? 'text-[#2E6C45] font-extrabold scale-105' : 'text-[#64746A]'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${activeModule === 'comunidad' ? 'bg-[#EBF5EF]' : ''}`}>
              <UsersIcon size={18} />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 font-bold">Proveedores</span>
          </button>

        </div>
      </div>
    </>
  );
};
