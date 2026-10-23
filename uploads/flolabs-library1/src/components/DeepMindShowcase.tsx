import React, { useState, useEffect } from 'react';

interface PromoCard {
  id: string;
  title: string;
  subtitle: string;
  imageSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  href: string;
  buttons: {
    label: string;
    href: string;
    variant: 'primary' | 'secondary';
  }[];
}

interface PodcastEpisode {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  poster: string;
  youtubeId: string;
  duration?: string;
}

const PROMO_CARDS: PromoCard[] = [
  {
    id: 'co-scientist',
    title: 'Animal Vocalization',
    subtitle: 'Talking to your pets is about to become reality.',
    imageSrc: '/animalvocalization-mursackc-0us3.webp',
    href: 'https://deepmind.google/blog/co-scientist-a-multi-agent-ai-partner-to-accelerate-research/',
    buttons: [
      {
        label: 'Learn more',
        href: 'https://deepmind.google/blog/co-scientist-a-multi-agent-ai-partner-to-accelerate-research/',
        variant: 'primary',
      },
    ],
  },
  {
    id: 'co-scientist-2',
    title: 'CAIPO',
    subtitle: 'Optimizing health and performance: personal and organizational growth.',
    imageSrc: '/caipotech-murslq2g-4d25.webp',
    href: 'https://deepmind.google/blog/co-scientist-a-multi-agent-ai-partner-to-accelerate-research/',
    buttons: [
      {
        label: 'Learn more',
        href: 'https://deepmind.google/blog/co-scientist-a-multi-agent-ai-partner-to-accelerate-research/',
        variant: 'primary',
      },
    ],
  },
  {
    id: 'co-scientist-3',
    title: 'MoodChanger for Pets',
    subtitle: 'Redefining pet wellness for better care.',
    imageSrc: '/moodchangerforpets-mursftdh-j26z.webp',
    href: 'https://deepmind.google/blog/co-scientist-a-multi-agent-ai-partner-to-accelerate-research/',
    buttons: [
      {
        label: 'Learn more',
        href: 'https://deepmind.google/blog/co-scientist-a-multi-agent-ai-partner-to-accelerate-research/',
        variant: 'primary',
      },
    ],
  },
  {
    id: 'co-scientist-4',
    title: 'MoodChanger for People',
    subtitle: 'Transforming your mood and health, one insight at a time.',
    imageSrc: '/moodchangerforpeople-murv1zs7-0bob.webp',
    href: 'https://deepmind.google/blog/co-scientist-a-multi-agent-ai-partner-to-accelerate-research/',
    buttons: [
      {
        label: 'Learn more',
        href: 'https://deepmind.google/blog/co-scientist-a-multi-agent-ai-partner-to-accelerate-research/',
        variant: 'primary',
      },
    ],
  },
  {
    id: 'gemini-for-science',
    title: 'AI and Robotics',
    subtitle: 'We are on the cusp of a revolution.',
    videoSrc:
      'https://res.cloudinary.com/ee4fc3o3/video/upload/v1791000104/robot_l5r0mh.webm',
    posterSrc:
      'https://lh3.googleusercontent.com/sILaSdIzu5XraA6U7t26JH98KgsZNCG3T0nIjJ0wmrZu5VBv5fh6ruPmyhRLt_TXzw2clBDyzHskiws_ocNEIYvJcAmB2LcInywK6tlT2Ha8MNzyiA=w1440',
    href: 'https://deepmind.google/science/',
    buttons: [
      {
        label: 'Learn more',
        href: 'https://deepmind.google/science/',
        variant: 'primary',
      },
    ],
  },
  {
    id: 'gemma-4',
    title: 'AI Space',
    subtitle: 'Expanding the boundaries of innovation with AI solutions for space exploration',
    videoSrc:
      'https://res.cloudinary.com/ee4fc3o3/video/upload/v1791000190/space_maudke.webm',
    posterSrc:
      'https://lh3.googleusercontent.com/TA6G2uPlHmdizvOiRbsA_rFtaP03Sh2h3_lOVyL07fZkwrCuijoLWRECyOgjvFpA3OyNBkh5iKZZam0vU-0iOmFfzsqHcaxobrJzQNGvSNDyEUnI-XQ=w1440',
    href: 'https://deepmind.google/technologies/gemma/',
    buttons: [
      {
        label: 'Learn more',
        href: 'https://deepmind.google/technologies/gemma/',
        variant: 'primary',
      },
    ],
  },
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'inner-thoughts',
    slug: '0-understanding-the-inner-thoughts-of-ai',
    title: 'The Flomad Frequency',
    subtitle:
      'Your backstage pass into the core missions and visionary minds building the future of Flo Labs.',
    poster: 'https://img.youtube.com/vi/X7q-rHHeFn0/hqdefault.jpg',
    youtubeId: 'X7q-rHHeFn0',
  },
  {
    id: 'ai-agents',
    slug: '1-when-millions-of-ai-agents-meet',
    title: 'The Podcast Connecting the Dots',
    subtitle:
      'Exploring how disparate ideas, generalist perspectives, and cross-disciplinary concepts merge into breakthrough innovations.',
    poster: 'https://img.youtube.com/vi/K8_0ZYZA9Ws/hqdefault.jpg',
    youtubeId: 'K8_0ZYZA9Ws',
  },
  {
    id: 'alphago-10-years',
    slug: '2-10-years-of-alphago-the-turning-point-for-ai',
    title: 'Tech Team Meeting',
    subtitle:
      'Catch up on our live weekly syncs covering cross-functional AI, robotics, and engineering updates.',
    poster: 'https://img.youtube.com/vi/Msop2_431wg/hqdefault.jpg',
    youtubeId: 'Msop2_431wg',
  },
  {
    id: 'future-intelligence',
    slug: '3-the-future-of-intelligence',
    title: 'Space Team Meeting',
    subtitle:
      'Deep dive architectural reviews and R&D updates from the Space Ventures Institute engineering pod.',
    poster: 'https://img.youtube.com/vi/Nx84QR6Mors/hqdefault.jpg',
    youtubeId: 'Nx84QR6Mors',
  },
  {
    id: 'arrival-of-agi',
    slug: '4-the-arrival-of-agi',
    title: 'MoodChanger Team Meeting',
    subtitle:
      'Specialized development syncs focusing on emotional computing, interactive state transitions, and responsive experience layers.',
    poster: 'https://img.youtube.com/vi/Rss3Cb-kH4U/hqdefault.jpg',
    youtubeId: 'Rss3Cb-kH4U',
  },
  {
    id: 'humanoid-team-meeting',
    slug: '5-humanoid-team-meeting',
    title: 'Humanoid Team Meeting',
    subtitle:
      'A detailed roadmap walkthrough covering modification goals, desktop robots, chassis bots, and in-house humanoid development.',
    poster: 'https://img.youtube.com/vi/Rss3Cb-kH4U/hqdefault.jpg',
    youtubeId: 'Rss3Cb-kH4U',
  },
  {
    id: 'multimodal-perception-team-meeting',
    slug: '6-multimodal-perception-team-meeting',
    title: 'MultiModal Perception Team Meeting',
    subtitle:
      'Deep dive discussions exploring multi modal sensory frameworks, backend AI integration, and environmental perception architecture.',
    poster: 'https://img.youtube.com/vi/Rss3Cb-kH4U/hqdefault.jpg',
    youtubeId: 'Rss3Cb-kH4U',
  },
];

