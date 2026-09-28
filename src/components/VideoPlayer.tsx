import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Maximize, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import type { Project } from '../lib/types';
import { extractYoutubeId } from '../lib/youtube';

interface Props {
  project: Project | null;
  onClose: () => void;
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
}

let ytApiPromise: Promise<void> | null = null;
function loadYtApi(): Promise<void> {
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const w = window as unknown as { YT?: unknown; onYouTubeIframeAPIReady?: () => void };
    if (w.YT) {
      resolve();
      return;
    }
    w.onYouTubeIframeAPIReady = () => resolve();
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.async = true;
    document.head.appendChild(s);
  });
  return ytApiPromise;
}

function fmt(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function PlayerPanel({ project, onClose }: { project: Project; onClose: () => void }) {
  const tall = project.category === 'short';
  const videoId = extractYoutubeId(project.video_url || project.external_url);
  const original = project.external_url || project.video_url;
  const mountRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [noStream, setNoStream] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!videoId) {
      setNoStream(true);
      return;
    }
    setNoStream(false);
    let player: YTPlayer | null = null;
    let timer = 0;
    let cancelled = false;
    void loadYtApi().then(() => {
      if (cancelled || !mountRef.current) return;
      const w = window as unknown as {
        YT: { Player: new (...args: unknown[]) => YTPlayer };
      };
      player = new w.YT.Player(mountRef.current, {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: { rel: 0, modestbranding: 1, playsinline: 1, controls: 0, disablekb: 0 },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.setVolume(80);
            e.target.playVideo();
          },
          onStateChange: (e: { data: number }) => setPlaying(e.data === 1),
        },
      });
      playerRef.current = player;
      timer = window.setInterval(() => {
        if (!player) return;
        try {
          setTime(player.getCurrentTime() || 0);
          setDur(player.getDuration() || 0);
        } catch {
          /* player not ready */
        }
      }, 500);
    });
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      try {
        player?.destroy();
      } catch {
        /* noop */
      }
      playerRef.current = null;
      setPlaying(false);
      setTime(0);
      setDur(0);
    };
  }, [videoId]);

  const togglePlay = () => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.pauseVideo();
    else p.playVideo();
  };

  const onSeek = (v: number) => {
    setTime(v);
    try {
      playerRef.current?.seekTo(v, true);
    } catch {
      /* noop */
    }
  };

  const onVolume = (v: number) => {
    setVolume(v);
    try {
      playerRef.current?.setVolume(v);
      if (v > 0 && muted) {
        playerRef.current?.unMute();
        setMuted(false);
      }
    } catch {
      /* noop */
    }
  };

  const toggleMute = () => {
    try {
      if (muted) {
        playerRef.current?.unMute();
        setMuted(false);
      } else {
        playerRef.current?.mute();
        setMuted(true);
      }
    } catch {
      /* noop */
    }
  };

  const goFullscreen = () => {
    const el = wrapRef.current as unknown as { requestFullscreen?: () => void; webkitRequestFullscreen?: () => void } | null;
    try {
      if (el?.requestFullscreen) el.requestFullscreen();
      else if (el?.webkitRequestFullscreen) el.webkitRequestFullscreen();
    } catch {
      /* noop */
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-abyss/90 p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <motion.div
        ref={wrapRef}
        initial={{ scale: 0.92, y: 26, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 18, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={`sign-panel relative flex max-h-[92dvh] flex-col overflow-hidden rounded-xl ${tall ? 'w-auto' : 'w-[min(980px,94vw)]'}`}
      >
        <div className="flex items-center gap-3 border-b border-line/70 bg-[#0b1229] px-3 py-2.5 sm:px-4">
          <button
            type="button"
            onClick={onClose}
            data-cursor="BACK"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line/80 text-silver/80 transition-colors hover:border-bone/40 hover:text-bone"
            aria-label="Back to carriage"
          >
            <ArrowLeft size={15} />
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate font-display text-sm font-bold text-bone sm:text-base">{project.title}</div>
            <div className="truncate font-hud text-[9px] tracking-[0.2em] text-silver/60 sm:text-[10px]">
              {(project.description ?? '').toUpperCase() || project.category.toUpperCase()} · {project.year ?? ''} · {(project.platform ?? 'VIDEO').toUpperCase()}
            </div>
          </div>
          <span
            className={`hidden rounded border px-2 py-0.5 font-hud text-[9px] tracking-[0.25em] sm:block ${
              tall ? 'border-electric/60 text-electric' : 'border-amber/60 text-amber'
            }`}
          >
            {tall ? '9:16' : '16:9'}
          </span>
          <button
            type="button"
            onClick={onClose}
            data-cursor="CLOSE"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line/80 text-silver/80 transition-colors hover:border-ember/70 hover:text-ember"
            aria-label="Close player"
          >
            <X size={15} />
          </button>
        </div>

        <div className={`flex min-h-0 items-center justify-center bg-black ${tall ? '' : 'w-full'}`}>
          {noStream ? (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 p-8 text-center">
              <p className="font-hud text-xs tracking-[0.25em] text-silver/70">STREAM UNAVAILABLE IN-CARRIAGE</p>
              {original && (
                <a
                  href={original}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="OPEN"
                  className="flex items-center gap-2 rounded-full border border-amber/60 bg-amber/10 px-5 py-2 font-hud text-[11px] tracking-[0.25em] text-amber"
                >
                  WATCH ORIGINAL <ExternalLink size={13} />
                </a>
              )}
            </div>
          ) : (
            <div className={tall ? 'aspect-[9/16] h-[62dvh] max-w-[92vw] sm:h-[68dvh]' : 'aspect-video w-full'}>
              <div ref={mountRef} className="h-full w-full [&>iframe]:h-full [&>iframe]:w-full" />
            </div>
          )}
        </div>

        {!noStream && (
          <div className="border-t border-line/70 bg-[#0b1229] px-3 py-2.5 sm:px-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={togglePlay}
                data-cursor={playing ? 'PAUSE' : 'PLAY'}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber text-navy transition-transform hover:scale-105"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} className="ml-0.5" fill="currentColor" />}
              </button>
              <span className="shrink-0 font-hud text-[10px] tabular-nums text-silver/70">{fmt(time)}</span>
              <input
                type="range"
                min={0}
                max={Math.max(1, dur)}
                step={0.5}
                value={Math.min(time, Math.max(1, dur))}
                onChange={(e) => onSeek(Number(e.target.value))}
                className="h-1 w-full accent-amber"
                aria-label="Seek"
              />
              <span className="shrink-0 font-hud text-[10px] tabular-nums text-silver/70">{fmt(dur)}</span>
            </div>
            <div className="mt-2 flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={toggleMute}
                data-cursor="MUTE"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-line/80 text-silver/80 transition-colors hover:text-bone"
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={muted ? 0 : volume}
                onChange={(e) => onVolume(Number(e.target.value))}
                className="h-1 w-24 accent-amber sm:w-32"
                aria-label="Volume"
              />
              <div className="ml-auto flex items-center gap-2">
                {original && (
                  <a
                    href={original}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="OPEN"
                    className="flex items-center gap-1.5 rounded-md border border-line/80 px-2.5 py-1.5 font-hud text-[10px] tracking-[0.15em] text-silver/80 transition-colors hover:border-bone/40 hover:text-bone"
                  >
                    ORIGINAL <ExternalLink size={12} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={goFullscreen}
                  data-cursor="FULL"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-line/80 text-silver/80 transition-colors hover:text-bone"
                  aria-label="Fullscreen"
                >
                  <Maximize size={15} />
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function VideoPlayer({ project, onClose }: Props) {
  return <AnimatePresence>{project && <PlayerPanel project={project} onClose={onClose} />}</AnimatePresence>;
}
