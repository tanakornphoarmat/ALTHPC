import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MetaGuides = ({ t }) => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch('https://api.alth-publiccommunity.xyz/api/guides');
        const data = await response.json();
        setGuides(data);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };
    fetchGuides();
  }, []);

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <h3 className="text-apex-red text-xl font-bold tracking-[0.3em] mb-12 flex items-center gap-2">
        <span className="w-8 h-1 bg-apex-red"></span> GUIDES & META
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <motion.div
            key={guide.id}
            className="bg-zinc-900 border border-white/10 overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-48 overflow-hidden">
              <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold text-white mb-2">{guide.title}</h4>
              <p className="text-gray-400 text-sm font-sans line-clamp-3">{guide.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MetaGuides;
