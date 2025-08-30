import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "The name of the recipe."
    },
    description: {
      type: Type.STRING,
      description: "A short, enticing description of the dish."
    },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "An ingredient, including quantity and preparation. e.g. '1 cup of flour, sifted' or '2 large eggs'"
      },
      description: "The list of ingredients required for the recipe. This should include the user-provided ingredients and any necessary pantry staples."
    },
    instructions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "A single step in the cooking instructions."
      },
      description: "Step-by-step instructions to prepare the dish."
    }
  },
  required: ["recipeName", "description", "ingredients", "instructions"],
};

export async function generateRecipe(
  ingredients: string, 
  mealType: string, 
  dietaryRestrictions: string
): Promise<Recipe> {
  let prompt = `You are a creative chef for "Wellness Kitchen", a brand focused on balanced and healthy meals. Based on the following ingredients, generate a single, delicious recipe.`;
  
  if (mealType !== 'Any') {
    prompt += ` The recipe should be for ${mealType}.`;
  }
  
  if (dietaryRestrictions !== 'None') {
    prompt += ` It must also be ${dietaryRestrictions}.`;
  }
  
  prompt += `
  Prioritize using the ingredients provided, but you can assume common pantry staples like salt, pepper, olive oil, and water are available.
  Do not suggest recipes that require many ingredients not on this list.
  Here are the ingredients I have: ${ingredients}.
  Provide the output in the specified JSON format.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      }
    });

    const responseText = response.text.trim();
    const recipeData = JSON.parse(responseText);

    // Basic validation to ensure it looks like our recipe structure
    if (
      !recipeData.recipeName ||
      !Array.isArray(recipeData.ingredients) ||
      !Array.isArray(recipeData.instructions)
    ) {
      throw new Error("Invalid recipe format received from API.");
    }

    return recipeData as Recipe;
  } catch (error) {
    console.error("Error generating recipe from Gemini API:", error);
    throw new Error("Failed to communicate with the recipe AI.");
  }
}