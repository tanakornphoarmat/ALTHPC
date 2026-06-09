import React from 'react';

const Navbar = ({ lang, setLang, t }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-apex-dark/90 backdrop-blur-md border-b border-apex-red/30">
      <div className="flex items-center justify-between w-full px-2">
        <a href="/" className="flex items-center ml-4">
          <img src="/รูป/logoalth.png" alt="ALTH Logo" className="h-20 w-auto" />
        </a>
        <div className="flex items-center gap-6 px-4">
          <div className="flex gap-6 text-sm font-bold tracking-widest text-white/80">
            <a href="#home" className="hover:text-apex-red transition-colors">{t.nav.home}</a>
            <a href="#news" className="hover:text-apex-red transition-colors">{t.nav.news}</a>
            <a href="#partners" className="hover:text-apex-red transition-colors">{t.nav.partners}</a>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-white/60 bg-white/5 p-1 rounded-lg border border-white/10">
            <button onClick={() => setLang('TH')} className={`px-2 py-1 rounded ${lang === 'TH' ? 'bg-apex-red text-white' : 'hover:text-white'}`}>TH</button>
            <span>|</span>
            <button onClick={() => setLang('EN')} className={`px-2 py-1 rounded ${lang === 'EN' ? 'bg-apex-red text-white' : 'hover:text-white'}`}>EN</button>
          </div>
          <a
            href="https://discord.gg/apex-legends-thailand"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-apex-red text-white px-4 py-2 rounded-lg font-bold hover:bg-white hover:text-apex-red transition-colors"
          >
            {t.nav.join}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
