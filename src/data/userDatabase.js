// Base de datos de Usuarios Mockup y Cultivos de Hogar (Huertos en Casa)
// Resuelve las necesidades básicas de cuidado, riego, luz y cosecha en espacios de hogar.

export const mockupUsers = [
  {
    id: 'laura-gomez',
    name: 'Laura Gómez',
    profileTitle: 'Huerto en Balcón Soleado (Dpto 5to Piso)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    experienceLevel: 'Intermedio',
    spaceType: 'Balcón / Terraza Pequeña con Sol Directo (6 horas)',
    totalPlants: 5,
    successfulHarvests: 12,
    spaceSummary: 'Balcón orientado al Norte. Ideal para hortalizas de fruto (tomates, pimientos) y aromáticas mediterráneas.',
    myGarden: [
      {
        id: 'tomate-laura-1',
        plantId: 'tomate',
        name: 'Tomate Cherry Orgánico',
        customName: 'Tomatera del Balcón #1',
        locationInHome: 'Maceta 20L - Balcón Esquina Soleada',
        plantedDate: '2026-05-10',
        daysToHarvest: 18,
        totalHarvestCycleDays: 65,
        wateringStatus: 'optimal', // 'optimal' | 'due_today' | 'overdue'
        lastWatered: 'Hoy a las 08:30 AM',
        nextWatering: 'Mañana (Riego diario por calor en balcón)',
        lightReceived: '6.5 horas sol directo',
        healthScore: 92,
        lastAiScanResult: {
          title: 'Follaje vigoroso con floración activa',
          solution: 'Añadir 2 cucharadas de humus o compost orgánico alrededor del tallo para sostener el peso de los tomates.',
          isPlantOrGarden: true
        },
        basicNeeds: {
          waterFreq: 'Diario o cada 2 días en verano',
          potSize: 'Maceta profunda de al menos 15-20 litros con drenaje',
          soilType: 'Sustrato rico en compost y fibra de coco',
          pestProtection: 'Preventivo: pulverizar jabón potásico cada 15 días'
        }
      },
      {
        id: 'albahaca-laura-1',
        plantId: 'albahaca',
        name: 'Albahaca Genovesa',
        customName: 'Albahaca Pesto de Mesa',
        locationInHome: 'Jardinera Colgante - Baranda del Balcón',
        plantedDate: '2026-06-15',
        daysToHarvest: 5,
        totalHarvestCycleDays: 28,
        wateringStatus: 'due_today',
        lastWatered: 'Hace 2 días',
        nextWatering: 'Hoy (Sustrato al 60% seco)',
        lightReceived: '5 horas sol directo matutino',
        healthScore: 89,
        lastAiScanResult: {
          title: 'Hojas crujientes listas para cosecha parcial',
          solution: 'Pinzar los brotes apicales para evitar que florezca y estimular que crezca más frondosa hacia los lados.',
          isPlantOrGarden: true
        },
        basicNeeds: {
          waterFreq: 'Mantener sustrato ligeramente húmedo sin encharcar plato',
          potSize: 'Maceta o jardinera de 3 a 5 litros',
          soilType: 'Sustrato universal aireado con perlita',
          pestProtection: 'Revisar envés de hojas contra mosca blanca'
        }
      },
      {
        id: 'fresa-laura-1',
        plantId: 'fresa',
        name: 'Fresa Colgante Silvestre',
        customName: 'Fresas Verticales',
        locationInHome: 'Cesta Colgante - Pared del Balcón',
        plantedDate: '2026-04-20',
        daysToHarvest: 22,
        totalHarvestCycleDays: 75,
        wateringStatus: 'optimal',
        lastWatered: 'Ayer por la tarde',
        nextWatering: 'En 2 días',
        lightReceived: '5 horas sol',
        healthScore: 94,
        lastAiScanResult: {
          title: 'Estolones y frutos verdes en desarrollo',
          solution: 'Evitar mojar las frutas al regar para prevenir hongos (Botrytis). Regar directo a la tierra.',
          isPlantOrGarden: true
        },
        basicNeeds: {
          waterFreq: 'Riego medio cada 2-3 días directo al sustrato',
          potSize: 'Maceta colgante o vertical de 5 litros',
          soilType: 'Sustrato ligeramente ácido con turba y compost',
          pestProtection: 'Proteger con malla ligera de pájaros si hay frutos rojos'
        }
      }
    ]
  },
  {
    id: 'carlos-sofia',
    name: 'Carlos & Sofía',
    profileTitle: 'Huerto en Ventanas y Cocina (Sin Balcón)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    experienceLevel: 'Principiante',
    spaceType: 'Ventanas Orientadas al Este & Encimera de Cocina',
    totalPlants: 4,
    successfulHarvests: 6,
    spaceSummary: 'Aprovechando luz filtrada matutina en cocina y sala. Especialistas en hortalizas de hoja verde, brotes y aromáticas culinarias.',
    myGarden: [
      {
        id: 'espinaca-carlos-1',
        plantId: 'espinaca',
        name: 'Espinaca Baby Crujiente',
        customName: 'Espinacas para Ensaladas',
        locationInHome: 'Jardinera 50cm - Alféizar Ventana Cocina',
        plantedDate: '2026-06-20',
        daysToHarvest: 10,
        totalHarvestCycleDays: 35,
        wateringStatus: 'due_today',
        lastWatered: 'Hace 3 días',
        nextWatering: 'Hoy (Tierra superficial seca al tacto)',
        lightReceived: '4 horas sol suave matutino',
        healthScore: 91,
        lastAiScanResult: {
          title: 'Crecimiento foliar saludable en interior',
          solution: 'Cortar las hojas externas más grandes para consumir y dejar el centro intacto para cosecha continua.',
          isPlantOrGarden: true
        },
        basicNeeds: {
          waterFreq: 'Riego ligero y frecuente cada 2-3 días',
          potSize: 'Jardinera rectangular de 15-20 cm de profundidad',
          soilType: 'Tierra orgánica suelta con humus de lombriz',
          pestProtection: 'Muy resistente en interior; vigilar exceso de humedad'
        }
      },
      {
        id: 'monstera-carlos-1',
        plantId: 'monstera',
        name: 'Monstera Deliciosa',
        customName: 'Costilla de Adán (Sala de Estar)',
        locationInHome: 'Maceta Cerámica 25L - Esquina junto a Ventana',
        plantedDate: '2024-03-15',
        daysToHarvest: 0,
        totalHarvestCycleDays: 0, // Planta ornamental de longevidad
        wateringStatus: 'optimal',
        lastWatered: 'Hace 4 días',
        nextWatering: 'En 3 días (Sustrato 50% seco)',
        lightReceived: 'Luz indirecta brillante todo el día',
        healthScore: 88,
        lastAiScanResult: {
          title: 'Puntas con leve acumulación de sales de agua',
          solution: 'Limpiar el polvo de las hojas con un paño húmedo y regar con agua reposada 24 horas para eliminar cloro.',
          isPlantOrGarden: true
        },
        basicNeeds: {
          waterFreq: 'Riego moderado cada 6-8 días en hogar',
          potSize: 'Maceta grande de 20-30 litros con plato de drenaje',
          soilType: 'Sustrato aroid (corteza de pino, perlita, fibra de coco)',
          pestProtection: 'Limpieza foliar regular con jabón potásico diluido'
        }
      }
    ]
  },
  {
    id: 'roberto-mendoza',
    name: 'Don Roberto Mendoza',
    profileTitle: 'Patio Urbano Macetas y Contenedores Grandes',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    experienceLevel: 'Avanzado (Mentor)',
    spaceType: 'Patio Trasero y Mesas de Cultivo Elevadas',
    totalPlants: 12,
    successfulHarvests: 48,
    spaceSummary: 'Cultivo urbano intensivo en contenedores reciclados y mesas de huerto con compostaje casero propio.',
    myGarden: [
      {
        id: 'pimiento-roberto-1',
        plantId: 'pimiento',
        name: 'Pimiento Mini Dulce Tricolor',
        customName: 'Pimientos del Patio Mesa A',
        locationInHome: 'Contenedor Geotextil 25L - Patio Central',
        plantedDate: '2026-05-01',
        daysToHarvest: 24,
        totalHarvestCycleDays: 70,
        wateringStatus: 'optimal',
        lastWatered: 'Hoy a las 07:00 AM',
        nextWatering: 'En 2 días',
        lightReceived: '7 horas sol directo',
        healthScore: 96,
        lastAiScanResult: {
          title: 'Frutos cuajando con excelente turgencia',
          solution: 'Mantener humedad estable y aplicar té de compost o cáscara de plátano para maximizar dulzor en maduración.',
          isPlantOrGarden: true
        },
        basicNeeds: {
          waterFreq: 'Riego constante y profundo 3 veces por semana',
          potSize: 'Maceta o bolsa de tela geotextil de 20-25 litros',
          soilType: 'Mezcla 40% compost, 40% tierra de jardín, 20% perlita',
          pestProtection: 'Asociar con albahaca y caléndula para alejar pulgones'
        }
      },
      {
        id: 'zanahoria-roberto-1',
        plantId: 'zanahoria',
        name: 'Zanahoria Baby Redonda Parisienne',
        customName: 'Zanahorias Dulces Macetón',
        locationInHome: 'Mesa de Cultivo Profunda (30 cm)',
        plantedDate: '2026-05-25',
        daysToHarvest: 14,
        totalHarvestCycleDays: 55,
        wateringStatus: 'overdue',
        lastWatered: 'Hace 4 días',
        nextWatering: '¡Necesita Riego Hoy!',
        lightReceived: '6 horas sol directo',
        healthScore: 86,
        lastAiScanResult: {
          title: 'Sustrato seco en capa superficial de raíz',
          solution: 'Regar a fondo en forma de lluvia fina para rehidratar el sustrato profundo sin desenterrar las cabezas de zanahoria.',
          isPlantOrGarden: true
        },
        basicNeeds: {
          waterFreq: 'Humedad continua sin que la tierra se apelmace',
          potSize: 'Contenedor o jardinera con mínimo 20 cm de profundidad',
          soilType: 'Tierra muy suelta y arenosa, sin piedras ni terrones duros',
          pestProtection: 'Mantener sustrato limpio y acolchado de paja seca'
        }
      }
    ]
  }
];

