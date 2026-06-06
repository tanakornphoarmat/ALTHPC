import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { ImageIcon } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDiscordImages = async () => {
      try {
        const response = await fetch('https://althpc-production.up.railway.app/api/slides');
        if (!response.ok) throw new Error("API not responding");
        let data = await response.json();
        
        // Ensure we always have 3 slides, using placeholders if needed
        const placeholders = [
          { url: 'https://images.alphacoders.com/100/1006443.jpg', title: 'DISCORD SYNC 1' },
          { url: 'https://images.alphacoders.com/600/600762.jpg', title: 'DISCORD SYNC 2' },
          { url: 'https://images.alphacoders.com/832/832449.jpg', title: 'DISCORD SYNC 3' },
        ];
        
        let finalSlides = [];
        if (data && data.length > 0) {
          finalSlides = data.slice(0, 3);
        }
        
        // Fill the rest with placeholders if less than 3
        while (finalSlides.length < 3) {
          finalSlides.push(placeholders[finalSlides.length]);
        }
        
        setSlides(finalSlides);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Discord images:", error);
        // Fallback to placeholders on error
        setSlides([
          { url: 'https://images.alphacoders.com/100/1006443.jpg', title: 'DISCORD SYNC 1' },
          { url: 'https://images.alphacoders.com/600/600762.jpg', title: 'DISCORD SYNC 2' },
          { url: 'https://images.alphacoders.com/832/832449.jpg', title: 'DISCORD SYNC 3' },
        ]);
        setLoading(false);
      }
    };

    fetchDiscordImages();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] w-full flex items-center justify-center bg-zinc-900 border-b border-apex-red/20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-apex-red border-t-transparent rounded-full animate-spin"></div>
          <p className="text-apex-red animate-pulse">SYNCING WITH DISCORD...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden border-b border-apex-red/20">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: '.custom-pagination' }}
        loop={true}
        speed={1000}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Image with Dark Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110"
                style={{ backgroundImage: `url(${slide.url})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-apex-dark via-apex-dark/40 to-transparent"></div>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Content */}
              {/* Content removed per request */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom UI Elements */}
      <div className="absolute bottom-10 left-0 w-full z-10 flex justify-center">
        <div className="custom-pagination flex gap-2"></div>
      </div>

      {/* Slanted Edge Overlays */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-apex-red/10 -translate-x-16 -translate-y-16 rotate-45 pointer-events-none border border-apex-red/20"></div>
      <div className="absolute bottom-0 right-0 w-48 h-12 bg-apex-red/20 skew-x-[-45deg] translate-x-12 pointer-events-none"></div>
    </div>
  );
};

export default HeroSlider;
