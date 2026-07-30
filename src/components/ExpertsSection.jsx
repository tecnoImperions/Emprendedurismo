import React, { useState, useEffect } from 'react';
import { expertsCommunity } from '../data/plantData';
import { UsersIcon, ShieldCheckIcon, CheckCircleIcon, SparklesIcon, LeafIcon } from './Icons';

export const ExpertsSection = ({ currentUser, onOpenAuthModal, onSelectModule }) => {
  const [providers, setProviders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('todos'); // 'todos' | 'npk' | 'plantas' | 'sustratos'
  
  // Estados del Formulario de Registro de Viveros / Especialistas
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registerStep, setRegisterStep] = useState(1); // 1 = Selección de Planes, 2 = Formulario de Registro, 3 = Confirmación de WhatsApp
  const [providerFirstName, setProviderFirstName] = useState('');
  const [providerLastName, setProviderLastName] = useState('');
  const [providerName, setProviderName] = useState(''); // Nombre Comercial
  const [providerRole, setProviderRole] = useState('');
  const [providerLocation, setProviderLocation] = useState('');
  const [providerAddress, setProviderAddress] = useState('');
  const [providerWhatsApp, setProviderWhatsApp] = useState('');
  const [providerNPK, setProviderNPK] = useState('');
  const [providerHours, setProviderHours] = useState('Lunes a Viernes: 09:00 - 18:00');
  
  // Estados nuevos de Plan y Geolocalización GPS
  const [selectedPlanId, setSelectedPlanId] = useState('vivero_local'); // 'vivero_local' | 'marketplace_pro' | 'distribuidor_agro'
  const [gpsCoords, setGpsCoords] = useState({ lat: null, lng: null });
  const [gettingGps, setGettingGps] = useState(false);
  const [gpsError, setGpsError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const plans = [
    {
      id: 'vivero_local',
      name: 'Plan Vivero Local',
      price: 25,
      currency: 'Bs',
      period: 'mes',
      description: 'Ideal para pequeños viveros y tiendas locales de plantas. Aparece en el directorio oficial y recibe consultas directamente en tu WhatsApp.',
      features: [
        'Aparición en el directorio oficial FloraMetrics',
        'Botón de contacto a tu WhatsApp comercial',
        'Soporte básico para cotizaciones NPK',
        'Insignia de proveedor verificado al aprobar'
      ],
      popular: false
    },
    {
      id: 'marketplace_pro',
      name: 'Plan Marketplace Pro',
      price: 45,
      currency: 'Bs',
      period: 'mes',
      description: 'Destaca tus insumos y tierras en el marketplace para captar la atención de miles de usuarios.',
      features: [
        'Posición destacada en el directorio superior',
        'Recomendación inteligente de tus insumos en diagnósticos IA',
        'Espacio dedicado para publicar en el Marketplace',
        'Alertas prioritarias de clientes potenciales'
      ],
      popular: true
    },
    {
      id: 'distribuidor_agro',
      name: 'Plan Agro-Distribuidor',
      price: 80,
      currency: 'Bs',
      period: 'mes',
      description: 'Para importadores y grandes productores que ofrecen insumos al por mayor y menor.',
      features: [
        'Prioridad absoluta y cobertura multirregional',
        'Catálogo digital y subida ilimitada de insumos en PDF',
        'Acceso prioritario a leads calificados del área',
        'Asistencia comercial corporativa 24/7'
      ],
      popular: false
    }
  ];

  // Cargar proveedores comerciales guardados en el almacenamiento del navegador
  const loadProviders = () => {
    const defaultList = [
      {
        id: 'provider-mock-1',
        name: 'Vivero El Sol',
        firstName: 'Valeria',
        lastName: 'Mendoza',
        role: 'Distribuidor Autorizado',
        avatar: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=200&auto=format&fit=crop&q=80',
        experience: 'Plan Vivero Local (25 Bs/mes)',
        specialty: 'Abono NPK Balanceado & Humus',
        lifespanRecord: 'NPK 15-15-15, Humus',
        quote: 'Ofrecemos abonos e insumos orgánicos directamente para tu hogar.',
        status: 'Disponible por WhatsApp',
        location: 'Ciudad de México, México',
        institution: 'Proveedor Oficial FloraMetrics',
        addressOrZone: 'Av. Paseo de la Reforma 45',
        consultationHours: 'Lunes a Viernes: 09:00 - 18:00',
        contactMode: 'Contacto Directo por WhatsApp',
        whatsapp: '+5215512345678',
        category: 'npk',
        selectedPlan: {
          id: 'vivero_local',
          name: 'Plan Vivero Local',
          price: 25,
          currency: 'Bs'
        },
        gpsCoords: { lat: 19.4326, lng: -99.1332 },
        isApproved: true,
        hasPaid: true
      },
      {
        id: 'provider-mock-2',
        name: 'EcoJardín',
        firstName: 'Mateo',
        lastName: 'Álvarez',
        role: 'Distribuidor Autorizado',
        avatar: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=200&auto=format&fit=crop&q=80',
        experience: 'Plan Marketplace Pro (45 Bs/mes)',
        specialty: 'Sustrato orgánico de fibra de coco',
        lifespanRecord: 'Fibra de Coco, Perlita',
        quote: 'Sustratos de alta calidad para macetas y huertos urbanos.',
        status: 'Disponible por WhatsApp',
        location: 'Bogotá, Colombia',
        institution: 'Proveedor Oficial FloraMetrics',
        addressOrZone: 'Calle 85 #11-32, Zona Rosa',
        consultationHours: 'Lunes a Sábado: 10:00 - 19:00',
        contactMode: 'Contacto Directo por WhatsApp',
        whatsapp: '+573001234567',
        category: 'sustratos',
        selectedPlan: {
          id: 'marketplace_pro',
          name: 'Plan Marketplace Pro',
          price: 45,
          currency: 'Bs'
        },
        gpsCoords: { lat: 4.6097, lng: -74.0721 },
        isApproved: true,
        hasPaid: true
      },
      {
        id: 'provider-mock-3',
        name: 'Jardines de Santiago',
        firstName: 'Elena',
        lastName: 'Ríos',
        role: 'Distribuidor Autorizado',
        avatar: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=200&auto=format&fit=crop&q=80',
        experience: 'Plan Agro-Distribuidor (80 Bs/mes)',
        specialty: 'Insecticidas orgánicos y semillas',
        lifespanRecord: 'Jabón potásico, semillas',
        quote: 'Protección natural para tus plantas del hogar.',
        status: 'Disponible por WhatsApp',
        location: 'Santiago, Chile',
        institution: 'Proveedor Oficial FloraMetrics',
        addressOrZone: 'Av. Providencia 1200',
        consultationHours: 'Lunes a Viernes: 09:30 - 18:30',
        contactMode: 'Contacto Directo por WhatsApp',
        whatsapp: '+56912345678',
        category: 'plantas',
        selectedPlan: {
          id: 'distribuidor_agro',
          name: 'Plan Agro-Distribuidor',
          price: 80,
          currency: 'Bs'
        },
        gpsCoords: { lat: -33.4489, lng: -70.6693 },
        isApproved: true,
        hasPaid: true
      }
    ];
    try {
      const saved = localStorage.getItem('FLORAMETRICS_REGISTERED_PROVIDERS');
      if (saved) {
        return JSON.parse(saved);
      } else {
        localStorage.setItem('FLORAMETRICS_REGISTERED_PROVIDERS', JSON.stringify(defaultList));
        return defaultList;
      }
    } catch (err) {
      console.error('Error al cargar proveedores:', err);
      return defaultList;
    }
  };

  useEffect(() => {
    setProviders(loadProviders());
  }, []);

  // Función interactiva para obtener la ubicación por el API Geolocation del navegador
  const handleGetGps = () => {
    setGettingGps(true);
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError('La geolocalización no está soportada por tu navegador.');
      setGettingGps(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setGettingGps(false);
      },
      (error) => {
        console.error('Error obteniendo ubicación GPS:', error);
        let msg = 'No se pudo acceder a la geolocalización.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Permiso denegado. Activa los permisos de ubicación en tu navegador.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'La ubicación GPS no está disponible en este momento.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Tiempo de espera agotado. Vuelve a intentarlo.';
        }
        setGpsError(msg);
        setGettingGps(false);
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 0 }
    );
  };

  // Procesar registro de nuevo vivero / agrónomo comercial (Simplificado)
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg(null);

    const activePlan = plans.find(p => p.id === selectedPlanId) || plans[0];
    const newProvider = {
      id: `provider-${Date.now()}`,
      name: providerName,
      firstName: providerFirstName,
      lastName: providerLastName,
      role: 'Distribuidor Autorizado',
      avatar: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=200&auto=format&fit=crop&q=80',
      experience: `Plan: ${activePlan.name} (${activePlan.price} Bs/mes)`,
      specialty: 'Insumos por definir', // Se configurará después
      lifespanRecord: 'Pendiente de definir',
      quote: 'Establecimiento registrado en proceso de verificación.',
      status: 'Esperando Validación QR',
      location: 'Ubicación GPS Registrada',
      gpsCoords: gpsCoords.lat ? gpsCoords : null,
      institution: 'Proveedor Oficial FloraMetrics',
      addressOrZone: 'Dirección física por definir',
      consultationHours: 'Lunes a Sábado: 08:30 - 18:30',
      contactMode: 'Contacto Directo por WhatsApp',
      whatsapp: providerWhatsApp.startsWith('+') ? providerWhatsApp : `+${providerWhatsApp.replace(/\D/g, '')}`,
      category: 'npk',
      selectedPlan: {
        id: activePlan.id,
        name: activePlan.name,
        price: activePlan.price,
        currency: activePlan.currency
      },
      isApproved: false,
      hasPaid: false
    };

    try {
      const savedRaw = localStorage.getItem('FLORAMETRICS_REGISTERED_PROVIDERS');
      const savedList = savedRaw ? JSON.parse(savedRaw) : [];
      const updatedList = [newProvider, ...savedList];
      localStorage.setItem('FLORAMETRICS_REGISTERED_PROVIDERS', JSON.stringify(updatedList));
      setProviders([...updatedList, ...expertsCommunity.map(ex => ({ ...ex, whatsapp: '+5215512345678', category: ex.id === 1 || ex.id === 3 ? 'sustratos' : ex.id === 2 ? 'npk' : 'plantas' }))]);
      
      // Armar mensaje para WhatsApp al número del admin 63488086 (+59163488086)
      const gpsString = gpsCoords.lat && gpsCoords.lng 
        ? `${gpsCoords.lat}, ${gpsCoords.lng}` 
        : 'No proporcionada por GPS';
      const mapsLink = gpsCoords.lat && gpsCoords.lng
        ? `https://www.google.com/maps/search/?api=1&query=${gpsCoords.lat},${gpsCoords.lng}`
        : 'N/A';

      const message = `¡Hola, administrador de FloraMetrics! Quisiera registrarme como proveedor en la plataforma.

📋 *DATOS DE REGISTRO INICIAL*
• *Nombre*: ${providerFirstName} ${providerLastName}
• *Establecimiento*: ${providerName}
• *WhatsApp*: ${providerWhatsApp}
• *Plan Seleccionado*: ${activePlan.name} (${activePlan.price} Bs/mes)

📍 *UBICACIÓN GPS*
• *Coordenadas*: ${gpsString}
` + (gpsCoords.lat ? `• *Google Maps*: ${mapsLink}\n` : '') + `
(Nota: Configuraré la dirección física, especialidad de insumos y cobertura después de recibir el QR de pago).

Por favor, envíame el código QR de pago correspondiente para activar mi cuenta. ¡Muchas gracias!`;

      const adminNum = '59163488086';
      const waUrl = `https://api.whatsapp.com/send?phone=${adminNum}&text=${encodeURIComponent(message)}`;
      
      // Abrir en nueva pestaña
      window.open(waUrl, '_blank');
      
      setRegisterStep(3); // Avanzar a pantalla de confirmación exitosa
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
    // Solo mostrar en el directorio público si está verificado/aprobado (membresía pagada y validada por el admin)
    if (!p.isApproved) return false;
    
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
            onClick={() => {
              setShowRegisterForm(!showRegisterForm);
              setRegisterStep(1);
              // Limpiar datos
              setProviderFirstName('');
              setProviderLastName('');
              setProviderName('');
              setProviderWhatsApp('');
              setProviderLocation('');
              setProviderAddress('');
              setProviderNPK('');
              setGpsCoords({ lat: null, lng: null });
              setGpsError(null);
            }}
            className="mt-6 px-6 py-3 rounded-full bg-[#2E6C45] hover:bg-[#255838] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            {showRegisterForm ? 'Cerrar Formulario' : 'Registrar Establecimiento Comercial'}
          </button>
        )}
      </div>

      {/* PASO 1: SELECCIÓN DE PLANES */}
      {currentUser && showRegisterForm && registerStep === 1 && (
        <div className="max-w-4xl mx-auto bg-white border border-[#DCE7E0] rounded-3xl p-6 sm:p-8 shadow-lg mb-10 animate-fadeIn text-center space-y-6">
          <div>
            <span className="px-3.5 py-1.5 rounded-full bg-[#EBF5EF] text-[#2E6C45] font-extrabold text-[10px] border border-[#CDE5D5] inline-flex items-center gap-1.5 uppercase tracking-wider mb-2">
              <SparklesIcon size={10} className="text-[#2E6C45]" />
              <span>FloraMetrics Partner Program</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1D1F1D] font-['Plus_Jakarta_Sans'] tracking-tight">Únete a nuestra Red de Proveedores</h3>
            <p className="text-xs text-[#526057] mt-1.5 leading-relaxed max-w-xl mx-auto">
              Multiplica tus ventas locales posicionando tu vivero en el mapa inteligente. Elige un plan y el administrador se pondrá en contacto contigo por WhatsApp para tu código QR y configuración.
            </p>
          </div>

          {/* Planes en Bs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`border-2 rounded-2xl p-5 text-left flex flex-col justify-between cursor-pointer transition-all duration-300 relative ${
                  selectedPlanId === plan.id
                    ? 'border-[#2E6C45] bg-[#F4F9F6] shadow-md ring-2 ring-[#2E6C45]/15 scale-102'
                    : 'border-[#DCE7E0] bg-white hover:border-[#2E6C45]/40 hover:shadow-xs'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2E6C45] text-white font-extrabold text-[9px] px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    Recomendado
                  </span>
                )}
                
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-extrabold text-[#2E6C45] uppercase tracking-wider">{plan.name}</span>
                    <input
                      type="radio"
                      name="provider_plan"
                      checked={selectedPlanId === plan.id}
                      onChange={() => setSelectedPlanId(plan.id)}
                      className="w-4.5 h-4.5 text-[#2E6C45] border-[#DCE7E0] accent-[#2E6C45]"
                    />
                  </div>
                  
                  <p className="text-[10.5px] text-[#526057] leading-tight font-medium min-h-[44px]">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 py-1">
                    <span className="text-2xl font-mono font-extrabold text-[#1D1F1D]">{plan.price} {plan.currency}</span>
                    <span className="text-[9.5px] text-[#64746A]">/ {plan.period}</span>
                  </div>

                  <ul className="text-[9.5px] text-[#526057] space-y-1.5 border-t border-[#DCE7E0]/60 pt-3">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 font-semibold">
                        <CheckCircleIcon size={12} className="text-[#2E6C45] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Sección de Inspiración y Beneficios de Retención */}
          <div className="bg-[#F6FAF7] border border-[#DCE7E0] rounded-2xl p-5 text-left max-w-3xl mx-auto space-y-3.5">
            <h4 className="text-xs font-extrabold text-[#2E6C45] flex items-center gap-1.5 uppercase tracking-wider">
              <LeafIcon size={14} className="text-[#2E6C45]" />
              <span>Beneficios de pertenecer a la Red</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex gap-2.5 items-start">
                <span className="text-sm shrink-0">📈</span>
                <div>
                  <strong className="text-[#1D1F1D] block">Ventas Dirigidas por IA</strong>
                  <span className="text-[#526057] text-[10.5px]">Nuestra IA recomienda tu vivero a usuarios locales cuando detecta deficiencias NPK en sus plantas.</span>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="text-sm shrink-0">📍</span>
                <div>
                  <strong className="text-[#1D1F1D] block">Mapa Hortícola Geolocalizado</strong>
                  <span className="text-[#526057] text-[10.5px]">Aparecerás con tu ubicación exacta para que los horticultores de tu vecindario te encuentren.</span>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="text-sm shrink-0">💬</span>
                <div>
                  <strong className="text-[#1D1F1D] block">Clientes directos a tu WhatsApp</strong>
                  <span className="text-[#526057] text-[10.5px]">Las consultas y pedidos llegan directo a tu chat. Sin intermediarios, sin comisiones externas.</span>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="text-sm shrink-0">🤝</span>
                <div>
                  <strong className="text-[#1D1F1D] block">Alianza a Largo Plazo</strong>
                  <span className="text-[#526057] text-[10.5px]">Te proporcionamos estadísticas de búsquedas y apoyo técnico para catalogar tus insumos.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E8EEEA] flex gap-3 justify-center">
            <button
              onClick={() => setShowRegisterForm(false)}
              className="px-6 py-2.5 rounded-full border border-[#DCE7E0] text-[#526057] text-xs font-bold hover:bg-[#F9FBF9] transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={() => setRegisterStep(2)}
              className="px-6 py-2.5 rounded-full bg-[#2E6C45] hover:bg-[#255838] text-white text-xs font-extrabold shadow-sm transition-all active:scale-95 flex items-center gap-1"
            >
              <span>Elegir Plan & Registrar</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* PASO 2: FORMULARIO DE REGISTRO SIMPLIFICADO (FÁCIL Y SIN FRICCIÓN) */}
      {currentUser && showRegisterForm && registerStep === 2 && (
        <div className="max-w-xl mx-auto bg-white border border-[#DCE7E0] rounded-3xl p-6 sm:p-8 shadow-lg mb-10 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#E8EEEA] pb-3 mb-5">
            <div>
              <h3 className="text-lg font-extrabold text-[#1D1F1D] font-['Plus_Jakarta_Sans']">Datos de Registro</h3>
              <p className="text-[11px] text-[#526057] font-semibold">
                Plan Seleccionado: <strong className="text-[#2E6C45]">{plans.find(p => p.id === selectedPlanId)?.name} ({plans.find(p => p.id === selectedPlanId)?.price} Bs/mes)</strong>
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#EBF5EF] text-[#2E6C45] text-[10px] font-bold uppercase tracking-wider">
              Paso 2 de 3
            </span>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
            {/* Fila 1: Nombre y Apellido */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Nombre del Contacto</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Andrés"
                  value={providerFirstName}
                  onChange={(e) => setProviderFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-semibold focus:outline-none focus:border-[#2E6C45]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Apellido del Contacto</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Torrez Vargas"
                  value={providerLastName}
                  onChange={(e) => setProviderLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-semibold focus:outline-none focus:border-[#2E6C45]"
                />
              </div>
            </div>

            {/* Fila 2: Nombre Comercial y WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Nombre de tu Vivero / Negocio</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Vivero La Floresta"
                  value={providerName}
                  onChange={(e) => setProviderName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-semibold focus:outline-none focus:border-[#2E6C45]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Número de WhatsApp (Ej. 63488086)</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. 63488086"
                  value={providerWhatsApp}
                  onChange={(e) => setProviderWhatsApp(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-semibold focus:outline-none focus:border-[#2E6C45]"
                />
              </div>
            </div>

            {/* Sección de Geolocalización GPS */}
            <div className="p-4 rounded-2xl bg-[#F3F8F5] border border-[#CDE5D5] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-[#1D1F1D] block">Ubicación GPS de la Tienda</span>
                  <span className="text-[10px] text-[#526057] block leading-tight">
                    Obtén tus coordenadas para colocarte en el mapa interactivo del sistema.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleGetGps}
                  disabled={gettingGps}
                  className="px-4 py-2 rounded-xl bg-[#2E6C45] hover:bg-[#255838] text-white text-[10px] font-extrabold shadow-sm flex items-center gap-1.5 disabled:opacity-50 shrink-0 transition-all active:scale-95"
                >
                  {gettingGps ? (
                    <>
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Obteniendo...</span>
                    </>
                  ) : (
                    <>
                      <span>📍 Obtener GPS Actual</span>
                    </>
                  )}
                </button>
              </div>

              {gpsCoords.lat && gpsCoords.lng ? (
                <div className="p-3 bg-white rounded-xl border border-[#CDE5D5] flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5CCF8D] animate-pulse shrink-0" />
                    <span className="text-[10px] text-[#1D1F1D] font-mono">
                      Latitud: <strong>{gpsCoords.lat.toFixed(6)}</strong> | Longitud: <strong>{gpsCoords.lng.toFixed(6)}</strong>
                    </span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${gpsCoords.lat},${gpsCoords.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[9px] text-[#2E6C45] font-extrabold uppercase hover:underline shrink-0"
                  >
                    Ver en el Mapa
                  </a>
                </div>
              ) : (
                <div className="text-[10.5px] text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-semibold">
                  ⚠️ Presiona el botón de arriba para capturar tus coordenadas GPS. La geoposición es el dato más importante para el mapa.
                </div>
              )}

              {gpsError && (
                <div className="text-[9.5px] text-red-600 font-bold bg-red-50/50 p-2 rounded-lg border border-red-200/55">
                  {gpsError}
                </div>
              )}
            </div>

            {/* Aviso Amigable sobre el llenado posterior */}
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex gap-2.5 items-start text-[10.5px] text-blue-800 leading-snug">
              <span className="text-sm shrink-0">💡</span>
              <div>
                <strong className="block font-extrabold mb-0.5">Configuración posterior fácil:</strong>
                Los detalles de tu dirección física detallada, insumos en venta (NPK, tierras) y zona de cobertura los configurarás más tarde desde tu panel o te ayudará el administrador al validar tu pago QR.
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8EEEA] flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setRegisterStep(1)}
                className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all"
              >
                Volver
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#2E6C45] hover:bg-[#205031] text-white font-extrabold transition-all shadow-xs"
              >
                Registrar por WhatsApp
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PASO 3: CONFIRMACIÓN Y PANTALLA DE ÉXITO DE ENVÍO */}
      {currentUser && showRegisterForm && registerStep === 3 && (
        <div className="max-w-2xl mx-auto bg-white border border-[#DCE7E0] rounded-3xl p-8 shadow-lg mb-10 animate-fadeIn text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#EBF5EF] text-[#2E6C45] flex items-center justify-center mx-auto shadow-xs border border-[#CDE5D5]">
            <CheckCircleIcon size={32} className="text-[#2E6C45]" />
          </div>
          
          <div>
            <h3 className="text-2xl font-extrabold text-[#1D1F1D] font-['Plus_Jakarta_Sans']">¡Solicitud Registrada y Redirigida!</h3>
            <p className="text-xs text-[#526057] mt-2 leading-relaxed max-w-md mx-auto">
              Hemos abierto una nueva pestaña para enviar todos tus datos de registro directamente al número de WhatsApp del administrador (<strong className="text-[#1D1F1D]">+591 63488086</strong>).
            </p>
          </div>

          <div className="p-4 bg-[#F3F8F5] border border-[#DCE7E0] rounded-2xl max-w-sm mx-auto text-left space-y-2">
            <span className="text-[10px] font-extrabold text-[#2E6C45] uppercase tracking-wider block">Siguiente Paso</span>
            <p className="text-[11px] text-[#526057] font-semibold leading-normal">
              1. Envía el mensaje precargado en WhatsApp.<br />
              2. El administrador verificará tus datos y tu ubicación GPS.<br />
              3. Te pasará el código QR para pagar el <strong>{plans.find(p => p.id === selectedPlanId)?.name}</strong> por <strong>{plans.find(p => p.id === selectedPlanId)?.price} Bs/mes</strong>.<br />
              4. ¡Una vez pagado, tu vivero será aprobado y aparecerá verificado en el sistema!
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => {
                setShowRegisterForm(false);
                setRegisterStep(1);
              }}
              className="px-6 py-2.5 rounded-full bg-[#2E6C45] hover:bg-[#255838] text-white text-xs font-extrabold shadow-sm transition-all"
            >
              Ir al Directorio de Proveedores
            </button>
          </div>
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
