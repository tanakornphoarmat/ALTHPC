import React from 'react';
import { motion } from 'framer-motion';

const ContactUs = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="bg-apex-dark border border-apex-red/30 w-full max-w-lg flex flex-col relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-apex-red/20 flex justify-between items-center bg-black/20">
          <h2 className="text-2xl font-black italic text-white tracking-tighter">ติดต่อเรา</h2>
          <button onClick={onClose} className="text-white hover:text-apex-red transition-colors text-3xl font-light">✕</button>
        </div>
        
        {/* Content */}
        <div className="p-8 md:p-10 font-sans text-gray-300 space-y-6">
          <p className="leading-relaxed">หากคุณมีคำถาม ข้อเสนอแนะ หรือต้องการความช่วยเหลือ สามารถติดต่อทีมงาน ALTH ได้ตามช่องทางดังนี้:</p>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">อีเมล</p>
              <a href="mailto:apexthailandpc@gmail.com" className="text-white font-bold hover:text-apex-red transition-colors text-lg">apexthailandpc@gmail.com</a>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">ช่องทางหลัก</p>
              <a href="https://discord.gg/apex-legends-thailand" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-apex-red transition-colors text-lg">Discord Community</a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactUs;
