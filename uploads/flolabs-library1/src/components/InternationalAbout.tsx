'use client';

import React, { useEffect, useRef } from 'react';

const LOGOS = [
  '/projects/icons/FloLabs_logo MoodChanger.svg',
  '/projects/icons/FloLabs_logo CAIPO.svg',
  '/projects/icons/FloLabs_logo FloStudios.svg',
  '/projects/icons/FloLabs_logo Flomad Travel.svg',
  '/projects/icons/FloLabs_logo Bootcamp University.svg',
  '/projects/icons/FloLabs_logo TARRL.svg',
  '/projects/icons/Flolabs_logo Black.png',
  '/projects/icons/FloLabs_logo MoodChanger for Pets.svg',
  '/projects/icons/FloLabs_logo RoboCollective.svg',
  '/projects/icons/FloLabs_logo Hephaestus.svg',
  '/projects/icons/FloLabs_logo FloBrain.svg',
  '/projects/icons/FloLabs_logo Connecting The Dots.svg',
  '/projects/icons/FloLabs_logo Legal.svg',
  '/projects/icons/FloLabs_logo Space.svg',
  '/projects/icons/FloLabs_logo Space.svg',
];

function Reveal({
  children,
  className = '',
  delay = 0,
  from = 'translate3d(0, 12px, 0)',
  duration = 500,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      node.style.opacity = '1';
      node.style.transform = 'none';
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.style.opacity = '1';
          node.style.transform = 'translate3d(0, 0, 0) scale(1)';
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`motion-reduce:opacity-100 ${className}`}
      style={{
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transform: from,
        opacity: 0,
      }}
    >
      {children}
    </div>
  );
}

function LogoRow({ hidden }: { hidden?: boolean }) {
  return (
    <div className="home-projects-marquee-group gap-6 sm:gap-8" aria-hidden={hidden || undefined}>
      {LOGOS.map((src, index) => (
        <div key={`${src}-${index}`} className="flex h-16 w-[5.5rem] shrink-0 items-center justify-center sm:h-[4.5rem] sm:w-28">
          <img src={src} alt="" className="max-h-full max-w-full object-contain" decoding="async" />
        </div>
      ))}
    </div>
  );
}

