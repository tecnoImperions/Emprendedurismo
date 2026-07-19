import React, { useState, useEffect } from 'react';
import { UserIcon, ClipboardIcon, CheckCircleIcon, UsersIcon } from './Icons';

export const AdminSection = () => {
  const [providers, setProviders] = useState([]);
  const [editingProvider, setEditingProvider] = useState(null);
  const [editName, setEditName] = useState('');
  const [editWhatsApp, setEditWhatsApp] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editSpecialty, setEditSpecialty] = useState('');
  const [successMsg, setSuccessMsg] = useState(null);

  // Cargar proveedores desde LocalStorage
  const loadProviders = () => {
    try {
      const saved = localStorage.getItem('FLORAMETRICS_REGISTERED_PROVIDERS');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Error cargando proveedores para admin:', err);
      return [];
    }
  };

  useEffect(() => {
    setProviders(loadProviders());
  }, []);

  // Guardar lista en LocalStorage
  const saveProvidersList = (list) => {
    try {
      localStorage.setItem('FLORAMETRICS_REGISTERED_PROVIDERS', JSON.stringify(list));
      setProviders(list);
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
    showNotification('Proveedor aprobado y publicado con éxito.');
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
    showNotification('Proveedor puesto en estado pendiente.');
  };

  // Eliminar Proveedor
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este distribuidor del directorio?')) {
      const updated = providers.filter((p) => p.id !== id);
      saveProvidersList(updated);
      showNotification('🗑️ Distribuidor eliminado correctamente.');
    }
  };

  // Iniciar edición
  const startEdit = (provider) => {
    setEditingProvider(provider);
    setEditName(provider.name);
    setEditWhatsApp(provider.whatsapp);
    setEditLocation(provider.location);
    setEditSpecialty(provider.specialty || '');
  };

  // Guardar edición
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updated = providers.map((p) => {
      if (p.id === editingProvider.id) {
        return {
          ...p,
          name: editName,
          whatsapp: editWhatsApp.startsWith('+') ? editWhatsApp : `+${editWhatsApp.replace(/\D/g, '')}`,
          location: editLocation,
          specialty: editSpecialty
        };
      }
      return p;
    });
    saveProvidersList(updated);
    setEditingProvider(null);
    showNotification('💾 Cambios guardados con éxito.');
  };

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#E1EAE4] pb-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#EBF5EF] text-[#2E6C45] font-extrabold text-xs border border-[#CDE5D5] inline-flex items-center gap-1.5 uppercase tracking-wider">
            🔐 Control de Administración
          </span>
          <h2 className="text-3xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans'] mt-2">
            Gestión de Distribuidores y Socios
          </h2>
          <p className="text-xs sm:text-sm text-[#526057] mt-1">
            Modera los registros de viveros locales, edita sus datos de contacto de WhatsApp y gestiona el estado de sus suscripciones comerciales.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-[#EBF5EF] border border-[#2E6C45] rounded-2xl text-[#2E6C45] text-xs font-bold flex items-center gap-2 max-w-md animate-fadeIn">
          <CheckCircleIcon size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Editor Modal / Panel (Inline if editing) */}
      {editingProvider && (
        <div className="bg-white border border-[#DCE7E0] rounded-3xl p-6 shadow-lg mb-8 animate-fadeIn max-w-2xl">
          <h3 className="text-lg font-extrabold text-[#1D1F1D] mb-4">Editar Datos del Proveedor</h3>
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Nombre Comercial</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs focus:outline-none focus:border-[#2E6C45]"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">WhatsApp</label>
                <input
                  type="text"
                  required
                  value={editWhatsApp}
                  onChange={(e) => setEditWhatsApp(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs focus:outline-none focus:border-[#2E6C45]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Ubicación (Ciudad, País)</label>
                <input
                  type="text"
                  required
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs focus:outline-none focus:border-[#2E6C45]"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Especialidad / Productos</label>
                <input
                  type="text"
                  value={editSpecialty}
                  onChange={(e) => setEditSpecialty(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs focus:outline-none focus:border-[#2E6C45]"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setEditingProvider(null)}
                className="px-4 py-2 rounded-xl border border-[#DCE7E0] text-[#526057] text-xs font-bold hover:bg-[#F3F8F5]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#2E6C45] hover:bg-[#205031] text-white text-xs font-bold"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla de Gestión Desktop */}
      <div className="bg-white border border-[#DCE7E0] rounded-3xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#E1EAE4]">
          <h3 className="text-base font-extrabold text-[#1D1F1D]">Solicitudes y Directorio Activo ({providers.length})</h3>
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
                  <th className="p-4">Distribuidor</th>
                  <th className="p-4">Ubicación</th>
                  <th className="p-4">WhatsApp / Teléfono</th>
                  <th className="p-4">Especialidad</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1EAE4] text-[#1D1F1D]">
                {providers.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F9FBF9] transition-all">
                    <td className="p-4 font-bold flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#EBF5EF] text-[#2E6C45] flex items-center justify-center font-bold">
                        🏪
                      </div>
                      <span>{p.name}</span>
                    </td>
                    <td className="p-4 text-[#526057]">
                      {p.location}
                      <span className="block text-[10px] text-[#8C9C92]">{p.addressOrZone || 'Sin dirección física'}</span>
                    </td>
                    <td className="p-4 font-mono font-bold text-[#2E6C45]">
                      <a href={`https://wa.me/${p.whatsapp?.replace(/\+/g, '')}`} target="_blank" rel="noreferrer" className="hover:underline">
                        {p.whatsapp}
                      </a>
                    </td>
                    <td className="p-4 text-[#526057] max-w-xs truncate">{p.specialty || 'General'}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        p.isApproved
                          ? 'bg-[#EBF5EF] text-[#2E6C45] border border-[#CDE5D5]'
                          : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                      }`}>
                        {p.isApproved ? '🟢 Verificado' : '⏳ Pendiente'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                      {!p.isApproved ? (
                        <button
                          onClick={() => handleApprove(p.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#EBF5EF] hover:bg-[#CDE5D5] text-[#2E6C45] font-extrabold text-[10px] transition-all"
                        >
                          Aprobar
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDeactivate(p.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-extrabold text-[10px] transition-all"
                        >
                          Suspender
                        </button>
                      )}
                      <button
                        onClick={() => startEdit(p)}
                        className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-[10px] transition-all"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-[10px] transition-all"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
