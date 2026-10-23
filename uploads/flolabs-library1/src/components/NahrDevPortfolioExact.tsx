import React, { useEffect, useRef, useState } from 'react';
import { LongLiveLearning } from './RecruitBanners';
import { CARDS as PLATFORM_CARDS } from './FloStudiosExperiences';

const L = (n: string) => '/logos/logo-' + n + '.png';
const LOGOS: Record<string, string> = {
  'MoodChanger': L('moodchanger'),
  'CAIPO': L('caipo'),
  'Flo Travel': L('flo-travel'),
  'Innovation Bootcamp University': L('bootcamp-university'),
  'TARRL': L('tarrl'),
  'MoodChanger for Pets': L('moodchanger'),
  'RoboCollective': L('robocollective'),
  'Hephaestus International': L('hephaestus-international'),
  'FloLabs International': L('flolabs-international'),
  'FloBrain': L('flobrain'),
  'Connecting the Dots': L('connecting-the-dots'),
  'Legal & Ethics Ventures Institute': L('legal-ethics-ventures-institute'),
  'Space Ventures Institute': L('space-ventures-institute'),
  'Cosmos Intelligence': L('cosmos-intelligence'),
  'FloStudio': L('flostudios'),
};
const MARQUEE_CARDS = PLATFORM_CARDS.map((c) => ({ ...c, logo: LOGOS[c.title] }));

