import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, WheelEvent as ReactWheelEvent } from 'react';
import CustomCursor from './components/CustomCursor';
import Hud from './components/Hud';
import Guide from './components/Guide';
import TravelOverlay from './components/TravelOverlay';
import StationShell from './components/StationShell';
import Entrance from './stations/Entrance';
import StnProfile from './stations/StnProfile';
import StnAbout from './stations/StnAbout';
import StnSkills from './stations/StnSkills';
import StnProcess from './stations/StnProcess';
import StnContact from './stations/StnContact';
import VideoPlayer from './components/VideoPlayer';
import { STATIONS } from './lib/types';
import type { Project } from './lib/types';

const StnLongForm = lazy(() => import('./stations/StnLongForm'));
const StnShortForm = lazy(() => import('./stations/StnShortForm'));

const NEXT_LABELS = ['RIDE ON', 'RIDE ON', 'RIDE ON', 'BOARD THE CARRIAGE', 'NEXT CARRIAGE', 'TERMINUS', ''];

function playChime(enabled: boolean) {
  if (!enabled) return;
  try {
    const w = window as unknown as { AudioContext: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
    const Ctx = w.AudioContext || w.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    [659.25, 880].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      const t = ctx.currentTime + i * 0.22;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.16, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.55);
    });
    window.setTimeout(() => {
      void ctx.close();
    }, 1400);
  } catch {
    /* audio unavailable */
  }
}

function CarriageLoader() {
  return (
    <div className="flex h-full items-center justify-center font-hud text-xs tracking-[0.35em] text-silver/60">
      COUPLING CARRIAGE…
    </div>
  );
}

