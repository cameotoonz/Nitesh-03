import { AnimatePresence, motion } from 'framer-motion';
import { GUIDE_NOTES } from '../lib/types';

interface Props {
  station: number;
  traveling: boolean;
  hidden: boolean;
}

export default function Guide({ station, traveling, hidden }: Props) {
  const message = traveling ? 'Hold on \u2014 tunnel segment. Lights passing, next station soon.' : (GUIDE_NOTES[station] ?? '');

  return (
    <div
      className={`pointer-events-none fixed bottom-3 left-3 z-[80] transition-all duration-500 sm:bottom-5 sm:left-5 ${
        hidden ? 'translate-y-6 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="relative flex items-end gap-2 sm:gap-3">
        <div className="relative">
          <svg
            viewBox="0 0 160 240"
            className={`h-[128px] w-auto sm:h-[190px] ${traveling ? 'guide-lean' : 'guide-bob'}`}
            aria-label="Station guide"
          >
            <defs>
              <linearGradient id="coat" x1="0" y1="0" x2="0" y2="1">
                <linearGradient id="coatInner" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#1a2450" />
                  <stop offset="0.5" stopColor="#0d1430" />
                  <stop offset="1" stopColor="#141b3d" />
                </linearGradient>
                <stop offset="0" stopColor="#1a2450" />
                <stop offset="1" stopColor="#050914" />
              </linearGradient>
              <linearGradient id="visor" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#4DA3FF" />
                <stop offset="0.55" stopColor="#9fd0ff" />
                <stop offset="1" stopColor="#FFB224" />
              </linearGradient>
            </defs>
            <ellipse cx="80" cy="230" rx="46" ry="8" fill="#000" opacity="0.65" />
            <ellipse cx="80" cy="230" rx="26" ry="4.5" fill="#FFB224" opacity="0.22" />
            <rect x="66" y="168" width="12" height="54" rx="4" fill="#0b1128" stroke="rgba(185,194,208,0.35)" strokeWidth="1" />
            <rect x="83" y="168" width="12" height="54" rx="4" fill="#0b1128" stroke="rgba(185,194,208,0.35)" strokeWidth="1" />
            <rect x="62" y="216" width="20" height="8" rx="3" fill="#050914" stroke="rgba(185,194,208,0.4)" strokeWidth="1" />
            <rect x="79" y="216" width="20" height="8" rx="3" fill="#050914" stroke="rgba(185,194,208,0.4)" strokeWidth="1" />
            <path d="M52,100 L64,80 Q80,72 96,80 L108,100 L118,178 L42,178 Z" fill="url(#coat)" stroke="rgba(185,194,208,0.4)" strokeWidth="1.2" />
            <path d="M52,100 L64,80" stroke="#4DA3FF" strokeWidth="2" opacity="0.85" />
            <path d="M108,100 L96,80" stroke="#E34BA9" strokeWidth="2" opacity="0.85" />
            <path d="M44,176 L116,176" stroke="#4DA3FF" strokeWidth="1" opacity="0.35" />
            <rect x="58" y="138" width="44" height="7" rx="2" fill="#050914" stroke="rgba(255,178,36,0.55)" strokeWidth="1" />
            <rect x="76" y="137" width="9" height="9" rx="2" fill="none" stroke="#FFB224" strokeWidth="1.4" />
            <circle cx="80" cy="112" r="12" fill="#4DA3FF" opacity="0.18" />
            <rect x="75" y="102" width="10" height="18" rx="4" fill="#4DA3FF" opacity="0.9" />
            <rect x="52" y="96" width="12" height="52" rx="6" fill="#0d1430" stroke="rgba(185,194,208,0.35)" strokeWidth="1" />
            <g transform="rotate(-16 102 94)">
              <rect x="98" y="87" width="46" height="13" rx="6.5" fill="#111a38" stroke="rgba(185,194,208,0.4)" strokeWidth="1" />
              <circle cx="150" cy="93" r="9" fill="#FFB224" opacity="0.25" />
              <circle cx="150" cy="93" r="4" fill="#FFB224" />
            </g>
            <rect x="63" y="42" width="34" height="32" rx="11" fill="#0d1430" stroke="rgba(185,194,208,0.5)" strokeWidth="1.2" />
            <line x1="80" y1="42" x2="80" y2="30" stroke="rgba(185,194,208,0.5)" strokeWidth="1.5" />
            <circle cx="80" cy="28" r="2.6" fill="#E34BA9" className="blink-dot" />
            <rect x="68" y="54" width="24" height="8" rx="4" fill="url(#visor)" />
            <rect x="68" y="54" width="24" height="8" rx="4" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
          </svg>
          <div className="mt-1 text-center font-hud text-[8px] tracking-[0.3em] text-silver/60 sm:text-[9px]">
            GUIDE · RAAHI-07
          </div>
        </div>

        <div className="mb-6 max-w-[200px] sm:mb-10 sm:max-w-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={station + (traveling ? '-t' : '')}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="glass rounded-lg rounded-bl-none border border-line/80 px-3 py-2.5 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.8)]"
            >
              <div className="font-hud text-[8px] tracking-[0.3em] text-amber sm:text-[9px]">RAAHI SAYS</div>
              <p className="mt-1 text-[11px] leading-snug text-bone/90 sm:text-xs">{message}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
