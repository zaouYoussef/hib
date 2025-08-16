import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Star, Gift, ChevronLeft, ChevronRight } from 'lucide-react';
import { HeartParticles } from './components/HeartParticles';
import { FloatingHeart } from './components/FloatingHeart';
import { GlowingText } from './components/GlowingText';
import { AnimatedSection } from './components/AnimatedSection';

const PhotoCarousel: React.FC<{ photos: string[]; interval?: number }> = ({ 
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
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl shadow-2xl border-2 border-pink-400/30"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative aspect-video w-full">
        <img
          src={photos[currentIndex]}
          alt={`Memory ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
          <div className="text-center w-full">
            <p className="text-pink-200 text-xl md:text-2xl font-light italic">
              Memory {currentIndex + 1} of {photos.length}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-pink-200 rounded-full p-2 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft size={32} className="fill-pink-200" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-pink-200 rounded-full p-2 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight size={32} className="fill-pink-200" />
      </button>

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

function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const loveReasons = [
    "Your smile lights up my entire world",
    "L3winat fniwnin dylk",
    "Your kindness touches everyone around you",
    "You make every day feel like magic",
    "Your beauty is a gift from the gods",
    "A3sab mara mara"
  ];

  const memories = [
    "Our first conversation",
    "Dabizat o xhal d les blocks",
    "Your beautiful eyes when you look at me",
    "Every little adventure we've shared together",
    "The dreams we whispered under the stars",
    "All the memories yet to be written"
  ];

  const photos = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
    "/images/img6.jpg",
    "/images/img7.jpg",
    "/images/img8.jpg",
    "/images/img9.jpg",
    "/images/img10.jpg",
    "/images/img11.jpg",
    "/images/img12.jpg",
    "/images/img13.jpg",
    "/images/img14.jpg",
    "/images/img15.jpg",
    "/images/img16.jpg",
    "/images/img17.jpg",
    "/images/img18.jpg"

  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-pink-900 to-rose-900 overflow-x-hidden text-pink-100">
      <HeartParticles />

      {/* Floating Hearts */}
      {Array.from({ length: 18 }, (_, i) => (
        <FloatingHeart key={i} delay={i * 200} duration={3500 + i * 100} />
      ))}

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        
        {/* Floating rose petals */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i}
              className="absolute text-pink-300/60 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>

        <div
          className={`text-center z-10 transition-all duration-2000 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="mb-8">
            <p className="text-pink-300 text-xl md:text-2xl font-light mb-2 animate-pulse">
              To the love of my life...
            </p>
            <GlowingText className="text-6xl md:text-8xl font-extrabold text-white mb-6">
              Happy Birthday
            </GlowingText>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-1 bg-pink-400 rounded-full"></div>
              <GlowingText
                className="text-4xl md:text-6xl font-light text-pink-200"
                glowColor="rgba(255, 182, 193, 0.8)"
              >
                ACHARKI Hiba
              </GlowingText>
              <div className="w-16 h-1 bg-pink-400 rounded-full"></div>
            </div>
          </div>

          <p className="text-pink-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Today we celebrate the day the world became brighter - the day you were born.
            My heart overflows with love for you on this special day and always kbida dyli ❤️
          </p>

          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-70 animate-pulse"></div>
            <button
              onClick={() => document.getElementById('love-section')?.scrollIntoView()}
              className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-full font-semibold text-lg hover:scale-105 shadow-xl transition-all duration-300 group"
            >
              <span className="flex items-center gap-2 relative z-10">
                Begin Our Love Story <Sparkles className="group-hover:rotate-180 transition-transform duration-1000" size={22} />
              </span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 animate-bounce-slow z-10">
          <div className="flex flex-col items-center">
            <div className="w-1 h-16 bg-gradient-to-b from-pink-300 to-transparent rounded-full"></div>
            <p className="text-pink-300 mt-2 text-sm">Scroll Down</p>
          </div>
        </div>
      </section>

      {/* Love Message Section */}
      <section id="love-section" className="min-h-screen flex items-center justify-center px-4 relative py-20">
        <div className="absolute inset-0 bg-[url('/images/love-pattern.png')] opacity-10"></div>
        
        <AnimatedSection animation="fadeIn" delay={200} className="max-w-4xl w-full">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-600/30 to-purple-600/30 rounded-3xl blur-xl z-0"></div>
            <div className="relative bg-gradient-to-br from-purple-950/80 to-pink-900/80 backdrop-blur-lg rounded-3xl p-10 md:p-16 border border-pink-300/30 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-8 bg-pink-500 px-4 py-2 rounded-b-lg shadow-md z-10">
                <Heart className="text-white fill-white" size={20} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-pink-400 rounded-full"></div>
                  <Sparkles className="text-yellow-300" size={36} />
                  <div className="w-12 h-1 bg-pink-400 rounded-full"></div>
                </div>
                
                <GlowingText className="text-3xl md:text-5xl font-bold text-white mb-8 text-center">
                  My Dearest Love
                </GlowingText>
                
                <div className="border-l-4 border-pink-400 pl-6 mb-8">
                  <p className="text-lg md:text-xl text-pink-100 leading-relaxed mb-6 italic">
                    "On this day, the universe gave me the greatest gift - you."
                  </p>
                  <p className="text-lg md:text-xl text-pink-100 leading-relaxed">
                    As I sit here thinking of you, my heart overflows with emotions too deep for words. 
                    Your birthday is not just a celebration of your birth, but a celebration of the light 
                    you bring into this world and into my life. Every moment with you is a treasure I hold 
                    close to my heart.
                    Kanbghiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiik
                  </p>
                </div>
                
                <div className="flex justify-center mt-12">
                  <div className="bg-pink-500/20 p-4 rounded-full border border-pink-400/30">
                    <Heart className="text-pink-300 fill-pink-300 animate-pulse-glow" size={48} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Reasons I Love You */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <AnimatedSection animation="slideUp" delay={300} className="max-w-6xl w-full">
          <div className="text-center mb-16">
            <GlowingText className="text-4xl md:text-6xl font-bold text-white mb-6">
              Why My Heart Beats For You
            </GlowingText>
            <p className="text-xl text-pink-200 max-w-2xl mx-auto">
              A thousand reasons wouldn't be enough, but here are a few that make my heart skip
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loveReasons.map((reason, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-pink-500/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-6 border border-pink-300/30 hover:border-pink-300/60 transition-all duration-500 hover:scale-105 shadow-lg relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-pink-400/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                    <Heart className="text-white fill-white group-hover:animate-heart-beat" size={28} />
                  </div>
                  <p className="text-pink-100 text-lg font-medium leading-relaxed">
                    {reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Enhanced Sweet Memories Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Background Love Effects */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Floating Hearts */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`bg-heart-${i}`}
              className="absolute text-pink-400/10 animate-float"
              style={{
                fontSize: `${Math.random() * 20 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 15 + 10}s`,
              }}
            >
              ❤️
            </div>
          ))}
          
          {/* Glowing Particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full bg-pink-500/5 animate-float"
              style={{
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 20 + 10}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <AnimatedSection animation="slideLeft" delay={400} className="max-w-6xl w-full z-10">
          {/* Section Title */}
          <div className="text-center mb-16">
            <GlowingText className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Sweet Memories
            </GlowingText>
            <p className="text-xl text-pink-200 max-w-2xl mx-auto">
              Precious moments that I will cherish forever in my heart
            </p>
          </div>

          {/* Central Photo with Love Effects */}
          <div className="flex justify-center mb-16 relative">
            {/* Pulsating Heart Background */}
            <div className="absolute -inset-10 flex items-center justify-center">
              <Heart 
                className="text-pink-500/10 animate-heart-beat absolute" 
                size={380}
              />
            </div>

            {/* Photo Container */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 z-20 group">
              {/* Sparkles Effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={`sparkle-${i}`}
                    className="absolute text-pink-300/80 animate-sparkle"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 15}deg) translateY(-120px)`,
                      animationDelay: `${i * 0.1}s`,
                      fontSize: '18px'
                    }}
                  >
                    ✨
                  </div>
                ))}
              </div>

              {/* Main Photo */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-pink-300/60 shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:border-pink-300/90">
                <img 
                  src="/images/img19.jpg"  // Replace with your image
                  alt="Our special moment"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Rotating Hearts */}
              
            </div>
          </div>

          {/* Memories List - Preserved as requested */}
          <div className="space-y-8 relative z-10">
            {memories.map((memory, index) => (
              <div
                key={index}
                className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-pink-500/30 to-purple-600/30 backdrop-blur-lg rounded-2xl p-6 border border-pink-300/30 hover:border-pink-300/60 transition duration-500 hover:scale-105 group">
                    <p className="text-pink-100 text-xl font-medium text-center italic relative z-10">
                      {memory}
                    </p>
                    <div className="absolute inset-0 bg-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Heart className="text-white fill-white animate-pulse relative z-10" size={28} />
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Photo Gallery */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <AnimatedSection animation="slideUp" delay={300} className="max-w-6xl w-full">
          <div className="text-center mb-16">
            <GlowingText className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Gallery
            </GlowingText>
            <p className="text-xl text-pink-200 max-w-2xl mx-auto">
             Every picture is a love letter written in light. These are not just moments — they are pieces of our forever, captured in time.            </p>
          </div>

          <div className="mb-20">
            <PhotoCarousel photos={photos} interval={6000} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <AnimatedSection key={index} animation="fadeIn" delay={index * 150}>
                <div className="group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-pink-300/40 hover:border-pink-300/80 relative">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={photo}
                      alt={`memory-${index}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                      <p className="text-pink-100 text-sm md:text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Memory {index + 1}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Final Message */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <AnimatedSection animation="scale" delay={500} className="max-w-4xl w-full text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-3xl blur-xl"></div>
            <div className="relative bg-black/30 backdrop-blur-lg rounded-3xl p-10 md:p-16 border border-pink-300/40 shadow-2xl overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"></div>
              
              <div className="relative z-10">
                <GlowingText className="text-3xl md:text-5xl font-bold text-white mb-8">
                  Happy 21st Birthday, My Love!
                </GlowingText>

                <p className="text-lg md:text-xl text-pink-100 leading-relaxed mb-8">
                  As you turn 21, I wish you all the happiness in the world. You are my love, my best
                  friend, my dream come true. May your heart always be as full as mine is when I think
                  of you. Here's to countless more memories, laughter, and love.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <Heart className="text-pink-300 fill-pink-300 animate-pulse-glow" size={36} />
                  <Sparkles className="text-yellow-300 animate-spin" size={32} />
                  <Star className="text-purple-300 fill-purple-300 animate-pulse" size={32} />
                  <Gift className="text-pink-400 animate-bounce" size={32} />
                </div>

                <GlowingText className="text-2xl md:text-3xl font-bold text-pink-200 mb-4">
                  I love you more than words could ever say ❤️
                </GlowingText>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/50 to-transparent z-0"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 text-pink-200 mb-4">
            <span>Made with</span>
            <Heart className="text-pink-300 fill-pink-300 animate-heart-beat" size={20} />
            <span>for the most amazing woman in my life</span>
          </div>
          <p className="text-pink-300/70 text-sm">
            Every moment with you is a blessing I'll never take for granted
          </p>
          <p className="text-pink-300/70 text-sm">
          ZAOUJAL Youssef
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;