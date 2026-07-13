import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PlantScannerSection } from './components/PlantScannerSection';
import { HuertoSection } from './components/HuertoSection';
import { ClimatizationSection } from './components/ClimatizationSection';
import { ExpertsSection } from './components/ExpertsSection';
import { Footer } from './components/Footer';
import { ScannerModal } from './components/ScannerModal';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['scanner', 'climatizacion', 'huertos', 'comunidad'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F8F5] text-[#1D1F1D] font-['Plus_Jakarta_Sans'] selection:bg-[#5CCF8D] selection:text-[#1D1F1D] overflow-x-hidden">
      {/* Navbar with Desktop Header & Mobile Sticky Dock */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenScanner={() => setIsScannerModalOpen(true)}
      />

      {/* Hero Banner */}
      <main>
        <HeroSection
          onOpenScanner={() => setIsScannerModalOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* 1. Cámara para mover la planta y hacer aparecer IA diagnóstico */}
        <PlantScannerSection />

        {/* 2. Climatización y Métodos de Cuidado */}
        <ClimatizationSection />

        {/* 3. Verduras y Alimentos que pueden hacerse Huertos */}
        <HuertoSection />

        {/* 4. Comunidad y Personas que ya saben Tiempo de Vida */}
        <ExpertsSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Fullscreen Interactive Camera Scanner Modal */}
      <ScannerModal
        isOpen={isScannerModalOpen}
        onClose={() => setIsScannerModalOpen(false)}
      />
    </div>
  );
}

export default App;
