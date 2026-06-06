import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = ({ onClose }) => {
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
        className="bg-apex-dark border border-apex-red/30 w-full max-w-4xl max-h-[90vh] flex flex-col relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-apex-red/20 flex justify-between items-center bg-black/20">
          <h2 className="text-2xl font-black italic text-white tracking-tighter">ข้อกำหนดและนโยบายความเป็นส่วนตัว</h2>
          <button onClick={onClose} className="text-white hover:text-apex-red transition-colors text-3xl font-light">✕</button>
        </div>
        
        {/* Content */}
        <div className="p-8 md:p-12 overflow-y-auto font-sans text-gray-300 space-y-8">
          <p className="text-apex-red italic font-bold">ปรับปรุงล่าสุด: 2 พฤษภาคม 2026</p>
          
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest border-l-4 border-apex-red pl-4">1. การใช้งาน ALTH</h3>
            <p className="leading-relaxed">ALTH เป็นชุมชนผู้เล่น Apex Legends ในประเทศไทย เว็บไซต์นี้เปิดให้ใช้งานเพื่อรับข่าวสารและร่วมกิจกรรม โดยห้ามนำไปใช้เพื่อสแปม คุกคามผู้อื่น หรือกิจกรรมที่ขัดต่อกฎหมาย</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest border-l-4 border-apex-red pl-4">2. เนื้อหาและพฤติกรรม</h3>
            <p className="leading-relaxed">ห้ามโพสต์หรือแชร์เนื้อหาที่ไม่เหมาะสมหรือละเมิดลิขสิทธิ์ ทีมงานขอสงวนสิทธิ์ในการจัดการเนื้อหาที่ละเมิดกฎโดยไม่ต้องแจ้งล่วงหน้าเพื่อรักษาบรรยากาศที่ดีของชุมชน</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest border-l-4 border-apex-red pl-4">3. คุกกี้และข้อมูลในเครื่อง</h3>
            <p className="leading-relaxed">เว็บไซต์ใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งาน โดยไม่มีการใช้ตัวติดตามจากบุคคลที่สาม</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-400 border border-white/10 mt-2">
                <thead className="bg-apex-red/10">
                  <tr className="text-white">
                    <th className="p-3 text-left">ชื่อคุกกี้</th>
                    <th className="p-3 text-left">วัตถุประสงค์</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="p-3 font-mono text-apex-red">alth_cookie_consent</td><td className="p-3">บันทึกการยอมรับคุกกี้</td></tr>
                  <tr><td className="p-3 font-mono text-apex-red">i18nextLng</td><td className="p-3">จดจำภาษาที่เลือก</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest border-l-4 border-apex-red pl-4">4. การติดต่อ</h3>
            <p>หากมีข้อสงสัย ติดต่อทีมงานได้ผ่านทาง Discord ของเรา</p>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyPolicy;
