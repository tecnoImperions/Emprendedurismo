import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Copiar imágenes inmediatamente al cargar la configuración
const immediateTargetDir = path.resolve(__dirname, 'public/images')
if (!fs.existsSync(immediateTargetDir)) {
  fs.mkdirSync(immediateTargetDir, { recursive: true })
}
const immediateSourceDir = 'C:/Users/Juan Andres/.gemini/antigravity/brain/1a0b7c40-36b3-478b-8ddb-aa421957005d'
const immediateFilesMap = {
  'scan_too_close_1784464871865.png': 'scan_too_close.png',
  'scan_too_far_1784464886294.png': 'scan_too_far.png',
  'scan_multiple_1784464900452.png': 'scan_too_many.png',
  'scan_perfect_1784464913441.png': 'scan_perfect.png'
}
for (const [srcName, destName] of Object.entries(immediateFilesMap)) {
  const srcPath = path.join(immediateSourceDir, srcName)
  const destPath = path.join(immediateTargetDir, destName)
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath)
  }
}


// Plugin to copy generated images from brain folder to public/images
function copyGeneratedImages() {
  return {
    name: 'copy-generated-images',
    buildStart() {
      const sourceDir = 'C:/Users/Juan Andres/.gemini/antigravity/brain/3126396c-954e-4c90-ad70-5973ddc5e3af'
      const targetDir = path.resolve(__dirname, 'public/images')
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
      }
      // Copiar imágenes del mockup
      const filesMap = {
        'plant_ai_scanner_hero_1783968093740.png': 'scanner_hero.png',
        'urban_vegetable_garden_1783968107568.png': 'urban_garden.png',
        'plant_expert_community_1783968120901.png': 'expert_community.png'
      }
      for (const [srcName, destName] of Object.entries(filesMap)) {
        const srcPath = path.join(sourceDir, srcName)
        const destPath = path.join(targetDir, destName)
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath)
        }
      }

      // Copiar el nuevo emblema / logotipo a la carpeta public como favicon
      const logoSrc = 'C:/Users/Juan Andres/.gemini/antigravity/brain/8fc128e0-5f12-441e-b4ca-dd00bdc2ffcc/florametrics_logo_icon_1784205616893.png'
      const logoDest = path.resolve(__dirname, 'public/favicon.png')
      if (fs.existsSync(logoSrc)) {
        fs.copyFileSync(logoSrc, logoDest)
      }

      // Copiar imágenes para las guías de cámara de la conversación actual
      const currentSourceDir = 'C:/Users/Juan Andres/.gemini/antigravity/brain/1a0b7c40-36b3-478b-8ddb-aa421957005d'
      const currentFilesMap = {
        'scan_too_close_1784464871865.png': 'scan_too_close.png',
        'scan_too_far_1784464886294.png': 'scan_too_far.png',
        'scan_multiple_1784464900452.png': 'scan_too_many.png',
        'scan_perfect_1784464913441.png': 'scan_perfect.png'
      }
      for (const [srcName, destName] of Object.entries(currentFilesMap)) {
        const srcPath = path.join(currentSourceDir, srcName)
        const destPath = path.join(targetDir, destName)
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath)
        }
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/Emprendedurismo/',
  plugins: [react(), copyGeneratedImages()],
  server: {
    fs: {
      allow: ['..', 'C:/Users/Juan Andres/.gemini/antigravity/brain']
    }
  }
})

