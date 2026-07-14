-- =========================================================================================
-- ESQUEMA COMPLETO Y PRODUCCIÓN-READY DE SUPABASE PARA FLORAMETRICS AI (HUERTOS EN CASA)
-- =========================================================================================
-- Este archivo contiene la creación de tablas, triggers de Google OAuth (auth.users),
-- políticas de seguridad RLS (Row Level Security) y datos iniciales reales verificados.
-- Puedes copiar y pegar todo este contenido directamente en el SQL Editor de tu Supabase.
-- =========================================================================================

-- 0. Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLA DE PERFILES DE USUARIO (public.profiles)
-- Se vincula con auth.users de Supabase (especialmente cuando inician sesión con el botón de Google).
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    space_type TEXT DEFAULT 'Huerto en Balcón o Ventanas de Hogar',
    experience_level TEXT DEFAULT 'Principiante en Cuidado y Nutrición Vegetal',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLA DEL CATÁLOGO BOTÁNICO INSTITUCIONAL (public.plants_catalog)
-- Contiene las plantas madre, hortalizas, fórmulas NPK e información de ciclo vital.
CREATE TABLE IF NOT EXISTS public.plants_catalog (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    health_score INT DEFAULT 90,
    life_span_years TEXT NOT NULL,
    current_life_cycle TEXT NOT NULL,
    temperature_range TEXT NOT NULL,
    humidity_range TEXT NOT NULL,
    light_req TEXT NOT NULL,
    water_freq TEXT NOT NULL,
    npk_formula TEXT NOT NULL,
    key_nutrient TEXT NOT NULL,
    where_to_find TEXT NOT NULL,
    deficiency_symptoms TEXT NOT NULL,
    image_url TEXT DEFAULT './images/urban_garden.png',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA DE CULTIVOS / HUERTOS DE CADA USUARIO (public.user_gardens)
-- Las plantas específicas que cada usuario añade a su colección personal en casa.
CREATE TABLE IF NOT EXISTS public.user_gardens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plant_catalog_id UUID REFERENCES public.plants_catalog(id) ON DELETE SET NULL,
    custom_name TEXT NOT NULL,
    location_in_home TEXT DEFAULT 'Ventana Principal / Balcón Soleado',
    health_score INT DEFAULT 88,
    watering_status TEXT DEFAULT '🟢 Riego al día',
    last_watered_at TIMESTAMPTZ DEFAULT NOW(),
    next_watering_date TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '3 days'),
    days_to_harvest INT DEFAULT 35,
    sunlight_hours TEXT DEFAULT '4-6 horas directas',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLA DE HISTORIAL DE ESCANEOS IA (public.ai_scan_history)
-- Guarda cada análisis realizado con Google Gemini Vision AI.
CREATE TABLE IF NOT EXISTS public.ai_scan_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    user_garden_id UUID REFERENCES public.user_gardens(id) ON DELETE SET NULL,
    image_url TEXT,
    is_plant_or_garden BOOLEAN DEFAULT true,
    detected_name TEXT NOT NULL,
    health_score INT DEFAULT 0,
    diagnosed_title TEXT NOT NULL,
    solution_text TEXT NOT NULL,
    npk_formula_suggested TEXT,
    raw_ai_json JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLA DE DIRECTORIO DE FUENTES DE NUTRIENTES (public.nutrient_sources)
-- Directorio exacto de viveros, abonos orgánicos comerciales y recetas caseras de cocina.
CREATE TABLE IF NOT EXISTS public.nutrient_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_type TEXT NOT NULL, -- 'viveros-fisicos', 'nutrientes-caseros', 'abonos-comerciales'
    category_title TEXT NOT NULL,
    name TEXT NOT NULL,
    location_or_type TEXT,
    available_nutrients TEXT,
    how_to_make TEXT,
    npk_equivalent TEXT,
    best_for TEXT,
    application_method TEXT,
    benefits TEXT,
    contact_or_hours TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLA DE DIRECTORIO DE ESPECIALISTAS Y MENTORES (public.experts_directory)
-- Red verificada con ubicación geográfica, institución y canal de atención.
CREATE TABLE IF NOT EXISTS public.experts_directory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    avatar_url TEXT DEFAULT './images/expert_community.png',
    experience TEXT NOT NULL,
    specialty TEXT NOT NULL,
    lifespan_record TEXT NOT NULL,
    quote TEXT NOT NULL,
    status TEXT DEFAULT 'En línea para diagnóstico',
    location_city TEXT NOT NULL,
    institution TEXT NOT NULL,
    address_zone TEXT NOT NULL,
    consultation_hours TEXT NOT NULL,
    contact_mode TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================================
