import React from 'react';
import { CameraIcon, SproutIcon, ThermometerIcon, UsersIcon, SparklesIcon } from './Icons';

export const Navbar = ({ activeSection, onNavigate, onOpenScanner }) => {
  const navLinks = [
    { id: 'scanner', label: 'Cámara IA', icon: <CameraIcon size={16} /> },
    { id: 'climatizacion', label: 'Climatización & Cuidado', icon: <ThermometerIcon size={16} /> },
    { id: 'huertos', label: 'Huerto en Casa', icon: <SproutIcon size={16} /> },
    { id: 'comunidad', label: 'Expertos & Tiempo de Vida', icon: <UsersIcon size={16} /> },
  ];

  return (
    <>
      {/* Top Institutional Header Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FFFFFF]/85 border-b border-[#E1EAE4] transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('hero')}>
            <div className="w-10 h-10 rounded-xl bg-[#2E6C45] flex items-center justify-center shadow-md text-white">
              <SproutIcon size={22} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-[#1D1F1D] font-['Plus_Jakarta_Sans']">FloraMetrics</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#5CCF8D]/20 text-[#2E6C45] border border-[#5CCF8D]/40">AI Vision</span>
              </div>
              <p className="text-[11px] text-[#59695F] font-medium">Precisión Analítica Botánica</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F3F8F5] px-3 py-1.5 rounded-full border border-[#DCE7E0]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeSection === link.id
                    ? 'bg-[#2E6C45] text-white shadow-sm'
                    : 'text-[#1D1F1D] hover:text-[#2E6C45] hover:bg-white/60'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTA Pill Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenScanner}
              className="px-5 py-2.5 rounded-full bg-[#2E6C45] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:bg-[#255838] hover:shadow-lg transition-all"
            >
              <SparklesIcon size={16} className="text-[#5CCF8D] animate-pulse" />
              <span>SCAN PLANT ✨</span>
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Sticky Floating Navigation for Mobile Phones */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-50">
        <div className="bg-[#FFFFFF]/95 backdrop-blur-xl border border-[#DCE7E0] rounded-2xl p-2 shadow-xl flex items-center justify-around">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                activeSection === link.id
                  ? 'text-[#2E6C45] font-bold scale-105 bg-[#5CCF8D]/15'
                  : 'text-[#64746A] hover:text-[#1D1F1D]'
              }`}
            >
              <div className="mb-0.5">{link.icon}</div>
              <span className="text-[10px] leading-tight font-medium">{link.label.split(' ')[0]}</span>
            </button>
          ))}
          <button
            onClick={onOpenScanner}
            className="flex flex-col items-center justify-center py-1.5 px-3 rounded-full bg-[#2E6C45] text-white font-bold shadow-md"
          >
            <CameraIcon size={16} className="text-[#5CCF8D]" />
            <span className="text-[10px] leading-tight font-bold">SCAN ✨</span>
          </button>
        </div>
      </div>
    </>
  );
};
