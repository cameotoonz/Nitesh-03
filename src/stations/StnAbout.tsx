import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { ABOUT_TEXT, PROFILE } from '../lib/types';

export default function StnAbout() {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-5xl items-center overflow-y-auto py-4">
      <div className="pointer-events-none absolute inset-x-0 top-6 hidden justify-between gap-3 opacity-70 md:flex">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="relative h-16 flex-1 overflow-hidden rounded border border-white/10 bg-[#04070f]">
            <div className="pass-strip absolute inset-0" />
          </div>
        ))}
      </div>

      <motion.figure
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="sign-panel relative z-10 mx-auto w-full rounded-xl px-6 py-8 pb-24 sm:px-10 sm:py-10 md:pb-10"
      >
        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-violet via-electric to-violet" />
        <Quote size={30} className="text-violet/70" fill="currentColor" />
        <blockquote className="mt-4 font-editorial text-xl italic leading-relaxed text-bone sm:text-2xl md:text-[27px] md:leading-[1.5]">
          “{ABOUT_TEXT}”
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-4">
          <img
            src={PROFILE.photo}
            alt={PROFILE.name}
            loading="lazy"
            onError={(e) => {
              const t = e.currentTarget;
              if (!t.src.includes('nitesh.webp')) t.src = PROFILE.photoFallback;
            }}
            className="h-12 w-12 rounded-full border border-white/20 object-cover"
          />
          <div>
            <div className="font-display text-sm font-extrabold tracking-[0.15em] text-bone">
              {PROFILE.name.toUpperCase()} · {PROFILE.location.toUpperCase()}
            </div>
            <div className="font-hud text-[10px] tracking-[0.25em] text-violet">
              ETCHED ON PLATFORM WALL · STATION 02
            </div>
          </div>
          <div className="ml-auto hidden items-center gap-2 font-hud text-[9px] tracking-[0.3em] text-silver/50 sm:flex">
            <span className="blink-dot h-1.5 w-1.5 rounded-full bg-violet" /> STORY WALL · LIVE
          </div>
        </figcaption>
      </motion.figure>

      <div className="pointer-events-none absolute bottom-24 left-0 right-0 hidden justify-center md:flex">
        <div className="font-hud text-[10px] tracking-[0.5em] text-silver/30">MIND THE GAP · FEEL THE CUT</div>
      </div>
    </div>
  );
}