// Necesidades básicas fundamentales y guías rápidas para personas con huertos en casa
export const basicNeedsGuide = [
  {
    id: 'riego-y-drenaje',
    title: '1. Riego Exacto & Drenaje Anti-Pudrición',
    icon: 'DropletIcon',
    colorText: 'text-[#2E6C45]',
    colorBg: 'bg-[#EAF3ED]',
    badge: 'La Regla de Oro del Hogar',
    summary: 'El 80% de las plantas en maceta mueren por exceso de agua, no por falta. Aquí te enseñamos cómo regar sin fallas.',
    tips: [
      'Prueba del dedo: Introduce el dedo 2 cm en la tierra. Si sale seco y limpio, es momento de regar; si sale húmedo con tierra pegada, espera 2 días más.',
      'Drenaje obligatorio: Toda maceta en balcón o interior DEBE tener agujeros abajo. Si usas cubremacetas decorativo, vacía el agua sobrante del plato 15 minutos después de regar.',
      'Agua sin cloro: El agua potable de ciudad contiene cloro que quema raíces delicadas. Deja reposar el agua en una regadera abierta durante 24 horas antes de regar tu huerto.'
    ]
  },
  {
    id: 'luz-y-espacios',
    title: '2. Luz Solar según tu Espacio del Hogar',
    icon: 'SunIcon',
    colorText: 'text-amber-600',
    colorBg: 'bg-amber-50',
    badge: 'Ubicación Estratégica',
    summary: 'Cada rincón de la casa tiene una intensidad lumínica distinta. Ubica tus cultivos donde la naturaleza lo requiere.',
    tips: [
      'Sol Directo (6+ horas - Balcones orientados al Sur o Norte soleado): Imprescindible para tomates cherry, pimientos, fresas, romero y tomillo.',
      'Luz Media / Sol Matutino (3-5 horas - Ventanas al Este u Oeste): Perfecto para hortalizas de hoja como espinaca, lechuga, albahaca, perejil y cilantro.',
      'Luz Indirecta Brillante (Interiores luminosos o cerca de ventanas sin sol directo): Ideal para plantas de aire puro y longevidad como Monstera, Calatheas, Pothos y Ficus.'
    ]
  },
  {
    id: 'sustrato-y-nutricion',
    title: '3. Sustrato Orgánico & Abono Casero de Cocina',
    icon: 'SproutIcon',
    colorText: 'text-[#2E6C45]',
    colorBg: 'bg-[#EAF3ED]',
    badge: 'Nutrición Natural',
    summary: 'En macetas cerradas, las plantas agotan los nutrientes en 6 semanas. Alimenta tu tierra con ingredientes naturales del hogar.',
    tips: [
      'El sustrato perfecto de huerto urbano: 40% fibra de coco (o tierra de jardín), 40% humus de lombriz (compost orgánico) y 20% perlita para que el agua drene suavemente.',
      'Té de plátano (Potasio para tomates y flores): Hierve 3 cáscaras de plátano en 1 litro de agua durante 15 minutos, cuélalo y dilúyelo con otro litro de agua limpia para regar una vez al mes.',
      'Cáscara de huevo molida (Calcio anti-pudrición): Lava las cáscaras de huevo, déjalas secar, tritúralas en polvo fino y espolvoréalo sobre la tierra para evitar que los tomates se pudran por abajo.'
    ]
  },
  {
    id: 'plagas-caseras',
    title: '4. Control Orgánico de Plagas en el Hogar (Sin Tóxicos)',
    icon: 'ShieldCheckIcon',
    colorText: 'text-[#5CCF8D]',
    colorBg: 'bg-[#5CCF8D]/15',
    badge: '100% Seguro en Casa con Niños y Mascotas',
    summary: 'Protege tu comida fresca y plantas ornamentales sin rociar químicos venenosos dentro de tu departamento o casa.',
    tips: [
      'Jabón Potásico contra Pulgón y Mosca Blanca: Diluye 1 cucharada de jabón potásico neutro en 1 litro de agua tibia. Pulveriza las hojas por arriba y por debajo al atardecer cada 5 días hasta eliminar plagas.',
      'Remedio de Ajo (Insecticida Natural): Licúa 4 dientes de ajo con 500 ml de agua, cuélalo muy bien y rocía sobre los tallos. El olor azufra y repele ácaros e insectos cortadores sin dañar tu planta.',
      'Ventilación Anti-Hongos: Si notas manchas blancas harinosas (oídio), significa que falta circulación de aire y hay exceso de humedad en el balcón. Separa las macetas para que corra el aire.'
    ]
  }
];

