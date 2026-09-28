import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import type { StationMeta } from '../lib/types';

interface Props {
  meta: StationMeta;
  children: ReactNode;
  onPrev: () => void;
  onNext: () => void;
  nextLabel?: string;
  hidePrev?: boolean;
  hideNext?: boolean;
}

export default function StationShell({ meta, children, onPrev, onNext, nextLabel, hidePrev, hideNext }: Props) {
  return (
    <section className="relative flex h-full flex-col">
      <div className="relative z-20 flex justify-center px-4 pt-2 sm:pt-3">
        <motion.div
          initial={{ y: -46, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-4xl"
        >
          <div className="flex justify-center gap-28 sm:gap-40">
            <div className="h-5 w-[3px] bg-gradient-to-b from-transparent to-silver/50 sm:h-6" />
            <div className="h-5 w-[3px] bg-gradient-to-b from-transparent to-silver/50 sm:h-6" />
          </div>
          <div className="sign-panel relative flex items-stretch overflow-hidden rounded-lg">
            <div
              style={{ background: meta.accent }}
              className="flex items-center px-3 font-display text-xl font-black text-navy sm:px-4 sm:text-2xl"
            >
              {meta.code}
            </div>
            <div className="min-w-0 flex-1 px-3 py-2 sm:px-4 sm:py-2.5">
              <div className="font-hud text-[8px] tracking-[0.32em] text-silver/60 sm:text-[10px]">
                STATION {meta.code} · PLATFORM 1 · LINE F1
              </div>
              <h2 className="truncate font-display text-lg font-extrabold tracking-[0.1em] text-bone sm:text-3xl">
                {meta.name}
              </h2>
              <div className="truncate font-hud text-[8px] tracking-[0.22em] text-amber sm:text-[10px]">
                {meta.tagline.toUpperCase()}
              </div>
            </div>
            <div className="hidden items-center gap-2 pr-4 sm:flex">
              <span className="blink-dot h-2 w-2 rounded-full bg-ember" />
              <span className="font-hud text-[10px] tracking-[0.3em] text-silver/70">LIVE</span>
            </div>
            <div
              className="absolute inset-x-0 bottom-0 h-[3px]"
              style={{ background: meta.accent, boxShadow: `0 0 16px 2px ${meta.accent}` }}
            />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 min-h-0 flex-1 px-3 sm:px-6">{children}</div>

      <div className="pointer-events-none relative z-0 shrink-0">
        <div className="tactile h-1.5 w-full opacity-80" />
        <div className="flex items-center justify-between bg-gradient-to-b from-[#111936] to-[#070c1d] px-4 py-1.5">
          <span className="font-hud text-[8px] tracking-[0.3em] text-silver/40 sm:text-[9px]">
            F1 · FRAMES LINE · NEW DELHI
          </span>
          <span className="font-hud text-[8px] tracking-[0.3em] text-amber/70 sm:text-[9px]">MIND THE GAP</span>
        </div>
        <div
          className="h-[2px] w-full opacity-70"
          style={{ background: `linear-gradient(90deg, transparent, ${meta.accent}, transparent)` }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-14 z-30 flex items-center justify-center gap-3 sm:bottom-16">
        {!hidePrev && (
          <button
            type="button"
            onClick={onPrev}
            data-cursor="PREV"
            title="Previous station"
            className="glass flex h-11 w-11 items-center justify-center rounded-full border border-line/80 text-bone/80 transition-all hover:border-electric/70 hover:text-electric"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {!hideNext && (
          <button
            type="button"
            onClick={onNext}
            data-cursor="NEXT"
            title="Next station"
            className="glass group flex h-11 items-center gap-2 rounded-full border border-amber/50 bg-amber/10 px-5 font-hud text-[11px] tracking-[0.25em] text-amber transition-all hover:bg-amber/20"
          >
            {nextLabel ?? 'NEXT'}
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
    </section>
  );
}
