// Helper para subir imágenes de huertos y plantas en vivo a la nube oficial Cloudinary
// Cloud Name del emprendimiento: ll3h5fkl

export const CLOUDINARY_CLOUD_NAME = 'll3h5fkl';
export const CLOUDINARY_UPLOAD_PRESET = 'florametrics_uploads'; // Preset Unsigned que se crea en Cloudinary

/**
 * Sube una imagen (archivo File, Blob o DataURL base64) directo a Cloudinary sin servidor intermediario.
 * @param {File|Blob|string} imageInput - El archivo de imagen o base64 capturado por la cámara.
 * @param {string} [customPreset] - Nombre opcional del preset unsigned (por defecto 'florametrics_uploads').
 * @returns {Promise<{url: string, publicId: string, secureUrl: string}|null>}
 */
export const uploadImageToCloudinary = async (imageInput, customPreset = CLOUDINARY_UPLOAD_PRESET) => {
  try {
    const formData = new FormData();
    formData.append('file', imageInput);
    formData.append('upload_preset', customPreset);
    formData.append('folder', 'florametrics_huertos'); // Carpeta ordenada en Cloudinary

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.warn('⚠️ Alerta de Cloudinary (verifica si creaste el preset Unsigned):', errorData);
      // Si el preset aún no fue creado o falla, devolvemos un fallback con la imagen local/base64
      if (typeof imageInput === 'string' && imageInput.startsWith('data:image')) {
        return {
          url: imageInput,
          secureUrl: imageInput,
          publicId: `local_fallback_${Date.now()}`,
          isLocalFallback: true
        };
      }
      return null;
    }

    const data = await response.json();
    return {
      url: data.url,
      secureUrl: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
      isLocalFallback: false
    };
  } catch (error) {
    console.error('Error al subir imagen a Cloudinary:', error);
    // Si hay desconexión temporal, mantenemos la imagen como DataURL local para que la IA no falle
    if (typeof imageInput === 'string' && imageInput.startsWith('data:image')) {
      return {
        url: imageInput,
        secureUrl: imageInput,
        publicId: `local_fallback_${Date.now()}`,
        isLocalFallback: true
      };
    }
    return null;
  }
};
