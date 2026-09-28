import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Armchair, ChevronLeft, ChevronRight, Play, RotateCcw, X } from 'lucide-react';
import type { Project } from '../lib/types';
import { getProjects } from '../lib/api';
import { extractYoutubeId, ytThumbnail } from '../lib/youtube';

const PER_PAGE_OPTIONS = [6, 12, 16, 24];

interface CarriageProps {
  category: 'long' | 'short';
  accent: string;
  onPlay: (p: Project) => void;
}

function Thumb({ project, className }: { project: Project; className?: string }) {
  const fb = ytThumbnail(extractYoutubeId(project.video_url || project.external_url));
  const [src, setSrc] = useState<string | null>(project.thumbnail || fb);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSrc(project.thumbnail || fb);
    setLoaded(false);
  }, [project, fb]);

  if (!src) return <div className={`bg-panel ${className ?? ''}`} />;
  return (
    <img
      src={src}
      alt={project.title}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (fb && src !== fb) setSrc(fb);
      }}
      className={`${className ?? ''} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}

interface SeatProps {
  project: Project;
  seatNo: number;
  tall: boolean;
  accent: string;
  open: boolean;
  onToggle: () => void;
  onPlay: (p: Project) => void;
}

function Seat({ project, seatNo, tall, accent, open, onToggle, onPlay }: SeatProps) {
  const [near, setNear] = useState(false);
  const lit = near || open;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setNear(true)}
      onMouseLeave={() => setNear(false)}
    >
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="rise"
            initial={{ height: 0, opacity: 0, y: 60 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 110, damping: 18 }}
            className="overflow-hidden"
          >
            <div className="pb-2">
              <div
                role="button"
                tabIndex={0}
                data-cursor="PLAY"
                onClick={() => onPlay(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onPlay(project);
                }}
                className="relative mx-auto w-full max-w-[380px] overflow-hidden rounded-lg border border-white/15 bg-navy shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)] outline-none"
                style={{ boxShadow: `0 24px 60px -12px rgba(0,0,0,0.9), 0 0 40px -12px ${accent}` }}
              >
                <div className={tall ? 'mx-auto aspect-[9/16] h-[290px] sm:h-[320px]' : 'aspect-video w-full'}>
                  <Thumb project={project} className="h-full w-full object-cover" />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/95 via-transparent to-abyss/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-full text-navy"
                    style={{ background: accent, boxShadow: `0 0 30px 2px ${accent}` }}
                  >
                    <Play size={22} className="ml-0.5" fill="currentColor" />
                  </span>
                </div>
                <button
                  type="button"
                  data-cursor="CLOSE"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                  }}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-abyss/80 text-bone/80 ring-1 ring-white/20 transition-colors hover:text-bone"
                  aria-label="Close seat"
                >
                  <X size={15} />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                  <div className="font-hud text-[9px] tracking-[0.25em]" style={{ color: accent }}>
                    SEAT {String(seatNo).padStart(2, '0')} · {tall ? '9:16' : '16:9'} · TAP TO PLAY
                  </div>
                  <div className="mt-0.5 truncate font-display text-sm font-bold text-bone">{project.title}</div>
                </div>
              </div>
              <div className="mx-auto mt-1 h-[3px] w-40 rounded-full" style={{ background: accent, boxShadow: `0 0 18px 4px ${accent}` }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onToggle}
        data-cursor={open ? 'CLOSE' : 'OPEN'}
        className="group relative mx-auto block w-full max-w-[290px] outline-none"
        aria-label={`${open ? 'Close' : 'Open'} seat ${seatNo}, ${project.title}`}
      >
        {!open && (
          <div
            className={`pointer-events-none absolute -top-2 left-1/2 z-30 w-max max-w-[230px] -translate-x-1/2 -translate-y-full transition-all duration-300 ${
              near ? '-translate-y-[115%] opacity-100' : 'opacity-0'
            }`}
          >
            <div className="glass rounded-md border border-line/80 px-3 py-2 text-center shadow-[0_10px_30px_-8px_rgba(0,0,0,0.9)]">
              <div className="font-hud text-[9px] tracking-[0.25em]" style={{ color: accent }}>
                SEAT {String(seatNo).padStart(2, '0')} · {project.year ?? '—'} · {(project.platform ?? 'VIDEO').toUpperCase()}
              </div>
              <div className="mt-0.5 truncate font-display text-xs font-bold text-bone">{project.title}</div>
              <div className="mt-0.5 font-hud text-[8px] tracking-[0.25em] text-silver/60">TAP TO OPEN</div>
            </div>
          </div>
        )}

        <div className="[perspective:900px]">
          <div
            className={`relative mx-auto h-40 w-52 transition-transform duration-500 [transform-style:preserve-3d] sm:w-56 ${
              open ? '[transform:rotateX(-14deg)_translateY(8px)]' : 'group-hover:[transform:rotateX(-5deg)]'
            }`}
          >
            <div className="seat-leather absolute inset-x-4 top-0 h-32 rounded-b-xl rounded-t-[26px] border border-white/10">
              <div className="absolute inset-y-3 left-6 w-px bg-white/[0.07]" />
              <div className="absolute inset-y-3 right-6 w-px bg-white/[0.07]" />
              <div className="absolute inset-x-9 top-2.5 h-9 rounded-lg border border-white/10 bg-black/40" />
              <div
                className={`absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded border px-2 py-0.5 font-hud text-[9px] tracking-[0.25em] transition-colors ${
                  open ? 'border-transparent text-navy' : 'border-white/15 bg-black/50 text-bone/80'
                }`}
                style={open ? { background: accent } : undefined}
              >
                SEAT {String(seatNo).padStart(2, '0')}
              </div>
            </div>
            <div
              className={`pointer-events-none absolute inset-x-4 top-0 h-32 rounded-b-xl rounded-t-[26px] transition-opacity duration-300 ${
                lit ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ boxShadow: `0 0 36px -6px ${accent}, inset 0 0 26px -14px ${accent}` }}
            />
            {open && (
              <div
                className="rise-pulse absolute inset-x-9 top-[126px] h-[3px] rounded-full"
                style={{ background: accent, boxShadow: `0 0 18px 4px ${accent}` }}
              />
            )}
          </div>
          <div className="seat-leather relative mx-auto -mt-3 h-[52px] w-60 rounded-xl border border-white/10 sm:w-64">
            <div className="absolute -left-2.5 top-0 h-[62px] w-3 rounded-md border border-white/10 bg-gradient-to-b from-[#2a3358] to-[#0b1128]" />
            <div className="absolute -right-2.5 top-0 h-[62px] w-3 rounded-md border border-white/10 bg-gradient-to-b from-[#2a3358] to-[#0b1128]" />
            <div
              className={`absolute inset-x-8 bottom-1.5 h-[2px] rounded-full transition-opacity ${lit ? 'opacity-100' : 'opacity-30'}`}
              style={{ background: accent }}
            />
          </div>
          <div className="mx-auto h-8 w-9 bg-gradient-to-b from-[#3a456e] to-[#10162e] [clip-path:polygon(22%_0,78%_0,100%_100%,0_100%)]" />
          <div className="mx-auto h-2 w-36 rounded-[50%] bg-black/70 blur-[3px]" />
        </div>

        <div className="mt-2 px-2 text-center">
          <div className="truncate font-display text-[13px] font-bold text-bone/90">{project.title}</div>
          <div className="mt-0.5 truncate font-hud text-[9px] tracking-[0.18em] text-silver/55">
            {(project.description ?? '').toUpperCase().slice(0, 42) || (tall ? 'VERTICAL · SHORT FORM' : 'WIDESCREEN · LONG FORM')}
          </div>
        </div>
      </button>
    </div>
  );
}

