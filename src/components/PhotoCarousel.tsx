import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoCarouselProps {
  photos: string[];
  interval?: number;
}

export const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ 
  photos, 
  interval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let slideInterval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      slideInterval = setInterval(() => {
        goToNext();
      }, interval);
    }

    return () => clearInterval(slideInterval);
  }, [currentIndex, isAutoPlaying, interval]);

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl shadow-2xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main Image */}
      <div className="relative aspect-video w-full">
        <img
          src={photos[currentIndex]}
          alt={`Memory ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
          <div className="text-center w-full">
            <p className="text-pink-200 text-xl md:text-2xl font-light italic">
              Memory {currentIndex + 1} of {photos.length}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-pink-200 rounded-full p-2 transition-all duration-300"
      >
        <ChevronLeft size={32} className="fill-pink-200" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-pink-200 rounded-full p-2 transition-all duration-300"
      >
        <ChevronRight size={32} className="fill-pink-200" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-pink-400 scale-125' 
                : 'bg-pink-200/50 hover:bg-pink-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};