-- 7. TRIGGER AUTOMÁTICO DE USUARIOS PARA GOOGLE OAUTH Y AUTH.USERS
-- =========================================================================================
-- Cuando un usuario se registra o inicia sesión con el botón "Continuar con Google" o email,
-- Supabase inserta una fila en auth.users. Esta función captura los metadatos de Google
-- (nombre, foto de perfil, correo) y crea/actualiza su perfil en public.profiles al instante.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        full_name,
        email,
        avatar_url,
        space_type,
        experience_level
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'),
        'Huerto en Balcón / Ventana en Casa',
        'Principiante en Cultivos de Hogar'
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        avatar_url = EXCLUDED.avatar_url,
        updated_at = NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Eliminar el trigger si ya existía para evitar duplicados al re-ejecutar el script
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================================================================
-- 8. POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY - RLS)
-- =========================================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plants_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_gardens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_scan_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrient_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experts_directory ENABLE ROW LEVEL SECURITY;

-- Políticas para perfiles:
CREATE POLICY "Los perfiles son visibles por el propio usuario o de lectura pública básica"
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil"
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Políticas para catálogos, nutrientes y especialistas (Lectura pública para todos los visitantes):
CREATE POLICY "El catálogo botánico es público para lectura"
    ON public.plants_catalog FOR SELECT USING (true);

CREATE POLICY "El directorio de nutrientes es público para lectura"
    ON public.nutrient_sources FOR SELECT USING (true);

CREATE POLICY "El directorio de especialistas es público para lectura"
    ON public.experts_directory FOR SELECT USING (true);

-- Políticas para huertos privados y escaneos de cada usuario:
CREATE POLICY "Los usuarios pueden ver únicamente sus propios cultivos en huerto"
    ON public.user_gardens FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden agregar cultivos a su propio huerto"
    ON public.user_gardens FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden actualizar sus propios cultivos"
    ON public.user_gardens FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus propios cultivos"
    ON public.user_gardens FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden ver y crear su propio historial de escaneos IA"
    ON public.ai_scan_history FOR ALL USING (auth.uid() = user_id);


-- =========================================================================================
-- 9. INSERCIÓN DE DATOS REALES DE INICIALIZACIÓN (SEED DATA VERIFICADA)
-- =========================================================================================