export function InternationalAbout({ part = 'all' }: { part?: 'all' | 'hero' | 'intro' | 'body' }) {
  const showHero = part === 'all' || part === 'hero';
  const showIntro = part === 'all' || part === 'intro';
  const showBody = part === 'all' || part === 'body';
  return (
    <div className="relative">
      {showBody ? <div aria-hidden="true" className="projects-scene-bg pointer-events-none fixed inset-0 -z-10" /> : null}
      {showHero ? <header className="relative w-full overflow-hidden border-b border-border/50 dark:border-white/10">
        <div className="absolute inset-0" aria-hidden="true">
          <img alt="" src="/about/about-header-background.png" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[min(50vh,32rem)] w-full max-w-6xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center sm:min-h-[min(55vh,36rem)] sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pt-36">
          <Reveal from="translate3d(0, 8px, 0) scale(0.96)" className="flex w-full flex-col items-center">
            <img alt="FloLabs logo" src="/flolabs-logo.svg" className="h-[10.5rem] w-[10.5rem] shrink-0 brightness-0 sm:h-48 sm:w-48 lg:h-[13.5rem] lg:w-[13.5rem] dark:invert" />
          </Reveal>
          <Reveal delay={80} className="flex w-full flex-col items-center">
            <h2 className="mt-6 text-balance text-[1.65rem] font-bold uppercase leading-[1.08] tracking-[0.18em] text-white sm:mt-7 sm:text-3xl sm:tracking-[0.22em] lg:text-4xl [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
              About
            </h2>
          </Reveal>
          <Reveal delay={160} className="flex w-full flex-col items-center">
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-center text-base font-normal leading-relaxed text-white sm:mt-5 sm:text-lg [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
              A FloLabs company focused on innovation in AI and robotics.
            </p>
          </Reveal>
        </div>
      </header> : null}

      {showIntro ? <section aria-labelledby="about-innovations-heading" className="w-full border-b border-border bg-background py-16 text-foreground sm:py-20 lg:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-11 px-4 sm:gap-[3.3rem] sm:px-6 md:flex-row md:items-center md:gap-[3.85rem] lg:px-8">
          <Reveal from="translate3d(-24px, 0, 0) scale(1)" duration={400} className="flex shrink-0 justify-center md:w-[28%] md:justify-start">
            <img alt="" aria-hidden="true" src="/projects/icons/Flolabs_logo Black.png" className="h-56 w-56 object-contain sm:h-72 sm:w-72 lg:h-80 lg:w-80 dark:invert" />
          </Reveal>
          <Reveal from="translate3d(24px, 0, 0) scale(1)" delay={80} duration={400} className="min-w-0 md:flex-1">
            <h2 id="about-innovations-heading" className="text-balance text-2xl font-bold uppercase leading-[1.08] tracking-[0.14em] text-foreground sm:text-3xl sm:tracking-[0.16em] lg:text-4xl [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
              FloLabs Innovations Group
            </h2>
            <div className="mt-6 space-y-5 text-pretty text-base font-normal leading-relaxed text-foreground/85 sm:mt-8 [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
              <p>FloLabs Innovations Group is an incubator launching innovative projects in AI and Robotics. We enhance learning and project outcomes through teamwork, idea sharing, and innovative methods like brainstorming and LLM automation, preparing students with practical skills.</p>
              <p>We provide students, career changers, and professionals with a remote, unique, powerful, and immersive hands-on educational experience where they learn what they will use in the real world. We are not just a school, we are a community of learners who are passionate about learning and growing.</p>
            </div>
          </Reveal>
        </div>
      </section> : null}

      {showBody ? <><section aria-labelledby="about-what-we-aim-heading" className="w-full overflow-x-clip bg-transparent">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20 lg:px-8 lg:pt-24">
          <Reveal className="w-full" duration={400}>
            <h2 id="about-what-we-aim-heading" className="text-balance text-center text-2xl font-bold uppercase leading-[1.08] tracking-[0.14em] text-foreground dark:text-white sm:text-3xl sm:tracking-[0.16em] lg:text-4xl [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
              What we aim to deliver
            </h2>
          </Reveal>
        </div>
        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
          <img alt="" aria-hidden="true" src="/about/what-we-aim-background.png" className="block h-auto w-full max-w-none" />
          <div className="absolute inset-0 z-10 flex flex-col justify-center gap-4 overflow-hidden px-4 py-5 sm:gap-5 sm:px-8 sm:py-6 md:px-12 lg:px-16">
            <div className="mx-auto w-full max-w-6xl overflow-hidden px-[1.5%] sm:px-[4%] md:px-[6.5%] lg:px-[8%]">
              <div className="w-full [--home-marquee-duration:40s]" role="region" aria-label="Project logos">
                <div className="home-projects-marquee-viewport relative isolate w-full">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-[#00349b] via-[#00349b]/50 to-transparent sm:w-12" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-[#00349b] via-[#00349b]/50 to-transparent sm:w-12" />
                  <div className="home-projects-marquee-track min-h-16 sm:min-h-[4.5rem]">
                    <LogoRow />
                    <div className="w-6 shrink-0 self-stretch sm:w-8" aria-hidden="true" />
                    <LogoRow hidden />
                    <div className="w-6 shrink-0 self-stretch sm:w-8" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-2 md:justify-items-center md:gap-x-7 lg:gap-x-10">
              <Reveal duration={300} className="min-w-0 w-full max-w-md">
                <h3 className="text-balance text-base font-bold uppercase leading-snug tracking-[0.14em] text-white sm:text-lg [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">Experiential Learning</h3>
                <p className="mt-1.5 text-pretty text-sm font-normal leading-snug text-white/90 sm:mt-2 sm:text-base sm:leading-relaxed [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">Unique and immersive educational training with hands-on, real world experience.</p>
              </Reveal>
              <Reveal delay={80} duration={300} className="min-w-0 w-full max-w-md">
                <h3 className="text-balance text-base font-bold uppercase leading-snug tracking-[0.14em] text-white sm:text-lg [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">Practical Experience</h3>
                <p className="mt-1.5 text-pretty text-sm font-normal leading-snug text-white/90 sm:mt-2 sm:text-base sm:leading-relaxed [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">Work on innovative, marketable projects with real-world impact.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-mission-heading" className="relative mt-[4.8rem] w-full overflow-x-clip sm:mt-[5.4rem] lg:mt-[6rem]">
        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
          <img alt="" aria-hidden="true" src="/about/future-background.png" className="block h-auto w-full max-w-none" />
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-6xl min-h-0 flex-col justify-center gap-4 overflow-x-clip px-4 py-[4%] sm:gap-5 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:px-8">
            <Reveal from="translate3d(-24px, 0, 0) scale(1)" duration={400} className="min-h-0 min-w-0 md:max-w-[58%] md:flex-1">
              <h2 id="about-mission-heading" className="text-balance text-[clamp(1rem,2.8vw,1.875rem)] font-bold uppercase leading-[1.08] tracking-[0.14em] text-white sm:tracking-[0.16em] [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
                Inspire, empower, and <span className="inline-block bg-white px-2 py-0.5 text-primary dark:text-[#00349b]">build the future</span>
              </h2>
              <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                <p className="text-pretty text-[clamp(0.8125rem,1.6vw,1rem)] font-normal leading-snug text-white/90 sm:leading-relaxed [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">Inspire and empower individuals through transformative educational experiences that foster global perspectives, innovative thinking, and practical skills.</p>
                <p className="text-pretty text-[clamp(0.8125rem,1.6vw,1rem)] font-normal leading-snug text-white/90 sm:leading-relaxed [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">We aim to cultivate a culture of curiosity and creativity, create jobs of the future, and build innovative solutions for a rapidly changing world.</p>
              </div>
            </Reveal>
            <Reveal from="translate3d(24px, 0, 0) scale(1)" delay={100} duration={400} className="flex min-h-0 w-full shrink-0 items-center justify-center md:h-full md:w-[34%] md:justify-end">
              <img src="/projects/icons/FloLabs_logo FloLabs International.svg" alt="" aria-hidden="true" className="h-auto w-auto max-w-full object-contain [max-height:min(86%,21.6vw)] md:[max-height:86%]" />
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-methodology-heading" className="w-full overflow-x-clip bg-transparent py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal duration={400} className="w-full">
            <h2 id="about-methodology-heading" className="text-balance text-center text-2xl font-bold uppercase leading-[1.08] tracking-[0.14em] text-foreground dark:text-white sm:text-3xl sm:tracking-[0.16em] lg:text-4xl [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
              Helping people learn better
            </h2>
            <p className="mt-4 text-pretty text-center text-base font-normal leading-relaxed text-muted dark:text-white/82 sm:mt-5 sm:text-lg [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
              Our methodology is to foster collaboration and creativity.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2">
            {[
              ['Recorded Meetings', 'We record and transcribe every meeting so you can review information when necessary.'],
              ['Brainwriting Exercises', 'Brain writing is an exercise to help the brain get into a creative and productive state.'],
              ['Advanced AI Tools', 'Language Learning Models help automate workflow, brainstorm, and advise work production.'],
              ['Collaborative Learning', 'We teach each other and learn together through peer support, shared practice, and active teamwork.'],
            ].map(([title, copy], index) => (
              <Reveal key={title} delay={index * 80} duration={300} from="translate3d(0, 6px, 0) scale(1)" className="h-full">
                <article className="relative border border-border bg-card p-6 text-foreground shadow-sm transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/40 hover:shadow-md sm:p-8">
                  <h3 className="text-balance pr-10 text-base font-bold uppercase leading-snug tracking-[0.14em] text-foreground dark:text-white sm:text-lg [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">{title}</h3>
                  <p className="mt-1.5 text-pretty text-sm font-normal leading-snug text-muted dark:text-white/90 sm:mt-2 sm:text-base sm:leading-relaxed [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section></> : null}
    </div>
  );
}
