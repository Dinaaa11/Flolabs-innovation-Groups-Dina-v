import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ProjectCard {
  id: number;
  title: string;
  eyebrow: string;
  status: 'Live' | 'Coming Soon';
  desc: string;
  imgSrc: string;
  imgType: 'is-product' | 'is-photo' | 'is-logo';
  href: string;
  pattern: 'pat-rays' | 'pat-dots' | 'pat-rings';
  accent: string;
  accentRgb: [number, number, number];
  accent2: string;
  panelDark?: boolean;
  scale?: number;
}

export const CARDS: ProjectCard[] = [
  {
    id: 1,
    title: 'MoodChanger',
    eyebrow: 'AI Wellbeing Platform',
    status: 'Live',
    desc: 'An AI-powered platform designed to enhance emotional well-being with personalized insights and practical guidance.',
    imgSrc: 'https://www.flostudios.ai/assets/carousel/moodchanger.png',
    imgType: 'is-product',
    href: 'https://www.moodchanger.ai/',
    pattern: 'pat-rays',
    accent: '#FDE035',
    accentRgb: [253, 224, 53],
    accent2: 'rgb(184, 166, 45)',
    panelDark: true,
  },
  {
    id: 2,
    title: 'CAIPO',
    eyebrow: 'Wearable AI',
    status: 'Live',
    desc: 'A wearable AI system focused on capturing moments, organizing notes, and improving productivity workflows.',
    imgSrc: 'https://www.flostudios.ai/assets/caipo-card.webp',
    imgType: 'is-product',
    href: 'https://www.caipo.ai/',
    pattern: 'pat-dots',
    accent: '#9D52EB',
    accentRgb: [157, 82, 235],
    accent2: 'rgb(115, 64, 176)',
    scale: 1.6,
  },
  {
    id: 3,
    title: 'Flo Travel',
    eyebrow: 'AI Travel Platform',
    status: 'Live',
    desc: 'AI-powered travel planning for flights, hotels, reservations, and activities in one connected experience.',
    imgSrc: 'https://www.flostudios.ai/assets/carousel/flotravel.png',
    imgType: 'is-product',
    href: 'https://www.flomadtravel.com/',
    pattern: 'pat-rays',
    accent: '#0AA573',
    accentRgb: [10, 165, 115],
    accent2: 'rgb(9, 123, 90)',
  },
  {
    id: 4,
    title: 'Innovation Bootcamp University',
    eyebrow: 'Education Initiative',
    status: 'Live',
    desc: 'A cooperative education initiative that helps learners move from foundational training to paid, real-world tech project experience.',
    imgSrc: 'https://www.flostudios.ai/assets/carousel/bootcamp.png',
    imgType: 'is-product',
    href: 'https://www.flostudios.ai/',
    pattern: 'pat-dots',
    accent: '#13A7CB',
    accentRgb: [19, 167, 203],
    accent2: 'rgb(15, 125, 153)',
  },
  {
    id: 5,
    title: 'TARRL',
    eyebrow: 'Robotics Research Lab',
    status: 'Live',
    desc: "The official portal for FloLabs' Texas Advanced Robotics Research Lab (TARRL).",
    imgSrc: 'https://www.flostudios.ai/assets/carousel/tarrl.png',
    imgType: 'is-product',
    href: 'https://www.flostudios.ai/',
    pattern: 'pat-rings',
    accent: '#002868',
    accentRgb: [0, 40, 104],
    accent2: 'rgb(2, 33, 82)',
  },
  {
    id: 6,
    title: 'FloStudio',
    eyebrow: 'Corporate Platform',
    status: 'Live',
    desc: 'A global platform showcasing FloLabs initiatives, partnerships, and AI/technology innovation.',
    imgSrc: '/logos/logo-flostudios-mustadl3-nobk.png',
    imgType: 'is-logo',
    href: 'https://www.flostudios.ai/',
    pattern: 'pat-dots',
    accent: '#387CEA',
    accentRgb: [56, 124, 234],
    accent2: 'rgb(42, 94, 176)',
  },
  {
    id: 7,
    title: 'MoodChanger for Pets',
    eyebrow: 'Pet Wellness Platform',
    status: 'Live',
    desc: 'An AI-driven pet wellness platform combining wearables, environment data, and behavior insights.',
    imgSrc: 'https://www.flostudios.ai/assets/pets-card.png',
    imgType: 'is-photo',
    href: 'https://www.flostudios.ai/',
    pattern: 'pat-rings',
    accent: '#8B5A2B',
    accentRgb: [139, 90, 43],
    accent2: 'rgb(102, 69, 38)',
  },
  {
    id: 8,
    title: 'RoboCollective',
    eyebrow: 'Robotics Initiative',
    status: 'Live',
    desc: 'A major initiative focused on intelligent systems, human-robot interaction, and robotics commercialization through RoboCollective.',
    imgSrc: 'https://www.flostudios.ai/assets/robocollective-card.png',
    imgType: 'is-product',
    href: 'https://robocollective.ai/',
    pattern: 'pat-rays',
    accent: '#00DBFF',
    accentRgb: [0, 219, 255],
    accent2: 'rgb(2, 162, 191)',
    panelDark: true,
  },
  {
    id: 9,
    title: 'Hephaestus International',
    eyebrow: 'Experiential Institute',
    status: 'Live',
    desc: 'An experiential learning institute focused on innovation, education, and advanced technology development.',
    imgSrc: 'https://www.flostudios.ai/assets/carousel/hepheastus.png',
    imgType: 'is-product',
    href: 'https://www.flostudios.ai/',
    pattern: 'pat-dots',
    accent: '#1269C7',
    accentRgb: [18, 105, 199],
    accent2: 'rgb(15, 80, 151)',
  },
  {
    id: 10,
    title: 'FloLabs International',
    eyebrow: 'Global Hub',
    status: 'Live',
    desc: "A global hub highlighting FloLabs' mission, projects, and collaboration opportunities.",
    imgSrc: 'https://www.flostudios.ai/assets/carousel/international.png',
    imgType: 'is-product',
    href: 'https://www.flolabs.international/',
    pattern: 'pat-rings',
    accent: '#00349B',
    accentRgb: [0, 52, 155],
    accent2: 'rgb(2, 42, 119)',
  },
  {
    id: 11,
    title: 'FloBrain',
    eyebrow: 'AI Initiative',
    status: 'Coming Soon',
    desc: 'An AI-native initiative focused on knowledge workflows, intelligent assistants, and practical team productivity systems.',
    imgSrc: 'https://www.flostudios.ai/assets/carousel/brain.svg',
    imgType: 'is-product',
    href: 'https://www.flostudios.ai/',
    pattern: 'pat-dots',
    accent: '#AD46FF',
    accentRgb: [173, 70, 255],
    accent2: 'rgb(126, 55, 191)',
  },
  {
    id: 12,
    title: 'Connecting the Dots',
    eyebrow: 'Cross-Disciplinary Initiative',
    status: 'Coming Soon',
    desc: 'A cross-disciplinary initiative connecting ideas, teams, and execution into clearer and more actionable outcomes.',
    imgSrc: 'https://www.flostudios.ai/ConnectingTheDots_logo.svg',
    imgType: 'is-logo',
    href: 'https://www.flostudios.ai/',
    pattern: 'pat-rays',
    accent: '#FF6600',
    accentRgb: [255, 102, 0],
    accent2: 'rgb(185, 78, 7)',
  },
  {
    id: 13,
    title: 'Legal & Ethics Ventures Institute',
    eyebrow: 'Legal & Ethics Institute',
    status: 'Live',
    desc: 'A remote-first, hands-on institute for legal, ethics, and AI venture projects with real-world execution.',
    imgSrc: 'https://www.flostudios.ai/assets/carousel/legal.webp',
    imgType: 'is-product',
    href: 'https://www.flostudios.ai/',
    pattern: 'pat-dots',
    accent: '#F23D3D',
    accentRgb: [242, 61, 61],
    accent2: 'rgb(176, 48, 51)',
  },
  {
    id: 14,
    title: 'Space Ventures Institute',
    eyebrow: 'Venture Institute',
    status: 'Live',
    desc: 'A remote-first experiential venture institute connecting talent to real space economy projects.',
    imgSrc: 'https://www.flostudios.ai/assets/carousel/spaceventures.png',
    imgType: 'is-product',
    href: 'https://www.flostudios.ai/',
    pattern: 'pat-rays',
    accent: '#2962FF',
    accentRgb: [41, 98, 255],
    accent2: 'rgb(31, 75, 191)',
  },
  {
    id: 15,
    title: 'Cosmos Intelligence',
    eyebrow: 'Research Initiative',
    status: 'Live',
    desc: 'An open research and product initiative using AI to study cosmic-scale structure, signals, and information patterns across public space data.',
    imgSrc: 'https://www.flostudios.ai/assets/carousel/cosmos.png',
    imgType: 'is-product',
    href: 'https://www.flostudios.ai/',
    pattern: 'pat-rings',
    accent: '#5A4FCF',
    accentRgb: [90, 79, 207],
    accent2: 'rgb(66, 61, 156)',
  },
];

