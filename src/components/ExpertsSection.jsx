import React, { useState, useEffect } from 'react';
import { expertsCommunity } from '../data/plantData';
import { UsersIcon, ClockIcon, SparklesIcon, CheckCircleIcon } from './Icons';

export const ExpertsSection = ({ currentUser, onOpenAuthModal, onSelectModule }) => {
  const [plantAgeInput, setPlantAgeInput] = useState('1 - 3 años');
  const [plantTypeInput, setPlantTypeInput] = useState('Monstera Deliciosa');
  const [showPrognosis, setShowPrognosis] = useState(false);
  const [providers, setProviders] = useState([]);
  
  // Estados del Formulario de Registro de Viveros / Especialistas
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [providerName, setProviderName] = useState('');
  const [providerRole, setProviderRole] = useState('');
  const [providerLocation, setProviderLocation] = useState('');
  const [providerAddress, setProviderAddress] = useState('');
  const [providerWhatsApp, setProviderWhatsApp] = useState('');
  const [providerNPK, setProviderNPK] = useState('');
  const [providerHours, setProviderHours] = useState('Lunes a Viernes: 09:00 - 18:00');
  const [successMsg, setSuccessMsg] = useState(null);

  // Cargar proveedores comerciales guardados en el almacenamiento del navegador
  const loadProviders = () => {
    const defaultList = expertsCommunity.map(e => ({
      ...e,
      whatsapp: e.id === 1 ? '+5215512345678' : e.id === 2 ? '+573001234567' : e.id === 3 ? '+56912345678' : e.id === 4 ? '+51912345678' : '+34612345678'
    }));
    try {
      const saved = localStorage.getItem('FLORAMETRICS_REGISTERED_PROVIDERS');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...defaultList];
        }
      }
    } catch (err) {
      console.error('Error al cargar proveedores:', err);
    }
    return defaultList;
  };

  useEffect(() => {
    setProviders(loadProviders());
  }, []);

  // Procesar registro de nuevo vivero / agrónomo comercial
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg(null);

    const newProvider = {
      id: `provider-${Date.now()}`,
      name: providerName,
      role: providerRole || 'Especialista Agrónomo Comercial',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      experience: 'Registro verificado FloraMetrics',
      specialty: `Venta de abono NPK: ${providerNPK}`,
      lifespanRecord: 'Proveedor verificado local',
      quote: 'Ofrecemos abonos e insumos orgánicos directamente para tu hogar.',
      status: 'Disponible por WhatsApp',
      location: providerLocation,
      institution: 'Proveedor Oficial FloraMetrics',
      addressOrZone: providerAddress,
      consultationHours: providerHours,
      contactMode: 'Contacto Directo por WhatsApp',
      whatsapp: providerWhatsApp.startsWith('+') ? providerWhatsApp : `+${providerWhatsApp.replace(/\D/g, '')}`
    };

    try {
      const savedRaw = localStorage.getItem('FLORAMETRICS_REGISTERED_PROVIDERS');
      const savedList = savedRaw ? JSON.parse(savedRaw) : [];
      const updatedList = [newProvider, ...savedList];
      localStorage.setItem('FLORAMETRICS_REGISTERED_PROVIDERS', JSON.stringify(updatedList));
      setProviders([...updatedList, ...expertsCommunity.map(ex => ({ ...ex, whatsapp: '+5215512345678' }))]);
      
      setSuccessMsg('¡Registro completado! Tu vivero ha sido añadido de inmediato al directorio.');
      // Limpiar formulario
      setProviderName('');
      setProviderRole('');
      setProviderLocation('');
      setProviderAddress('');
      setProviderWhatsApp('');
      setProviderNPK('');
      setTimeout(() => {
        setSuccessMsg(null);
        setShowRegisterForm(false);
      }, 3000);
    } catch (err) {
      console.error('Error guardando proveedor:', err);
    }
  };

  // Manejar llamada/chat de WhatsApp según membresía
  const handleChatConnect = (provider) => {
    // Si no ha iniciado sesión, invitar a loguearse
    if (!currentUser) {
      onOpenAuthModal();
      return;
    }
    // Si no es VIP, invitar a suscribirse al Plan VIP
    if (currentUser.role !== 'Miembro Supabase de FloraMetrics' && !currentUser.id.includes('vip')) {
      onSelectModule('precios');
      return;
    }
    // Si tiene sesión e ingresó con membresía, abre WhatsApp directamente
    const cleanNum = provider.whatsapp.replace(/\+/g, '');
    const message = encodeURIComponent(`Hola ${provider.name}, vi tu perfil de proveedor en la base de datos de FloraMetrics y me gustaría consultarte sobre abonos NPK.`);
    window.open(`https://api.whatsapp.com/send?phone=${cleanNum}&text=${message}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-fadeIn">
      
      {/* Cabecera sin emojis stickers */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="px-3.5 py-1 rounded-full bg-[#EBF5EF] text-[#2E6C45] font-extrabold text-xs border border-[#CDE5D5] inline-flex items-center gap-1.5 uppercase tracking-wider">
          <UsersIcon size={12} />
          <span>Red de Mentores y Proveedores Comerciales</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans'] mt-3 leading-tight">
          Asesórate Directo por WhatsApp
        </h2>
        <p className="text-sm sm:text-base text-[#526057] mt-3">
          Conéctate directamente por WhatsApp con agrónomos y viveros verificados para comprar abonos NPK y recibir asistencia inmediata para tus plantas en el hogar.
        </p>

        {/* Botón para registrarse como Vendedor */}
        <button
          onClick={() => setShowRegisterForm(!showRegisterForm)}
          className="mt-6 px-6 py-3.5 rounded-2xl bg-[#2E6C45] hover:bg-[#255838] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
        >
          {showRegisterForm ? 'Cerrar Registro' : 'Registrar Mi Vivero / Proveedor Comercial'}
        </button>
      </div>

      {/* FORMULARIO INTERACTIVO PARA AGREGAR PROVEEDORES COMERCIALES */}
      {showRegisterForm && (
        <div className="max-w-2xl mx-auto bg-white border border-[#DCE7E0] rounded-3xl p-6 sm:p-8 shadow-lg mb-10 animate-fadeIn">
          <h3 className="text-xl font-extrabold text-[#1D1F1D] mb-2 font-['Plus_Jakarta_Sans']">Registro de Proveedor Comercial</h3>
          <p className="text-xs text-[#526057] mb-6">
            Rellena los detalles para ofrecer tus abonos NPK, plantas y sustratos en nuestro directorio y recibir clientes directos a tu WhatsApp.
          </p>

          {successMsg && (
            <div className="mb-6 p-4 bg-[#EBF5EF] border border-[#2E6C45] rounded-2xl text-[#2E6C45] text-xs font-bold flex items-center gap-2">
              <CheckCircleIcon size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Nombre Comercial / Vivero</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Vivero Los Pinos"
                  value={providerName}
                  onChange={(e) => setProviderName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs focus:outline-none focus:border-[#2E6C45]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Número de WhatsApp (Con código de país)</label>
                <input
                  type="tel"
                  required
                  placeholder="Ej. +5491123456789"
                  value={providerWhatsApp}
                  onChange={(e) => setProviderWhatsApp(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs focus:outline-none focus:border-[#2E6C45]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Ciudad y País</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Buenos Aires, Argentina"
                  value={providerLocation}
                  onChange={(e) => setProviderLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs focus:outline-none focus:border-[#2E6C45]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Dirección Física / Zona</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Av. Rivadavia 4500, Caballito"
                  value={providerAddress}
                  onChange={(e) => setProviderAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs focus:outline-none focus:border-[#2E6C45]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Especialidad / Cargo</label>
                <input
                  type="text"
                  placeholder="Ej. Asesoría en Huertos y Sustratos"
                  value={providerRole}
                  onChange={(e) => setProviderRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs focus:outline-none focus:border-[#2E6C45]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Insumos y Fórmulas NPK que vende</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Humus de Lombriz, Té de Plátano, NPK 15-15-15"
                  value={providerNPK}
                  onChange={(e) => setProviderNPK(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs focus:outline-none focus:border-[#2E6C45]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-[#2E6C45] hover:bg-[#255838] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              Enviar Registro y Aparecer en Directorio
            </button>
          </form>
        </div>
      )}

      {/* DETALLES DE PLANES Y LIMITACIÓN EN LA PARTE SUPERIOR */}
      <div className="max-w-4xl mx-auto mb-10 p-5 rounded-2xl bg-[#F3F8F5] border border-[#DCE7E0] text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-extrabold text-[#2E6C45] block uppercase tracking-wider">Control de Permisos de Conectividad</span>
          <p className="text-[#526057] mt-1">
            <strong>Plan Libre:</strong> Solo ve ubicaciones. <strong>Plan Registrado:</strong> Guarda local. <strong>Plan VIP:</strong> Desbloquea botón verde de WhatsApp.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#DCE7E0] text-[#1D1F1D] font-bold">
            Tu Estado: {currentUser ? (currentUser.id.includes('vip') || currentUser.role === 'Miembro Supabase de FloraMetrics' ? 'Miembro VIP' : 'Registrado (Básico)') : 'Invitado (Gratuito)'}
          </span>
        </div>
      </div>

      {/* Grid de Especialistas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((expert) => (
          <div
            key={expert.id}
            className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-6 hover:border-[#2E6C45] transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#2E6C45] shadow-xs"
                />
                <div>
                  <h3 className="text-base font-bold text-[#1D1F1D]">{expert.name}</h3>
                  <p className="text-xs text-[#2E6C45] font-medium">{expert.role}</p>
                </div>
              </div>

              {/* Ficha de Ubicación */}
              <div className="bg-[#F3F8F5] p-3.5 rounded-2xl border border-[#DCE7E0] mb-4 space-y-2 text-xs">
                <div className="flex items-start justify-between border-b border-[#E4ECE7] pb-1.5">
                  <span className="text-[#59695F] font-semibold">Ubicación:</span>
                  <span className="font-extrabold text-[#1D1F1D] text-right">{expert.location}</span>
                </div>
                <div className="text-[#2E6C45] font-bold">
                  {expert.institution}
                </div>
                <div className="text-[#526057] leading-tight">
                  <span className="font-semibold">Dirección:</span> {expert.addressOrZone}
                </div>
                <div className="text-[#526057] leading-tight pt-1 border-t border-[#E4ECE7]">
                  <span className="font-semibold">Horario:</span> {expert.consultationHours}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#E4ECE7]">
                  <span className="text-[#59695F]">Fórmula NPK Recomendada:</span>
                  <span className="font-bold text-[#2E6C45]">{expert.lifespanRecord}</span>
                </div>
              </div>

              <p className="text-xs text-[#526057] italic leading-relaxed mb-4">
                "{expert.quote}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#EAEFEA] gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#2E6C45]">
                <span className="w-2 h-2 rounded-full bg-[#5CCF8D] animate-pulse" />
                {expert.status}
              </span>
              
              <button
                onClick={() => handleChatConnect(expert)}
                className="px-4 py-2.5 rounded-xl bg-[#2E6C45] hover:bg-[#255838] text-white text-xs font-extrabold transition-all shadow-xs shrink-0"
              >
                Chatear por WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
