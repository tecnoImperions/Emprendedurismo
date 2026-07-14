// Base de datos principal institucional FloraMetrics
// Contiene: Especies Interactivas, Catálogo de Huertos en Casa, Directorio de Nutrientes y Red de Especialistas con Ubicación.

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
    nutrientsRequired: {
      npkFormula: 'NPK 10-10-10 (Equilibrado Universal)',
      keyNutrient: 'Nitrógeno (N) y Hierro (Fe) para verdor foliar',
      whereToFind: 'Vivero local: Humus de lombriz sólido o fertilizante de plantas verdes; En casa: Infusión de posos de café seco (ligero) o agua de cocción de huevos fría.',
      deficiencySymptoms: 'Si falta nitrógeno, las hojas más viejas se vuelven amarillas pálidas uniformemente y dejan de sacar fenestraciones (agujeros).'
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
    nutrientsRequired: {
      npkFormula: 'NPK 4-8-12 (Alto Fósforo y Potasio para fruto)',
      keyNutrient: 'Potasio (K), Calcio (Ca) y Fósforo (P)',
      whereToFind: 'Tiendas agrícolas / Viveros: Guano de murciélago o Harina de hueso; En cocina: Té de cáscara de plátano diluido (1:5) y cáscara de huevo molida extra fina espolvoreada.',
      deficiencySymptoms: 'Pudrición negra en el fondo del tomate indica falta de Calcio (pudrición apical). Bordes quemados indican falta de Potasio.'
    },
    diagnostics: [
      {
        id: 1,
        title: 'Ligero rizo en hojas bajas con alta demanda de K',
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
    nutrientsRequired: {
      npkFormula: 'NPK 8-4-4 (Alto Nitrógeno orgánico)',
      keyNutrient: 'Nitrógeno orgánico suave y Magnesio',
      whereToFind: 'Vivero de barrio: Humus de lombriz líquido organo-mineral; En casa: Agua de remojo de lentejas (rica en auxinas) o compost vegetal macerado.',
      deficiencySymptoms: 'Hojas pequeñas color verde pálido o amarillento que pierden su intenso aroma característico.'
    },
    diagnostics: [
      {
        id: 1,
        title: 'Inicio de botones florales (pinzado recomendado)',
        severity: 'Atención preventiva',
        cause: 'Ciclo biológico natural para floración.',
        solution: 'Pinzar/cortar las puntas florales superiores para redirigir energía a hojas tiernas aromáticas y aplicar humus fresco.',
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
    nutrientsRequired: {
      npkFormula: 'NPK 6-6-6 muy diluido al 50%',
      keyNutrient: 'Hierro (Fe) y Magnesio (Mg) sin acumulación de sales de sodio',
      whereToFind: 'Tienda botánica: Quelato de hierro líquido suave; En casa: Evitar fertilizantes químicos fuertes. Usar agua de lluvia reposada con unas gotas de extracto de algas.',
      deficiencySymptoms: 'El exceso o falta de nutrientes en Calatheas causa bordes quemados y pérdida del color rosa en las rayas del haz foliar.'
    },
    diagnostics: [
      {
        id: 1,
        title: 'Bordes secos crujientes por sales minerales',
        severity: 'Media',
        cause: 'Uso de agua del grifo con cloro o sodio, o aire ambiente demasiado seco.',
        solution: 'Regar únicamente con agua declorada/reposada o de lluvia, activar humificador cercano y lavar raíces suavemente.',
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
    badge: 'Alta Cosecha',
    nutrientsRequired: {
      npkFormula: 'NPK 4-8-12 (Alto K y Ca)',
      keyNutrient: 'Potasio (K) para dulzor y Calcio (Ca) anti-pudrición',
      whereToFind: 'Humus de lombriz maduro en viveros, guano de murciélago o té casero de cáscara de plátano con harina de huevo.'
    }
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
    badge: 'Cosecha Rápida',
    nutrientsRequired: {
      npkFormula: 'NPK 8-4-4 (Nitrógeno natural)',
      keyNutrient: 'Nitrógeno orgánico suave',
      whereToFind: 'Humus líquido de lombriz en tienda ecológica o agua de cocción de verduras sin sal del hogar.'
    }
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
    badge: 'Superalimento',
    nutrientsRequired: {
      npkFormula: 'NPK 9-3-4 (Nitrógeno y Hierro)',
      keyNutrient: 'Hierro (Fe) y Nitrógeno vegetal',
      whereToFind: 'Compost de desechos verdes de cocina madurado o abono foliar de algas marinas en viveros.'
    }
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
    badge: 'Decorativo & Frutal',
    nutrientsRequired: {
      npkFormula: 'NPK 5-10-10 en floración',
      keyNutrient: 'Fósforo (P) y acidez ligera (pH 6.0)',
      whereToFind: 'Harina de hueso o fosfato natural en centros agrícolas; añadir una pizca de posos de café para acidificar suavemente.'
    }
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
    badge: 'Nutritivo',
    nutrientsRequired: {
      npkFormula: 'NPK 4-6-8 (Equilibrio de floración)',
      keyNutrient: 'Magnesio (Mg) y Potasio (K)',
      whereToFind: 'Sales de Epsom orgánicas (Sulfato de Magnesio) en farmacias/tiendas botánicas diluidas 1 cucharadita por litro.'
    }
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
    badge: 'Especial Macetas',
    nutrientsRequired: {
      npkFormula: 'NPK 3-8-10 (Bajo Nitrógeno, Alto Potasio)',
      keyNutrient: 'Fósforo (P) y Potasio (K) para raíz engordada',
      whereToFind: 'Ceniza de leña virgen y harina de hueso mezclada con arena y compost antes de sembrar.'
    }
  }
];

// Directorio y Base de Datos de Nutrientes Vegetales para Huertos en Casa
export const nutrientDirectoryCatalog = [
  {
    id: 'viveros-fisicos',
    category: '📍 Viveros, Tiendas Agrícolas & Centros Ecológicos (Ubicaciones Físicas)',
    items: [
      {
        name: 'Vivero y Bio-Insumos El Huerto Urbano',
        location: 'Av. Las Gardenias #412, Sector Centro / Zona Norte',
        availableNutrients: 'Humus de lombriz puro en sacos de 5kg, perlita, vermiculita, guano de murciélago y jabón potásico.',
        contactOrHours: 'Lunes a Sábado de 08:30 a 18:00 hs | Tel/WhatsApp: +52 / +56 / +54 (Red Nacional)'
      },
      {
        name: 'Centro de Compostaje Comunitario & Semillas Orgánicas',
        location: 'Parque Botánico Municipal / Vivero Agroecológico Sur',
        availableNutrients: 'Compost maduro certificado de restos vegetales, lixiviados líquidos y harina de roca mineral.',
        contactOrHours: 'Atención al público: Martes a Domingo 09:00 a 14:00 hs | Entrega gratuita o intercambio.'
      },
      {
        name: 'Tiendas de Jardinería Domiciliaria (Home Centers & Garden Shops)',
        location: 'Sucursales en Centros Comerciales y Tiendas Online con Envío Express',
        availableNutrients: 'Fertilizantes líquidos NPK universales, sustratos preparados para huerto (Compo, Miracle-Gro orgánico, BioBizz).',
        contactOrHours: 'Abierto todos los días de 09:00 a 21:00 hs | Catálogo Digital y Delivery en 24h.'
      }
    ]
  },
  {
    id: 'nutrientes-caseros',
    category: '🏠 Nutrientes Caseros de Cocina (Preparación Paso a Paso en el Hogar)',
    items: [
      {
        name: 'Té de Cáscara de Plátano (Inyección pura de Potasio K)',
        bestFor: 'Tomates cherry, pimientos, fresas y flores en maceta.',
        howToMake: 'Hierve 4 cáscaras de plátano troceadas con 1 litro de agua durante 15 minutos. Deja enfriar, cuela los trozos y mezcla ese líquido oscuro con 1 litro más de agua limpia. Regar la tierra cada 15 días.',
        npkEquivalent: 'Potasio (K) 12% + Magnesio'
      },
      {
        name: 'Harina de Cáscara de Huevo (Calcio Ca Anti-Pudrición)',
        bestFor: 'Prevenir la pudrición negra en la base del tomate y dar rigidez a tallos.',
        howToMake: 'Lava las cáscaras de 6 huevos, déjalas secar al sol o en el horno tras apagarlo. Tritúralas en la licuadora o mortero hasta obtener un polvo blanco ultra fino. Espolvorea 1 cucharada por maceta e incorpóralo en la tierra.',
        npkEquivalent: 'Calcio (Ca) 38% puro asimilable'
      },
      {
        name: 'Posos o Borra de Café Seco (Nitrógeno N y acidez suave)',
        bestFor: 'Hortalizas de hoja verde (espinaca, albahaca) y plantas ácidas (fresas, hortensias).',
        howToMake: '¡IMPORTANTE: Nunca lo pongas húmedo porque saca moho! Deja secar completamente el café usado en una bandeja durante 2 días al sol. Luego espolvorea una capa fina de medio milímetro alrededor de la planta y remueve con un tenedor.',
        npkEquivalent: 'Nitrógeno (N) 2.1% + materia orgánica'
      },
      {
        name: 'Ceniza de Madera Pura y Limpia (Fósforo P y Potasio K)',
        bestFor: 'Desarrollo de raíces en zanahorias, rábanos y hortalizas de fruto.',
        howToMake: 'Utiliza únicamente ceniza blanca fría de leña o carbón vegetal sin químicos ni grasa de carne. Mezcla 1 cucharadita pequeña por cada 5 litros de tierra al sembrar. (Ojo: sube el pH, no abusar en plantas que piden tierra ácida).',
        npkEquivalent: 'Fósforo (P) 2% + Potasio (K) 7%'
      }
    ]
  },
  {
    id: 'abonos-comerciales',
    category: '🧪 Abonos Comerciales Orgánicos Certificados (Qué pedir exactamente en la tienda)',
    items: [
      {
        name: 'Humus de Lombriz Sólido o Líquido (El Rey del Huerto Urbano)',
        application: 'Sólido: 200 gramos en la superficie de la maceta cada 30 días. Líquido: 10 ml por litro de agua en cada riego.',
        benefits: 'Reconstruye la microbiota de la tierra, no quema las raíces aunque te pases de dosis y aporta todos los micronutrientes equilibrados.'
      },
      {
        name: 'Guano de Murciélago o Aves Marinas (Explosión de Fructificación)',
        application: 'Mezclar 20g por maceta en la fase en que la planta empieza a sacar sus primeras flores.',
        benefits: 'El fertilizante orgánico con mayor contenido de Fósforo natural del mundo. Hace que los racimos de tomate cuajen al 100%.'
      },
      {
        name: 'Extracto de Algas Marinas (Kelps - Bioestimulante Anti-Estrés)',
        application: 'Pulverizar en las hojas (vía foliar) o regar diluido 5 ml por litro tras un trasplante o en olas de calor intenso.',
        benefits: 'Aporta más de 60 fitohormonas y minerales que salvan a las plantas del calor extremo, heladas o ataques de plagas en balcones.'
      }
    ]
  }
];

// Red de Especialistas y Mentores con Ubicación Geográfica e Institución
export const expertsCommunity = [
  {
    id: 1,
    name: 'Dra. Valeria Mendoza',
    role: 'Fitopatologa & Mentora FloraMetrics',
    avatar: './images/expert_community.png',
    experience: '14 años de experiencia',
    specialty: 'Climatización artificial y rescate botánico de longevidad en interiores',
    lifespanRecord: '22 años con plantas madre tropicales y follaje exótico',
    quote: 'El secreto del tiempo de vida no es regar más, sino comprender la respiración estomática y el microclima que rodea la hoja.',
    status: 'En línea para diagnóstico',
    location: 'Ciudad de México, México',
    institution: 'Instituto de Rescate Foliar & Jardín Botánico UNAM',
    addressOrZone: 'Av. Universidad #3000, Coyoacán / Laboratorio Central de Climatización',
    consultationHours: 'Lunes a Viernes: 09:00 - 17:00 hs (Hora Central CDMX)',
    contactMode: 'Asesoría en vivo por Video-Llamada FloraMetrics o Cita en Laboratorio'
  },
  {
    id: 2,
    name: 'Ing. Mateo Álvarez',
    role: 'Agrónomo Especialista en Huertos Urbanos',
    avatar: './images/expert_community.png',
    experience: '11 años creando huertos en balcones y ventanas',
    specialty: 'Verduras en maceta, nutrición NPK orgánica y compostaje domiciliario',
    lifespanRecord: '100+ huertos urbanos activos produciendo hortalizas continuas',
    quote: 'Cualquier ventana soleada puede convertirse en un huerto que te dé hortalizas frescas todo el año si manejamos el sustrato y el abono correctamente.',
    status: 'Responde en < 15 min',
    location: 'Bogotá, Colombia',
    institution: 'Centro Agro-Ecológico de la Sabana & Red de Huertos de Altura',
    addressOrZone: 'Cra. 7ma #82-45, Chapinero / Vivero Piloto de Agricultura Urbana',
    consultationHours: 'Martes a Sábado: 08:00 - 16:00 hs (Hora Colombia)',
    contactMode: 'Chat Directo Institucional, Evaluación de Fotos por WhatsApp o Visita Domiciliaria'
  },
  {
    id: 3,
    name: 'Elena Ríos (CordyMaster)',
    role: 'Curadora de Longevidad Botánica',
    avatar: './images/expert_community.png',
    experience: '9 años en comunidad CordyClub & Viveros Comunitarios',
    specialty: 'Ciclos vitales en interiores, esquejes perpetuos y sustratos aireados',
    lifespanRecord: '18 años de dinastía en Monstera, Calatheas y Ficus',
    quote: 'Una planta puede acompañarte décadas. Con la cámara IA diagnosticamos las anomalías y carencias de hierro semanas antes de que la hoja lo sufra.',
    status: 'Sesiones 1 a 1 disponibles',
    location: 'Santiago de Chile, Chile',
    institution: 'Vivero Comunitario Ñuñoa & Red Botánica de Longevidad Sur',
    addressOrZone: 'Av. Irarrázaval #2890, Ñuñoa / Pabellón de Propagación y Esquejes',
    consultationHours: 'Lunes a Domingo: 10:00 - 19:00 hs (Hora Santiago CLT)',
    contactMode: 'Sesión 1 a 1 de Diagnóstico, Talleres Prácticos y Mentoría Continua'
  },
  {
    id: 4,
    name: 'Dr. Carlos Sotomayor',
    role: 'Especialista en Suelos, Compostaje y Nutrición',
    avatar: './images/expert_community.png',
    experience: '16 años en agroquímica ecológica y bio-insumos',
    specialty: 'Formulación de nutrientes caseros, lixiviados de lombriz y control de pH en maceta',
    lifespanRecord: 'Productor de +5 toneladas de humus orgánico urbano anuales',
    quote: 'La planta se alimenta de lo que la tierra libera. Si aportamos microorganismos y cáscaras fermentadas bien equilibradas, las plagas no tienen oportunidad.',
    status: 'Disponible para Consultas Técnicas',
    location: 'Lima, Perú',
    institution: 'Laboratorio de Bio-Insumos Ecológicos & Huerto Agrario La Molina',
    addressOrZone: 'Av. La Universidad #180, La Molina / Centro de Nutrición Vegetal',
    consultationHours: 'Lunes a Viernes: 08:30 - 15:30 hs (Hora Lima PET)',
    contactMode: 'Análisis Técnico de Sustrato por Envío de Muestra o Video-Consulta Agroecológica'
  },
  {
    id: 5,
    name: 'Agrónoma Mariana López',
    role: 'Coordinadora de Huertos de Balcón y Terrazas',
    avatar: './images/expert_community.png',
    experience: '12 años diseñando huertos verticales en espacios reducidos',
    specialty: 'Riego automatizado por goteo, iluminación LED para interior y aromáticas gourmet',
    lifespanRecord: '45+ terrazas residenciales transformadas en oasis productivos',
    quote: 'No necesitas un jardín de campo. En una baranda de balcón de un metro puedes tener albahaca, tomates cherry y fresas suficientes para tu familia.',
    status: 'En línea ahora',
    location: 'Madrid, España',
    institution: 'Asociación de Huertos Urbanos de Madrid & Vivero Ecológico Retiro',
    addressOrZone: 'Calle de Alfonso XII #54, Zona Retiro / Escuela de Agricultura Urbana',
    consultationHours: 'Lunes a Sábado: 10:00 - 20:00 hs (Hora Central Europea CET)',
    contactMode: 'Asesoría Online Global, Planes de Diseño de Balcón y Clases en Vivo'
  }
];