export default function App() {
  const [boot, setBoot] = useState(true);
  const [station, setStation] = useState(-1);
  const [entered, setEntered] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [travel, setTravel] = useState<{ from: number; to: number } | null>(null);
  const [phase, setPhase] = useState<'depart' | 'tunnel' | 'arrive'>('depart');
  const [player, setPlayer] = useState<Project | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [speed, setSpeed] = useState(0);

  const stateRef = useRef({ station, travel, player, entered, soundOn });
  stateRef.current = { station, travel, player, entered, soundOn };
  const wheelAcc = useRef(0);
  const wheelTimer = useRef<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setBoot(false), 1100);
    return () => window.clearTimeout(id);
  }, []);

  const travelTo = useCallback((to: number) => {
    const s = stateRef.current;
    if (s.travel || s.player) return;
    if (to < -1 || to > 6 || to === s.station) return;
    if (to !== -1 && !s.entered) return;
    const from = s.station;
    setTravel({ from, to });
    setPhase('depart');
    window.setTimeout(() => setPhase('tunnel'), 900);
    window.setTimeout(() => setPhase('arrive'), 2200);
    window.setTimeout(() => {
      setStation(to);
      setTravel(null);
      setSpeed(0);
      if (to === -1) {
        setEntered(false);
        setGateOpen(false);
      }
      playChime(stateRef.current.soundOn);
    }, 3200);
  }, []);

  const enter = useCallback(() => {
    const s = stateRef.current;
    if (s.entered || s.travel || s.station !== -1) return;
    setGateOpen(true);
    window.setTimeout(() => {
      setEntered(true);
      travelTo(0);
    }, 1600);
  }, [travelTo]);

  const next = useCallback(() => {
    const s = stateRef.current;
    if (s.travel || s.player) return;
    if (s.station === -1) {
      enter();
      return;
    }
    if (s.station < 6) travelTo(s.station + 1);
  }, [enter, travelTo]);

  const prev = useCallback(() => {
    const s = stateRef.current;
    if (s.travel || s.player) return;
    if (s.station > 0) travelTo(s.station - 1);
  }, [travelTo]);

  useEffect(() => {
    if (!travel) return;
    const id = window.setInterval(() => {
      setSpeed((s) => {
        if (phase === 'depart') return Math.min(34, s + 4 + Math.random() * 4);
        if (phase === 'tunnel') return 72 + Math.random() * 22;
        return Math.max(0, s - 14 - Math.random() * 10);
      });
    }, 140);
    return () => window.clearInterval(id);
  }, [travel, phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPlayer(null);
        return;
      }
      if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === 'Enter') {
        enter();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, enter]);

  const onWheel = (e: ReactWheelEvent) => {
    const s = stateRef.current;
    if (s.travel || s.player) return;
    if (e.target instanceof Element && e.target.closest('.carriage-scroll') && s.station >= 4 && s.station <= 5) {
      return;
    }
    wheelAcc.current += e.deltaY;
    if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
    wheelTimer.current = window.setTimeout(() => {
      wheelAcc.current = 0;
    }, 200);
    if (wheelAcc.current > 130) {
      wheelAcc.current = 0;
      next();
    } else if (wheelAcc.current < -130) {
      wheelAcc.current = 0;
      prev();
    }
  };

  const onTouchStart = (e: ReactTouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: ReactTouchEvent) => {
    const s = touchStart.current;
    touchStart.current = null;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      if (dx < 0) next();
      else prev();
    }
  };

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--px', (e.clientX / window.innerWidth - 0.5).toFixed(3));
    e.currentTarget.style.setProperty('--py', (e.clientY / window.innerHeight - 0.5).toFixed(3));
  };

  const renderStation = () => {
    if (station === -1) return <Entrance gateOpen={gateOpen} onEnter={enter} />;
    const meta = STATIONS[station];
    return (
      <StationShell
        meta={meta}
        onPrev={prev}
        onNext={next}
        hidePrev={station === 0}
        hideNext={station === 6}
        nextLabel={NEXT_LABELS[station]}
      >
        {station === 0 && <StnProfile onNext={next} />}
        {station === 1 && <StnAbout />}
        {station === 2 && <StnSkills />}
        {station === 3 && <StnProcess onNext={next} />}
        {station === 4 && (
          <Suspense fallback={<CarriageLoader />}>
            <StnLongForm onPlay={setPlayer} />
          </Suspense>
        )}
        {station === 5 && (
          <Suspense fallback={<CarriageLoader />}>
            <StnShortForm onPlay={setPlayer} />
          </Suspense>
        )}
        {station === 6 && <StnContact onRestart={() => travelTo(-1)} />}
      </StationShell>
    );
  };

  return (
    <div
      className="relative h-[100dvh] w-full overflow-hidden bg-abyss font-display text-bone"
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseMove={onMouseMove}
    >
      <AnimatePresence>
        {boot && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-4 bg-abyss"
          >
            <div className="font-hud text-[11px] tracking-[0.5em] text-amber">F1 · FRAMES LINE</div>
            <div className="font-display text-2xl font-black tracking-[0.2em] text-bone sm:text-3xl">
              NK<span className="text-amber">·</span>METRO
            </div>
            <div className="h-[3px] w-52 overflow-hidden rounded-full bg-line/70">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-electric via-violet to-amber"
              />
            </div>
            <div className="font-hud text-[9px] tracking-[0.35em] text-silver/50">POWERING PLATFORM…</div>
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor />
      <Hud
        station={station}
        traveling={!!travel}
        speed={speed}
        entered={entered}
        soundOn={soundOn}
        onToggleSound={() => setSoundOn((v) => !v)}
        onJump={travelTo}
      />

      <main className="absolute inset-x-0 bottom-0 top-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={station}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="h-full"
          >
            {renderStation()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Guide station={station} traveling={!!travel} hidden={!!player || boot} />

      <AnimatePresence>{travel && <TravelOverlay from={travel.from} to={travel.to} phase={phase} />}</AnimatePresence>

      <VideoPlayer project={player} onClose={() => setPlayer(null)} />

      <div className="vignette pointer-events-none fixed inset-0 z-[60]" />
      <div className="grain pointer-events-none fixed inset-0 z-[61] opacity-[0.08]" />
    </div>
  );
}