export const NahrDevPortfolioExact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 1. Converging Scroll Progress Lerp
  useEffect(() => {
    let animId = 0;
    let currentProgress = 0;
    let running = false;

    const step = () => {
      running = false;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight;
      const start = winH * 0.75;
      const end = winH * 0.05;
      const targetP = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      currentProgress += (targetP - currentProgress) * 0.45;
      if (Math.abs(targetP - currentProgress) < 0.004) currentProgress = targetP;
      section.style.setProperty('--stack-progress', currentProgress.toString());
      if (currentProgress !== targetP) {
        running = true;
        animId = requestAnimationFrame(step);
      }
    };

    const kick = () => {
      if (!running) {
        running = true;
        animId = requestAnimationFrame(step);
      }
    };

    kick();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick, { passive: true });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
    };
  }, []);

  // 3. Infinite Draggable Marquee
  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    let isDragging = false;
    let isPaused = false;
    let onScreen = true;
    let startX = 0;
    let currentX = 0;
    const speed = 0.6;
    let rafId = 0;

    const getHalfWidth = () => track.scrollWidth / 2;

    const updateMarquee = () => {
      if (!onScreen || document.hidden) {
        rafId = 0;
        return;
      }
      if (!isDragging && !isPaused) {
        currentX -= speed;
        const halfWidth = getHalfWidth();
        if (Math.abs(currentX) >= halfWidth) {
          currentX = 0;
        }
        track.style.transform = `translateX(${currentX}px)`;
      }
      rafId = requestAnimationFrame(updateMarquee);
    };

    const io = new IntersectionObserver((entries) => {
      onScreen = entries.some((e) => e.isIntersecting);
      if (onScreen && !rafId) rafId = requestAnimationFrame(updateMarquee);
    });
    io.observe(wrapper);

    rafId = requestAnimationFrame(updateMarquee);

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - currentX;
      wrapper.style.cursor = 'grabbing';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      currentX = e.pageX - startX;
      const halfWidth = getHalfWidth();
      if (currentX > 0) currentX = -halfWidth;
      if (currentX < -halfWidth) currentX = 0;
      track.style.transform = `translateX(${currentX}px)`;
    };

    const onMouseUp = () => {
      isDragging = false;
      wrapper.style.cursor = 'grab';
    };

    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      startX = e.touches[0].pageX - currentX;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      currentX = e.touches[0].pageX - startX;
      const halfWidth = getHalfWidth();
      if (currentX > 0) currentX = -halfWidth;
      if (currentX < -halfWidth) currentX = 0;
      track.style.transform = `translateX(${currentX}px)`;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    wrapper.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    wrapper.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    wrapper.addEventListener('mouseenter', () => (isPaused = true));
    wrapper.addEventListener('mouseleave', () => (isPaused = false));

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
      wrapper.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      wrapper.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
      className="portfolio-section w-full py-20 sm:py-32 bg-white dark:bg-[#07090e] text-[#0f1115] dark:text-white transition-colors duration-300 relative overflow-hidden"
      style={{ ['--stack-progress' as any]: '0', height: '1800px' }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-6xl sm:text-8xl lg:text-9xl uppercase tracking-widest text-[#0f1115]/5 dark:text-white/5 select-none pointer-events-none [background-image:radial-gradient(circle,currentColor_1px,transparent_1.5px)] [background-size:14px_14px] bg-clip-text whitespace-nowrap">
            VERTICALS
          </div>
          <span className="block font-bold text-xs sm:text-sm uppercase tracking-[0.2em] text-[#38bdf8] mb-3 relative z-10">
            OUR FOCUS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f1115] dark:text-white relative z-10">
            Proven Digital Verticals
          </h2>
        </div>

        {/* 4-Card Convergence Grid (Exact NahrDev Math & Styles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1 */}
          <div
            style={{
              transform: `translate3d(calc(120% * (1 - var(--stack-progress, 0))), calc(120% * (1 - var(--stack-progress, 0))), 0) rotate(calc(-8deg * (1 - var(--stack-progress, 0))))`,
              zIndex: 4,
            }}
            className="group relative rounded-[32px] overflow-hidden aspect-[4.5/5] shadow-2xl bg-black cursor-pointer transition-[box-shadow,border-color] will-change-transform"
          >
            <img
              src="/verticals/education.png"
              alt="Service Booking App Interface"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 p-5 sm:p-6 bg-white/85 dark:bg-[#12141a]/85 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-[20px] shadow-lg max-w-[85%] z-10 transition-transform group-hover:-translate-y-1">
              <h3 className="font-bold text-lg sm:text-xl text-[#0f1115] dark:text-white mb-1">
                Education
              </h3>
              <p className="text-xs sm:text-sm text-[#6c7280] dark:text-white/60">
                Revolutionizing learning through AI powered educational tools and platforms.
              </p>
            </div>
            <div className="absolute top-6 right-6 size-12 rounded-full bg-white/85 dark:bg-[#12141a]/85 backdrop-blur-md border border-white/40 dark:border-white/10 flex items-center justify-center text-[#0f1115] dark:text-white group-hover:bg-[#38bdf8] group-hover:text-black transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>

          {/* Card 2 */}
          <div
            style={{
              transform: `translate3d(calc(-120% * (1 - var(--stack-progress, 0))), calc(120% * (1 - var(--stack-progress, 0))), 0) rotate(calc(6deg * (1 - var(--stack-progress, 0))))`,
              zIndex: 3,
            }}
            className="group relative rounded-[32px] overflow-hidden aspect-[4.5/5] shadow-2xl bg-black cursor-pointer sm:mt-14 transition-[box-shadow,border-color] will-change-transform"
          >
            <img
              src="/verticals/travel.png"
              alt="Delivery app business dashboard system"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 p-5 sm:p-6 bg-white/85 dark:bg-[#12141a]/85 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-[20px] shadow-lg max-w-[85%] z-10 transition-transform group-hover:-translate-y-1">
              <h3 className="font-bold text-lg sm:text-xl text-[#0f1115] dark:text-white mb-1">
                Travel
              </h3>
              <p className="text-xs sm:text-sm text-[#6c7280] dark:text-white/60">
                Enhancing travel experiences with intelligent automation and personalization.
              </p>
            </div>
            <div className="absolute top-6 right-6 size-12 rounded-full bg-white/85 dark:bg-[#12141a]/85 backdrop-blur-md border border-white/40 dark:border-white/10 flex items-center justify-center text-[#0f1115] dark:text-white group-hover:bg-[#38bdf8] group-hover:text-black transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>

          {/* Card 3 */}
          <div
            style={{
              transform: `translate3d(calc(120% * (1 - var(--stack-progress, 0))), calc(-120% * (1 - var(--stack-progress, 0))), 0) rotate(calc(4deg * (1 - var(--stack-progress, 0))))`,
              zIndex: 2,
            }}
            className="group relative rounded-[32px] overflow-hidden aspect-[4.5/5] shadow-2xl bg-black cursor-pointer transition-[box-shadow,border-color] will-change-transform"
          >
            <img
              src="/verticals/healthcare.png"
              alt="Multi-Vendor Marketplace App"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 p-5 sm:p-6 bg-white/85 dark:bg-[#12141a]/85 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-[20px] shadow-lg max-w-[85%] z-10 transition-transform group-hover:-translate-y-1">
              <h3 className="font-bold text-lg sm:text-xl text-[#0f1115] dark:text-white mb-1">
                Healthcare
              </h3>
              <p className="text-xs sm:text-sm text-[#6c7280] dark:text-white/60">
                Advancing medical research and patient care with cutting edge AI.
              </p>
            </div>
            <div className="absolute top-6 right-6 size-12 rounded-full bg-white/85 dark:bg-[#12141a]/85 backdrop-blur-md border border-white/40 dark:border-white/10 flex items-center justify-center text-[#0f1115] dark:text-white group-hover:bg-[#38bdf8] group-hover:text-black transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>

          {/* Card 4 */}
          <div
            style={{
              transform: `translate3d(calc(-120% * (1 - var(--stack-progress, 0))), calc(-120% * (1 - var(--stack-progress, 0))), 0) rotate(calc(-6deg * (1 - var(--stack-progress, 0))))`,
              zIndex: 1,
            }}
            className="group relative rounded-[32px] overflow-hidden aspect-[4.5/5] shadow-2xl bg-black cursor-pointer sm:mt-14 transition-[box-shadow,border-color] will-change-transform"
          >
            <img
              src="/verticals/space.png"
              alt="Retail Shopping Experience"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 p-5 sm:p-6 bg-white/85 dark:bg-[#12141a]/85 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-[20px] shadow-lg max-w-[85%] z-10 transition-transform group-hover:-translate-y-1">
              <h3 className="font-bold text-lg sm:text-xl text-[#0f1115] dark:text-white mb-1">
                Space
              </h3>
              <p className="text-xs sm:text-sm text-[#6c7280] dark:text-white/60">
                Advancing space exploration and travel with AI driven technologies and innovation.
              </p>
            </div>
            <div className="absolute top-6 right-6 size-12 rounded-full bg-white/85 dark:bg-[#12141a]/85 backdrop-blur-md border border-white/40 dark:border-white/10 flex items-center justify-center text-[#0f1115] dark:text-white group-hover:bg-[#38bdf8] group-hover:text-black transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>

    <LongLiveLearning />

    {/* Separate New Section for Infinite Draggable Marquee */}
    <section className="portfolio-marquee-outer w-full py-16 sm:py-24 bg-[#F8FAFD] dark:bg-[#07090e] overflow-hidden relative transition-colors duration-300">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[160px] pointer-events-none bg-[#1CA9E1]/15 dark:bg-[#38bdf8]/10" />
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 flex flex-col items-start text-left relative z-10">
        <span className="block font-bold text-xs uppercase tracking-[0.2em] text-[#38bdf8] mb-3">
          Our Platforms
        </span>
        <h3 className="w-full text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight font-['Sora',sans-serif] text-[#0E2A38] dark:text-white mb-4">
          Websites &amp;{' '}
          <span className="bg-gradient-to-r from-[#1CA9E1] to-[#387CEA] dark:from-[#38bdf8] dark:to-[#818cf8] bg-clip-text text-transparent">Digital Experiences</span>
        </h3>
        <p className="block w-full max-w-none text-sm sm:text-base lg:text-lg leading-relaxed text-[#3F5A68] dark:text-[#AEC0CE]">
          Real projects we&apos;ve designed and developed for the FloLabs Innovations Group ecosystem, from AI platforms to robotics marketplaces.
        </p>
      </div>

      <div ref={wrapperRef} className="portfolio-marquee-wrapper relative z-10 overflow-hidden cursor-grab active:cursor-grabbing w-full">
        <div ref={trackRef} className="portfolio-marquee-track flex gap-6 sm:gap-8 w-max will-change-transform">
          {[...MARQUEE_CARDS, ...MARQUEE_CARDS].map((card, i) => (
            <div
              key={i}
              className="port-card-marquee group w-[240px] sm:w-[280px] aspect-[3/4] rounded-3xl overflow-hidden relative bg-white dark:bg-[#0B1420] shrink-0 shadow-[0_20px_46px_rgba(14,42,56,0.10)] dark:shadow-[0_22px_54px_rgba(0,0,0,0.5)] flex flex-col border border-[rgba(var(--ar)_var(--ag)_var(--ab)/0.4)] hover:border-[var(--accent)] hover:shadow-[0_0_30px_rgba(var(--ar)_var(--ag)_var(--ab)/0.45)] transition-[border-color,box-shadow] duration-300"
              style={{ ['--accent' as any]: card.accent, ['--ar' as any]: card.accentRgb[0], ['--ag' as any]: card.accentRgb[1], ['--ab' as any]: card.accentRgb[2] }}
            >
              <div className="relative flex-1 min-h-0 flex bg-[radial-gradient(120%_92%_at_24%_26%,#F4FAFD_0,#FFFFFF_58%,#EAF6FC_100%)] dark:bg-none dark:bg-[#0B1420]">
                <div
                  className="absolute inset-0 pointer-events-none opacity-75 dark:opacity-60 [mask:radial-gradient(130%_105%_at_30%_42%,#000,transparent_76%)]"
                  style={{ backgroundImage: card.pattern === 'pat-dots' ? `radial-gradient(rgba(${card.accentRgb.join(',')},0.45) 1px, transparent 1.7px)` : card.pattern === 'pat-rings' ? `repeating-radial-gradient(circle at 26% 46%, transparent 0 19px, rgba(${card.accentRgb.join(',')},0.16) 19px 20.5px)` : `repeating-conic-gradient(from 205deg at 28% 56%, rgba(${card.accentRgb.join(',')},0.14) 0 2.4deg, transparent 2.4deg 13deg)`, backgroundSize: card.pattern === 'pat-dots' ? '15px 15px' : undefined, ...(card.id === 6 ? { left: -13, top: -21 } : {}) }}
                />
                <span
                  className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[9px] font-extrabold tracking-wider shadow-sm ${card.status === 'Live' ? 'bg-[#15803D] text-white' : 'bg-[#F59E0B] text-[#1F1300]'}`}
                >
                  {card.status}
                </span>
                <div className="w-[38%] shrink-0 flex items-center justify-center pl-3 py-6">
                  <img
                    src={card.imgSrc}
                    alt={card.title}
                    loading="lazy"
                    draggable={false}
                    style={card.id === 6 ? { width: 80, height: 80 } : undefined}
                    className={`max-w-full max-h-[70%] object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-110 ${card.imgType === 'is-logo' ? 'max-w-[80%]' : ''}`}
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-2 pl-3 pr-4 pt-10 pb-4">
                  {card.logo && (
                    <a href={card.href} target="_blank" rel="noopener noreferrer" onMouseDown={(e) => e.stopPropagation()} aria-label={card.title} className="block w-fit mb-1">
                      <img src={card.logo} alt={card.title + ' logo'} draggable={false} className="h-9 w-auto max-w-[72px] object-contain" />
                    </a>
                  )}
                  <span className="text-[9px] font-bold tracking-[0.14em] uppercase"
                    style={{ color: card.accent }}>
                    {card.eyebrow}
                  </span>
                  <h4 className="text-[#0E2A38] dark:text-white text-base font-extrabold leading-tight font-['Sora',sans-serif]">
                    {card.title}
                  </h4>
                  <span className="w-10 h-[3px] rounded-full" style={{ backgroundColor: card.accent, boxShadow: `0 0 10px rgba(${card.accentRgb.join(',')},0.75)` }} />
                  <p className="text-[11px] leading-snug text-[#3F5A68] dark:text-[#AEC0CE] line-clamp-6">
                    {card.desc}
                  </p>
                </div>
              </div>
              {card.status === 'Live' ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseDown={(e) => e.stopPropagation()}
                  className="shrink-0 h-12 flex items-center justify-center gap-2 text-sm font-bold tracking-wide bg-black text-white dark:bg-white dark:text-black transition-opacity hover:opacity-85"
                >
                  <span>Visit website</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
                </a>
              ) : (
                <div
                  role="button"
                  aria-disabled="true"
                  tabIndex={-1}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="shrink-0 h-12 flex items-center justify-center gap-2 text-sm font-bold tracking-wide bg-black text-white dark:bg-white dark:text-black opacity-40 cursor-not-allowed select-none"
                >
                  <span>Coming soon</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
  );
};
