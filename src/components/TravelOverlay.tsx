import { motion } from 'framer-motion';
import { STATIONS } from '../lib/types';

interface Props {
  from: number;
  to: number;
  phase: 'depart' | 'tunnel' | 'arrive';
}

const RINGS = [0, 1, 2, 3, 4, 5];
const STREAKS = [
  { top: '8%', delay: '0s', dur: '0.9s', side: 'l' },
  { top: '22%', delay: '0.35s', dur: '1.1s', side: 'r' },
  { top: '38%', delay: '0.1s', dur: '0.8s', side: 'l' },
  { top: '55%', delay: '0.5s', dur: '1s', side: 'r' },
  { top: '70%', delay: '0.2s', dur: '0.85s', side: 'l' },
  { top: '84%', delay: '0.6s', dur: '1.05s', side: 'r' },
];

function labelFor(index: number): string {
  if (index === -1) return 'STREET LEVEL';
  const s = STATIONS[index];
  return s ? `STATION ${s.code} · ${s.name}` : '';
}

export default function TravelOverlay({ from, to, phase }: Props) {
  const dest = STATIONS[to];
  const returning = to < from;
  const progress = phase === 'depart' ? '18%' : phase === 'tunnel' ? '66%' : '100%';
  const phaseText =
    phase === 'depart'
      ? `DOORS CLOSING · DEPARTING ${labelFor(from)}`
      : phase === 'tunnel'
        ? `IN TRANSIT · TUNNEL SEGMENT ${returning ? '· RETURNING' : ''}`
        : `NOW ARRIVING · ${labelFor(to)}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className={`fixed inset-0 z-[70] overflow-hidden bg-abyss ${phase === 'tunnel' ? 'tunnel-shake' : ''}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_50%_50%,#0d1530_0%,#050914_70%)]" />

      {RINGS.map((r) => (
        <div
          key={r}
          style={{ animationDelay: `${r * 0.26}s` }}
          className={`tunnel-ring ${r % 2 === 1 ? 'hidden sm:block' : ''}`}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/15 blur-2xl" />

      {STREAKS.map((s, i) => (
        <div
          key={i}
          style={{ top: s.top, animationDelay: s.delay, animationDuration: s.dur }}
          className={s.side === 'l' ? 'rush rush-l' : 'rush rush-r'}
        />
      ))}
      <div className="rush-floor" />
      <div className="rush-floor rush-floor-2" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber/60 to-transparent" />

      {phase === 'arrive' && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-[radial-gradient(80%_100%_at_50%_100%,rgba(255,178,36,0.22),transparent)]" />
      )}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="font-hud text-[10px] tracking-[0.4em] text-electric sm:text-xs">
            LINE F1 · FRAMES LINE {returning ? '· RETURN SERVICE' : '· ALL STATIONS'}
          </div>
          {dest && (
            <div className="mt-3 flex items-center gap-3 sm:gap-4">
              <span className="bg-amber px-2.5 py-1 font-display text-xl font-black text-navy sm:px-3 sm:text-3xl">
                {dest.code}
              </span>
              <span className="font-display text-2xl font-black tracking-[0.12em] text-bone sm:text-5xl">
                {dest.name}
              </span>
            </div>
          )}
          {to === -1 && (
            <div className="mt-3 font-display text-2xl font-black tracking-[0.12em] text-bone sm:text-5xl">
              STREET LEVEL
            </div>
          )}
          <div className="mt-4 font-hud text-[10px] tracking-[0.3em] text-amber sm:text-xs">{phaseText}</div>
          <div className="mt-5 h-[3px] w-56 overflow-hidden rounded-full bg-line/70 sm:w-72">
            <div className="h-full rounded-full bg-gradient-to-r from-electric via-violet to-amber transition-all duration-700" style={{ width: progress }} />
          </div>
          <div className="mt-2 font-hud text-[9px] tracking-[0.3em] text-silver/50">
            {labelFor(from)} → {labelFor(to)}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
