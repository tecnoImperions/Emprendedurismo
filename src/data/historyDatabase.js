// Base de datos y gestor de Historial Institucional de Diagnósticos FloraMetrics
// Almacena cada escaneo botánico con su imagen subida a Cloudinary, diagnóstico y recomendaciones de NPK.

export const defaultHistoryRecords = [
  {
    id: 'history-101',
    date: '2026-07-12 a las 10:15 AM',
    plantName: 'Tomate Cherry Orgánico',
    scientificName: 'Solanum lycopersicum var. cerasiforme',
    healthScore: 92,
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&auto=format&fit=crop&q=80',
    cloudinaryId: 'demo_tomate_cherry_01',
    diagnosisTitle: 'Follaje vigoroso en etapa de floración activa para cosecha oportuna',
    diagnosisSolution: 'Mantener humedad en la zona radicular sin mojar las hojas. Añadir compost o humus en la base.',
    nutrientsRequired: {
      npk: 'Potasio (K) y Calcio para evitar pudrición apical',
      homemadeSource: 'Té de cáscaras de plátano hervidas + 1 cucharada de cáscara de huevo molida en el sustrato.',
      commercialSource: 'Abono soluble orgánico NPK 5-10-15 especial para hortalizas de fruto.'
    },
    care: {
      light: 'Sol directo brillante 6+ horas diarias.',
      water: 'Riego diario en época cálida (cada mañana temprano).',
      soil: 'Sustrato rico en materia orgánica con excelente drenaje y perlita.',
      fertilizer: 'Aplicar abono rico en potasio cada 15 días durante floración y fructificación.'
    },
    climate: {
      temperature: '20°C - 28°C ideal en balcón o patio',
      waterFreq: 'Diario en verano / Cada 2 días en otoño'
    },
    lifeSpanYears: 'Ciclo productivo anual (6-8 meses hasta cosecha completa)'
  },
  {
    id: 'history-102',
    date: '2026-07-08 a las 04:30 PM',
    plantName: 'Albahaca Genovesa de Cocina',
    scientificName: 'Ocimum basilicum',
    healthScore: 88,
    imageUrl: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=600&auto=format&fit=crop&q=80',
    cloudinaryId: 'demo_albahaca_cocina_02',
    diagnosisTitle: 'Hojas tiernas listas para cosecha parcial y despunte apical',
    diagnosisSolution: 'Pinzar los brotes superiores con las yemas de los dedos para estimular el crecimiento lateral frondoso y evitar la floración prematura.',
    nutrientsRequired: {
      npk: 'Nitrógeno (N) suave para desarrollo constante de hojas verdes',
      homemadeSource: 'Infusión o macerado de restos de café molido seco (1 cucharadita por maceta).',
      commercialSource: 'Fertilizante líquido orgánico o extracto de algas marinas para aromáticas.'
    },
    care: {
      light: 'Luz solar directa matutina o sol filtrado en ventana (4-5 horas).',
      water: 'Regar cuando el sustrato superior esté seco, evitando mojar el tallo.',
      soil: 'Sustrato liviano y aireado con compost y fibra de coco.',
      fertilizer: 'Abono suave de liberación lenta mensual.'
    },
    climate: {
      temperature: '18°C - 25°C ideal en interiores o ventanas',
      waterFreq: 'Cada 2 o 3 días según temperatura interior'
    },
    lifeSpanYears: 'Ciclo anual o bienal en interior protegido'
  },
  {
    id: 'history-103',
    date: '2026-07-01 a las 11:00 AM',
    plantName: 'Monstera Deliciosa (Costilla de Adán)',
    scientificName: 'Monstera deliciosa',
    healthScore: 94,
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80',
    cloudinaryId: 'demo_monstera_interior_03',
    diagnosisTitle: 'Excelente desarrollo foliar con fenestraciones definidas',
    diagnosisSolution: 'Limpiar el polvo de las hojas con un paño húmedo de agua sin cal para favorecer la fotosíntesis en interior.',
    nutrientsRequired: {
      npk: 'Balance NPK orgánico 10-10-10 para follaje verde oscuro',
      homemadeSource: 'Té de humus de lombriz aplicado en el agua de riego una vez por mes.',
      commercialSource: 'Abono follaje verde para plantas tropicales de interior.'
    },
    care: {
      light: 'Luz brillante indirecta sin rayos directos del sol del mediodía.',
      water: 'Regar moderadamente dejando secar los primeros 4 cm de tierra.',
      soil: 'Mezcla aereada con corteza de pino, perlita y turba.',
      fertilizer: 'Fertilizar mensualmente solo en primavera y verano.'
    },
    climate: {
      temperature: '18°C - 27°C con humedad ambiental mayor al 50%',
      waterFreq: 'Cada 5 a 7 días en interior'
    },
    lifeSpanYears: '15+ a 30+ años como planta perenne longeva de interior'
  }
];

