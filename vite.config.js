import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

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

