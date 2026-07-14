export const interactivePlants = [
  {
    id: 'monstera',
    name: 'Monstera Deliciosa',
    category: 'Planta de Interior & Tropical',
    image: './images/scanner_hero.png',
    healthScore: 92,
    lifeSpanYears: '15 - 25 años',
    currentLifeCycle: 'Etapa Madura (Abonado activo)',
    climate: {
      temperature: '18°C - 26°C',
      humidity: '65% - 80%',
      light: 'Luz Indirecta Brillante',
      waterFreq: 'Cada 6-8 días (sustrato 50% seco)',
    },
    diagnostics: [
      {
        id: 1,
        title: 'Puntas con leve sequedad marrón',
        severity: 'Baja',
        cause: 'Humedad ambiental bajo el 50% en horas de tarde o aire acondicionado directo.',
        solution: 'Nebulizar follaje con agua filtrada o agrupar junto a otras plantas para microclima.',
        aiConfidence: '96%'
      },
      {
        id: 2,
        title: 'Nueva hoja fenestrada emergente',
        severity: 'Excelente',
        cause: 'Óptimo nivel de clorofila y absorción lumínica.',
        solution: 'Mantener fertilización equilibrada NPK 10-10-10 cada 21 días en temporada de crecimiento.',
        aiConfidence: '99%'
      }
    ],
    cameraViews: {
      general: 'Vista panorámica general: Estructura erguida y follaje denso.',
      leaves: 'Inspección foliar AI: 14 hojas saludables, 2 con ligera deshidratación perimetral.',
      roots: 'Análisis de sustrato: Drenaje 90% óptimo, raíces aéreas vigorosas.',
      climate: 'Perfil microclimático: 22.4°C | Humedad actual 58% (Subir +7%).'
    }
  },
  {
    id: 'tomate-cherry',
    name: 'Tomate Cherry en Maceta',
    category: 'Huerto Urbano Comestible',
    image: './images/urban_garden.png',
    healthScore: 88,
    lifeSpanYears: '8 - 12 meses (Ciclo productivo)',
    currentLifeCycle: 'Floración & Primeros Frutos',
    climate: {
      temperature: '20°C - 28°C',
      humidity: '55% - 70%',
      light: 'Sol Directo (6+ horas/día)',
      waterFreq: 'Riego constante (diario o interdiario moderado)',
    },
    diagnostics: [
      {
        id: 1,
        title: 'Ligero rizo en hojas bajas',
        severity: 'Media',
        cause: 'Estrés térmico al mediodía o falta de potasio en formación de fruto.',
        solution: 'Aportar humus de lombriz o té de plátano rico en potasio y proteger de sol de 14:00h en ola de calor.',
        aiConfidence: '93%'
      }
    ],
    cameraViews: {
      general: 'Estructura con entutorado firme, 8 racimos frutales en desarrollo.',
      leaves: 'Follaje verde oscuro con alta actividad fotosintética.',
      roots: 'Sustrato suelto orgánico con compost, humedad 68%.',
      climate: 'Perfil óptimo de radiación solar para maduración dulce.'
    }
  },
  {
    id: 'albahaca',
    name: 'Albahaca Genovesa Gourmet',
    category: 'Aromática de Balcón & Cocina',
    image: './images/urban_garden.png',
    healthScore: 95,
    lifeSpanYears: '6 - 10 meses (Poda constante prolonga vida)',
    currentLifeCycle: 'Brote frondoso listo para cosecha',
    climate: {
      temperature: '18°C - 25°C',
      humidity: '60% - 75%',
      light: '4-5 horas de sol directo matutino',
      waterFreq: 'Mantener sustrato ligeramente húmedo sin encharcar',
    },
    diagnostics: [
      {
        id: 1,
        title: 'Inicio de botones florales (pinzado recomendado)',
        severity: 'Atención preventiva',
        cause: 'Ciclo biológico natural para floración.',
        solution: 'Pinzar/cortar las puntas florales superiores para redirigir energía a hojas tiernas aromáticas.',
        aiConfidence: '98%'
      }
    ],
    cameraViews: {
      general: 'Mata compacta de 32 cm con aroma concentrado.',
      leaves: 'Hojas aceitosas y crujientes libres de pulgón o mosca blanca.',
      roots: 'Sustrato aireado con perlita al 20%.',
      climate: 'Exposición matinal perfecta en ventana orientada al Este.'
    }
  },
  {
    id: 'calathea',
    name: 'Calathea Ornata (Planta de la Oración)',
    category: 'Exótica Sensible al Clima',
    image: './images/scanner_hero.png',
    healthScore: 84,
    lifeSpanYears: '8 - 15 años',
    currentLifeCycle: 'Establecimiento de follaje rosado',
    climate: {
      temperature: '19°C - 24°C',
      humidity: '75% - 85% (Alta)',
      light: 'Sombra Luminosa / Luz filtrada',
      waterFreq: 'Agua purificada o lluvia cada 4-5 días',
    },
    diagnostics: [
      {
        id: 1,
        title: 'Bordes secos crujientes',
        severity: 'Media',
        cause: 'Uso de agua del grifo con cloro o sodio, o aire ambiente demasiado seco.',
        solution: 'Regar únicamente con agua declorada/reposada o de lluvia y activar humificador cercano.',
        aiConfidence: '97%'
      }
    ],
    cameraViews: {
      general: 'Patrón de rayas rosas contrastado, movimiento nictinástico activo noche/día.',
      leaves: 'Pigmentación púrpura en el envés intacta.',
      roots: 'Raíces sensibles en maceta de cerámica con platillo de guijarros húmedos.',
      climate: 'Requiere aumento de humedad relativa en invierno.'
    }
  }
];