export default function SeatCarriage({ category, accent, onPlay }: CarriageProps) {
  const tall = category === 'short';
  const [items, setItems] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);

  const pages = Math.max(1, Math.ceil(total / perPage));
  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(total, page * perPage);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getProjects({ category, page, per_page: perPage });
      setItems(res.projects);
      setTotal(res.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load seats');
    } finally {
      setLoading(false);
    }
  }, [category, page, perPage]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    setOpenId(null);
  }, [page, perPage, category]);

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col">
      <div className="brushed relative mt-2 overflow-hidden rounded-t-xl border border-white/10 px-4 py-2.5 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="hidden h-2 w-14 rounded-full bg-bone/80 shadow-[0_0_12px_1px_rgba(245,239,227,0.6)] sm:block" />
            <span className="hidden h-2 w-14 rounded-full bg-bone/80 shadow-[0_0_12px_1px_rgba(245,239,227,0.6)] md:block" />
            <span className="font-hud text-[10px] tracking-[0.3em] text-silver/80 sm:text-[11px]">
              VIDEO CARRIAGE · {category === 'long' ? 'C-05' : 'C-06'} · {tall ? '9:16 VERTICAL' : '16:9 WIDESCREEN'}
            </span>
          </div>
          <span className="font-hud text-[10px] tracking-[0.25em]" style={{ color: accent }}>
            {total} SEAT{total === 1 ? '' : 'S'}
          </span>
        </div>
        <div className="pass-strip pointer-events-none absolute inset-x-0 bottom-0 h-6 opacity-60" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-x border-white/10 bg-[#070c1d]/90 px-3 py-2 sm:px-5">
        <div className="font-hud text-[10px] tracking-[0.2em] text-silver/70">
          SEATS {start}–{end} / {total} · PAGE {page}/{pages}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1">
            <span className="mr-1 hidden font-hud text-[9px] tracking-[0.2em] text-silver/50 sm:inline">PER PAGE</span>
            {PER_PAGE_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                data-cursor={`${n}`}
                onClick={() => {
                  setPerPage(n);
                  setPage(1);
                }}
                className={`rounded border px-1.5 py-0.5 font-hud text-[10px] transition-colors ${
                  perPage === n
                    ? 'border-amber/70 bg-amber/15 text-amber'
                    : 'border-line/70 bg-panel/60 text-silver/60 hover:text-bone'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              data-cursor="PREV"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex h-7 w-7 items-center justify-center rounded border border-line/70 bg-panel/60 text-silver/70 transition-colors hover:text-bone disabled:opacity-30"
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                data-cursor={`P${n}`}
                onClick={() => setPage(n)}
                className={`h-7 min-w-7 rounded border px-1.5 font-hud text-[10px] transition-colors ${
                  page === n ? 'border-amber/70 bg-amber/15 text-amber' : 'border-line/70 bg-panel/60 text-silver/60 hover:text-bone'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              data-cursor="NEXT"
              disabled={page >= pages}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className="flex h-7 w-7 items-center justify-center rounded border border-line/70 bg-panel/60 text-silver/70 transition-colors hover:text-bone disabled:opacity-30"
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="carriage-scroll min-h-0 flex-1 overflow-y-auto border-x border-b border-white/10 bg-gradient-to-b from-[#080d20] via-[#060a1a] to-[#04060f] px-3 pb-28 pt-8 sm:px-6">
        {loading ? (
          <div className={`grid gap-x-6 gap-y-10 ${tall ? 'grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'}`}>
            {Array.from({ length: perPage > 6 ? 6 : perPage }, (_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="shimmer h-32 w-52 rounded-b-xl rounded-t-[26px]" />
                <div className="shimmer -mt-2 h-[52px] w-60 rounded-xl" />
                <div className="shimmer mt-2 h-3 w-40 rounded" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex h-full min-h-60 flex-col items-center justify-center gap-3 text-center">
            <AlertTriangle size={28} className="text-ember" />
            <p className="font-hud text-xs tracking-[0.2em] text-silver/70">SIGNAL LOST · {error.toUpperCase()}</p>
            <button
              type="button"
              onClick={() => void load()}
              data-cursor="RETRY"
              className="flex items-center gap-2 rounded-full border border-amber/50 bg-amber/10 px-5 py-2 font-hud text-[11px] tracking-[0.25em] text-amber"
            >
              <RotateCcw size={14} /> RETRY
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex h-full min-h-60 flex-col items-center justify-center gap-3 text-center">
            <Armchair size={30} className="text-silver/40" />
            <p className="font-hud text-xs tracking-[0.25em] text-silver/60">NO PUBLISHED PROJECTS IN THIS CARRIAGE YET</p>
          </div>
        ) : (
          <>
            <div className={`grid gap-x-6 gap-y-12 ${tall ? 'grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'}`}>
              {items.map((p, i) => (
                <Seat
                  key={p.id}
                  project={p}
                  seatNo={(page - 1) * perPage + i + 1}
                  tall={tall}
                  accent={accent}
                  open={openId === p.id}
                  onToggle={() => setOpenId((cur) => (cur === p.id ? null : p.id))}
                  onPlay={onPlay}
                />
              ))}
            </div>
            <div className="mt-10">
              <div className="tactile h-1.5 w-full opacity-60" />
              <div className="mt-1 text-center font-hud text-[9px] tracking-[0.3em] text-silver/40">
                END OF CARRIAGE · MIND THE GAP
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
