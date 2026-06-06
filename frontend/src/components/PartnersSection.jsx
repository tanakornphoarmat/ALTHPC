import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PartnersSection = ({ t }) => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/partners');
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, []);

  const getPlatformIcon = (url) => {
    const className = "w-6 h-6 object-contain";
    const lowerUrl = url.toLowerCase();
    
    // Facebook
    if (lowerUrl.includes('facebook') || lowerUrl.includes('fb.me') || lowerUrl.includes('fb.com')) 
      return <img src="/รูป/fb.webp" alt="FB" className={className} />;
      
    // Instagram
    if (lowerUrl.includes('instagram') || lowerUrl.includes('ig.me')) 
      return <img src="/รูป/ig.png" alt="IG" className={className} />;
      
    // TikTok
    if (lowerUrl.includes('tiktok')) 
      return <img src="/รูป/tiktok.png" alt="TikTok" className={className} />;
      
    // YouTube
    if (lowerUrl.includes('youtube') || lowerUrl.includes('youtu.be')) 
      return <img src="/รูป/yt.png" alt="YT" className={className} />;
      
    // Discord
    if (lowerUrl.includes('discord')) 
      return <img src="/รูป/discord.png" alt="Discord" className={className} />;
      
    return null;
  };

  const renderSocialLinks = (socialsList) => {
    const platforms = [
      { name: 'FB', check: (url) => url.includes('facebook') || url.includes('fb.me') || url.includes('fb.com'), icon: <img src="/รูป/fb.webp" alt="FB" className="w-6 h-6 object-contain" /> },
      { name: 'IG', check: (url) => url.includes('instagram') || url.includes('ig.me'), icon: <img src="/รูป/ig.png" alt="IG" className="w-6 h-6 object-contain" /> },
      { name: 'TikTok', check: (url) => url.includes('tiktok'), icon: <img src="/รูป/tiktok.png" alt="TikTok" className="w-6 h-6 object-contain" /> },
      { name: 'YT', check: (url) => url.includes('youtube') || url.includes('youtu.be'), icon: <img src="/รูป/yt.png" alt="YT" className="w-6 h-6 object-contain" /> },
      { name: 'Discord', check: (url) => url.includes('discord'), icon: <img src="/รูป/discord.png" alt="Discord" className="w-6 h-6 object-contain" /> },
    ];

    return platforms.map((platform, i) => {
      const foundLink = socialsList && socialsList.find(url => platform.check(url.toLowerCase()));
      
      return (
        <a 
          key={i} 
          href={foundLink ? (foundLink.startsWith('http') ? foundLink : `https://${foundLink}`) : '#'} 
          target={foundLink ? "_blank" : undefined}
          rel="noopener noreferrer" 
          className={`text-xl p-2 rounded-full transition-colors flex items-center justify-center ${
            foundLink 
              ? 'bg-white/10 hover:bg-apex-red text-white' 
              : 'bg-white/5 opacity-20 cursor-default'
          }`}
        >
          {platform.icon}
        </a>
      );
    });
  };

  return (
    <section id="partners" className="py-20 bg-apex-dark border-b border-apex-red/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-apex-red/5 blur-[120px] -z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-black italic tracking-tighter text-white text-center mb-12"
        >
          {t.partners.title}
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, borderColor: '#FF4E1D' }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="w-[160px] bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex flex-col items-center gap-3 hover:shadow-[0_0_20px_rgba(255,78,29,0.3)] transition-all duration-300 group"
            >
              <div className="flex items-center justify-center w-full h-24">
                <img 
                  src={partner.image} 
                  alt={partner.name} 
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <h3 className="text-white font-bold text-sm text-center group-hover:text-apex-red transition-colors truncate w-full">{partner.name}</h3>
              <div className="flex gap-2 flex-wrap justify-center">
                {renderSocialLinks(partner.socialsList)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
