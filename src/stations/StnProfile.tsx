import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, MapPin } from 'lucide-react';
import { PROFILE, STATIONS } from '../lib/types';

interface Props {
  onNext: () => void;
}

export default function StnProfile({ onNext }: Props) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-6xl items-center overflow-y-auto py-4">
      <div className="plx-1 pointer-events-none absolute -right-24 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 lg:block">
        <div className="absolute inset-x-10 top-10 bottom-16 rounded-t-[120px] bg-gradient-to-b from-[#1a2450] to-[#070c1d] ring-1 ring-white/10" />
        <div className="absolute inset-x-20 top-24 h-24 rounded-t-[60px] bg-gradient-to-b from-electric/40 to-electric/5 ring-1 ring-electric/30" />
        <div className="absolute inset-x-24 top-56 flex justify-between">
          <span className="h-3 w-3 rounded-full bg-amber shadow-[0_0_18px_4px_rgba(255,178,36,0.8)]" />
          <span className="h-3 w-3 rounded-full bg-amber shadow-[0_0_18px_4px_rgba(255,178,36,0.8)]" />
        </div>
        <div className="absolute inset-x-16 bottom-24 flex justify-between gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="h-8 flex-1 rounded-sm bg-bone/15 ring-1 ring-white/10" />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-10 h-24 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(255,178,36,0.15),transparent)]" />
      </div>
      <div className="plx-2 pointer-events-none absolute -left-16 top-10 hidden h-72 w-72 rounded-full bg-violet/10 blur-3xl md:block" />

      <div className="relative z-10 grid w-full items-center gap-6 pb-24 md:grid-cols-[minmax(0,420px)_1fr] md:gap-10 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="sign-panel relative mx-auto w-full max-w-[420px] overflow-hidden rounded-xl p-5 sm:p-6"
        >
          <div className="scan-line" />
          <div className="flex items-center justify-between">
            <span className="font-hud text-[9px] tracking-[0.35em] text-electric">TRANSIT PASS · F1</span>
            <span className="flex items-center gap-1.5 font-hud text-[9px] tracking-[0.25em] text-bone/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> AVAILABLE
            </span>
          </div>
          <div className="mt-4 flex items-center gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <div className="rot-slow absolute -inset-2 rounded-full border-2 border-dashed border-electric/50" />
              <img
                src={PROFILE.photo}
                alt={PROFILE.name}
                onError={(e) => {
                  const t = e.currentTarget;
                  if (!t.src.includes('nitesh.webp')) t.src = PROFILE.photoFallback;
                }}
                className="h-24 w-24 rounded-full border-2 border-bone/20 object-cover sm:h-28 sm:w-28"
              />
            </div>
            <div className="min-w-0">
              <div className="font-hud text-[9px] tracking-[0.3em] text-silver/60">HOLDER</div>
              <div className="truncate font-display text-2xl font-black tracking-wide text-bone sm:text-3xl">
                {PROFILE.name.toUpperCase()}
              </div>
              <div className="mt-1 font-hud text-[10px] leading-relaxed tracking-[0.14em] text-amber">
                {PROFILE.role.toUpperCase()}
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-line/80 bg-panel/70 px-3 py-1 font-hud text-[10px] tracking-[0.15em] text-bone/85">
              <Briefcase size={12} className="text-electric" /> {PROFILE.experience} EXPERIENCE
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-line/80 bg-panel/70 px-3 py-1 font-hud text-[10px] tracking-[0.15em] text-bone/85">
              <MapPin size={12} className="text-ember" /> {PROFILE.location.toUpperCase()}
            </span>
          </div>
          <div className="barcode mt-4 h-9 w-full rounded-sm" />
          <div className="mt-1 flex justify-between font-hud text-[8px] tracking-[0.3em] text-silver/50">
            <span>VALID · ALL LINES</span>
            <span>N0-F1-2002</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center md:text-left"
        >
          <div className="font-hud text-[10px] tracking-[0.4em] text-electric sm:text-xs">WELCOME ABOARD · PLATFORM 1</div>
          <h3 className="mt-2 font-display text-4xl font-black leading-[0.95] tracking-tight text-bone sm:text-6xl">
            EVERY FRAME.
            <br />
            <span className="text-glow-amber text-amber">A FEELING.</span>
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-silver/85 sm:text-base md:mx-0">
            I turn raw footage into stories that connect — thoughtful cuts, purposeful motion, and a little bit of
            feeling. This line runs through everything I make.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 md:justify-start">
            {STATIONS.map((s, i) => (
              <span key={s.code} className="flex items-center">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full border font-hud text-[9px]"
                  style={{ borderColor: `${s.accent}66`, color: s.accent, background: `${s.accent}14` }}
                >
                  {s.code}
                </span>
                {i < STATIONS.length - 1 && <span className="mx-0.5 h-px w-2 bg-line sm:w-3" />}
              </span>
            ))}
            <span className="ml-2 font-hud text-[9px] tracking-[0.25em] text-silver/50">7 STATIONS · 0 TRANSFERS</span>
          </div>
          <button
            type="button"
            onClick={onNext}
            data-cursor="RIDE"
            className="group mt-5 inline-flex items-center gap-2.5 rounded-md border border-amber/60 bg-amber/10 px-6 py-3 font-display text-sm font-extrabold tracking-[0.25em] text-amber transition-all hover:bg-amber/20 hover:shadow-[0_0_36px_-8px_rgba(255,178,36,0.8)]"
          >
            START THE RIDE
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
