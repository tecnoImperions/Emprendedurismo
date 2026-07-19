import { GoogleGenerativeAI } from '@google/generative-ai';

const key = "AQ.Ab8RN6LIHaEgEH9kWlImo1Tm--h601vziRSEtNXvz3J-hdNhjg";

async function testMultipleModels() {
  const modelsToTest = [
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-flash-latest",
    "gemini-2.5-flash",
    "gemini-2.0-flash-lite"
  ];

  console.log("--- Testing text generation across models to find active quota ---");
  const genAI = new GoogleGenerativeAI(key);

  for (const modelName of modelsToTest) {
    console.log(`Testing model: ${modelName}...`);
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hola, responde con una sola palabra: OK.");
      console.log(`🟢 ¡Éxito con ${modelName}! Respuesta:`, result.response.text().trim());
      return modelName; // Encontramos uno que funciona!
    } catch (err) {
      console.warn(`❌ Falló ${modelName}. Detalle del error:`, err.message || err);
    }
    console.log("-----------------------------------------");
  }
  console.log("No se encontró ningún modelo con cuota activa.");
  return null;
}

testMultipleModels();