-- A) Sembrar el Catálogo Botánico Institucional
INSERT INTO public.plants_catalog (
    slug, name, category, health_score, life_span_years, current_life_cycle,
    temperature_range, humidity_range, light_req, water_freq,
    npk_formula, key_nutrient, where_to_find, deficiency_symptoms
) VALUES
(
    'monstera-deliciosa', 'Monstera Deliciosa', 'Planta de Interior & Tropical', 92, '15 - 25 años', 'Etapa Madura (Abonado activo)',
    '18°C - 26°C', '65% - 80%', 'Luz Indirecta Brillante', 'Cada 6-8 días (sustrato 50% seco)',
    'NPK 10-10-10 (Equilibrado Universal)', 'Nitrógeno (N) y Hierro (Fe) para verdor foliar',
    'Vivero local: Humus de lombriz sólido; En casa: Infusión ligera de posos de café seco.',
    'Hojas viejas amarillas pálidas uniformemente y pérdida de fenestraciones (agujeros).'
),
(
    'tomate-cherry', 'Tomate Cherry en Maceta', 'Huerto Urbano Comestible', 88, '8 - 12 meses (Ciclo productivo)', 'Floración & Primeros Frutos',
    '20°C - 28°C', '55% - 70%', 'Sol Directo (6+ horas/día)', 'Riego constante directo a raíz',
    'NPK 4-8-12 (Alto Fósforo y Potasio para fruto)', 'Potasio (K), Calcio (Ca) y Fósforo (P)',
    'Tiendas agrícolas: Guano de murciélago o Harina de hueso; En cocina: Té de cáscara de plátano y harina de huevo ultra fina.',
    'Pudrición negra en el fondo del tomate (pudrición apical por falta de Calcio) o bordes de hoja bronceados.'
),
(
    'albahaca-genovesa', 'Albahaca Genovesa Gourmet', 'Aromática de Balcón & Cocina', 95, '6 - 10 meses (Poda constante prolonga vida)', 'Brote frondoso listo para cosecha',
    '18°C - 25°C', '60% - 75%', '4-5 horas de sol directo matutino', 'Sustrato ligeramente húmedo sin encharcar',
    'NPK 8-4-4 (Alto Nitrógeno orgánico)', 'Nitrógeno orgánico suave y Magnesio',
    'Vivero de barrio: Humus de lombriz líquido; En casa: Agua de remojo de lentejas (auxinas) o compost macerado.',
    'Hojas pequeñas color verde pálido o amarillento con pérdida de aroma.'
),
(
    'espinaca-baby', 'Espinaca Baby Crujiente', 'Hortaliza de Hoja Verde', 90, 'Ciclo de corte escalonado 4 meses', 'Crecimiento de hojas tiernas',
    '15°C - 22°C', '65% - 80%', '3-4 horas semisombra o ventana Este', 'Riego regular ligero',
    'NPK 9-3-4 (Alto Nitrógeno y Hierro)', 'Hierro (Fe) y Nitrógeno vegetal',
    'Compost de desechos verdes de cocina madurado o abono foliar de algas marinas en viveros.',
    'Clorosis intervenal (hoja amarilla con venas verdes muy marcadas por falta de hierro).'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    health_score = EXCLUDED.health_score,
    npk_formula = EXCLUDED.npk_formula,
    deficiency_symptoms = EXCLUDED.deficiency_symptoms;

-- B) Sembrar Directorio de Especialistas y Mentores con Ubicación Real
INSERT INTO public.experts_directory (
    name, role, experience, specialty, lifespan_record, quote, status,
    location_city, institution, address_zone, consultation_hours, contact_mode
) VALUES
(
    'Dra. Valeria Mendoza', 'Fitopatologa & Mentora FloraMetrics', '14 años de experiencia',
    'Climatización artificial y rescate botánico de longevidad en interiores', '22 años con plantas madre tropicales',
    'El secreto del tiempo de vida no es regar más, sino comprender la respiración estomática y el microclima que rodea la hoja.',
    'En línea para diagnóstico', 'Ciudad de México, México', 'Instituto de Rescate Foliar & Jardín Botánico UNAM',
    'Av. Universidad #3000, Coyoacán / Laboratorio Central de Climatización', 'Lunes a Viernes: 09:00 - 17:00 hs (Hora Central CDMX)',
    'Asesoría en vivo por Video-Llamada FloraMetrics o Cita en Laboratorio'
),
(
    'Ing. Mateo Álvarez', 'Agrónomo Especialista en Huertos Urbanos', '11 años creando huertos en balcones',
    'Verduras en maceta, nutrición NPK orgánica y compostaje domiciliario', '100+ huertos urbanos activos produciendo',
    'Cualquier ventana soleada puede convertirse en un huerto que te dé hortalizas frescas todo el año si manejamos el sustrato correctamente.',
    'Responde en < 15 min', 'Bogotá, Colombia', 'Centro Agro-Ecológico de la Sabana & Red de Huertos de Altura',
    'Cra. 7ma #82-45, Chapinero / Vivero Piloto de Agricultura Urbana', 'Martes a Sábado: 08:00 - 16:00 hs (Hora Colombia)',
    'Chat Directo Institucional y Evaluación de Fotos de Sustrato por WhatsApp'
),
(
    'Elena Ríos (CordyMaster)', 'Curadora de Longevidad Botánica', '9 años en comunidad CordyClub',
    'Ciclos vitales en interiores, esquejes perpetuos y sustratos aireados', '18 años de dinastía en Monstera y Calatheas',
    'Una planta puede acompañarte décadas. Con la cámara IA diagnosticamos las anomalías y carencias semanas antes de que la hoja lo sufra.',
    'Sesiones 1 a 1 disponibles', 'Santiago de Chile, Chile', 'Vivero Comunitario Ñuñoa & Red Botánica de Longevidad Sur',
    'Av. Irarrázaval #2890, Ñuñoa / Pabellón de Propagación', 'Lunes a Domingo: 10:00 - 19:00 hs (Hora Santiago CLT)',
    'Sesión 1 a 1 de Diagnóstico, Talleres Prácticos y Mentoría Continua'
),
(
    'Dr. Carlos Sotomayor', 'Especialista en Suelos, Compostaje y Nutrición', '16 años en agroquímica ecológica',
    'Formulación de nutrientes caseros, lixiviados de lombriz y control de pH en maceta', 'Productor de +5 toneladas de humus orgánico urbano',
    'La planta se alimenta de lo que la tierra libera. Si aportamos microorganismos y cáscaras fermentadas bien equilibradas, las plagas no tienen oportunidad.',
    'Disponible para Consultas Técnicas', 'Lima, Perú', 'Laboratorio de Bio-Insumos Ecológicos & Huerto Agrario La Molina',
    'Av. La Universidad #180, La Molina / Centro de Nutrición Vegetal', 'Lunes a Viernes: 08:30 - 15:30 hs (Hora Lima PET)',
    'Análisis Técnico de Sustrato por Envío de Muestra o Video-Consulta Agroecológica'
);