/**
 * Obtiene todos los historiales de diagnóstico del usuario (desde localStorage o los por defecto)
 */
export const getScanHistory = () => {
  try {
    const saved = localStorage.getItem('FLORAMETRICS_HISTORY_LOG');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error al cargar historial de escaneos:', e);
  }
  return defaultHistoryRecords;
};

/**
 * Guarda un nuevo resultado de diagnóstico en el historial (al principio de la lista)
 */
export const saveScanToHistory = (scanData) => {
  try {
    const currentList = getScanHistory();
    const newRecord = {
      id: `history-${Date.now()}`,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) + ' a las ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      plantName: scanData.name || scanData.plantName || 'Planta Escaneada',
      scientificName: scanData.scientificName || 'Especie identificada por IA',
      healthScore: scanData.healthScore || 90,
      imageUrl: scanData.imageUrl || 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&auto=format&fit=crop&q=80',
      cloudinaryId: scanData.cloudinaryId || `cloud_${Date.now()}`,
      diagnosisTitle: scanData.title || scanData.diagnosisTitle || 'Análisis botánico completado con éxito',
      diagnosisSolution: scanData.solution || scanData.diagnosisSolution || 'Revisar humedad del sustrato y mantener monitoreo visual continuo con la cámara.',
      nutrientsRequired: scanData.nutrientsRequired || {
        npk: 'Compost Orgánico o Humus de Lombriz (Balanceado)',
        homemadeSource: 'Infusión de cáscaras de plátano para potasio o agua de cocción de verduras sin sal.',
        commercialSource: 'Abono orgánico vegetal NPK balanceado para huertos.'
      },
      care: scanData.care || {
        light: scanData.climate?.light || 'Luz solar indirecta o sol matutino (4-6 horas).',
        water: scanData.climate?.waterFreq || 'Regar cuando el tercio superior de la tierra esté seco al tacto.',
        soil: 'Sustrato ligero con compost, turba y perlita para drenaje.',
        fertilizer: 'Abonar cada 3 o 4 semanas durante la temporada cálida.'
      },
      climate: scanData.climate || {
        temperature: '18°C - 26°C ideal para hogar y terraza',
        waterFreq: 'Cada 3 a 5 días según calor y ventilación'
      },
      lifeSpanYears: scanData.lifeSpanYears || 'Ciclo anual o planta longeva de varios años según cuidados'
    };

    const updatedList = [newRecord, ...currentList];
    localStorage.setItem('FLORAMETRICS_HISTORY_LOG', JSON.stringify(updatedList));
    return newRecord;
  } catch (e) {
    console.error('Error al guardar en el historial:', e);
    return null;
  }
};

/**
 * Elimina un registro del historial por su ID
 */
export const deleteScanFromHistory = (recordId) => {
  try {
    const currentList = getScanHistory();
    const updatedList = currentList.filter((r) => r.id !== recordId);
    localStorage.setItem('FLORAMETRICS_HISTORY_LOG', JSON.stringify(updatedList));
    return updatedList;
  } catch (e) {
    console.error('Error al eliminar registro del historial:', e);
    return getScanHistory();
  }
};
