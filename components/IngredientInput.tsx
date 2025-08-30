
import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';

interface IngredientInputProps {
  onAdd: (ingredient: string) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g., Chicken breast"
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition"
      />
      <button
        type="submit"
        className="bg-brand-secondary hover:bg-brand-primary text-white font-bold p-3 rounded-lg flex items-center justify-center transition-colors"
        aria-label="Add ingredient"
      >
        <PlusIcon />
      </button>
    </form>
  );
};

export default IngredientInput;
