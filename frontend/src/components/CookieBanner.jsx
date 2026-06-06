import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('alth_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('alth_cookie_consent', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
        >
          <div className="bg-zinc-900 border border-apex-red/30 p-8 md:p-12 rounded-2xl max-w-lg w-full text-center shadow-2xl">
            <h2 className="text-3xl font-black italic text-white mb-6 tracking-tighter">ยินดีต้อนรับสู่ ALTH</h2>
            <p className="text-gray-300 text-lg mb-8 font-sans leading-relaxed">
              เว็บไซต์นี้ใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งาน โดยการเข้าใช้งานต่อถือว่าท่านตกลงยอมรับการใช้คุกกี้ตาม 
              <span className="text-apex-red font-bold"> นโยบายความเป็นส่วนตัว</span> ของเรา
            </p>
            <button 
              onClick={accept}
              className="w-full bg-apex-red text-white py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-apex-red transition-all duration-300 transform hover:scale-105"
            >
              ยอมรับและเข้าสู่เว็บไซต์
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