export const FloStudiosExperiences: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cylRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const step = 360 / CARDS.length;

  useEffect(() => {
    const cyl = cylRef.current;
    const ring = ringRef.current;
    if (!cyl || !ring) return;

    const cards = cardRefs.current.filter((c): c is HTMLDivElement => !!c);
    const count = cards.length;
    if (count === 0) return;

    let rafId = 0;
    const state = {
      rotation: 0,
      velocity: 0,
      dragging: false,
      pending: false,
      lastX: 0,
      startX: 0,
      pointerId: -1,
    };

    const getRadius = () => {
      const width = window.innerWidth;
      if (width < 640) return 880;
      if (width < 1024) return 1250;
      return 1460;
    };

    let radius = getRadius();
    let activeIdx = -1;

    const normalizeAngle = (ang: number) => {
      ang = ang % 360;
      if (ang > 180) ang -= 360;
      if (ang < -180) ang += 360;
      return ang;
    };

    const fadeRange = 2.4 * step;

    const render = () => {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${state.rotation}deg)`;

      let closestIdx = 0;
      let minDiff = Infinity;

      for (let i = 0; i < count; i++) {
        const cardAngle = i * step;
        const diff = Math.abs(normalizeAngle(cardAngle + state.rotation));
        const scale = Math.max(0.7, 1 - diff / 375);
        const opacity = Math.max(0, 1 - diff / fadeRange);

        const card = cards[i];
        card.style.transform = `rotateY(${cardAngle}deg) translateZ(${radius}px) scale(${scale.toFixed(3)})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.pointerEvents = diff < 90 ? 'auto' : 'none';

        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      }

      if (closestIdx !== activeIdx) {
        if (activeIdx >= 0) cards[activeIdx].classList.remove('is-active');
        cards[closestIdx].classList.add('is-active');
        activeIdx = closestIdx;
      }
    };

    const getTargetSnap = () => Math.round(state.rotation / step) * step;

    const tick = () => {
      if (state.dragging) {
        render();
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (Math.abs(state.velocity) > 0.02) {
        state.rotation += state.velocity;
        state.velocity *= 0.92;
        render();
        rafId = requestAnimationFrame(tick);
        return;
      }

      const snapOffset = getTargetSnap() - state.rotation;
      if (Math.abs(snapOffset) > 0.05) {
        state.rotation += 0.07 * snapOffset;
        render();
        rafId = requestAnimationFrame(tick);
      } else {
        state.rotation = getTargetSnap();
        state.velocity = 0;
        render();
        rafId = 0;
      }
    };

    const scheduleTick = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if ((e.target as HTMLElement)?.closest("a, button, [role='button']")) return;

      state.pending = true;
      state.dragging = false;
      state.lastX = e.clientX;
      state.startX = e.clientX;
      state.pointerId = e.pointerId;
      state.velocity = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (state.pending && !state.dragging) {
        if (Math.abs(e.clientX - state.startX) < 10) return;
        state.pending = false;
        state.dragging = true;
        cyl.classList.add('dragging');
        if (cyl.setPointerCapture) cyl.setPointerCapture(state.pointerId);
        scheduleTick();
      }

      if (!state.dragging) return;
      const delta = e.clientX - state.lastX;
      state.lastX = e.clientX;
      const speed = 0.18 * delta;
      state.rotation += speed;
      state.velocity = Math.max(-4, Math.min(4, speed));
    };

    const onPointerUp = () => {
      if (state.pending) {
        state.pending = false;
        return;
      }
      if (state.dragging) {
        state.dragging = false;
        cyl.classList.remove('dragging');
        if (state.pointerId >= 0 && cyl.releasePointerCapture) {
          try {
            cyl.releasePointerCapture(state.pointerId);
          } catch (_) {}
        }
        scheduleTick();
      }
    };

    const onWheel = (e: WheelEvent) => {
      const deltaX = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
      if (deltaX) {
        e.preventDefault();
        state.velocity = Math.max(-7, Math.min(7, 0.06 * deltaX));
        state.rotation += state.velocity;
        scheduleTick();
      }
    };

    const onResize = () => {
      radius = getRadius();
      render();
    };

    const onCardClick = (e: MouseEvent) => {
      if (state.dragging) return;
      if ((e.target as HTMLElement)?.closest("a, button, [role='button']")) return;
      const target = (e.currentTarget as HTMLElement);
      const cardIndex = parseInt(target.getAttribute('data-index') || '0', 10);
      if (cardIndex === activeIdx) return;
      const cardAngle = cardIndex * step;
      const targetRotation = -cardAngle;
      const diff = normalizeAngle(targetRotation - state.rotation);
      state.rotation += diff;
      state.velocity = 0;
      render();
      scheduleTick();
    };

    cards.forEach((card) => card.addEventListener('click', onCardClick));
    cyl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    cyl.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize, { passive: true });

    render();

    return () => {
      cards.forEach((card) => card.removeEventListener('click', onCardClick));
      cyl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      cyl.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [step]);

  return (
    <section
      className={`relative py-24 sm:py-36 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#07090e] text-white' : 'bg-[#F8FAFD] text-[#0E2A38]'
      }`}
      id="work"
    >
      {/* Background ambient lighting */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[160px] pointer-events-none transition-opacity duration-300 ${
          isDark ? 'bg-[#38bdf8]/10' : 'bg-[#1CA9E1]/15'
        }`}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2
            className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 font-['Sora',sans-serif] ${
              isDark ? 'text-white' : 'text-[#0E2A38]'
            }`}
          >
            Websites &amp;{' '}
            <span className="bg-gradient-to-r from-[#1CA9E1] to-[#387CEA] dark:from-[#38bdf8] dark:to-[#818cf8] bg-clip-text text-transparent">
              Digital Experiences
            </span>
          </h2>
        </div>
      </div>

      {/* 3D Cylindrical Carousel */}
      <div
        ref={cylRef}
        className="cyl relative w-full pt-8 pb-4 [perspective:2100px] [perspective-origin:50%_46%] cursor-grab select-none active:cursor-grabbing touch-pan-y"
        style={{
          ['--card-w' as any]: '548px',
          ['--card-h' as any]: '540px',
        }}
      >
        <div className="cyl-stage relative h-[540px] [transform-style:preserve-3d] mx-auto">
          <div
            ref={ringRef}
            className="cyl-ring absolute top-0 left-1/2 w-0 h-[540px] [transform-style:preserve-3d]"
            style={{ ['--step' as any]: `${step}deg` }}
          >
            {CARDS.map((card, idx) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                data-index={idx}
                className="cyl-card absolute top-0 left-0 w-[548px] h-[540px] -ml-[274px] [transform-style:preserve-3d] [backface-visibility:hidden] will-change-transform cursor-pointer"
                style={{ ['--i' as any]: idx }}
              >
                <article
                  className={`pcard group relative flex flex-col h-full rounded-[30px] overflow-hidden isolate transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-2 ${
                    isDark
                      ? 'bg-[#0B1420] shadow-[0_22px_54px_rgba(0,0,0,0.5)]'
                      : 'bg-white shadow-[0_20px_46px_rgba(14,42,56,0.10)]'
                  }`}
                  style={{
                    ['--accent' as any]: card.accent,
                    ['--ar' as any]: card.accentRgb[0],
                    ['--ag' as any]: card.accentRgb[1],
                    ['--ab' as any]: card.accentRgb[2],
                    ['--accent-2' as any]: card.accent2,
                  }}
                >
                  {/* Card Top Area */}
                  <div
                    className={`pcard-top relative flex-1 min-h-0 pl-[44%] pr-7 pt-7 pb-5 transition-colors duration-300 ${
                      isDark
                        ? 'bg-[radial-gradient(120%_92%_at_24%_26%,#122032_0,#0B1420_58%,#09121C_100%)]'
                        : 'bg-[radial-gradient(120%_92%_at_24%_26%,#F4FAFD_0,#FFFFFF_58%,#EAF6FC_100%)]'
                    }`}
                  >
                    {/* Pattern Overlay */}
                    <div
                      className={`pcard-pattern absolute inset-0 pointer-events-none [mask:radial-gradient(130%_105%_at_30%_42%,#000,transparent_76%)] ${
                        isDark ? 'opacity-60' : 'opacity-75'
                      } ${
                        card.pattern === 'pat-dots'
                          ? isDark
                            ? 'bg-[radial-gradient(rgba(var(--ar)_var(--ag)_var(--ab)/0.55)_1px,transparent_1.7px)] [background-size:15px_15px]'
                            : 'bg-[radial-gradient(rgba(var(--ar)_var(--ag)_var(--ab)/0.38)_1px,transparent_1.7px)] [background-size:15px_15px]'
                          : card.pattern === 'pat-rings'
                          ? isDark
                            ? 'bg-[repeating-radial-gradient(circle_at_26%_46%,transparent_0_19px,rgba(var(--ar)_var(--ag)_var(--ab)/0.16)_19px_20.5px)]'
                            : 'bg-[repeating-radial-gradient(circle_at_26%_46%,transparent_0_19px,rgba(var(--ar)_var(--ag)_var(--ab)/0.14)_19px_20.5px)]'
                          : isDark
                          ? 'bg-[repeating-conic-gradient(from_205deg_at_28%_56%,rgba(var(--ar)_var(--ag)_var(--ab)/0.14)_0_2.4deg,transparent_2.4deg_13deg)]'
                          : 'bg-[repeating-conic-gradient(from_205deg_at_28%_56%,rgba(var(--ar)_var(--ag)_var(--ab)/0.12)_0_2.4deg,transparent_2.4deg_13deg)]'
                      }`}
                    />

                    {/* Status Pill */}
                    <span
                      className={`absolute top-5 right-5 z-10 inline-flex items-center text-[10.5px] font-bold tracking-wider px-3.5 py-1.5 rounded-full border shadow-sm ${
                        card.panelDark && isDark
                          ? 'text-[#13203a] font-extrabold border-black/10'
                          : 'text-white border-white/20'
                      }`}
                      style={{
                        backgroundColor: card.accent,
                        boxShadow: `0 4px 14px rgba(${card.accentRgb.join(' ')} / 0.4)`,
                      }}
                    >
                      {card.status}
                    </span>

                    {/* Media / Floating Hero */}
                    <div className="pcard-media absolute left-[6%] top-[10%] bottom-[12%] w-[34%] flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2">
                      <img
                        src={card.imgSrc}
                        alt={card.title}
                        loading="lazy"
                        draggable={false}
                        className={`pcard-hero max-w-full max-h-full object-contain filter drop-shadow-[0_14px_22px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-105 ${
                          card.imgType === 'is-logo'
                            ? 'max-w-[76%] max-h-[76%]'
                            : card.imgType === 'is-photo'
                            ? 'max-w-[94%] max-h-[94%] rounded-2xl [mask:radial-gradient(120%_120%_at_50%_48%,#000_60%,transparent_92%)]'
                            : ''
                        }`}
                        style={{
                          transform: card.scale ? `scale(${card.scale})` : undefined,
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="pcard-info relative z-10 h-full flex flex-col justify-center gap-3">
                      <span
                        className="text-[11px] font-bold tracking-[0.16em] uppercase"
                        style={{ color: `rgb(${card.accentRgb.join(' ')})` }}
                      >
                        {card.eyebrow}
                      </span>
                      <h3
                        className={`font-['Sora',sans-serif] font-extrabold text-2xl lg:text-3xl leading-tight transition-colors duration-300 ${
                          isDark ? 'text-white' : 'text-[#0E2A38]'
                        }`}
                      >
                        {card.title}
                      </h3>
                      <span
                        className="w-16 h-[3px] rounded-full"
                        style={{
                          backgroundColor: card.accent,
                          boxShadow: `0 0 12px rgba(${card.accentRgb.join(' ')} / 0.75)`,
                        }}
                      />
                      <p
                        className={`text-[13.5px] leading-relaxed line-clamp-3 max-w-[32ch] transition-colors duration-300 ${
                          isDark ? 'text-[#AEC0CE]' : 'text-[#3F5A68]'
                        }`}
                      >
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  {/* Visit Link Panel - Tall Substantial Button as in FloStudios / Screenshot */}
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`pcard-panel relative z-10 min-h-[82px] sm:min-h-[86px] flex items-center justify-center gap-3 px-8 py-6 font-['Sora',sans-serif] font-bold text-base sm:text-[17px] tracking-wide transition-all duration-300 rounded-b-[28px] sm:rounded-b-[30px] group-hover:brightness-110 shadow-inner`}
                    style={{
                      background: `linear-gradient(158deg, ${card.accent} 0%, ${card.accent2} 100%)`,
                      color: card.panelDark ? '#13203a' : '#ffffff',
                    }}
                  >
                    <span>Visit website</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      <path d="M5 12h14" />
                      <path d="M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`text-center mt-10 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors duration-300 ${
          isDark ? 'text-[#7C93A3]' : 'text-[#6C8492]'
        }`}
      >
        <span>◀</span> Drag or swipe horizontally to rotate 3D cylinder <span>▶</span>
      </div>
    </section>
  );
};
