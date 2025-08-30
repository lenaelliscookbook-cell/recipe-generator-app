
import React from 'react';
import XIcon from './icons/XIcon';

interface IngredientListProps {
  ingredients: string[];
  onRemove: (ingredient: string) => void;
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients, onRemove }) => {
  if (ingredients.length === 0) {
    return <p className="text-gray-500 mt-4 text-center">Add some ingredients to get started!</p>;
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {ingredients.map((ingredient) => (
        <div
          key={ingredient}
          className="flex items-center bg-green-100 text-green-800 text-sm font-semibold px-3 py-1.5 rounded-full"
        >
          <span>{ingredient}</span>
          <button
            onClick={() => onRemove(ingredient)}
            className="ml-2 text-green-600 hover:text-green-800"
            aria-label={`Remove ${ingredient}`}
          >
            <XIcon />
          </button>
        </div>
      ))}
    </div>
  );
};

export default IngredientList;
