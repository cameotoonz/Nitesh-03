import { useEffect, useState } from 'react';
import { TrainFront, Volume2, VolumeX } from 'lucide-react';
import { STATIONS } from '../lib/types';

interface Props {
  station: number;
  traveling: boolean;
  speed: number;
  entered: boolean;
  soundOn: boolean;
  onToggleSound: () => void;
  onJump: (index: number) => void;
}

export default function Hud({ station, traveling, speed, entered, soundOn, onToggleSound, onJump }: Props) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[90] border-b border-line/70 bg-abyss/85 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-3 sm:gap-4 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-amber/15 text-amber ring-1 ring-amber/40">
            <TrainFront size={17} strokeWidth={2.2} />
          </span>
          <div className="leading-tight">
            <div className="font-display text-[13px] font-extrabold tracking-[0.18em] text-bone">
              NK<span className="text-amber">·</span>METRO
            </div>
            <div className="font-hud text-[9px] tracking-[0.28em] text-silver/60">LINE F1 · FRAMES LINE</div>
          </div>
        </div>

        <nav className="no-scrollbar mx-auto flex max-w-[46vw] items-center gap-1 overflow-x-auto sm:gap-1.5 md:max-w-none" aria-label="Line map">
          {STATIONS.map((s, i) => {
            const active = station === i;
            const visited = entered && station > i;
            return (
              <div key={s.code} className="flex items-center">
                <button
                  type="button"
                  data-cursor="GO"
                  disabled={!entered || traveling}
                  onClick={() => onJump(i)}
                  title={`Station ${s.code} — ${s.name}`}
                  className={`group flex items-center gap-1.5 rounded-full border px-2 py-1 font-hud text-[10px] tracking-widest transition-all sm:px-2.5 ${
                    active
                      ? 'border-amber/80 bg-amber/15 text-amber shadow-[0_0_14px_-2px_rgba(255,178,36,0.7)]'
                      : visited
                        ? 'border-electric/50 bg-electric/10 text-electric'
                        : 'border-line/80 bg-panel/60 text-silver/60'
                  } ${!entered || traveling ? 'cursor-not-allowed opacity-50' : 'hover:border-bone/50 hover:text-bone'}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-amber' : visited ? 'bg-electric' : 'bg-silver/30'}`} />
                  {s.code}
                </button>
                {i < STATIONS.length - 1 && <span className={`mx-0.5 h-px w-2 sm:w-3 ${visited ? 'bg-electric/60' : 'bg-line'}`} />}
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div
            className={`hidden items-center gap-1.5 rounded-full border px-2.5 py-1 font-hud text-[10px] tracking-[0.2em] sm:flex ${
              traveling ? 'border-amber/60 bg-amber/10 text-amber' : 'border-electric/40 bg-electric/10 text-electric'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${traveling ? 'animate-pulse bg-amber' : 'bg-electric'}`} />
            {traveling ? 'IN TRANSIT' : entered ? 'DOORS OPEN' : 'STREET LEVEL'}
          </div>
          <div className="hidden font-hud text-[11px] tracking-[0.15em] text-bone/90 tabular-nums md:block">
            {String(Math.round(speed)).padStart(3, '0')}
            <span className="ml-1 text-[9px] text-silver/60">KM/H</span>
          </div>
          <div className="hidden font-hud text-[11px] tracking-[0.15em] text-silver/80 tabular-nums lg:block">{time}</div>
          <button
            type="button"
            onClick={onToggleSound}
            data-cursor="SOUND"
            title={soundOn ? 'Mute chimes' : 'Unmute chimes'}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line/80 bg-panel/60 text-silver/80 transition-colors hover:border-bone/40 hover:text-bone"
          >
            {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
}