// Gestión del estado de usuario en localStorage o en memoria temporal
export const getActiveUser = () => {
  try {
    const savedUserId = localStorage.getItem('FLORAMETRICS_ACTIVE_USER_ID');
    const customUserJson = localStorage.getItem('FLORAMETRICS_CUSTOM_USER_DATA');
    if (customUserJson && savedUserId && (savedUserId.startsWith('local_') || JSON.parse(customUserJson).id === savedUserId)) {
      const customUser = JSON.parse(customUserJson);
      const customGardenJson = localStorage.getItem(`FLORAMETRICS_GARDEN_${customUser.id}`);
      return customGardenJson ? { ...customUser, myGarden: JSON.parse(customGardenJson) } : customUser;
    }
    const user = mockupUsers.find((u) => u.id === savedUserId);
    if (user) {
      const customGardenJson = localStorage.getItem(`FLORAMETRICS_GARDEN_${user.id}`);
      if (customGardenJson) {
        const parsedGarden = JSON.parse(customGardenJson);
        return { ...user, myGarden: parsedGarden };
      }
      return user;
    }
  } catch (e) {
    console.error('Error al obtener usuario activo:', e);
  }
  return null;
};

export const setActiveUserId = (userId) => {
  try {
    localStorage.setItem('FLORAMETRICS_ACTIVE_USER_ID', userId);
  } catch (e) {
    console.error('Error al guardar userId:', e);
  }
};

