import React, { useState, useEffect } from 'react';
import { Trophy, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

const TournamentCalendar = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/tournaments');
        if (!response.ok) throw new Error("API Tournaments Error");
        const data = await response.json();
        setTournaments(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
        setLoading(false);
      }
    };
    fetchTournaments();
  }, []);

  const filteredTournaments = tournaments.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayTournaments = searchTerm ? filteredTournaments : filteredTournaments.slice(0, 5);

  if (loading) return null;
  if (tournaments.length === 0) return null;

  return (
    <section id="tournaments" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter flex items-center gap-4">
          <Trophy className="text-apex-red" size={40} />
          TOURNAMENT CALENDAR
        </h2>
        <input
          type="text"
          placeholder="ค้นหารายการแข่งขัน..."
          className="bg-zinc-900 border border-white/10 px-4 py-2 text-white w-full md:w-64 focus:border-apex-red outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayTournaments.map((t) => (
          <motion.div 
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 p-6 border border-white/5 flex gap-4 items-start"
          >
            <div className="bg-apex-red p-3 text-white">
              <CalendarDays size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-1 text-apex-red">{t.name}</h4>
              <p className="text-sm text-gray-400 mb-2">{t.date}</p>
              <p className="text-sm font-sans mb-2">{t.details}</p>
              {t.link && (
                <a href={t.link} target="_blank" rel="noopener noreferrer" className="text-sm text-white bg-apex-red px-4 py-1 rounded hover:bg-white hover:text-apex-red transition-colors inline-block">
                  สมัคร/ดูข้อมูล
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TournamentCalendar;
