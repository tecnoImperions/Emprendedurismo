import React, { useState } from 'react';
import { signInWithGoogle, supabase } from '../lib/supabaseClient';
import { getActiveUser, saveActiveUser } from '../data/userDatabase';
import { SparklesIcon, LeafIcon, CheckCircleIcon, UsersIcon } from './Icons';

export const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [spaceType, setSpaceType] = useState('Huerto en Balcón / Ventana');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  // Botón Principal: Continuar con Google directo en Supabase
  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const result = await signInWithGoogle();
      if (result && result.error) {
        setErrorMsg(`Error con Google: ${result.error.message}`);
        setLoading(false);
      } else {
        setSuccessMsg('Conectando con Google y Supabase...');
        // Supabase redirige automáticamente al flujo de Google
      }
    } catch (err) {
      setErrorMsg('No se pudo conectar con el servidor de Google/Supabase.');
      setLoading(false);
    }
  };

  // Botón Secundario: Registro / Ingreso por Correo Electrónico
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (supabase && supabase.auth) {
        if (tab === 'login') {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (error) throw error;
          setSuccessMsg('✅ ¡Sesión iniciada correctamente en Supabase!');
          setTimeout(() => {
            onLoginSuccess?.(data.user || { name: email.split('@')[0], email });
            onClose();
          }, 1200);
          return;
        } else {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName || email.split('@')[0],
                space_type: spaceType
              }
            }
          });
          if (error) throw error;
          setSuccessMsg('✅ ¡Cuenta creada y sincronizada con la base de datos!');
          setTimeout(() => {
            onLoginSuccess?.(data.user || { name: fullName || email.split('@')[0], email });
            onClose();
          }, 1400);
          return;
        }
      } else {
        // Fallback local robusto si están en modo desarrollo sin internet
        const localName = fullName || email.split('@')[0] || 'Usuario Huerto';
        const newUserObj = {
          id: `local_${Date.now()}`,
          name: localName,
          email: email || 'usuario@huerto.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          space: spaceType,
          role: 'Principiante en Huertos en Casa'
        };
        saveActiveUser(newUserObj);
        setSuccessMsg(`✅ ¡Sesión iniciada como ${localName}!`);
        setTimeout(() => {
          onLoginSuccess?.(newUserObj);
          onClose();
        }, 1200);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Ocurrió un error al procesar tu solicitud.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D1F1D]/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#FFFFFF] border border-[#DCE7E0] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F3F8F5] text-[#526057] hover:bg-[#E4ECE7] hover:text-[#1D1F1D] transition-all flex items-center justify-center text-lg font-bold"
          aria-label="Cerrar modal de acceso"
        >
          ✕
        </button>

        {/* Encabezado */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#2E6C45] text-white flex items-center justify-center mx-auto shadow-md mb-2">
            <LeafIcon size={24} />
          </div>
          <h3 className="text-2xl font-extrabold text-[#1D1F1D] tracking-tight font-['Plus_Jakarta_Sans']">
            {tab === 'login' ? 'Acceder a Mi Huerto' : 'Crear Mi Cuenta Gratis'}
          </h3>
          <p className="text-xs sm:text-sm text-[#526057]">
            {tab === 'login'
              ? 'Conéctate para sincronizar tus diagnósticos IA, riegos y cultivos en la nube de Supabase.'
              : 'Únete a la comunidad de huertos urbanos y obtén análisis botánicos ilimitados.'}
          </p>
        </div>

        {/* Pestañas super sencillas y entendibles */}
        <div className="flex rounded-2xl bg-[#F3F8F5] p-1.5 border border-[#E4ECE7] mb-6">
          <button
            onClick={() => { setTab('login'); setErrorMsg(null); }}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
              tab === 'login'
                ? 'bg-[#FFFFFF] text-[#2E6C45] shadow-sm'
                : 'text-[#526057] hover:text-[#1D1F1D]'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => { setTab('register'); setErrorMsg(null); }}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
              tab === 'register'
                ? 'bg-[#FFFFFF] text-[#2E6C45] shadow-sm'
                : 'text-[#526057] hover:text-[#1D1F1D]'
            }`}
          >
            Registrar Cuenta
          </button>
        </div>

        {/* Mensajes de feedback */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-semibold">
            ⚠️ {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 bg-[#EBF5EF] border border-[#2E6C45] rounded-2xl text-[#2E6C45] text-xs font-bold flex items-center gap-2">
            <CheckCircleIcon size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Botón Principal y más intuitivo: Google OAuth */}
        <div className="mb-6">
          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl border-2 border-[#DCE7E0] bg-[#FFFFFF] hover:bg-[#F9FBF9] hover:border-[#2E6C45] transition-all flex items-center justify-center gap-3 text-xs sm:text-sm font-extrabold text-[#1D1F1D] shadow-sm active:scale-95"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continuar con Google</span>
          </button>
        </div>

        {/* Separador */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-[#E4ECE7] flex-1" />
          <span className="text-[11px] font-bold text-[#59695F] uppercase tracking-wider">O con tu correo</span>
          <div className="h-px bg-[#E4ECE7] flex-1" />
        </div>

        {/* Formulario de Correo / Contraseña (Limpio sin botones complicados) */}
        <form onSubmit={handleEmailSubmit} className="space-y-3.5">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Tu Nombre o Apodo en la Comunidad</label>
              <input
                type="text"
                required
                placeholder="Ej. Juan Andrés / Huerto Balcón"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-medium focus:outline-none focus:border-[#2E6C45] focus:ring-1 focus:ring-[#2E6C45]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Correo Electrónico</label>
            <input
              type="email"
              required
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-medium focus:outline-none focus:border-[#2E6C45] focus:ring-1 focus:ring-[#2E6C45]"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Contraseña</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-medium focus:outline-none focus:border-[#2E6C45] focus:ring-1 focus:ring-[#2E6C45]"
            />
          </div>

          {tab === 'register' && (
            <div>
              <label className="block text-xs font-extrabold text-[#1D1F1D] mb-1">Tipo de Espacio de Cosecha</label>
              <select
                value={spaceType}
                onChange={(e) => setSpaceType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#DCE7E0] bg-[#F9FBF9] text-xs font-medium focus:outline-none focus:border-[#2E6C45] text-[#1D1F1D]"
              >
                <option value="Huerto en Balcón / Ventana">Huerto en Balcón o Ventana Soleada</option>
                <option value="Patio Urbano / Jardín Trasero">Patio Urbano o Jardín Trasero</option>
                <option value="Maceteros en Cocina / Interior">Maceteros Aromáticos en Cocina / Interior</option>
                <option value="Huerto Comunitario / Azotea">Huerto Comunitario o Azotea Verde</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-[#2E6C45] hover:bg-[#255838] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? 'Procesando...' : tab === 'login' ? 'ENTRAR A MI HUERTO EN SUPABASE 🌿' : 'CREAR CUENTA GRATIS Y SINCRONIZAR 🌱'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#E4ECE7] text-center text-[11px] text-[#59695F]">
          🔒 Datos protegidos en la base de datos oficial <strong>Supabase FloraMetrics</strong>.
        </div>
      </div>
    </div>
  );
};
