import React from 'react';
import type { Recipe } from '../types';
import Loader from './Loader';

interface RecipeDisplayProps {
  recipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, isLoading, error }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg m-4">
        <h3 className="font-bold">Oops!</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <h3 className="text-2xl font-bold text-primary-text text-center">{recipe.recipeName}</h3>
      <p className="text-secondary-text text-center italic">{recipe.description}</p>
      
      <div className="pt-4">
        <h4 className="text-lg font-semibold mb-2 border-b-2 border-gray-200 pb-1 text-brand-green">Ingredients</h4>
        <ul className="list-disc list-inside space-y-1 text-primary-text">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="pt-4">
        <h4 className="text-lg font-semibold mb-2 border-b-2 border-gray-200 pb-1 text-brand-green">Instructions</h4>
        <ol className="list-decimal list-inside space-y-2 text-primary-text">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDisplay;