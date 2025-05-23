import React from 'react';

export function useSkeleton(lines: number = 3, isLoading: boolean = true) {
  const renderSkeleton = () => {
    if (!isLoading) return null;
    
    return (
      <div className="w-full animate-pulse">
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i}
            className={`h-4 bg-gray-700 rounded mb-3 ${
              i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-5/6' : 'w-4/6'
            }`}
          />
        ))}
      </div>
    );
  };
  
  return { renderSkeleton };
}