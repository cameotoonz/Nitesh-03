export interface Project {
  id: number;
  title: string;
  description: string | null;
  category: 'long' | 'short';
  year: number | null;
  thumbnail: string | null;
  video_url: string | null;
  external_url: string | null;
  platform: string | null;
  featured: boolean;
  published: boolean;
  display_order: number;
}

export interface ProjectsResponse {
  projects: Project[];
  total: number;
  page: number;
  per_page: number;
}

export interface StationMeta {
  index: number;
  code: string;
  name: string;
  tagline: string;
  accent: string;
}

export const STATIONS: StationMeta[] = [
  { index: 0, code: '01', name: 'NITESH PORTFOLIO', tagline: 'Origin terminal · Board the line', accent: '#4DA3FF' },
  { index: 1, code: '02', name: 'ABOUT', tagline: 'The editor behind the frames', accent: '#7C5CFF' },
  { index: 2, code: '03', name: 'SKILLS', tagline: 'Systems on board · All operational', accent: '#E34BA9' },
  { index: 3, code: '04', name: 'PROCESS', tagline: 'How videos get built', accent: '#FF7A1A' },
  { index: 4, code: '05', name: 'LONG FORM', tagline: 'Video carriage · 16:9 cinema seats', accent: '#FFB224' },
  { index: 5, code: '06', name: 'SHORT FORM', tagline: 'Video carriage · 9:16 vertical seats', accent: '#4DA3FF' },
  { index: 6, code: '07', name: 'CONTACT', tagline: "Let's work together · Terminus", accent: '#7C5CFF' },
];

export const PROFILE = {
  name: 'Nitesh Kuamr',
  role: 'Video Editor & Motion Graphic Designer',
  experience: '1 Year+',
  location: 'Delhi, India',
  email: 'niteshedits2002@gmail.com',
  whatsapp: '9315841623',
  whatsappDisplay: '+91 93158 41623',
  whatsappUrl: 'https://wa.me/919315841623',
  instagram: '@framesbyniteshh',
  instagramUrl: 'https://instagram.com/framesbyniteshh',
  photo: '/images/profile.webp',
  photoFallback: '/images/nitesh.webp',
};

export const ABOUT_TEXT =
  "Hey, I'm Nitesh \u2014 a video editor and motion graphic designer from Delhi. I've been spending the last year turning footage, ideas and timelines into content that actually feels alive. What I enjoy most about editing is that moment when everything suddenly clicks \u2014 the cut, the music, the motion, the typography and the pacing all working together.";

export const GUIDE_NOTES: Record<number, string> = {
  [-1]: 'Welcome to Nitesh Portfolio station. Step through the gate \u2014 your train is waiting.',
  [0]: 'Origin terminal. This is Nitesh \u2014 editor, motion designer, Delhi. Ride on when ready.',
  [1]: 'Every cut has a reason. Read the story written on the platform wall.',
  [2]: 'Six systems power this line. Walk the pylons \u2014 all live on board.',
  [3]: 'Four stops from raw idea to final delivery. Watch them in order.',
  [4]: 'Long-form carriage. Approach a seat \u2014 it will sense you. Tap to open.',
  [5]: 'Short-form carriage. Tap a seat, let the frame rise, then tap to play.',
  [6]: 'Terminus. The gates to collaboration are open \u2014 pick one and say hello.',
};