export const huertoCatalog = [
  {
    id: 'tomate',
    name: 'Tomate Cherry Orgánico',
    space: 'Balcón / Maceta 15L+',
    daysToHarvest: 65,
    difficulty: 'Fácil',
    yieldPerPlant: '1.8 kg / temporada',
    sunlight: '6+ horas sol directo',
    water: 'Constante y directo a raíz',
    description: 'El rey indiscutible de los huertos urbanos en casa. Produce racimos continuos dulces y jugosos en espacios reducidos.',
    badge: 'Alta Cosecha'
  },
  {
    id: 'albahaca',
    name: 'Albahaca Dulce',
    space: 'Ventana / Maceta 3L',
    daysToHarvest: 28,
    difficulty: 'Muy Fácil',
    yieldPerPlant: '350 g hojas frescas',
    sunlight: '4-5 horas sol',
    water: 'Humedad regular',
    description: 'Imprescindible en cocina. Repele plagas naturales de otras hortalizas y regenera hojas muy rápido al podar.',
    badge: 'Cosecha Rápida'
  },
  {
    id: 'espinaca',
    name: 'Espinaca Baby Crujiente',
    space: 'Mesa de Cultivo / Jardinera',
    daysToHarvest: 35,
    difficulty: 'Fácil',
    yieldPerPlant: '450 g hojas',
    sunlight: '3-4 horas semisombra',
    water: 'Riego frecuente ligero',
    description: 'Ideal para zonas menos soleadas de la casa o balcones interiores. Ricos antioxidantes y corte escalonado.',
    badge: 'Superalimento'
  },
  {
    id: 'fresa',
    name: 'Fresa Colgante Silvestre',
    space: 'Jardín Vertical / Cesta Colgante',
    daysToHarvest: 75,
    difficulty: 'Intermedio',
    yieldPerPlant: '600 g frutos gourmet',
    sunlight: '5 horas sol directo',
    water: 'Sustrato ácido húmedo',
    description: 'Especial para aprovechar paredes y balcones en altura sin ocupar superficie en el suelo.',
    badge: 'Decorativo & Frutal'
  },
  {
    id: 'pimiento',
    name: 'Pimiento Mini Dulce',
    space: 'Maceta 10L / Balcón',
    daysToHarvest: 70,
    difficulty: 'Intermedio',
    yieldPerPlant: '1.2 kg pimientos',
    sunlight: '6 horas sol',
    water: 'Riego medio sin encharcar',
    description: 'Arbusto compacto cargado de pequeños pimientos rojos, amarillos y naranjas con altísimo contenido de Vitamina C.',
    badge: 'Nutritivo'
  },
  {
    id: 'zanahoria',
    name: 'Zanahoria Baby Redonda (Parisienne)',
    space: 'Jardinera Profunda (20 cm+)',
    daysToHarvest: 55,
    difficulty: 'Fácil',
    yieldPerPlant: '25-30 zanahorias / maceta',
    sunlight: '4-6 horas sol',
    water: 'Sustrato suelto arenoso',
    description: 'Variedad especial esférica y dulce que no requiere suelos profundos de campo agrícola.',
    badge: 'Especial Macetas'
  }
];

export const expertsCommunity = [
  {
    id: 1,
    name: 'Dra. Valeria Mendoza',
    role: 'Fitopatologa & Mentora FloraMetrics',
    avatar: './images/expert_community.png',
    experience: '14 años de experiencia',
    specialty: 'Climatización artificial y rescate botánico',
    lifespanRecord: '22 años con plantas madre tropicales',
    quote: 'El secreto del tiempo de vida no es regar más, sino comprender la respiración estomática y el microclima que rodea la hoja.',
    status: 'En línea para diagnóstico'
  },
  {
    id: 2,
    name: 'Ing. Mateo Álvarez',
    role: 'Agrónomo Especialista en Huertos Urbanos',
    avatar: './images/expert_community.png',
    experience: '11 años creando huertos en balcones',
    specialty: 'Verduras en maceta y nutrición orgánica',
    lifespanRecord: '100+ huertos urbanos activos produciendo',
    quote: 'Cualquier ventana soleada puede convertirse en un huerto que te dé hortalizas frescas todo el año si manejamos el sustrato correctamente.',
    status: 'Responde en < 15 min'
  },
  {
    id: 3,
    name: 'Elena Ríos (CordyMaster)',
    role: 'Curadora de Longevidad Botánica',
    avatar: './images/expert_community.png',
    experience: '9 años en comunidad CordyClub',
    specialty: 'Ciclos vitales en interiores y esquejes perpetuos',
    lifespanRecord: '18 años de dinastía en Monstera y Calatheas',
    quote: 'Una planta puede acompañarte décadas. Con la cámara IA diagnosticamos las anomalías semanas antes de que la hoja lo sufra.',
    status: 'Sesiones 1 a 1 disponibles'
  }
];
