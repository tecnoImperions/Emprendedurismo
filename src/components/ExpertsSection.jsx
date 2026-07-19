import React, { useState, useEffect } from 'react';
import { expertsCommunity } from '../data/plantData';
import { UsersIcon, ShieldCheckIcon } from './Icons';

export const ExpertsSection = ({ currentUser, onOpenAuthModal, onSelectModule }) => {
  const [providers, setProviders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('todos'); // 'todos' | 'npk' | 'plantas' | 'sustratos'
  
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
      whatsapp: e.id === 1 ? '+5215512345678' : e.id === 2 ? '+573001234567' : e.id === 3 ? '+56912345678' : e.id === 4 ? '+51912345678' : '+34612345678',
      category: e.id === 1 || e.id === 3 ? 'sustratos' : e.id === 2 ? 'npk' : 'plantas'
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
      role: providerRole || 'Distribuidor Autorizado',
      avatar: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=200&auto=format&fit=crop&q=80',
      experience: 'Registro verificado FloraMetrics',
      specialty: `Venta de abono NPK: ${providerNPK}`,
      lifespanRecord: providerNPK || 'NPK Balanceado',
      quote: 'Ofrecemos abonos e insumos orgánicos directamente para tu hogar.',
      status: 'Disponible por WhatsApp',
      location: providerLocation,
      institution: 'Proveedor Oficial FloraMetrics',
      addressOrZone: providerAddress,
      consultationHours: providerHours,
      contactMode: 'Contacto Directo por WhatsApp',
      whatsapp: providerWhatsApp.startsWith('+') ? providerWhatsApp : `+${providerWhatsApp.replace(/\D/g, '')}`,
      category: providerNPK.toLowerCase().includes('npk') ? 'npk' : providerRole.toLowerCase().includes('sustrat') ? 'sustratos' : 'plantas'
    };

    try {
      const savedRaw = localStorage.getItem('FLORAMETRICS_REGISTERED_PROVIDERS');
      const savedList = savedRaw ? JSON.parse(savedRaw) : [];
      const updatedList = [newProvider, ...savedList];
      localStorage.setItem('FLORAMETRICS_REGISTERED_PROVIDERS', JSON.stringify(updatedList));
      setProviders([...updatedList, ...expertsCommunity.map(ex => ({ ...ex, whatsapp: '+5215512345678', category: ex.id === 1 || ex.id === 3 ? 'sustratos' : ex.id === 2 ? 'npk' : 'plantas' }))]);
      
      setSuccessMsg('Registro completado con éxito. Tu establecimiento ha sido añadido al directorio.');
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

  // Manejar llamada/chat de WhatsApp directo para cualquier usuario con cuenta iniciada (gratis o premium)
  const handleChatConnect = (provider) => {
    if (!currentUser) {
      onOpenAuthModal();
      return;
    }
    const cleanNum = (provider.whatsapp || '+5215512345678').replace(/\+/g, '');
    const message = encodeURIComponent(`Hola ${provider.name}, vi tu vivero en el directorio de FloraMetrics. Quisiera consultar sobre insumos NPK y sustratos para mi huerto.`);
    window.open(`https://api.whatsapp.com/send?phone=${cleanNum}&text=${message}`, '_blank');
  };

  const filteredProviders = providers.filter(p => {
    if (selectedCategory === 'todos') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="comunidad" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="px-4 py-1.5 rounded-full bg-[#EBF5EF] text-[#2E6C45] font-extrabold text-xs border border-[#CDE5D5] inline-flex items-center gap-1.5 uppercase tracking-wider">
          <UsersIcon size={12} />
          <span>Red de Proveedores y Distribuidores Autorizados</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans'] mt-4 leading-tight">
          Insumos y Asistencia Directa
        </h2>
        <p className="text-sm sm:text-base text-[#526057] mt-3">
          Conéctate directamente por WhatsApp con viveros y distribuidores certificados de tu región para comprar tierras, sustratos y abonos NPK recomendados.
        </p>

        {currentUser && (
          <button
            onClick={() => setShowRegisterForm(!showRegisterForm)}
            className="mt-6 px-6 py-3 rounded-full bg-[#2E6C45] hover:bg-[#255838] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            {showRegisterForm ? 'Cerrar Formulario' : 'Registrar Establecimiento Comercial'}
          </button>
        )}
      </div>

      {/* FORMULARIO INTERACTIVO PARA AGREGAR PROVEEDORES COMERCIALES */}
      {currentUser && showRegisterForm && (
        <div className="max-w-2xl mx-auto bg-white border border-[#DCE7E0] rounded-3xl p-6 sm:p-8 shadow-lg mb-10 animate-fadeIn">
          <h3 className="text-xl font-extrabold text-[#1D1F1D] mb-2 font-['Plus_Jakarta_Sans']">Registro de Proveedor Comercial</h3>
          <p className="text-xs text-[#526057] mb-6">
            Rellena los detalles para ofrecer tus abonos NPK, plantas y sustratos en nuestro directorio y recibir clientes directos a tu WhatsApp.
          </p>

          {successMsg && (
            <div className="mb-6 p-4 bg-[#EBF5EF] border border-[#2E6C45] rounded-2xl text-[#2E6C45] text-xs font-bold flex items-center gap-2">
              <ShieldCheckIcon size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Nombre Comercial del Vivero / Distribuidor</label>
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
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Región / Ciudad de Cobertura</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. CDMX y Área Metropolitana"
                  value={providerLocation}
                  onChange={(e) => setProviderLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs focus:outline-none focus:border-[#2E6C45]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Dirección Física / Bodega de Envíos</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Calle Principal 123, Sector Industrial"
                  value={providerAddress}
                  onChange={(e) => setProviderAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs focus:outline-none focus:border-[#2E6C45]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Número de WhatsApp (con prefijo de país)</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. +5215512345678"
                  value={providerWhatsApp}
                  onChange={(e) => setProviderWhatsApp(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs focus:outline-none focus:border-[#2E6C45]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Tipo de Servicio / Especialidad</label>
                <input
                  type="text"
                  placeholder="Ej. Distribuidor de Insumos Orgánicos"
                  value={providerRole}
                  onChange={(e) => setProviderRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs focus:outline-none focus:border-[#2E6C45]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Insumos Destacados (Abono NPK, Tierras, etc)</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Abono NPK 15-15-15, Humus, Perlita"
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
              Enviar Registro y Publicar en Directorio
            </button>
          </form>
        </div>
      )}

      {/* DETALLES DE PLANES Y ACCESO A WHATSAPP */}
      <div className="max-w-5xl mx-auto mb-10 p-6 rounded-3xl bg-[#F3F8F5] border border-[#DCE7E0] text-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-extrabold text-[#2E6C45] block uppercase tracking-wider">Directorio de Distribuidores & Insumos</span>
          <p className="text-[#526057] mt-1">
            Los viveros y distribuidores listados ofrecen asesoría comercial y venta directa de fertilizantes recomendados para las necesidades NPK de tus cultivos domésticos.
          </p>
        </div>
        <div className="flex items-center shrink-0">
          <span className="px-4 py-2 rounded-xl bg-white border border-[#DCE7E0] text-[#2E6C45] font-extrabold shadow-sm">
            {currentUser ? 'Acceso a WhatsApp Habilitado' : 'Inicia sesión para ver proveedores'}
          </span>
        </div>
      </div>

      {!currentUser ? (
        <div className="max-w-md mx-auto text-center bg-white border border-[#DCE7E0] rounded-3xl p-8 shadow-md">
          <ShieldCheckIcon size={40} className="text-[#2E6C45] mx-auto mb-4" />
          <h3 className="text-base font-extrabold text-[#1D1F1D] mb-2">Acceso Reservado</h3>
          <p className="text-xs text-[#526057] mb-6 leading-relaxed">
            Inicia sesión con tu cuenta para ver la lista de proveedores autorizados y contactarlos por WhatsApp.
          </p>
          <button
            onClick={onOpenAuthModal}
            className="px-6 py-2.5 rounded-full bg-[#2E6C45] hover:bg-[#255838] text-white text-xs font-extrabold shadow-xs transition-all active:scale-95"
          >
            Iniciar Sesión
          </button>
        </div>
      ) : (
        <>
          {/* CATEGORY SELECTOR FILTERS */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === 'todos'
                  ? 'bg-[#2E6C45] text-white border-[#2E6C45] shadow-xs'
                  : 'bg-white text-[#526057] border-[#DCE7E0] hover:bg-[#F3F8F5]'
              }`}
            >
              Todos los Proveedores
            </button>
            <button
              onClick={() => setSelectedCategory('npk')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === 'npk'
                  ? 'bg-[#2E6C45] text-white border-[#2E6C45] shadow-xs'
                  : 'bg-white text-[#526057] border-[#DCE7E0] hover:bg-[#F3F8F5]'
              }`}
            >
              Abonos & Nutrientes NPK
            </button>
            <button
              onClick={() => setSelectedCategory('sustratos')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === 'sustratos'
                  ? 'bg-[#2E6C45] text-white border-[#2E6C45] shadow-xs'
                  : 'bg-white text-[#526057] border-[#DCE7E0] hover:bg-[#F3F8F5]'
              }`}
            >
              Sustratos, Tierras & Perlita
            </button>
            <button
              onClick={() => setSelectedCategory('plantas')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === 'plantas'
                  ? 'bg-[#2E6C45] text-white border-[#2E6C45] shadow-xs'
                  : 'bg-white text-[#526057] border-[#DCE7E0] hover:bg-[#F3F8F5]'
              }`}
            >
              Viveristas, Plantas & Semillas
            </button>
          </div>

          {/* Grid de Especialistas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((expert) => (
              <div
                key={expert.id}
                className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl p-5 hover:border-[#2E6C45] transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={expert.avatar}
                      alt={expert.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#2E6C45] shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="text-sm font-bold text-[#1D1F1D]">{expert.name}</h3>
                        <ShieldCheckIcon size={14} className="text-[#2E6C45]" />
                      </div>
                      <p className="text-[11px] text-[#2E6C45] font-medium">{expert.role}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#526057] mb-4">
                    <div>
                      <span className="font-semibold text-[#64746A]">Región:</span> <span className="font-bold text-[#1D1F1D]">{expert.location}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#64746A]">Insumos:</span> <span className="font-bold text-[#2E6C45]">{expert.lifespanRecord}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#EAEFEA] gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#2E6C45]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5CCF8D] animate-pulse" />
                    Disponible
                  </span>
                  
                  <button
                    onClick={() => handleChatConnect(expert)}
                    className="px-4 py-2 rounded-xl bg-[#2E6C45] hover:bg-[#255838] text-white text-xs font-extrabold transition-all shadow-xs shrink-0"
                  >
                    WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
