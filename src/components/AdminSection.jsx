import React, { useState, useEffect } from 'react';
import { UserIcon, ClipboardIcon, CheckCircleIcon, UsersIcon, DatabaseIcon, SproutIcon, SparklesIcon } from './Icons';

// SVG Icons matching Bootstrap Icons style
const DashboardIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM7.5 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5zm-4.5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z"/>
  </svg>
);

const ShopIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.855a2.5 2.5 0 0 1-2.5 2.5H13v5.25a1.25 1.25 0 0 1-1.25 1.25h-7.5A1.25 1.25 0 0 1 3 13.75V8.725h-.5A2.5 2.5 0 0 1 0 6.225v-.855a1.5 1.5 0 0 1 .121-.626L2.97 1.35zM3.73 2 1.35 4.777a.5.5 0 0 0-.083.248v.43c0 .276.224.5.5.5H3v-2H3.73zm1.05 0V5h1.98V2H4.78zm2.98 0V5h1.98V2H7.76zm2.98 0V5h1.88a.5.5 0 0 0 .5-.5v-.43a.5.5 0 0 0-.083-.248L12.35 2h-1.61zM12 8.725V13.75a.25.25 0 0 1-.25.25h-7.5a.25.25 0 0 1-.25-.25V8.725H12zM2.225 6.225a1.5 1.5 0 0 0 2.775.775 1.5 1.5 0 0 0 2.775-.775 1.5 1.5 0 0 0 2.775.775 1.5 1.5 0 0 0 2.775-.775h.675v-.855a.5.5 0 0 0-.5-.5H2.225a.5.5 0 0 0-.5.5v.855h.5z"/>
  </svg>
);

const GraphIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.707L9.854 8.854a.5.5 0 0 1-.708 0L6.5 6.207l-3.646 3.647a.5.5 0 1 1-.708-.708l4-4a.5.5 0 0 1 .708 0L9 7.793l3.646-3.647H10.5a.5.5 0 0 1-.5-.5Z"/>
  </svg>
);

const GearIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
  </svg>
);

const LockIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
  </svg>
);

