import { motion } from 'framer-motion';
import { ArrowRight, Layers, Paintbrush, Rocket, Search } from 'lucide-react';

const STEPS = [
  { n: '01', name: 'UNDERSTAND', items: ['Footage', 'Idea', 'Audience', 'References', 'Purpose'], icon: Search, color: '#4DA3FF' },
  { n: '02', name: 'BUILD', items: ['Cuts', 'Structure', 'Pacing', 'Storytelling', 'Flow'], icon: Layers, color: '#7C5CFF' },
  {
    n: '03',
    name: 'POLISH',
    items: ['Motion graphics', 'Typography', 'Sound design', 'Color grading', 'Visual details'],
    icon: Paintbrush,
    color: '#E34BA9',
  },
  { n: '04', name: 'DELIVER', items: ['Review', 'Cleanup', 'Export', 'Final delivery'], icon: Rocket, color: '#FFB224' },
];

interface Props {
  onNext: () => void;
}

export default function StnProcess({ onNext }: Props) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-center overflow-y-auto py-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-4 text-center sm:mb-5"
      >
        <div className="font-hud text-[9px] tracking-[0.4em] text-ember sm:text-[10px]">TRACK SECTION · 4 ARCHES</div>
        <h3 className="mt-1 font-display text-xl font-black tracking-[0.12em] text-bone sm:text-2xl">
          HOW I BUILD VIDEOS
        </h3>
      </motion.div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-electric/50 via-violet/50 via-50% to-amber/50 lg:block" />
        <div className="absolute left-4 right-4 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-electric/50 via-magenta/40 to-amber/50 lg:hidden" />
        <div className="grid gap-3 pb-28 sm:gap-4 md:grid-cols-2 lg:grid-cols-4 lg:pb-24">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 44 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
                data-cursor={s.n}
                className="relative rounded-t-[90px] rounded-b-xl border border-white/10 bg-gradient-to-b from-[#101736] to-[#060a18] px-4 pb-4 pt-8 text-center sm:pt-10"
              >
                <div
                  className="pointer-events-none absolute inset-x-6 top-3 h-16 rounded-t-[70px] border border-b opacity-60 sm:h-20"
                  style={{ borderColor: `${s.color}44` }}
                />
                <span
                  className="relative mx-auto flex h-11 w-11 items-center justify-center rounded-full border"
                  style={{ borderColor: `${s.color}66`, background: `${s.color}12`, color: s.color }}
                >
                  <Icon size={18} />
                </span>
                <div className="mt-2 font-hud text-[10px] tracking-[0.35em]" style={{ color: s.color }}>
                  {s.n}
                </div>
                <div className="mt-0.5 font-display text-base font-black tracking-[0.14em] text-bone sm:text-lg">
                  {s.name}
                </div>
                <ul className="mt-2.5 space-y-1 border-t border-white/[0.07] pt-2.5">
                  {s.items.map((it) => (
                    <li key={it} className="font-hud text-[9px] tracking-[0.16em] text-silver/75 sm:text-[10px]">
                      {it.toUpperCase()}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center pb-24 lg:pb-16">
        <button
          type="button"
          onClick={onNext}
          data-cursor="BOARD"
          className="group inline-flex items-center gap-2.5 rounded-md border border-amber/60 bg-amber/10 px-6 py-3 font-display text-[13px] font-extrabold tracking-[0.25em] text-amber transition-all hover:bg-amber/20"
        >
          BOARD THE VIDEO CARRIAGE
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
