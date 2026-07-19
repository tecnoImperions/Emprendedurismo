-- =========================================================================
-- SCRIPT DE MIGRACIÓN Y ACTUALIZACIÓN DE BASE DE DATOS (SUPABASE)
-- FLORA METRICS - MÓDULO PICTURETHIS PREMIUM & COMUNIDAD DE HUERTOS
-- =========================================================================

-- 1. Añadir columnas de información PictureThis al Catálogo General de Plantas
ALTER TABLE public.plants_catalog 
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS toxicity text,
  ADD COLUMN IF NOT EXISTS propagation text,
  ADD COLUMN IF NOT EXISTS trivia text;

-- 2. Añadir columnas de información y bitácora al Jardín del Usuario
ALTER TABLE public.user_gardens 
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS toxicity text,
  ADD COLUMN IF NOT EXISTS propagation text,
  ADD COLUMN IF NOT EXISTS trivia text,
  ADD COLUMN IF NOT EXISTS notes jsonb DEFAULT '[]'::jsonb; -- Historial de notas locales

-- 3. Actualizar el Directorio de Especialistas y Distribuidores
ALTER TABLE public.experts_directory
  ADD COLUMN IF NOT EXISTS whatsapp_number text,
  ADD COLUMN IF NOT EXISTS price_level text DEFAULT '$$', -- Nivel de precios ($ / $$ / $$$)
  ADD COLUMN IF NOT EXISTS rating numeric(3,2) DEFAULT 4.8; -- Calificación estrellas

-- 4. Crear Tabla de Comentarios de la Comunidad por Planta (Calificación y Reseñas)
CREATE TABLE IF NOT EXISTS public.catalog_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  plant_catalog_id uuid NOT NULL REFERENCES public.plants_catalog(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_name text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment_text text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT catalog_comments_pkey PRIMARY KEY (id)
);

-- Habilitar Row Level Security (RLS) en comentarios
ALTER TABLE public.catalog_comments ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS para Comentarios (Lectura pública, Escritura autenticada)
CREATE POLICY "Permitir lectura de comentarios a cualquiera" 
  ON public.catalog_comments FOR SELECT USING (true);

CREATE POLICY "Permitir insertar comentarios a usuarios logueados" 
  ON public.catalog_comments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Crear Tabla de Estadísticas de Riego y Crecimiento (Bitácora Visual)
CREATE TABLE IF NOT EXISTS public.garden_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_garden_id uuid NOT NULL REFERENCES public.user_gardens(id) ON DELETE CASCADE,
  log_type text NOT NULL, -- 'watering' (riego) | 'height' (altura) | 'health' (salud)
  metric_value numeric NOT NULL, -- ml de agua, altura en cm, o score de salud de 0-100
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT garden_logs_pkey PRIMARY KEY (id)
);

-- Habilitar RLS en Logs
ALTER TABLE public.garden_logs ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS para Logs
CREATE POLICY "Permitir lectura de logs al dueño del huerto" 
  ON public.garden_logs FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_gardens 
      WHERE user_gardens.id = garden_logs.user_garden_id 
      AND user_gardens.user_id = auth.uid()
    )
  );

CREATE POLICY "Permitir insertar logs al dueño del huerto" 
  ON public.garden_logs FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_gardens 
      WHERE user_gardens.id = garden_logs.user_garden_id 
      AND user_gardens.user_id = auth.uid()
    )
  );

-- 6. Notas de Verificación de Historial (Cloudinary):
-- Tu tabla 'public.ai_scan_history' ya cuenta con el campo 'image_url text' (de tipo enlace externo).
-- Al subir el archivo mediante Cloudinary, el frontend recuperará el enlace seguro HTTPS (secure_url)
-- y lo insertará en dicho campo. El historial mostrará la imagen exacta y real que el usuario tomó.