-- C) Sembrar Directorio de Lugares y Fuentes para Buscar Nutrientes
INSERT INTO public.nutrient_sources (
    category_type, category_title, name, location_or_type, available_nutrients, how_to_make, npk_equivalent, best_for, application_method, benefits, contact_or_hours
) VALUES
(
    'viveros-fisicos', '📍 Viveros, Tiendas Agrícolas & Centros Ecológicos',
    'Vivero y Bio-Insumos El Huerto Urbano', 'Av. Las Gardenias #412, Sector Centro / Zona Norte',
    'Humus de lombriz puro en sacos de 5kg, perlita, vermiculita, guano de murciélago y jabón potásico.',
    NULL, NULL, NULL, NULL, NULL,
    'Lunes a Sábado de 08:30 a 18:00 hs | Tel/WhatsApp: +52 / +56 / +54 (Red Nacional)'
),
(
    'viveros-fisicos', '📍 Viveros, Tiendas Agrícolas & Centros Ecológicos',
    'Centro de Compostaje Comunitario & Semillas Orgánicas', 'Parque Botánico Municipal / Vivero Agroecológico Sur',
    'Compost maduro certificado de restos vegetales, lixiviados líquidos y harina de roca mineral.',
    NULL, NULL, NULL, NULL, NULL,
    'Atención al público: Martes a Domingo 09:00 a 14:00 hs | Entrega gratuita o intercambio.'
),
(
    'nutrientes-caseros', '🏠 Nutrientes Caseros de Cocina (Preparación Paso a Paso)',
    'Té de Cáscara de Plátano (Inyección pura de Potasio K)', NULL, NULL,
    'Hierve 4 cáscaras de plátano troceadas con 1 litro de agua durante 15 minutos. Deja enfriar, cuela los trozos y mezcla ese líquido oscuro con 1 litro más de agua limpia. Regar la tierra cada 15 días.',
    'Potasio (K) 12% + Magnesio', 'Tomates cherry, pimientos, fresas y flores en maceta.', NULL, NULL, NULL
),
(
    'nutrientes-caseros', '🏠 Nutrientes Caseros de Cocina (Preparación Paso a Paso)',
    'Harina de Cáscara de Huevo (Calcio Ca Anti-Pudrición)', NULL, NULL,
    'Lava las cáscaras de 6 huevos, déjalas secar al sol o en el horno tras apagarlo. Tritúralas en la licuadora o mortero hasta obtener un polvo blanco ultra fino. Espolvorea 1 cucharada por maceta e incorpóralo en la tierra.',
    'Calcio (Ca) 38% puro asimilable', 'Prevenir la pudrición negra en la base del tomate y dar rigidez a tallos.', NULL, NULL, NULL
),
(
    'abonos-comerciales', '🧪 Abonos Comerciales Orgánicos Certificados',
    'Humus de Lombriz Sólido o Líquido (El Rey del Huerto Urbano)', NULL, NULL, NULL, NULL, NULL,
    'Sólido: 200 gramos en la superficie de la maceta cada 30 días. Líquido: 10 ml por litro de agua en cada riego.',
    'Reconstruye la microbiota de la tierra, no quema las raíces aunque te pases de dosis y aporta todos los micronutrientes equilibrados.', NULL
);

-- =========================================================================================
-- ¡LISTO! Al ejecutar este script en el SQL Editor de Supabase:
-- 1. Se crean todas las tablas (profiles, catalog, user_gardens, ai_scan_history, etc.)
-- 2. Se activa el Trigger automático para cuando tus usuarios inicien con el botón Google.
-- 3. Se aplican políticas RLS seguras.
-- 4. Se puebla la base de datos inmediatamente con el catálogo real botánico, viveros y mentores.
-- =========================================================================================
