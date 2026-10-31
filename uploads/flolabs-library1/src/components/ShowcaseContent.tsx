import React, { useEffect, useRef } from 'react';
import { StickyProjectsStack } from './StickyProjectsStack';
import { NahrDevPortfolioExact } from './NahrDevPortfolioExact';
import { FromTheStudio } from './FromTheStudio';
import { DeepMindShowcase } from './DeepMindShowcase';
import { RecruitBanners } from './RecruitBanners';

interface ShowcaseContentProps {
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onOpenLogin: () => void;
}

function HeroRain() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const drops = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      len: 0.06 + Math.random() * 0.16,
      speed: 0.0012 + Math.random() * 0.003,
      w: 1 + Math.random() * 1.6,
      a: 0.18 + Math.random() * 0.4,
    }));
    let frame = 0;
    const draw = () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = rect.width;
      const height = rect.height;
      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      for (const drop of drops) {
        if (!reduce) drop.y += drop.speed;
        if (drop.y - drop.len > 1) drop.y = -drop.len;
        const x = drop.x * width;
        const y = drop.y * height;
        const top = y - drop.len * height;
        const grad = ctx.createLinearGradient(x, top, x, y);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(1, `rgba(255,255,255,${drop.a})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = drop.w;
        ctx.beginPath();
        ctx.moveTo(x, top);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      if (!reduce) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 h-full w-full dark:hidden" />;
}

export const ShowcaseContent: React.FC<ShowcaseContentProps> = ({
  activeNav,
  onSelectNav,
  onOpenLogin,
}) => {
  return (
    <main className="flex-1 flex flex-col">
      {/* Hero */}
      <section
        id="home"
        className="home-hero relative isolate overflow-hidden w-full min-h-[640px] h-[92svh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-36 md:pt-24 pb-16 text-[#122033] dark:text-white"
      >
        <HeroRain />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 right-0 top-0 hidden w-[42%] h-[48%] opacity-60 dark:block"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1.4px)',
            backgroundSize: '9px 9px',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 70% 20%, #000 0%, transparent 70%)',
            maskImage: 'radial-gradient(ellipse 80% 80% at 70% 20%, #000 0%, transparent 70%)',
          }}
        />
        <div className="max-w-4xl flex flex-col items-center gap-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.08] text-[#122033] dark:text-white font-['Google_Sans_Flex','Google_Sans',sans-serif]">
            Launching AI and robotics projects for the next generation
          </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl text-[#3d5166] dark:text-[#b9c6dc]">
            FloLabs Innovations Group connects curious builders and visionary founders to real venture execution,
            autonomous systems, and world-class experiential learning programs worldwide.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#nahrdev-live"
              onClick={(e) => {
                e.preventDefault();
                onSelectNav('projects');
                const el = document.getElementById('nahrdev-live');
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold bg-[#122033] text-white hover:bg-black transition-colors cursor-pointer dark:bg-[#f6f8fc] dark:text-[#0d0f16] dark:hover:bg-white"
            >
              View Projects
            </a>
            <a
              href="#internships"
              onClick={(e) => {
                e.preventDefault();
                onSelectNav('internships');
              }}
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold border border-[#122033]/25 bg-white/50 text-[#122033] hover:bg-white transition-colors cursor-pointer dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              Join Internships
            </a>
          </div>
        </div>
      </section>

      {/* 1. Exact 100% Reverse-Engineered Section from NahrDev Mobile App Landing Page */}
      <div id="nahrdev-live">
        <NahrDevPortfolioExact />
      </div>

      {/* 2. Proven Digital Projects Sticky Stacking Animation (Populated with FloLabs Focus Content) */}
      <div id="work">
      </div>


      {/* 4. Google DeepMind: Cards Section, From the studio (between cards and podcast), Podcast */}
      <div id="deepmind">
        <DeepMindShowcase>
          <div id="from-the-studio">
            <FromTheStudio />
          </div>
        </DeepMindShowcase>
      </div>

      <RecruitBanners />
    </main>
  );
};
