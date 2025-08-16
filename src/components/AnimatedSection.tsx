import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = '', 
  animation = 'fadeIn', 
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getAnimationClass = () => {
    const baseClasses = 'transition-all duration-1000 ease-out';
    
    if (!isVisible) {
      switch (animation) {
        case 'fadeIn':
          return `${baseClasses} opacity-0`;
        case 'slideUp':
          return `${baseClasses} opacity-0 translate-y-16`;
        case 'slideLeft':
          return `${baseClasses} opacity-0 -translate-x-16`;
        case 'slideRight':
          return `${baseClasses} opacity-0 translate-x-16`;
        case 'scale':
          return `${baseClasses} opacity-0 scale-75`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div ref={ref} className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  );
};