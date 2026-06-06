import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = ({ onClose }) => {
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
          <h2 className="text-2xl font-black italic text-white tracking-tighter">เงื่อนไขการใช้งาน</h2>
          <button onClick={onClose} className="text-white hover:text-apex-red transition-colors text-3xl font-light">✕</button>
        </div>
        
        {/* Content */}
        <div className="p-8 md:p-12 overflow-y-auto font-sans text-gray-300 space-y-8">
          <p className="text-apex-red italic font-bold">ปรับปรุงล่าสุด: 2 พฤษภาคม 2026</p>
          
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest border-l-4 border-apex-red pl-4">1. ยอมรับข้อกำหนด</h3>
            <p className="leading-relaxed">การที่คุณเข้าใช้เว็บไซต์ ALTH ถือว่าคุณยอมรับและตกลงปฏิบัติตามข้อกำหนดและเงื่อนไขเหล่านี้ หากคุณไม่ยอมรับเงื่อนไข โปรดหยุดการใช้งานเว็บไซต์ทันที</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest border-l-4 border-apex-red pl-4">2. การใช้งานเว็บไซต์</h3>
            <p className="leading-relaxed">ALTH เป็นชุมชนผู้เล่น Apex Legends ในประเทศไทย เราให้บริการข่าวสารและกิจกรรมเพื่อสมาชิก ห้ามนำเว็บไซต์ไปใช้ในทางที่ผิดกฎหมาย หรือทำลายความสงบสุขของชุมชน เช่น การสแปม การฉ้อโกง หรือการคุกคามผู้อื่น</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest border-l-4 border-apex-red pl-4">3. ทรัพย์สินทางปัญญา</h3>
            <p className="leading-relaxed">เนื้อหาบางส่วนในเว็บไซต์ (เช่น โลโก้เกม, ภาพตัวละคร) เป็นลิขสิทธิ์ของ Electronic Arts (EA) และ Respawn Entertainment เว็บไซต์นี้เป็นเพียงแฟนไซต์ชุมชนเท่านั้น</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest border-l-4 border-apex-red pl-4">4. การจำกัดความรับผิดชอบ</h3>
            <p className="leading-relaxed">เราไม่รับผิดชอบต่อความเสียหายที่เกิดขึ้นจากการใช้งานเว็บไซต์ หรือลิงก์ภายนอกที่เราอ้างอิงถึง โปรดใช้วิจารณญาณและระมัดระวังในการใช้งาน</p>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TermsOfService;
