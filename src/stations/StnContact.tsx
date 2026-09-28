import { motion } from 'framer-motion';
import { ArrowUpRight, Instagram, Mail, MessageCircle, RotateCcw } from 'lucide-react';
import { PROFILE } from '../lib/types';

interface Props {
  onRestart: () => void;
}

const GATES = [
  {
    name: 'WHATSAPP',
    handle: PROFILE.whatsappDisplay,
    sub: 'Fastest way to reach me',
    href: PROFILE.whatsappUrl,
    icon: MessageCircle,
    color: '#4DA3FF',
  },
  {
    name: 'EMAIL',
    handle: PROFILE.email,
    sub: 'For briefs & longer plans',
    href: `mailto:${PROFILE.email}`,
    icon: Mail,
    color: '#FFB224',
  },
  {
    name: 'INSTAGRAM',
    handle: PROFILE.instagram,
    sub: 'Frames, reels & behind-cuts',
    href: PROFILE.instagramUrl,
    icon: Instagram,
    color: '#E34BA9',
  },
];

export default function StnContact({ onRestart }: Props) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center overflow-y-auto py-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sign-panel mb-4 flex w-full items-center justify-between rounded-lg px-4 py-2 sm:mb-5 sm:px-5"
      >
        <span className="font-hud text-[9px] tracking-[0.3em] text-silver/60 sm:text-[10px]">END OF LINE · F1</span>
        <span className="font-hud text-[9px] tracking-[0.3em] text-amber sm:text-[10px]">
          NEXT TRAIN · YOUR PROJECT · <span className="animate-pulse">BOARDING</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-center"
      >
        <h3 className="font-display text-3xl font-black tracking-[0.08em] text-bone sm:text-5xl">
          LET'S WORK <span className="text-glow-amber text-amber">TOGETHER</span>
        </h3>
        <p className="mx-auto mt-2 max-w-2xl font-editorial text-lg italic text-silver/90 sm:text-xl">
          “Have a video, idea or project in mind? Let's turn it into something people want to watch.”
        </p>
      </motion.div>

      <div className="mt-5 grid w-full gap-3 sm:mt-6 sm:gap-4 md:grid-cols-3">
        {GATES.map((g, i) => {
          const Icon = g.icon;
          return (
            <motion.a
              key={g.name}
              href={g.href}
              target={g.href.startsWith('http') ? '_blank' : undefined}
              rel={g.href.startsWith('http') ? 'noreferrer' : undefined}
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.12 }}
              data-cursor="OPEN"
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#101736] to-[#060a18] p-4 text-left transition-all hover:-translate-y-1 sm:p-5"
              style={{ boxShadow: '0 18px 40px -18px rgba(0,0,0,0.9)' }}
            >
              <div className="flex items-center justify-between">
                <span className="font-hud text-[9px] tracking-[0.35em] text-silver/60">GATE {i + 1}</span>
                <ArrowUpRight
                  size={16}
                  className="text-silver/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: undefined }}
                />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-lg border"
                  style={{ borderColor: `${g.color}55`, background: `${g.color}12`, color: g.color }}
                >
                  <Icon size={20} />
                </span>
                <div className="font-display text-base font-black tracking-[0.12em] text-bone">{g.name}</div>
              </div>
              <div className="mt-2 truncate font-hud text-xs tracking-wide text-bone/90" style={{ color: g.color }}>
                {g.handle}
              </div>
              <div className="mt-1 font-hud text-[9px] tracking-[0.2em] text-silver/55">{g.sub.toUpperCase()}</div>
              <div className="mt-3 h-[3px] w-full rounded-full bg-white/[0.06]">
                <div
                  className="h-full w-1/3 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{ background: g.color, boxShadow: `0 0 12px 1px ${g.color}` }}
                />
              </div>
              <div className="mt-2 text-center font-hud text-[8px] tracking-[0.35em] text-silver/40">TAP TO OPEN</div>
            </motion.a>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-2 pb-24 pt-5 sm:pb-20">
        <button
          type="button"
          onClick={onRestart}
          data-cursor="RIDE"
          className="flex items-center gap-2 rounded-full border border-line/80 bg-panel/60 px-5 py-2.5 font-hud text-[10px] tracking-[0.3em] text-silver/80 transition-colors hover:border-bone/40 hover:text-bone"
        >
          <RotateCcw size={13} /> RIDE AGAIN · BACK TO STREET LEVEL
        </button>
        <div className="font-hud text-[8px] tracking-[0.3em] text-silver/40">
          THANK YOU FOR RIDING · F1 FRAMES LINE · {PROFILE.name.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
