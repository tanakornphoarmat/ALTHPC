import React, { useState, useEffect } from 'react';
import HeroSlider from './components/HeroSlider';
import Navbar from './components/Navbar';
import PartnersSection from './components/PartnersSection';
import VideoHighlights from './components/VideoHighlights';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ContactUs from './components/ContactUs';
import CookieBanner from './components/CookieBanner';
import TournamentCalendar from './components/TournamentCalendar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, 
  Gamepad2, 
  Trophy, 
  Megaphone, 
  ChevronRight 
} from 'lucide-react';

// Translation Dictionary
const translations = {
  TH: {
    nav: {
      home: 'หน้าหลัก',
      news: 'ข่าวสาร',
      patch: 'อัปเดตเกม',
      esports: 'อีสปอร์ต',
      partners: 'พาร์ทเนอร์',
      join: 'เข้าสู่ DISCORD'
    },
    hero: {
      community: 'THAILAND PUBLIC COMMUNITY',
      title: 'CHAMPION SQUAD',
      desc: 'ศูนย์รวมผู้เล่น Apex Legends ที่ใหญ่ที่สุดในไทย ประกาศข่าวสาร กิจกรรม และพาร์ทเนอร์ระดับมืออาชีพ'
    },
    news: {
      transmission: 'TRANSMISSION',
      title: 'ข่าวสารและอัปเดต',
      all: 'ข่าวทั้งหมด',
      patch: 'อัปเดตเกม',
      esports: 'อีสปอร์ตไทย',
      events: 'กิจกรรมพิเศษ',
      readMore: 'อ่านเนื้อหาเต็ม'
    },
    highlights: {
      title: 'COMMUNITY HIGHLIGHTS',
      desc: 'รับชมวิดีโอไฮไลท์การเล่น เทคนิค และกิจกรรมจากสตรีมเมอร์ในคอมมูนิตี้ของเรา',
      watchAll: 'ชมวิดีโอทั้งหมด'
    },
    partners: {
      coalition: 'COALITION',
      title: 'พาร์ทเนอร์อย่างเป็นทางการ'
    }
  },
  EN: {
    nav: {
      home: 'HOME',
      news: 'NEWS',
      patch: 'PATCH NOTES',
      esports: 'ESPORTS',
      partners: 'PARTNERS',
      join: 'JOIN DISCORD'
    },
    hero: {
      community: 'THAILAND PUBLIC COMMUNITY',
      title: 'CHAMPION SQUAD',
      desc: 'The largest Apex Legends community in Thailand. Get latest news, events, and professional partnerships.'
    },
    news: {
      transmission: 'TRANSMISSION',
      title: 'NEWS & UPDATES',
      all: 'ALL NEWS',
      patch: 'GAME UPDATES',
      esports: 'THAI ESPORTS',
      events: 'SPECIAL EVENTS',
      readMore: 'READ FULL LOG'
    },
    highlights: {
      title: 'COMMUNITY HIGHLIGHTS',
      desc: 'Watch gameplay highlights, tips, and events from our community streamers.',
      watchAll: 'WATCH ALL VIDEOS'
    },
    partners: {
      coalition: 'COALITION',
      title: 'OFFICIAL PARTNERS'
    }
  }
};

