import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-green"></div>
      <p className="text-secondary-text font-semibold">Preparing your recipe...</p>
    </div>
  );
};

export default Loader;