import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PlantScannerSection } from './components/PlantScannerSection';
import { HuertoSection } from './components/HuertoSection';
import { ClimatizationSection } from './components/ClimatizationSection';
import { ExpertsSection } from './components/ExpertsSection';
import { UserDashboardSection } from './components/UserDashboardSection';
import { NutrientsSection } from './components/NutrientsSection';
import { FullScannerPage } from './components/FullScannerPage';
import { DiagnosticReportPage } from './components/DiagnosticReportPage';
import { HistorySection } from './components/HistorySection';
import { PricingSection } from './components/PricingSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { AdminSection } from './components/AdminSection';
import { getActiveUser, saveActiveUser } from './data/userDatabase';
import { supabase } from './lib/supabaseClient';
import { CameraIcon } from './components/Icons';
import './App.css';

function App() {
  // Estado modular: 'home' | 'scanner' | 'reporte' | 'historial' | 'huertos' | 'nutrientes' | 'guias' | 'comunidad'
  const [activeModule, setActiveModule] = useState('home');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  // Cargar usuario autenticado real (sin contar perfiles mockup de demostración)
  const getAuthUserOnly = () => {
    try {
      const savedUserId = localStorage.getItem('FLORAMETRICS_ACTIVE_USER_ID');
      const customUserJson = localStorage.getItem('FLORAMETRICS_CUSTOM_USER_DATA');
      if (customUserJson && savedUserId && (savedUserId.startsWith('local_') || JSON.parse(customUserJson).id === savedUserId)) {
        return JSON.parse(customUserJson);
      }
    } catch (e) {
      console.error('Error cargando usuario de autenticación:', e);
    }
    return null;
  };

  const [currentUser, setCurrentUser] = useState(getAuthUserOnly());

  useEffect(() => {
    // Sincronización continua de sesión y base de datos con Supabase
    if (supabase && supabase.auth) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          const userObj = {
            id: user.id,
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
            email: user.email,
            avatar: user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
            space: user.user_metadata?.space_type || 'Huerto en Balcón / Ventana',
            role: 'Miembro Supabase de FloraMetrics'
          };
          saveActiveUser(userObj);
          setCurrentUser(userObj);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const u = session.user;
          const userObj = {
            id: u.id,
            name: u.user_metadata?.full_name || u.email?.split('@')[0] || 'Usuario',
            email: u.email,
            avatar: u.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
            space: u.user_metadata?.space_type || 'Huerto en Balcón / Ventana',
            role: 'Miembro Supabase de FloraMetrics'
          };
          saveActiveUser(userObj);
          setCurrentUser(userObj);
        } else {
          setCurrentUser(null);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasAdminParam = params.get('module') === 'admin' || params.has('admin') || params.has('control') || params.has('panel');
    
    if (hasAdminParam) {
      const adminUser = {
        id: 'local_admin_test',
        name: 'Administrador Principal',
        email: 'admin@florametrics.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
        space: 'Control General FloraMetrics',
        role: 'admin'
      };
      saveActiveUser(adminUser);
      localStorage.setItem('FLORAMETRICS_ACTIVE_USER_ID', 'local_admin_test');
      localStorage.setItem('FLORAMETRICS_CUSTOM_USER_DATA', JSON.stringify(adminUser));
      setCurrentUser(adminUser);
      setActiveModule('admin');
    }
  }, []);

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstallable(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA install prompt outcome: ${outcome}`);
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const handleLogout = async () => {
    if (supabase && supabase.auth) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('FLORAMETRICS_ACTIVE_USER_ID');
    localStorage.removeItem('FLORAMETRICS_CUSTOM_USER_DATA');
    setCurrentUser(null);
  };

  // Navegación modular por pestañas y accesos directos
  const handleSelectModule = (target) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (target === 'scanner' || target === 'camara') {
      setActiveModule('scanner');
      return;
    }
    if (target === 'historial' || target === 'history') {
      setActiveModule('historial');
      return;
    }
    if (target === 'usuarios' || target === 'huertos') {
      setActiveModule('huertos');
      return;
    }
    if (target === 'climatizacion' || target === 'guias') {
      setActiveModule('guias');
      return;
    }
    if (target === 'comunidad' || target === 'expertos') {
      setActiveModule('comunidad');
      return;
    }
    if (target === 'precios' || target === 'planes') {
      setActiveModule('precios');
      return;
    }
    if (target === 'nutrientes') {
      setActiveModule('nutrientes');
      return;
    }
    if (target === 'reporte' && selectedReport) {
      setActiveModule('reporte');
      return;
    }
    if (target === 'admin') {
      setActiveModule('admin');
      return;
    }
    setActiveModule('home');
  };

  if (activeModule === 'admin') {
    return (
      <AdminSection
        onNavigateHome={() => handleSelectModule('home')}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F8F5] text-[#1D1F1D] font-['Plus_Jakarta_Sans'] selection:bg-[#5CCF8D] selection:text-[#1D1F1D] overflow-x-hidden flex flex-col justify-between">
      <div>
        <Navbar
          activeModule={activeModule}
          onSelectModule={handleSelectModule}
          onOpenScanner={() => handleSelectModule('scanner')}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          currentUser={currentUser}
          onLogout={handleLogout}
          isInstallable={isInstallable}
          onInstallApp={handleInstallApp}
        />

        {/* Banner flotante de instalación PWA */}
        {isInstallable && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 animate-fadeIn">
            <div className="p-4 bg-gradient-to-r from-[#2E6C45] to-[#3B8255] border border-[#2E6C45]/20 rounded-3xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl shrink-0">📲</span>
                <div>
                  <h4 className="text-sm font-extrabold font-['Plus_Jakarta_Sans']">Descargar FloraMetrics en tu Celular</h4>
                  <p className="text-[10.5px] text-[#E2EFEB] font-medium leading-tight">Instala FloraMetrics como una App para acceder rápidamente, recibir alertas y usar el escáner IA sin abrir el navegador.</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end items-center">
                <button
                  onClick={() => setIsInstallable(false)}
                  className="px-4 py-2 rounded-xl text-white/80 hover:bg-white/10 text-xs font-bold transition-all"
                >
                  Omitir
                </button>
                <button
                  onClick={handleInstallApp}
                  className="px-5 py-2 rounded-xl bg-white text-[#2E6C45] font-extrabold text-xs shadow-sm hover:bg-[#F3F8F5] transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>Instalar App</span>
                  <span>↓</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RENDERIZADO DE MÓDULOS EN PÁGINA COMPLETA */}
        <main className="pb-24 lg:pb-12 transition-all">
          
          {/* MÓDULO 1: INICIO / DIAGNÓSTICO IA */}
          {activeModule === 'home' && (
            <div className="animate-fadeIn">
              <HeroSection
                onOpenScanner={() => handleSelectModule('scanner')}
                onNavigate={handleSelectModule}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-8">
                <div className="p-5 sm:p-6 bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#EBF5EF] text-[#2E6C45] flex items-center justify-center">
                      <CameraIcon size={20} className="text-[#2E6C45]" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-[#1D1F1D]">Escáner QR Botánico Directo en Vivo</h4>
                      <p className="text-xs text-[#526057]">Abre tu cámara y enfoca como al leer un código QR. Respaldo fotográfico en Cloudinary: <strong>ll3h5fkl</strong>.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSelectModule('scanner')}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#2E6C45] to-[#3B8255] text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all shrink-0 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Abrir Cámara en Vivo</span>
                  </button>
                </div>
              </div>
              <PlantScannerSection />
            </div>
          )}

          {/* MÓDULO 2: ESCÁNER DE CÁMARA DIRECTO A PÁGINA COMPLETA (ESTILO QR) */}
          {activeModule === 'scanner' && (
            <FullScannerPage
              onScanComplete={(report) => {
                setSelectedReport(report);
                setActiveModule('reporte');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onCancel={() => handleSelectModule('home')}
            />
          )}

          {/* MÓDULO 3: REPORTE DE DIAGNÓSTICO EN PÁGINA COMPLETA (SIN MODAL COMPRIMIDO) */}
          {activeModule === 'reporte' && (
            <DiagnosticReportPage
              reportData={selectedReport}
              onNavigate={handleSelectModule}
              onScanAgain={() => handleSelectModule('scanner')}
            />
          )}

          {/* MÓDULO 4: HISTORIAL DE DIAGNÓSTICOS CON FOTOS CLOUDINARY */}
          {activeModule === 'historial' && (
            <HistorySection
              onSelectReport={(r) => {
                setSelectedReport(r);
                setActiveModule('reporte');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenScanner={() => handleSelectModule('scanner')}
              currentUser={currentUser}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onLoginSuccess={(u) => {
                saveActiveUser(u);
                setCurrentUser(u);
              }}
            />
          )}

          {/* MÓDULO 4.5: MODELO DE NEGOCIO Y PLANES VIP */}
          {activeModule === 'precios' && (
            <PricingSection
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              currentUser={currentUser}
            />
          )}

          {/* MÓDULO 5: MIS HUERTOS & USUARIOS */}
          {activeModule === 'huertos' && (
            <div className="animate-fadeIn pt-4">
              <UserDashboardSection
                onOpenScanner={() => handleSelectModule('scanner')}
                currentUser={currentUser}
                onNavigate={handleSelectModule}
              />
            </div>
          )}

          {/* MÓDULO 6: NUTRIENTES NPK & ABONOS CASEROS */}
          {activeModule === 'nutrientes' && (
            <div className="animate-fadeIn pt-4">
              <NutrientsSection />
            </div>
          )}

          {/* MÓDULO 7: CLIMA, RIEGO Y CULTIVOS DE HOGAR */}
          {activeModule === 'guias' && (
            <div className="animate-fadeIn pt-4">
              <ClimatizationSection />
            </div>
          )}

          {/* MÓDULO 8: ESPECIALISTAS Y LONGEVIDAD */}
          {activeModule === 'comunidad' && (
            <div className="animate-fadeIn pt-4">
              <ExpertsSection
                currentUser={currentUser}
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
                onSelectModule={handleSelectModule}
              />
            </div>
          )}



        </main>
      </div>

      {/* Footer modularizado */}
      <Footer onNavigate={handleSelectModule} />

      {/* Modal Amigable de Autenticación */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(u) => {
          saveActiveUser(u);
          setCurrentUser(u);
        }}
      />
    </div>
  );
}

export default App;