export const DeepMindShowcase: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full bg-[#111214] text-white selection:bg-[#a8c7fa]/30 selection:text-white font-['Google_Sans_Flex','Google_Sans',-apple-system,BlinkMacSystemFont,sans-serif]">
      
      {/* ========================================================================= */}
      {/* SECTION 1: PROMO CARDS SECTION (Co-Scientist, Gemini for Science, Gemma 4) */}
      {/* ========================================================================= */}
      <section className="w-full py-20 sm:py-32 bg-white dark:bg-[#07090e] text-[#0f1115] dark:text-white transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-6xl sm:text-8xl lg:text-9xl uppercase tracking-widest text-[#0f1115]/5 dark:text-white/5 select-none pointer-events-none [background-image:radial-gradient(circle,currentColor_1px,transparent_1.5px)] [background-size:14px_14px] bg-clip-text whitespace-nowrap" style={{ textTransform: 'capitalize' }}>
            TECHNOLOGIES
          </div>
          <span className="block font-bold text-xs sm:text-sm uppercase tracking-[0.2em] text-[#38bdf8] mb-3 relative z-10">
            Our Projects
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f1115] dark:text-white relative z-10">
            Breakthrough Technologies
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:pb-20">
          {PROMO_CARDS.map((card) => (
            <article
              key={card.id}
              className="card--promo lg:[&:nth-child(3n+1)]:translate-y-20 lg:[&:nth-child(3n)]:translate-y-20 group relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#1a1b1e] aspect-[2/3] max-h-[640px] flex flex-col justify-between p-7 sm:p-9 shadow-lg transition-transform duration-300 hover:scale-[1.012]"
            >
              {/* Media Background (Image or Video) */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {card.videoSrc ? (
                  <video
                    src={card.videoSrc}
                    poster={card.posterSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : card.imageSrc ? (
                  <img
                    src={card.imageSrc}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}

                {/* Scrim Gradient for text contrast */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.92) 100%)',
                  }}
                />
              </div>

              {/* Card Header Content */}
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="text-[15px] sm:text-base text-white/85 leading-relaxed font-normal max-w-[32ch]">
                  {card.subtitle}
                </p>
              </div>

              {/* Card Footer CTAs */}
              <div className="relative z-10 mt-auto pt-6 flex items-center gap-3">
                {card.buttons.map((btn, idx) => (
                  <a
                    key={idx}
                    href={btn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center rounded-full text-sm font-semibold tracking-normal transition-all duration-200 cursor-pointer ${
                      btn.variant === 'primary'
                        ? 'bg-white text-[#111111] hover:bg-[#e4e4e7] px-6 py-2.5 shadow-md hover:shadow-lg'
                        : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-6 py-2.5'
                    }`}
                  >
                    <span>{btn.label}</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      <div className="bg-[#050505]">
      {children}
      </div>

    </div>
  );
};
