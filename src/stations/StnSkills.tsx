import { motion } from 'framer-motion';
import { BookOpen, Clapperboard, Droplet, Music, Palette, Sparkles } from 'lucide-react';

const SKILLS = [
  { n: '01', name: 'VIDEO EDITING', desc: 'Cuts · structure · pacing', icon: Clapperboard, color: '#4DA3FF' },
  { n: '02', name: 'MOTION GRAPHICS', desc: 'Type · shape · movement', icon: Sparkles, color: '#7C5CFF' },
  { n: '03', name: 'VISUAL DESIGN', desc: 'Frames · layout · detail', icon: Palette, color: '#E34BA9' },
  { n: '04', name: 'VISUAL STORYTELLING', desc: 'Narrative · emotion · flow', icon: BookOpen, color: '#FF7A1A' },
  { n: '05', name: 'SOUND DESIGN', desc: 'Music · atmosphere · impact', icon: Music, color: '#FFB224' },
  { n: '06', name: 'COLOR GRADING', desc: 'Tone · mood · finish', icon: Droplet, color: '#4DA3FF' },
];

export default function StnSkills() {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-center overflow-y-auto py-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-4 flex items-center justify-between font-hud text-[9px] tracking-[0.3em] text-silver/60 sm:mb-5 sm:text-[10px]"
      >
        <span>PLATFORM POWER GRID · 6 UNITS</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> ALL OPERATIONAL
        </span>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 pb-28 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:pb-20">
        {SKILLS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.09 }}
              data-cursor={s.n}
              className="group relative"
            >
              <div className="pointer-events-none absolute -top-3 left-1/2 h-8 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-silver/40" />
              <div
                className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-b from-[#101736] to-[#070c1d] p-3 transition-all duration-300 group-hover:-translate-y-1.5 sm:p-4"
                style={{ boxShadow: '0 18px 40px -18px rgba(0,0,0,0.9)' }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1 transition-all duration-300"
                  style={{ background: s.color, boxShadow: `0 0 16px 2px ${s.color}` }}
                />
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-black text-bone/15 sm:text-3xl">{s.n}</span>
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-md border transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor: `${s.color}55`, background: `${s.color}14`, color: s.color }}
                  >
                    <Icon size={17} />
                  </span>
                </div>
                <div className="mt-6 min-h-10 font-display text-[13px] font-extrabold leading-tight tracking-[0.08em] text-bone sm:mt-8 sm:min-h-12 sm:text-sm">
                  {s.name}
                </div>
                <div className="mt-1.5 font-hud text-[8px] tracking-[0.14em] text-silver/60 sm:text-[9px]">{s.desc}</div>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <motion.div
                    initial={{ width: '8%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.1, delay: 0.5 + i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${s.color}55, ${s.color})` }}
                  />
                </div>
                <div className="mt-1.5 flex justify-between font-hud text-[8px] tracking-[0.2em] text-silver/50">
                  <span>LOAD</span>
                  <span style={{ color: s.color }}>100%</span>
                </div>
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 30px -12px ${s.color}` }}
                />
              </div>
              <div
                className="mx-auto mt-1.5 h-6 w-3/4 rounded-[50%] blur-[6px] transition-all duration-300 group-hover:w-full"
                style={{ background: `${s.color}22` }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
