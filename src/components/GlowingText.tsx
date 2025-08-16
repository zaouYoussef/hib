import React from 'react';

interface GlowingTextProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const GlowingText: React.FC<GlowingTextProps> = ({ 
  children, 
  className = '', 
  glowColor = 'rgba(255, 192, 203, 0.8)' 
}) => {
  return (
    <div 
      className={`${className}`}
      style={{
        textShadow: `
          0 0 10px ${glowColor},
          0 0 20px ${glowColor},
          0 0 30px ${glowColor},
          0 0 40px ${glowColor}
        `
      }}
    >
      {children}
    </div>
  );
};