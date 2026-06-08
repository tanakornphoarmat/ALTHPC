import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const VideoHighlights = ({ t }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://api.alth-publiccommunity.xyz/api/videos');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  const getVideoInfo = (url) => {
    // YouTube thumbnail logic
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      const videoId = match[2];
      return {
        embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      };
    }
    
    // TikTok support
    if (url.includes('tiktok.com')) {
      return {
        embedUrl: url,
        thumbnailUrl: '/รูป/tiktok.png' // ใช้โลโก้ tiktok เป็นรูปหน้าปก
      };
    }
    
    // Fallback for other links
    return { 
      embedUrl: url, 
      thumbnailUrl: '/รูป/m.png' // ใช้ m.png เป็นรูปแทนสำหรับวิดีโอทั่วไป
    };
  };

  const [activeVideoId, setActiveVideoId] = useState(null);
  const timerRef = useRef(null);

  const handleMouseEnter = (id) => {
    setActiveVideoId(id);
    
    // Clear any existing timer
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Set timer to stop after 7 seconds
    timerRef.current = setTimeout(() => {
      setActiveVideoId(null);
    }, 7000);
  };

  const handleMouseLeave = () => {
    setActiveVideoId(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <h3 className="text-apex-red text-xl font-bold tracking-[0.3em] mb-12 flex items-center gap-2">
        <span className="w-8 h-1 bg-apex-red"></span> VIDEO HIGHLIGHTS
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.slice(0, 5).map((video) => {
          const { embedUrl, thumbnailUrl } = getVideoInfo(video.url);
          const isTikTok = video.url.includes('tiktok.com');
          
          return (
            <motion.div
              key={video.id}
              className="relative h-64 bg-zinc-900 border border-white/10 overflow-hidden cursor-pointer group"
              onMouseEnter={() => !isTikTok && handleMouseEnter(video.id)}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.02 }}
              onClick={() => isTikTok && window.open(video.url, '_blank')}
            >
              {activeVideoId === video.id ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  title={video.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              ) : (
                <>
                  {thumbnailUrl ? (
                    <img src={thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-zinc-800 text-gray-500 font-bold">
                      {video.title}
                    </div>
                  )}
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default VideoHighlights;