export const AdminSection = ({ onNavigateHome, onLogout }) => {
  const [providers, setProviders] = useState([]);
  const [editingProvider, setEditingProvider] = useState(null);
  const [editName, setEditName] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editWhatsApp, setEditWhatsApp] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editSpecialty, setEditSpecialty] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editHasPaid, setEditHasPaid] = useState(false);
  const [editPlanId, setEditPlanId] = useState('vivero_local');
  const [editGpsLat, setEditGpsLat] = useState('');
  const [editGpsLng, setEditGpsLng] = useState('');
  const [successMsg, setSuccessMsg] = useState(null);

  // Estadísticas del sitio
  const [stats, setStats] = useState({
    totalScans: 0,
    activeProviders: 0,
    pendingPayments: 0,
    estimatedMonthlyRevenue: 0
  });

  // Cargar proveedores desde LocalStorage (o inicializar con los mocks por defecto para control real)
  const loadProviders = () => {
    try {
      const saved = localStorage.getItem('FLORAMETRICS_REGISTERED_PROVIDERS');
      if (saved) {
        return JSON.parse(saved);
      } else {
        const defaultList = [
          {
            id: 'provider-mock-1',
            name: 'Vivero El Sol',
            role: 'Distribuidor Autorizado',
            avatar: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=200&auto=format&fit=crop&q=80',
            experience: 'Registro verificado FloraMetrics',
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
            isApproved: true,
            hasPaid: true
          },
          {
            id: 'provider-mock-2',
            name: 'EcoJardín',
            role: 'Distribuidor Autorizado',
            avatar: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=200&auto=format&fit=crop&q=80',
            experience: 'Registro verificado FloraMetrics',
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
            isApproved: true,
            hasPaid: true
          },
          {
            id: 'provider-mock-3',
            name: 'Jardines de Santiago',
            role: 'Distribuidor Autorizado',
            avatar: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=200&auto=format&fit=crop&q=80',
            experience: 'Registro verificado FloraMetrics',
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
            isApproved: true,
            hasPaid: true
          }
        ];
        localStorage.setItem('FLORAMETRICS_REGISTERED_PROVIDERS', JSON.stringify(defaultList));
        return defaultList;
      }
    } catch (err) {
      console.error('Error cargando proveedores para admin:', err);
      return [];
    }
  };

  const calculateStats = (providersList) => {
    let scansCount = 0;
    try {
      const historyRaw = localStorage.getItem('FLORAMETRICS_HISTORY_LOG');
      if (historyRaw) {
        scansCount = JSON.parse(historyRaw).length;
      }
    } catch (e) {
      console.error('Error loading history log:', e);
    }

    const activeCount = providersList.filter(p => p.isApproved).length;
    const pendingCount = providersList.filter(p => !p.isApproved).length;
    const revenue = providersList.filter(p => p.isApproved).reduce((acc, p) => {
      const price = p.selectedPlan ? p.selectedPlan.price : 25; // default 25 Bs
      return acc + price;
    }, 0);

    setStats({
      totalScans: scansCount,
      activeProviders: activeCount,
      pendingPayments: pendingCount,
      estimatedMonthlyRevenue: revenue
    });
  };

  useEffect(() => {
    const loaded = loadProviders();
    setProviders(loaded);
    calculateStats(loaded);
  }, []);

  // Guardar lista en LocalStorage
  const saveProvidersList = (list) => {
    try {
      localStorage.setItem('FLORAMETRICS_REGISTERED_PROVIDERS', JSON.stringify(list));
      setProviders(list);
      calculateStats(list);
    } catch (err) {
      console.error('Error guardando lista de proveedores:', err);
    }
  };

  // Aprobar / Activar Proveedor
  const handleApprove = (id) => {
    const updated = providers.map((p) => {
      if (p.id === id) {
        return { ...p, isApproved: true, status: 'Verificado & Disponible' };
      }
      return p;
    });
    saveProvidersList(updated);
    showNotification('Proveedor verificado y publicado correctamente.');
  };

  // Desactivar Proveedor
  const handleDeactivate = (id) => {
    const updated = providers.map((p) => {
      if (p.id === id) {
        return { ...p, isApproved: false, status: 'Pendiente de Aprobación' };
      }
      return p;
    });
    saveProvidersList(updated);
    showNotification('Proveedor puesto en estado suspendido.');
  };

  // Eliminar Proveedor
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este distribuidor del directorio?')) {
      const updated = providers.filter((p) => p.id !== id);
      saveProvidersList(updated);
      showNotification('Distribuidor eliminado del sistema.');
    }
  };

  // Iniciar edición
  const startEdit = (provider) => {
    setEditingProvider(provider);
    setEditName(provider.name || '');
    setEditFirstName(provider.firstName || '');
    setEditLastName(provider.lastName || '');
    setEditWhatsApp(provider.whatsapp || '');
    setEditLocation(provider.location || '');
    setEditSpecialty(provider.specialty || '');
    setEditAddress(provider.addressOrZone || '');
    setEditHasPaid(provider.hasPaid || false);
    setEditPlanId(provider.selectedPlan ? provider.selectedPlan.id : 'vivero_local');
    setEditGpsLat(provider.gpsCoords ? provider.gpsCoords.lat : '');
    setEditGpsLng(provider.gpsCoords ? provider.gpsCoords.lng : '');
  };

  // Guardar edición
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const plansInfo = {
      vivero_local: { name: 'Plan Vivero Local', price: 25 },
      marketplace_pro: { name: 'Plan Marketplace Pro', price: 45 },
      distribuidor_agro: { name: 'Plan Agro-Distribuidor', price: 80 }
    };
    const activePlan = plansInfo[editPlanId] || plansInfo['vivero_local'];

    const updated = providers.map((p) => {
      if (p.id === editingProvider.id) {
        return {
          ...p,
          name: editName,
          firstName: editFirstName,
          lastName: editLastName,
          whatsapp: editWhatsApp.startsWith('+') ? editWhatsApp : `+${editWhatsApp.replace(/\D/g, '')}`,
          location: editLocation,
          specialty: editSpecialty,
          addressOrZone: editAddress,
          hasPaid: editHasPaid,
          experience: `Plan: ${activePlan.name} (${activePlan.price} Bs/mes)`,
          selectedPlan: {
            id: editPlanId,
            name: activePlan.name,
            price: activePlan.price,
            currency: 'Bs'
          },
          gpsCoords: editGpsLat && editGpsLng ? { lat: parseFloat(editGpsLat), lng: parseFloat(editGpsLng) } : null
        };
      }
      return p;
    });
    saveProvidersList(updated);
    setEditingProvider(null);
    showNotification('Cambios guardados con éxito.');
  };

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] flex text-[#1D1F1D] font-['Plus_Jakarta_Sans'] antialiased">
      
      {/* 1. LEFT SIDEBAR (DESKTOP DEDICATED ADMIN PANEL) */}
      <aside className="w-64 bg-[#0B1E14] text-white flex flex-col justify-between shrink-0 border-r border-[#08150E] h-screen sticky top-0">
        <div>
          {/* Logo / Brand Header */}
          <div className="p-6 border-b border-[#142D1E] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5CCF8D] text-[#0B1E14] flex items-center justify-center font-extrabold shadow-sm shrink-0">
              <SproutIcon size={20} className="text-[#0B1E14]" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold tracking-tight text-white leading-tight">FloraMetrics</h1>
              <span className="text-[9px] text-[#8CBE9D] font-bold uppercase tracking-widest block mt-0.5">Control Central</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl bg-[#2E6C45] text-white text-xs font-bold transition-all text-left shadow-xs">
              <DashboardIcon size={16} className="text-white" />
              <span>Vista General</span>
            </button>
            <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-[#8CBE9D] hover:text-white hover:bg-[#1E3A27] text-xs font-bold transition-all text-left">
              <ShopIcon size={16} className="text-[#8CBE9D] hover:text-white" />
              <span>Gestión de Viveros</span>
            </button>
            <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-[#8CBE9D] hover:text-white hover:bg-[#1E3A27] text-xs font-bold transition-all text-left">
              <GraphIcon size={16} className="text-[#8CBE9D] hover:text-white" />
              <span>Registro de Escaneos</span>
            </button>
            <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-[#8CBE9D] hover:text-white hover:bg-[#1E3A27] text-xs font-bold transition-all text-left">
              <GearIcon size={16} className="text-[#8CBE9D] hover:text-white" />
              <span>Configuración</span>
            </button>
          </nav>
        </div>

        {/* Admin User Profile Bottom */}
        <div className="p-4 border-t border-[#142D1E] bg-[#07150D]">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" 
              alt="Admin" 
              className="w-10 h-10 rounded-xl object-cover border border-[#142D1E]"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-extrabold truncate text-white">Administrador Principal</p>
              <p className="text-[10px] text-[#8CBE9D] truncate">admin@florametrics.com</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full py-2.5 px-4 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-red-600/20"
          >
            Cerrar Sesión Admin
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA (SPACIOUS & CLEAN DESIGNED FOR DESKTOP SCREEN) */}
      <main className="flex-1 overflow-y-auto h-screen p-6 sm:p-8 lg:p-10">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#E1EAE4] pb-6">
          <div>
            <span className="px-3 py-1.5 rounded-full bg-[#EBF5EF] text-[#2E6C45] font-extrabold text-[10px] border border-[#CDE5D5] inline-flex items-center gap-1.5 uppercase tracking-wider">
              <LockIcon size={12} className="text-[#2E6C45]" />
              <span>Control de Administración Privado</span>
            </span>
            <h2 className="text-3xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans'] mt-3">
              Gestión de Distribuidores y Socios
            </h2>
            <p className="text-xs sm:text-sm text-[#526057] mt-1 font-medium">
              Modera registros de viveros locales, valida pagos por QR y edita los datos de contacto del sistema comercial de FloraMetrics.
            </p>
          </div>
          <button
            onClick={onNavigateHome}
            className="px-6 py-3 rounded-xl bg-white border border-[#2E6C45] hover:bg-[#2E6C45] text-[#2E6C45] hover:text-white font-extrabold text-xs transition-all active:scale-95 whitespace-nowrap self-start md:self-auto shadow-2xs"
          >
            Volver a la App Principal
          </button>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 bg-[#EBF5EF] border border-[#2E6C45] rounded-2xl text-[#2E6C45] text-xs font-bold flex items-center gap-2 max-w-md animate-fadeIn">
            <CheckCircleIcon size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* KPI Stats Grid - LARGER AND BOLDER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Scans */}
          <div className="bg-white border border-[#DCE7E0] rounded-2xl p-6 shadow-xs flex items-center gap-4 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-[#EBF5EF] text-[#2E6C45] flex items-center justify-center shrink-0">
              <ClipboardIcon size={24} className="text-[#2E6C45]" />
            </div>
            <div>
              <span className="text-[10px] text-[#526057] uppercase font-bold tracking-wider block">Escaneos IA Totales</span>
              <span className="text-3xl font-extrabold text-[#1D1F1D] font-mono mt-0.5 block">{stats.totalScans}</span>
            </div>
          </div>

          {/* Active Providers */}
          <div className="bg-white border border-[#DCE7E0] rounded-2xl p-6 shadow-xs flex items-center gap-4 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-[#EBF5EF] text-[#2E6C45] flex items-center justify-center shrink-0">
              <UsersIcon size={24} className="text-[#2E6C45]" />
            </div>
            <div>
              <span className="text-[10px] text-[#526057] uppercase font-bold tracking-wider block">Viveros Activos</span>
              <span className="text-3xl font-extrabold text-[#1D1F1D] font-mono mt-0.5 block">{stats.activeProviders}</span>
            </div>
          </div>

          {/* Pending Providers */}
          <div className="bg-white border border-[#DCE7E0] rounded-2xl p-6 shadow-xs flex items-center gap-4 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center justify-center shrink-0">
              <UserIcon size={24} className="text-yellow-700 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] text-[#526057] uppercase font-bold tracking-wider block">Validaciones QR</span>
              <span className="text-3xl font-extrabold text-yellow-700 font-mono mt-0.5 block">{stats.pendingPayments}</span>
            </div>
          </div>

          {/* Estimated Revenue */}
          <div className="bg-white border border-[#DCE7E0] rounded-2xl p-6 shadow-xs flex items-center gap-4 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-[#EBF5EF] text-[#2E6C45] flex items-center justify-center shrink-0 font-extrabold text-lg">
              $
            </div>
            <div>
              <span className="text-[10px] text-[#526057] uppercase font-bold tracking-wider block">Ingresos Directos</span>
              <span className="text-3xl font-extrabold text-[#2E6C45] font-mono mt-0.5 block">{stats.estimatedMonthlyRevenue} <span className="text-xs text-[#526057] font-sans font-bold">Bs/mes</span></span>
            </div>
          </div>
        </div>

        {/* MODAL POPUP DE EDICIÓN: SPACIOUS INPUTS AND EASY TO USE */}
        {editingProvider && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#0B1E14]/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white border border-[#DCE7E0] rounded-3xl p-8 shadow-2xl w-full max-w-2xl animate-scaleUp">
              <div className="flex items-center justify-between border-b border-[#E1EAE4] pb-4 mb-6">
                <h3 className="text-lg font-extrabold text-[#1D1F1D] font-['Plus_Jakarta_Sans']">Editar Datos del Proveedor</h3>
                <button 
                  onClick={() => setEditingProvider(null)}
                  className="text-gray-400 hover:text-gray-700 text-xl font-bold w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1.5 uppercase tracking-wider">Nombre del Contacto</label>
                    <input
                      type="text"
                      required
                      value={editFirstName}
                      onChange={(e) => setEditFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-semibold focus:outline-none focus:border-[#2E6C45] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1.5 uppercase tracking-wider">Apellido del Contacto</label>
                    <input
                      type="text"
                      required
                      value={editLastName}
                      onChange={(e) => setEditLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-semibold focus:outline-none focus:border-[#2E6C45] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1.5 uppercase tracking-wider">Nombre Comercial</label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-semibold focus:outline-none focus:border-[#2E6C45] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1.5 uppercase tracking-wider">WhatsApp</label>
                    <input
                      type="text"
                      required
                      value={editWhatsApp}
                      onChange={(e) => setEditWhatsApp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-semibold focus:outline-none focus:border-[#2E6C45] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1.5 uppercase tracking-wider">Plan Contratado</label>
                    <select
                      value={editPlanId}
                      onChange={(e) => setEditPlanId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-bold focus:outline-none focus:border-[#2E6C45] text-[#2E6C45]"
                    >
                      <option value="vivero_local">Plan Vivero Local (25 Bs)</option>
                      <option value="marketplace_pro">Plan Marketplace Pro (45 Bs)</option>
                      <option value="distribuidor_agro">Plan Agro-Distribuidor (80 Bs)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1.5 uppercase tracking-wider">Ubicación (Ciudad, País)</label>
                    <input
                      type="text"
                      required
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-semibold focus:outline-none focus:border-[#2E6C45] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1.5 uppercase tracking-wider">Coordenada GPS Latitud</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="Ej. -16.5023"
                      value={editGpsLat}
                      onChange={(e) => setEditGpsLat(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-semibold focus:outline-none focus:border-[#2E6C45] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1.5 uppercase tracking-wider">Coordenada GPS Longitud</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="Ej. -68.1504"
                      value={editGpsLng}
                      onChange={(e) => setEditGpsLng(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-semibold focus:outline-none focus:border-[#2E6C45] transition-all"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1.5 uppercase tracking-wider">Dirección / Referencias</label>
                    <input
                      type="text"
                      required
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-semibold focus:outline-none focus:border-[#2E6C45] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1.5 uppercase tracking-wider">Especialidad / Insumos</label>
                    <input
                      type="text"
                      value={editSpecialty}
                      onChange={(e) => setEditSpecialty(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-semibold focus:outline-none focus:border-[#2E6C45] transition-all"
                    />
                  </div>
                </div>

                {/* Checkbox Membresía Pagada */}
                <div className="flex items-center gap-3 p-4 bg-[#F3F8F5] border border-[#CDE5D5] rounded-2xl">
                  <input
                    type="checkbox"
                    id="editHasPaid"
                    checked={editHasPaid}
                    onChange={(e) => setEditHasPaid(e.target.checked)}
                    className="w-5 h-5 text-[#2E6C45] border-[#DCE7E0] rounded-lg focus:ring-[#2E6C45] accent-[#2E6C45] cursor-pointer"
                  />
                  <label htmlFor="editHasPaid" className="text-xs font-extrabold text-[#1D1F1D] cursor-pointer selection:bg-transparent">
                    Suscripción Pagada por QR (Verificar en cuenta de banco antes de marcar)
                  </label>
                </div>

                <div className="flex gap-3 justify-end pt-5 border-t border-[#E1EAE4]">
                  <button
                    type="button"
                    onClick={() => setEditingProvider(null)}
                    className="px-6 py-3 rounded-xl border border-[#DCE7E0] text-[#526057] text-xs font-extrabold hover:bg-gray-50 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#2E6C45] hover:bg-[#205031] text-white text-xs font-extrabold shadow-sm transition-all active:scale-95"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabla de Gestión Desktop */}
        <div className="bg-white border border-[#DCE7E0] rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E1EAE4] flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#1D1F1D]">Solicitudes y Directorio Activo ({providers.length})</h3>
            <span className="text-[10px] font-mono text-[#526057] bg-[#F3F8F5] border border-[#DCE7E0] px-3.5 py-1.5 rounded-full uppercase font-bold tracking-wider">
              Monetización en Bs (Planes de 25, 45 y 80 Bs)
            </span>
          </div>

          {providers.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#64746A]">
              No hay distribuidores registrados por el momento en el almacenamiento local.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F3F8F5] text-[#526057] font-extrabold uppercase border-b border-[#E1EAE4]">
                    <th className="p-4 w-[20%]">Distribuidor / Contacto</th>
                    <th className="p-4 w-[14%]">Ubicación</th>
                    <th className="p-4 w-[18%]">Dirección / Bodega</th>
                    <th className="p-4 w-[12%]">Teléfono WhatsApp</th>
                    <th className="p-4 w-[18%]">Plan & Especialidad</th>
                    <th className="p-4 w-[8%] text-center">Pago QR</th>
                    <th className="p-4 w-[8%] text-center">Estado</th>
                    <th className="p-4 w-[10%] text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1EAE4] text-[#1D1F1D]">
                  {providers.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F9FBF9] transition-all">
                      <td className="p-4 font-bold flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#EBF5EF] text-[#2E6C45] flex items-center justify-center font-bold shadow-2xs shrink-0">
                          <ShopIcon size={16} className="text-[#2E6C45]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="truncate max-w-[160px] block text-[#1D1F1D]">{p.name}</span>
                          {p.firstName && p.lastName && (
                            <span className="text-[10px] text-[#526057] font-semibold mt-0.5">
                              Propietario: {p.firstName} {p.lastName}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-[#526057] font-semibold">
                        <div className="flex flex-col">
                          <span>{p.location}</span>
                          {p.gpsCoords && p.gpsCoords.lat && p.gpsCoords.lng && (
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${p.gpsCoords.lat},${p.gpsCoords.lng}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[9px] text-[#2E6C45] font-extrabold uppercase hover:underline mt-0.5 flex items-center gap-0.5"
                            >
                              📍 GPS: {p.gpsCoords.lat.toFixed(4)}, {p.gpsCoords.lng.toFixed(4)}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-[#526057] font-medium leading-relaxed max-w-[200px] truncate">{p.addressOrZone || 'Sin dirección física'}</td>
                      <td className="p-4">
                        <a 
                          href={`https://wa.me/${p.whatsapp?.replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold text-[10px] transition-all shadow-2xs active:scale-95 whitespace-nowrap"
                        >
                          <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16" className="shrink-0">
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.294c-.202-.101-1.194-.588-1.378-.654-.185-.067-.32-.1-.454.1-.134.2-.52.654-.637.79-.116.135-.232.15-.434.05-2.01-1.008-3.348-2.07-4.148-3.447-.21-.362.21-.336.6-.112.12.07.24.137.31.18.067.042.108.068.156.168.048.1.024.19-.012.268-.036.078-.32.79-.392.966-.07.172-.14.15-.24.1-.102-.05-1.022-.376-1.947-1.202-.718-.641-1.202-1.433-1.343-1.673-.14-.24-.015-.369.106-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.4-.06-.1-.454-1.096-.622-1.5-.164-.403-.346-.349-.474-.356-.123-.007-.267-.008-.41-.008-.143 0-.376.054-.57.268-.194.214-.74.722-.74 1.76 0 1.037.75 2.04 1.05 2.182.3.144 1.48 2.263 3.585 3.172.5.215.89.345 1.194.442.502.16 1.025.137 1.41.08.43-.062 1.194-.489 1.362-.96.168-.472.168-.875.118-.96-.05-.084-.184-.134-.386-.235z"/>
                          </svg>
                          <span>{p.whatsapp}</span>
                        </a>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col text-[11px] leading-tight">
                          <span className="font-extrabold text-[#2E6C45]">
                            {p.selectedPlan ? p.selectedPlan.name : 'Plan Vivero Local'}
                          </span>
                          <span className="text-[10px] text-[#64746A] mt-0.5">
                            {p.specialty || 'General'}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold border ${
                          p.hasPaid
                            ? 'bg-[#EBF5EF] text-[#2E6C45] border-[#CDE5D5]'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {p.hasPaid ? 'Recibido' : 'Pendiente'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold border ${
                          p.isApproved
                            ? 'bg-[#EBF5EF] text-[#2E6C45] border-[#CDE5D5]'
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }`}>
                          {p.isApproved ? 'Verificado' : 'Pendiente'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {!p.isApproved ? (
                            <button
                              onClick={() => handleApprove(p.id)}
                              className="px-3 py-2 rounded-xl bg-[#2E6C45] hover:bg-[#205031] text-white font-extrabold text-[10px] transition-all shadow-2xs whitespace-nowrap active:scale-95"
                            >
                              Aprobar
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDeactivate(p.id)}
                              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[10px] transition-all shadow-2xs whitespace-nowrap active:scale-95"
                            >
                              Suspender
                            </button>
                          )}
                          <button
                            onClick={() => startEdit(p)}
                            className="px-3 py-2 rounded-xl bg-slate-600 hover:bg-slate-700 text-white font-extrabold text-[10px] transition-all shadow-2xs active:scale-95"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] transition-all shadow-2xs active:scale-95"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