export const saveActiveUser = (userObj) => {
  try {
    if (!userObj) return;
    const id = userObj.id || `local_${Date.now()}`;
    localStorage.setItem('FLORAMETRICS_ACTIVE_USER_ID', id);
    localStorage.setItem('FLORAMETRICS_CUSTOM_USER_DATA', JSON.stringify(userObj));
  } catch (e) {
    console.error('Error al guardar usuario activo:', e);
  }
};

export const savePlantToUserGarden = (userId, newPlant) => {
  try {
    const user = mockupUsers.find((u) => u.id === userId) || mockupUsers[0];
    const customGardenJson = localStorage.getItem(`FLORAMETRICS_GARDEN_${user.id}`);
    let currentGarden = customGardenJson ? JSON.parse(customGardenJson) : [...user.myGarden];
    
    // Verificar si ya existe un ID similar
    const plantEntry = {
      id: `custom-${Date.now()}`,
      plantId: newPlant.id || 'escaneada',
      name: newPlant.name || 'Planta Escaneada',
      customName: newPlant.customName || `${newPlant.name || 'Especie'} del Hogar`,
      locationInHome: newPlant.locationInHome || 'Maceta / Huerto en Casa',
      plantedDate: new Date().toISOString().split('T')[0],
      daysToHarvest: newPlant.daysToHarvest || 30,
      totalHarvestCycleDays: newPlant.totalHarvestCycleDays || 60,
      wateringStatus: 'optimal',
      lastWatered: 'Hoy tras el escaneo',
      nextWatering: newPlant.climate?.waterFreq || 'Según humedad (verificar en 3 días)',
      lightReceived: newPlant.climate?.light || 'Luz indirecta / Sol adecuado',
      healthScore: newPlant.healthScore || 90,
      lastAiScanResult: newPlant.lastAiScanResult || {
        title: newPlant.title || 'Escaneo AI completado con éxito',
        solution: newPlant.solution || 'Mantener monitoreo con cámara y cuidar drenaje.',
        isPlantOrGarden: true
      },
      basicNeeds: {
        waterFreq: newPlant.climate?.waterFreq || 'Riego regular sin encharcar',
        potSize: 'Maceta con agujeros de drenaje en base',
        soilType: 'Sustrato suelto y nutritivo orgánico',
        pestProtection: 'Revisión quincenal preventiva en follaje'
      }
    };

    currentGarden = [plantEntry, ...currentGarden];
    localStorage.setItem(`FLORAMETRICS_GARDEN_${user.id}`, JSON.stringify(currentGarden));
    return plantEntry;
  } catch (e) {
    console.error('Error guardando planta al huerto del usuario:', e);
    return null;
  }
};

export const markPlantWateredToday = (userId, plantId) => {
  try {
    const user = mockupUsers.find((u) => u.id === userId) || mockupUsers[0];
    const customGardenJson = localStorage.getItem(`FLORAMETRICS_GARDEN_${user.id}`);
    let currentGarden = customGardenJson ? JSON.parse(customGardenJson) : [...user.myGarden];

    currentGarden = currentGarden.map((p) => {
      if (p.id === plantId) {
        return {
          ...p,
          wateringStatus: 'optimal',
          lastWatered: 'Hoy a las ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          nextWatering: 'En 2-3 días según calor ambiente'
        };
      }
      return p;
    });

    localStorage.setItem(`FLORAMETRICS_GARDEN_${user.id}`, JSON.stringify(currentGarden));
    return currentGarden;
  } catch (e) {
    console.error('Error marcando riego:', e);
    return null;
  }
};
