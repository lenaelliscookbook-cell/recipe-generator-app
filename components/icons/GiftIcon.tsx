import React from 'react';

const GiftIcon: React.FC<{ className?: string }> = ({ className = "h-8 w-8 text-bonus-icon" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 19.5v-8.25M12 4.5A3.75 3.75 0 006 8.25v3a3.75 3.75 0 006 0v-3A3.75 3.75 0 0012 4.5zm0 0v3.75m0 0h3.75m-3.75 0A3.75 3.75 0 0118 8.25v3a3.75 3.75 0 01-6 0v-3a3.75 3.75 0 016 0zm0 0V4.5m0 3.75h-3.75M3 11.25h18" />
  </svg>
);

export default GiftIcon;
