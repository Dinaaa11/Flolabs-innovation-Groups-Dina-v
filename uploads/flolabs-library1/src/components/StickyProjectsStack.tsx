import React, { useEffect, useRef } from 'react';

interface FocusCard {
  id: string;
  num: string;
  category: string;
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
  image: string;
  gradientAccent: string;
}

const FOCUS_CARDS: FocusCard[] = [
  {
    id: 'card-01',
    num: '01',
    category: 'AI-Powered Platforms',
    title: 'EDUCATION & LEARNING',
    description: 'Revolutionizing learning through AI-powered educational tools and platforms.',
    actionText: 'Explore Platform',
    actionHref: 'https://www.flolabsinnovations.com/',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    gradientAccent: '#38bdf8',
  },
  {
    id: 'card-02',
    num: '02',
    category: 'Biomedical Intelligence',
    title: 'HEALTHCARE & MEDICINE',
    description: 'Advancing medical research and patient care with cutting-edge AI.',
    actionText: 'Explore Research',
    actionHref: 'https://www.flolabsinnovations.com/',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    gradientAccent: '#0ea5e9',
  },
  {
    id: 'card-03',
    num: '03',
    category: 'Intelligent Automation',
    title: 'TRAVEL & MOBILITY',
    description: 'Enhancing travel experiences with intelligent automation and personalization.',
    actionText: 'Explore System',
    actionHref: 'https://www.flolabsinnovations.com/',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop',
    gradientAccent: '#0284c7',
  },
  {
    id: 'card-04',
    num: '04',
    category: 'Deep Space Technologies',
    title: 'SPACE EXPLORATION',
    description: 'Advancing space exploration and travel with AI-driven technologies and innovation.',
    actionText: 'Mission Audit',
    actionHref: 'https://www.flolabsinnovations.com/',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    gradientAccent: '#38bdf8',
  },
];

export const StickyProjectsStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const nextCard = cardRefs.current[index + 1];

        // If not the last card, calculate how much the next card is covering it
        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          // When nextCard enters viewport from bottom and moves up toward top
          const distance = nextRect.top;
          if (distance <= windowHeight && distance >= 0) {
            const progress = 1 - distance / windowHeight;
            const scale = 1 - progress * 0.1; // scale from 1.0 down to 0.90
            const opacity = 1 - progress * 0.45; // opacity from 1.0 down to 0.55
            const blur = progress * 6; // blur up to 6px
            const translateY = -progress * 25; // slight negative push

            card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
            card.style.opacity = `${opacity}`;
            card.style.filter = `blur(${blur}px)`;
          } else if (distance < 0) {
            card.style.transform = `translate3d(0, -25px, 0) scale(0.9)`;
            card.style.opacity = `0.5`;
            card.style.filter = `blur(6px)`;
          } else {
            card.style.transform = `translate3d(0, 0, 0) scale(1)`;
            card.style.opacity = `1`;
            card.style.filter = `blur(0px)`;
          }
        } else {
          // Last card stays crisp and full scale
          card.style.transform = `translate3d(0, 0, 0) scale(1)`;
          card.style.opacity = `1`;
          card.style.filter = `blur(0px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="portfolio-stack-wrapper relative w-full bg-[#050608] text-white py-24 sm:py-36 overflow-hidden">
      {/* Background cyber grid & glow accent */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#00349b]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#38bdf8]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-[1140px] px-5 sm:px-8 lg:px-10 relative z-10">
        
        {/* NahrDev Inspired Stack Header */}
        <div className="stack-header mb-16 sm:mb-24 text-left">
          <div className="header-preline flex items-center gap-3 sm:gap-4 mb-4">
            <span className="sub-line font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-[#38bdf8] font-semibold">
              FloLabs Innovations Focus
            </span>
            <span className="year-badge text-[10px] font-extrabold text-white border border-white/15 px-2 py-0.5 rounded-sm">
              © 2025–26
            </span>
          </div>

          <h2 className="main-title text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Proven <span className="italic text-transparent [-webkit-text-stroke:1.5px_#38bdf8]">Digital Ventures</span>
          </h2>

          <div className="header-accent-line w-16 h-1 bg-[#38bdf8] mt-6 rounded-full shadow-[0_0_15px_#38bdf8]" />
        </div>

        {/* Stacking Cards Container */}
        <div ref={containerRef} className="stack-container relative pb-20">
          {FOCUS_CARDS.map((card, index) => (
            <div
              key={card.id}
              id={card.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={{
                top: `${80 + index * 18}px`,
                zIndex: index + 1,
              }}
              className="stack-card sticky min-h-[580px] sm:min-h-[640px] lg:h-[78vh] max-h-[820px] w-full mb-16 sm:mb-28 lg:mb-36 flex items-center justify-center transition-[transform,opacity,filter] duration-150 ease-out will-change-transform"
            >
              <div className="card-inner group w-full h-full bg-[#12141a]/95 backdrop-blur-xl border border-white/10 hover:border-[#38bdf8]/40 rounded-3xl sm:rounded-[36px] grid grid-cols-1 lg:grid-cols-[1.25fr_0.95fr] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.65)] transition-all duration-300">
                
                {/* Visual Side with Scanner Effect */}
                <div className="card-visual relative min-h-[260px] sm:min-h-[320px] lg:h-full bg-black overflow-hidden order-1 lg:order-1">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141a] via-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:to-[#12141a]" />
                  
                  {/* Cyber Scanner Line */}
                  <div
                    tabIndex={-1}
                    className="card-scanner absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_bottom,transparent_30%,#38bdf8_50%,transparent_70%)] [background-size:100%_12px] animate-pulse"
                  />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-[#38bdf8] border border-[#38bdf8]/30 rounded-full">
                      Pillar {card.num}
                    </span>
                  </div>
                </div>

                {/* Content / Meta Side */}
                <div className="card-meta relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col justify-center order-2 lg:order-2">
                  <div className="meta-top flex justify-between items-center mb-4 sm:mb-8">
                    <span className="p-num font-mono text-4xl sm:text-6xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.7)] group-hover:[-webkit-text-stroke:1.5px_#38bdf8] transition-colors">
                      {card.num}
                    </span>
                    <span className="p-cat text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
                      {card.category}
                    </span>
                  </div>

                  <h3 className="p-title text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                    {card.title}
                  </h3>

                  <p className="p-desc text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg">
                    {card.description}
                  </p>

                  <div className="p-actions mt-auto pt-2">
                    <a
                      href={card.actionHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-neo inline-flex items-center justify-between sm:justify-center gap-4 px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-[#38bdf8] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-300 hover:translate-x-2 shadow-lg hover:shadow-[#38bdf8]/30 group/btn"
                    >
                      <span>{card.actionText}</span>
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 sm:w-5 sm:h-5 stroke-black stroke-[2.5] fill-none transition-transform duration-300 group-hover/btn:translate-x-1"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
