import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROFILE, STATIONS } from '../lib/types';

interface Props {
  gateOpen: boolean;
  onEnter: () => void;
}

export default function Entrance({ gateOpen, onEnter }: Props) {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#1c2452_0%,#0A1024_45%,#050914_100%)]" />
      <div className="plx-1 absolute inset-x-0 top-[6%] h-72 bg-[radial-gradient(60%_100%_at_50%_50%,rgba(124,92,255,0.28),transparent)]" />
      <div className="plx-2 absolute -left-20 top-[30%] h-72 w-72 rounded-full bg-electric/10 blur-3xl" />
      <div className="plx-2 absolute -right-20 top-[22%] h-72 w-72 rounded-full bg-magenta/10 blur-3xl" />

      <div className="flicker absolute left-[12%] top-[10%] h-1 w-1 rounded-full bg-bone/70" />
      <div className="flicker absolute left-[24%] top-[16%] h-0.5 w-0.5 rounded-full bg-bone/50" style={{ animationDelay: '0.7s' }} />
      <div className="flicker absolute right-[18%] top-[8%] h-1 w-1 rounded-full bg-bone/60" style={{ animationDelay: '1.3s' }} />
      <div className="flicker absolute right-[30%] top-[18%] h-0.5 w-0.5 rounded-full bg-bone/50" style={{ animationDelay: '0.4s' }} />

      <motion.div
        animate={gateOpen ? { scale: 1.14, y: 26 } : { scale: 1, y: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 top-[5%] mx-auto w-[min(1060px,94%)] origin-center sm:top-[7%]"
      >
        <div className="brushed relative rounded-t-xl border border-white/10 px-4 py-3 text-center shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] sm:px-6 sm:py-4">
          <div className="font-hud text-[8px] tracking-[0.5em] text-amber sm:text-[10px]">F1 · FRAMES LINE · NEW DELHI</div>
          <h1 className="mt-1 font-display text-[26px] font-black leading-none tracking-[0.14em] text-bone sm:text-5xl">
            NITESH PORTFOLIO
          </h1>
          <p className="mt-1.5 font-hud text-[8px] tracking-[0.3em] text-electric sm:mt-2 sm:text-xs">
            VIDEO EDITOR & MOTION GRAPHIC DESIGNER
          </p>
          <div className="absolute inset-x-8 bottom-1 h-px bg-gradient-to-r from-transparent via-amber/70 to-transparent sm:inset-x-16" />
        </div>

        <div className="relative flex items-stretch justify-center border-x border-b border-white/10 bg-[#070c1d]/85 sm:grid sm:grid-cols-[1fr_auto_1fr]">
          <div className="hidden min-w-0 flex-1 gap-1 p-3 sm:grid sm:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="glass relative h-24 overflow-hidden rounded-sm border border-white/[0.07] lg:h-28">
                <div className="absolute inset-0 bg-gradient-to-br from-electric/[0.07] via-transparent to-transparent" />
                <div className="absolute -left-4 top-0 h-full w-6 rotate-12 bg-white/[0.05]" />
              </div>
            ))}
          </div>
          <div className="relative w-[228px] shrink-0 py-3 sm:w-[300px] sm:py-4">
            <div className="relative h-44 overflow-hidden rounded-sm border border-amber/30 bg-black sm:h-56">
              <div
                className={`absolute inset-0 bg-[radial-gradient(80%_90%_at_50%_100%,rgba(255,178,36,0.35),rgba(77,163,255,0.12)_45%,#02040a_75%)] transition-opacity duration-1000 ${
                  gateOpen ? 'opacity-100' : 'opacity-70'
                }`}
              />
              <div className="absolute inset-x-8 bottom-6 top-10 rounded-t-full border border-bone/15 bg-gradient-to-b from-bone/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-amber/25 to-transparent" />
              <motion.div
                initial={false}
                animate={{ x: gateOpen ? '-102%' : '0%' }}
                transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
                className="brushed absolute inset-y-0 left-0 w-1/2 border-r border-amber/40"
              >
                <div className="absolute inset-y-4 left-1/2 w-px bg-white/10" />
                <div className="absolute left-1/2 top-6 h-12 w-8 -translate-x-1/2 rounded-sm border border-electric/40 bg-electric/10 sm:h-16" />
              </motion.div>
              <motion.div
                initial={false}
                animate={{ x: gateOpen ? '102%' : '0%' }}
                transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
                className="brushed absolute inset-y-0 right-0 w-1/2 border-l border-amber/40"
              >
                <div className="absolute inset-y-4 left-1/2 w-px bg-white/10" />
                <div className="absolute left-1/2 top-6 h-12 w-8 -translate-x-1/2 rounded-sm border border-electric/40 bg-electric/10 sm:h-16" />
              </motion.div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber via-amber/40 to-amber" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-amber via-amber/40 to-amber" />
            </div>
            <div className="mt-1 flex justify-between font-hud text-[8px] tracking-[0.3em] text-silver/50">
              <span>GATE A</span>
              <span className={gateOpen ? 'text-amber' : ''}>{gateOpen ? 'OPEN' : 'STAND CLEAR'}</span>
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 gap-1 p-3 sm:grid sm:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="glass relative h-24 overflow-hidden rounded-sm border border-white/[0.07] lg:h-28">
                <div className="absolute inset-0 bg-gradient-to-bl from-magenta/[0.07] via-transparent to-transparent" />
                <div className="absolute -right-4 top-0 h-full w-6 -rotate-12 bg-white/[0.05]" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-1 border-x border-white/10 bg-[#0a1024] px-6 py-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-1 flex-1 rounded-full bg-white/[0.06]" />
          ))}
        </div>
        <div className="mx-auto h-8 w-[80%] bg-[radial-gradient(50%_100%_at_50%_0%,rgba(255,178,36,0.28),transparent)]" />
      </motion.div>

      <div className="absolute bottom-[13%] left-[4%] hidden w-44 lg:block">
        <div className="sign-panel rounded-lg p-3">
          <div className="font-hud text-[9px] tracking-[0.3em] text-amber">ROUTE · F1</div>
          <div className="mt-2 space-y-1.5">
            {STATIONS.map((s) => (
              <div key={s.code} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
                <span className="font-hud text-[9px] tracking-[0.15em] text-silver/80">
                  {s.code} · {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-[13%] right-[4%] hidden w-48 lg:block">
        <div className="sign-panel rounded-lg p-3">
          <div className="font-hud text-[9px] tracking-[0.3em] text-electric">NOW SHOWING</div>
          <div className="mt-2 overflow-hidden rounded border border-white/10">
            <img src={PROFILE.photoFallback} alt={PROFILE.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="mt-2 font-display text-xs font-bold text-bone">RESIDENT EDITOR · {PROFILE.name.toUpperCase()}</div>
          <div className="font-hud text-[9px] tracking-[0.2em] text-silver/60">{PROFILE.experience} · {PROFILE.location.toUpperCase()}</div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[4%] flex flex-col items-center gap-2.5 px-4 sm:bottom-[5%]">
        <button
          type="button"
          onClick={onEnter}
          disabled={gateOpen}
          data-cursor="ENTER"
          className={`group relative flex items-center gap-3 overflow-hidden rounded-md border px-8 py-3.5 font-display text-sm font-extrabold tracking-[0.3em] transition-all sm:px-10 sm:text-base ${
            gateOpen
              ? 'border-amber/60 bg-amber/20 text-amber'
              : 'border-amber/70 bg-gradient-to-b from-[#2a2416] to-[#14100a] text-amber hover:shadow-[0_0_40px_-6px_rgba(255,178,36,0.7)]'
          }`}
        >
          {!gateOpen && <span className="pulse-ring" />}
          <span className="relative">{gateOpen ? 'GATE OPENING' : 'ENTER STATION'}</span>
          <ArrowRight size={18} className={`relative transition-transform ${gateOpen ? '' : 'group-hover:translate-x-1'}`} />
        </button>
        <div className="font-hud text-[9px] tracking-[0.35em] text-silver/50 sm:text-[10px]">
          {gateOpen ? 'CAMERA MOVING · HOLD ON' : 'TAP · SCROLL DOWN · OR PRESS ENTER'}
        </div>
      </div>
    </div>
  );
}