function App() {
  const [lang, setLang] = useState('TH');
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [newsSearchTerm, setNewsSearchTerm] = useState('');
  const [selectedNews, setSelectedNews] = useState(null); 
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showContact, setShowContact] = useState(false); 

  const t = translations[lang];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      setActiveCategory(category);
    }
    
    const fetchNews = async () => {
      try {
        const response = await fetch('https://api.alth-publiccommunity.xyz/api/news');
        if (!response.ok) throw new Error("API News Error");
        const data = await response.json();
        setNews(data);
        setLoadingNews(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoadingNews(false);
      }
    };
    fetchNews();
  }, []);

  const categories = [
    { id: 'ALL', label: t.news.all, icon: <Newspaper size={18} /> },
    { id: 'GAME', label: t.news.patch, icon: <Gamepad2 size={18} /> },
    { id: 'ESPORTS', label: t.news.esports, icon: <Trophy size={18} /> },
    { id: 'EVENT', label: t.news.events, icon: <Megaphone size={18} /> },
  ];

  const filteredNews = news
    .filter(item => activeCategory === 'ALL' || item.category === activeCategory)
    .filter(item => 
      item.title.toLowerCase().includes(newsSearchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(newsSearchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen flex flex-col bg-apex-dark text-white font-apex uppercase tracking-wider overflow-x-hidden">
      <Navbar lang={lang} setLang={setLang} t={t} />

      <div className="flex flex-1 relative flex-col pt-16">
        <section id="home">
          <HeroSlider />
        </section>

        <main className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
          
          <section id="news" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-apex-red text-xl font-bold tracking-[0.3em] mb-2 flex items-center gap-2">
                  <span className="w-8 h-1 bg-apex-red"></span> {t.news.transmission}
                </h3>
                <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter">{t.news.title}</h2>
              </motion.div>
              
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="ค้นหาข่าว..."
                  className="bg-zinc-900 border border-white/10 px-4 py-2 text-white w-full md:w-64 focus:border-apex-red outline-none"
                  value={newsSearchTerm}
                  onChange={(e) => setNewsSearchTerm(e.target.value)}
                />
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-2 px-6 py-2 border-2 transition-all skew-x-[-15deg] font-bold ${
                        activeCategory === cat.id 
                        ? 'bg-apex-red border-apex-red text-white' 
                        : 'border-white/10 hover:border-apex-red text-gray-400 hover:text-white'
                      }`}
                    >
                      <span className="skew-x-[15deg] flex items-center gap-2">
                        {cat.icon} {cat.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {loadingNews ? (
                  [1, 2, 3].map(i => (
                    <div key={i} className="h-[450px] bg-zinc-900/50 animate-pulse border border-white/5 skew-x-[-2deg]"></div>
                  ))
                ) : filteredNews.length > 0 ? (
                  filteredNews.map((item, index) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.1 }}
                      key={item.id} 
                      onClick={() => setSelectedNews(item)}
                      className="apex-card group cursor-pointer hover:border-white transition-all bg-zinc-900/40 backdrop-blur-sm border-r-4 border-b-4 border-white/5 hover:border-apex-red hover:bg-zinc-800/60"
                    >
                      <div className="h-56 bg-zinc-800 mb-6 overflow-hidden relative skew-x-[-1deg]">
                         {item.image ? (
                           <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-zinc-700 italic">NO_MEDIA_FOUND</div>
                         )}
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                         <div className="absolute top-4 left-4 text-[10px] bg-apex-red px-3 py-1 font-bold shadow-lg">DISCORD_FEED_LIVE</div>
                      </div>
                      
                      <h4 className="text-3xl font-black mb-3 group-hover:text-apex-red transition-colors leading-none tracking-tighter">
                        {item.title}
                      </h4>
                      
                      <p className="text-gray-400 text-sm normal-case mb-8 font-sans line-clamp-3 leading-relaxed border-l border-white/10 pl-4">
                        {item.content}
                      </p>
                      
                      <div className="flex justify-between items-center text-[11px] text-gray-500 pt-4 border-t border-white/10 font-bold">
                        <span className="flex items-center gap-2 tracking-widest">
                          <span className="w-2 h-2 bg-apex-red animate-pulse"></span>
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1 text-apex-red group-hover:translate-x-2 transition-transform">
                          {t.news.readMore} <ChevronRight size={14} />
                        </span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5">
                    <p className="text-2xl text-zinc-700 italic">WAITING FOR TRANSMISSIONS...</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </section>
          
          <TournamentCalendar />
          
          <VideoHighlights t={t} />

          <PartnersSection t={t} />

          {/* Popup Modal */}
          {selectedNews && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setSelectedNews(null)}>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-zinc-950 border border-apex-red/30 w-full max-w-4xl max-h-[95vh] shadow-[0_0_50px_rgba(255,78,29,0.2)] flex flex-col relative"
              >
                <button onClick={() => setSelectedNews(null)} className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-apex-red text-white transition-colors">
                  ✕
                </button>
                
                {selectedNews.image && (
                  <div className="w-full h-72 md:h-96 overflow-hidden flex-shrink-0">
                    <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-contain" />
                  </div>
                )}
                
                <div className="p-8 md:p-12 overflow-y-auto flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 bg-apex-red text-white text-xs font-bold tracking-widest">{selectedNews.category}</span>
                    <span className="text-gray-500 text-sm">{selectedNews.date}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black italic mb-8 text-white leading-tight tracking-tight">{selectedNews.title}</h2>
                  <div className="text-gray-300 text-lg font-sans leading-relaxed whitespace-pre-wrap break-words border-l-2 border-apex-red pl-6 mb-8">
                    {selectedNews.content}
                  </div>
                  {selectedNews.links && selectedNews.links.length > 0 && (
                    <div className="flex gap-4">
                      {selectedNews.links.map((link, index) => (
                        <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="bg-apex-red text-white px-6 py-2 rounded-lg font-bold hover:bg-white hover:text-apex-red transition-colors">
                          LINK {index + 1}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
          
          {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
          {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
          {showContact && <ContactUs onClose={() => setShowContact(false)} />}
          
          <CookieBanner />
        </main>
      </div>

      {/* Footer */}
      <footer className="py-16 px-12 border-t border-white/5 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-apex-red/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
             <img src="/รูป/logo.png" alt="ALTH Logo" className="h-20 w-auto grayscale brightness-50" />
             <p className="text-gray-600 max-w-sm text-center md:text-left text-sm normal-case font-sans">
               {lang === 'TH' ? 'คอมมูนิตี้ Apex Legends ที่ใหญ่ที่สุดในประเทศไทย แหล่งรวมข่าวสาร การแข่งขัน และมิตรภาพ' : 'The largest Apex Legends community in Thailand. A hub for news, competitions, and friendship.'}
             </p>
          </div>
          
          <div className="text-center md:text-right space-y-4">
            <div className="bg-zinc-900/50 p-2 border border-white/10 rounded-lg shadow-2xl mb-4 mx-auto md:mx-0 inline-block">
              <iframe 
                src="https://discord.com/widget?id=543110414246871052&theme=dark" 
                width="300" 
                height="300" 
                allowTransparency="true" 
                frameBorder="0" 
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                title="Discord Widget"
              ></iframe>
            </div>
            <p className="text-gray-500 text-sm tracking-[0.2em] font-bold">
              &copy; 2026 APEX LEGENDS THAILAND PUBLIC COMMUNITY
            </p>
            <div className="flex justify-center md:justify-end gap-6 text-gray-700 font-bold text-sm">
              <button onClick={() => setShowPrivacy(true)} className="hover:text-apex-red transition-colors">{lang === 'TH' ? 'นโยบายความเป็นส่วนตัว' : 'PRIVACY POLICY'}</button>
              <button onClick={() => setShowTerms(true)} className="hover:text-apex-red transition-colors">{lang === 'TH' ? 'เงื่อนไขการใช้งาน' : 'TERMS OF SERVICE'}</button>
              <button onClick={() => setShowContact(true)} className="hover:text-apex-red transition-colors">{lang === 'TH' ? 'ติดต่อเรา' : 'CONTACT US'}</button>
            </div>
            <p className="text-xs text-zinc-500 pt-4 border-t border-white/5 leading-relaxed">
              NOT AN OFFICIAL ELECTRONIC ARTS OR RESPAWN ENTERTAINMENT PRODUCT.<br />
              VISIT THE <a href="https://www.ea.com/games/apex-legends/apex-legends" target="_blank" rel="noopener noreferrer" className="text-apex-red hover:underline">OFFICIAL APEX LEGENDS WEBSITE</a> FOR GAME INFORMATION.
            </p>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .apex-card {
          position: relative;
          clip-path: polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%);
        }
      `}} />
    </div>
  );
}

export default App;
