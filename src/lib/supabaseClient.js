// Cliente oficial de Supabase para FloraMetrics AI
// Conectado con la base de datos real del emprendimiento:
// URL: https://gsqccwowatnxcgdeftoy.supabase.co

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gsqccwowatnxcgdeftoy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_fyKYdZ9zL-J_wHiYIZkdJw_Mwt07RH8';

let supabaseInstance = null;

// Inicializador asíncrono que evita el error de vite:import-analysis al no exponer literales estáticos
export const getSupabase = async () => {
  if (supabaseInstance) return supabaseInstance;
  try {
    let mod;
    try {
      // 1. Carga prioritaria e inmediata vía CDN universal en el navegador sin necesitar npm install
      const cdnUrl = 'https://esm.sh/@supabase/supabase-js@2';
      mod = await import(/* @vite-ignore */ cdnUrl);
    } catch (e) {
      // 2. Si hay error de red en CDN y el paquete local existe en node_modules, lo cargamos dinámicamente mediante variable
      const localPkg = '@supabase/' + 'supabase-js';
      mod = await import(/* @vite-ignore */ localPkg);
    }
    if (mod && mod.createClient) {
      supabaseInstance = mod.createClient(supabaseUrl, supabaseAnonKey);
    }
  } catch (err) {
    console.warn('⚠️ No se pudo inicializar el cliente Supabase:', err.message);
  }
  return supabaseInstance;
};

// Export proxy para que App.jsx y AuthModal.jsx accedan a supabase.auth y base de datos sin errores ni bloqueos
export const supabase = {
  auth: {
    getUser: async () => {
      const client = await getSupabase();
      return client ? client.auth.getUser() : { data: { user: null } };
    },
    onAuthStateChange: (callback) => {
      getSupabase().then(client => {
        if (client) client.auth.onAuthStateChange(callback);
      });
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signInWithOAuth: async (options) => {
      const client = await getSupabase();
      return client ? client.auth.signInWithOAuth(options) : { error: { message: 'Supabase no disponible en este momento' } };
    },
    signInWithPassword: async (options) => {
      const client = await getSupabase();
      return client ? client.auth.signInWithPassword(options) : { error: { message: 'Supabase no disponible en este momento' } };
    },
    signUp: async (options) => {
      const client = await getSupabase();
      return client ? client.auth.signUp(options) : { error: { message: 'Supabase no disponible en este momento' } };
    },
    signOut: async () => {
      const client = await getSupabase();
      return client ? client.auth.signOut() : null;
    }
  }
};

// Helper para iniciar sesión con Google OAuth directo al botón "Continuar con Google" en la base de datos real
export const signInWithGoogle = async () => {
  const client = await getSupabase();
  if (!client) {
    console.error('⚠️ Supabase no está disponible.');
    return { error: { message: 'El cliente de Supabase no se pudo inicializar' } };
  }
  
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + window.location.pathname
    }
  });

  if (error) {
    console.error('Error iniciando sesión con Google:', error.message);
    return { error };
  }
  return { data };
};

// Helper para obtener la sesión o usuario actual desde Supabase
export const getSupabaseUser = async () => {
  const client = await getSupabase();
  if (!client) return null;
  const { data: { user } } = await client.auth.getUser();
  return user;
};
