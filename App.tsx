import React, { useState, useCallback, useRef } from 'react';
import type { Recipe } from './types';
import { generateRecipe } from './services/geminiService';
import RecipeDisplay from './components/RecipeDisplay';
import BookIcon from './components/icons/BookIcon';
import GiftIcon from './components/icons/GiftIcon';
import XIcon from './components/icons/XIcon';

const WelcomeMessage: React.FC = () => (
  <div className="text-center p-6">
    <div className="flex justify-center mb-4">
      <BookIcon className="h-12 w-12 text-brand-green" />
    </div>
    <h2 className="text-2xl font-bold text-primary-text mb-2">Welcome to the Wellness Kitchen</h2>
    <p className="text-secondary-text mb-6">
      Start your wellness journey here. Enter the ingredients you have on hand and get inspired by delicious recipes.
    </p>
    <hr className="border-t border-gray-200 my-6" />
    <p className="text-secondary-text mb-6">
      The recipes you'll discover are inspired by wellness principles designed to help you feel your best. This app is your digital companion for a healthier, more balanced lifestyle, turning the ingredients you have into nourishing meals.
    </p>
    <div className="bg-bonus-bg border border-bonus-border rounded-lg p-4 flex items-center gap-4 text-left">
      <GiftIcon className="h-10 w-10 text-bonus-icon flex-shrink-0"/>
      <div>
        <h3 className="font-bold text-primary-text">Your Exclusive Bonus</h3>
        <p className="text-secondary-text text-sm">
          This app is your special gift to complement your cookbook, helping you bring delicious, healthy recipes from the page to your plate. Enjoy your journey to wellness!
        </p>
      </div>
    </div>
  </div>
);


const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [mealType, setMealType] = useState<string>('Any');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string>('None');

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGenerateRecipe = useCallback(async () => {
    if (ingredients.length === 0) {
      setError('Please enter at least one ingredient.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipe(null);
    setHasGenerated(true);

    try {
      const generatedRecipe = await generateRecipe(ingredients.join(', '), mealType, dietaryRestrictions);
      setRecipe(generatedRecipe);
    } catch (err) {
      console.error(err);
      setError('Failed to generate a recipe. The culinary AI might be busy. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, mealType, dietaryRestrictions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const newIngredient = inputValue.trim();
      if (newIngredient && !ingredients.includes(newIngredient)) {
        setIngredients([...ingredients, newIngredient]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && inputValue === '' && ingredients.length > 0) {
      handleRemoveIngredient(ingredients[ingredients.length - 1]);
    }
  };
  
  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };
  
  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-background font-sans text-primary-text p-4 md:p-8">
      <header className="text-center mb-10">
        <div className="inline-block">
            <BookIcon />
        </div>
        <h1 className="text-4xl font-bold text-brand-green mt-2">Wellness Kitchen</h1>
        <p className="text-secondary-text mt-1">Recipes to find your balance.</p>
      </header>

      <main className="max-w-2xl mx-auto space-y-8">
        <div className="bg-form-bg p-6 md:p-8 rounded-lg shadow-md border border-form-border">
          <div className="space-y-6">
            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-primary-text mb-1">
                Enter your ingredients (press Enter or comma to add)
              </label>
              <div 
                className="w-full p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-brand-green focus-within:border-transparent transition flex flex-wrap items-center gap-2"
                onClick={focusInput}
              >
                {ingredients.map((ingredient) => (
                  <div key={ingredient} className="bg-button-bg/80 text-white text-sm font-semibold pl-3 pr-2 py-1 rounded-md flex items-center gap-1.5">
                    <span>{ingredient}</span>
                    <button
                      onClick={() => handleRemoveIngredient(ingredient)}
                      className="text-white hover:bg-black/20 rounded-full p-0.5"
                      aria-label={`Remove ${ingredient}`}
                    >
                      <XIcon />
                    </button>
                  </div>
                ))}
                <input
                  ref={inputRef}
                  id="ingredients"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={ingredients.length === 0 ? "e.g., chicken, rice, tomatoes" : ""}
                  className="flex-grow bg-transparent outline-none p-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="mealType" className="block text-sm font-medium text-primary-text mb-1">
                  Meal Type
                </label>
                <select
                  id="mealType"
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition bg-white"
                >
                  <option>Any</option>
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                  <option>Dessert</option>
                </select>
              </div>
              <div>
                <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-primary-text mb-1">
                  Dietary Restrictions
                </label>
                <select
                  id="dietaryRestrictions"
                  value={dietaryRestrictions}
                  onChange={(e) => setDietaryRestrictions(e.target.value)}
                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition bg-white"
                >
                  <option>None</option>
                  <option>Vegetarian</option>
                  <option>Vegan</option>
                  <option>Gluten-Free</option>
                  <option>Dairy-Free</option>
                  <option>Keto</option>
                  <option>Paleo</option>
                  <option>Pescatarian</option>
                  <option>Mediterranean</option>
                  <option>Low-Carb</option>
                  <option>Low-Fat</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateRecipe}
              disabled={isLoading || ingredients.length === 0}
              className="w-full bg-button-bg hover:bg-button-hover-bg text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? 'Generating...' : 'Generate Recipes'}
            </button>
          </div>
        </div>

        <div className="bg-form-bg p-2 rounded-lg shadow-md border-2 border-dashed border-gray-300">
           {hasGenerated ? (
             <RecipeDisplay recipe={recipe} isLoading={isLoading} error={error} />
           ) : (
             <WelcomeMessage />
           )}
        </div>
      </main>
    </div>
  );
};

export default App;