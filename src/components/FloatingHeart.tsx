import React from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeartProps {
  delay?: number;
  duration?: number;
  size?: number;
}

export const FloatingHeart: React.FC<FloatingHeartProps> = ({ 
  delay = 0, 
  duration = 3000, 
  size = 24 
}) => {
  return (
    <div 
      className="absolute animate-pulse"
      style={{
        animation: `float ${duration}ms infinite ease-in-out`,
        animationDelay: `${delay}ms`,
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
      }}
    >
      <Heart 
        size={size} 
        className="text-pink-300 fill-pink-300 opacity-40" 
        style={{
          filter: 'drop-shadow(0 0 10px rgba(255, 192, 203, 0.5))'
        }}
      />
    </div>
  );
};