import React from 'react';
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
        className="relative isolate overflow-hidden w-full min-h-[640px] h-[92svh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-36 md:pt-24 pb-16 text-white"
        style={{
          backgroundColor: '#0d0f16',
          backgroundImage:
            'radial-gradient(60% 38% at 20% 14%, rgba(70,150,205,0.85) 0%, rgba(70,150,205,0) 70%), radial-gradient(55% 34% at 52% 8%, rgba(52,98,190,0.9) 0%, rgba(52,98,190,0) 72%), radial-gradient(45% 38% at 88% 12%, rgba(86,160,215,0.75) 0%, rgba(86,160,215,0) 70%), radial-gradient(70% 40% at 48% 40%, rgba(26,52,120,0.75) 0%, rgba(26,52,120,0) 75%), linear-gradient(180deg, #1d3566 0%, #101a36 42%, #0d0f16 78%, #0d0f16 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 right-0 top-0 w-[42%] h-[48%] opacity-60"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1.4px)',
            backgroundSize: '9px 9px',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 70% 20%, #000 0%, transparent 70%)',
            maskImage: 'radial-gradient(ellipse 80% 80% at 70% 20%, #000 0%, transparent 70%)',
          }}
        />
        <div className="max-w-4xl flex flex-col items-center gap-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.08] text-white font-['Google_Sans_Flex','Google_Sans',sans-serif]">
            Launching AI and robotics projects for the next generation
          </h1>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl text-[#b9c6dc]">
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
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold bg-[#f6f8fc] text-[#0d0f16] hover:bg-white transition-colors cursor-pointer"
            >
              View Projects
            </a>
            <a
              href="#internships"
              onClick={(e) => {
                e.preventDefault();
                onSelectNav('internships');
              }}
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
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
