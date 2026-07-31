-- =========================================================================
-- SCRIPT DE ACTUALIZACIÓN DE BASE DE DATOS (SUPABASE)
-- FLORA METRICS - SOPORTE DE PERSISTENCIA PARA PROVEEDORES Y DIRECTORIÓ DE EXPERTOS
-- =========================================================================

-- 1. Añadir columnas a experts_directory para la gestión completa desde la PWA y el panel Admin
ALTER TABLE public.experts_directory 
  ADD COLUMN IF NOT EXISTS first_name TEXT,
  ADD COLUMN IF NOT EXISTS last_name TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'npk', -- 'npk' | 'sustratos' | 'plantas'
  ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false, -- Aprobación por administrador
  ADD COLUMN IF NOT EXISTS has_paid BOOLEAN DEFAULT false, -- Pago verificado por QR
  ADD COLUMN IF NOT EXISTS selected_plan_id TEXT DEFAULT 'vivero_local', -- 'vivero_local' | 'marketplace_pro' | 'distribuidor_agro'
  ADD COLUMN IF NOT EXISTS gps_lat NUMERIC, -- Latitud GPS
  ADD COLUMN IF NOT EXISTS gps_lng NUMERIC; -- Longitud GPS

-- 2. Asegurar que las políticas RLS permitan lectura pública e inserciones autenticadas/públicas
DROP POLICY IF EXISTS "El directorio de expertos es público para lectura" ON public.experts_directory;
CREATE POLICY "El directorio de expertos es público para lectura" 
  ON public.experts_directory FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserción de registros de proveedores" ON public.experts_directory;
CREATE POLICY "Permitir inserción de registros de proveedores" 
  ON public.experts_directory FOR INSERT WITH CHECK (true); -- Permitido para registros de visitantes/proveedores

DROP POLICY IF EXISTS "Permitir actualización de registros de proveedores al Admin" ON public.experts_directory;
CREATE POLICY "Permitir actualización de registros de proveedores al Admin" 
  ON public.experts_directory FOR ALL USING (true); -- O restringir por rol si es necesario

-- 3. Activar y aprobar a los expertos institucionales sembrados por defecto para el directorio público
UPDATE public.experts_directory 
SET is_approved = true, has_paid = true, category = 'sustratos' 
WHERE name IN ('Dra. Valeria Mendoza', 'Elena Ríos (CordyMaster)');

UPDATE public.experts_directory 
SET is_approved = true, has_paid = true, category = 'npk' 
WHERE name = 'Ing. Mateo Álvarez';

UPDATE public.experts_directory 
SET is_approved = true, has_paid = true, category = 'plantas' 
WHERE name = 'Dr. Carlos Sotomayor';

