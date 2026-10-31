import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeNav?: string;
  onNavClick?: (nav: string) => void;
  onLoginClick?: () => void;
}

const SCROLL_TARGETS: Record<string, string> = {
  projects: 'nahrdev-live',
  'the-podcast': 'the-podcast',
  blogs: 'blogs',
  about: 'about',
  internships: 'internships',
};

const MEDIA_ITEMS = [
  { label: 'The Podcast', id: 'the-podcast', href: '#the-podcast' },
  { label: 'Blogs', id: 'blogs', href: '#blogs' },
  { label: 'Meetings', id: 'meetings', href: '/conversations' },
];

const ABOUT_ITEMS = [
  { label: "Founder's story", id: 'a-founder-shaped-by-austin-alexandria-sofia-and-the-island-of-lemnos' },
  { label: 'AI and robotics', id: 'from-caipo-to-flobrain-embodied-ai-and-robotics' },
  { label: 'Why FloLabs', id: 'why-john-created-flolabs' },
  { label: 'Learning philosophy', id: 'johns-approach-to-learning-and-leadership' },
  { label: 'Questions and answers', id: 'frequently-asked-questions' },
];

const NAV_ITEMS = [
  { label: 'Home', id: 'home', href: '#' },
  { label: 'About', id: 'about', href: '/about' },
  { label: 'Projects', id: 'projects', href: '#projects' },
  { label: 'Media', id: 'media', href: '#media' },
  { label: 'Internships', id: 'internships', href: '#internships' },
];

export const Header: React.FC<HeaderProps> = ({ activeNav = 'home', onNavClick, onLoginClick }) => {
  const pathname = usePathname();
  const router = useRouter();
  const onMeetings = pathname.startsWith('/conversations');
  const onAbout = pathname.startsWith('/about');
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [overHero, setOverHero] = useState(true);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setOverHero(window.scrollY < 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (mediaRef.current && !mediaRef.current.contains(e.target as Node)) setMediaOpen(false);
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const goTo = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(SCROLL_TARGETS[id] || id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  };

  const contact = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMediaOpen(false);
    setAboutOpen(false);
    if (ABOUT_ITEMS.some((item) => item.id === id)) {
      if (pathname.startsWith('/about')) goTo(id);
      else router.push('/about#' + id);
      return;
    }
    if (id === 'meetings') {
      router.push('/conversations');
      return;
    }
    if (id === 'about') {
      router.push('/about');
      return;
    }
    if (pathname !== '/') {
      if (id === 'home') router.push('/');
      else router.push('/#' + (SCROLL_TARGETS[id] || id));
      return;
    }
    onNavClick?.(id);
    goTo(id);
  };

  const mediaActive = onMeetings || MEDIA_ITEMS.some((m) => m.id === activeNav);
  const homeLightHero = !isDark && (pathname === '/' || pathname === '');
  const light = overHero && !homeLightHero;
  const txt = light ? 'text-white' : 'text-foreground';
  const dim = light ? 'text-white/75 hover:text-white' : 'text-muted hover:text-foreground';
  const activeTxt = light ? 'text-white font-semibold' : 'text-foreground font-semibold';
  const itemCls = (active: boolean) =>
    `relative inline-flex min-h-10 items-center gap-1 whitespace-nowrap transition duration-200 cursor-pointer ${active ? activeTxt : dim}`;

  const Brand = ({ cls }: { cls: string }) => (
    <a
      className={`grid min-w-0 max-w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-2.5 transition hover:opacity-90 sm:gap-3 [font-family:var(--font-inter),Arial,Helvetica,sans-serif] ${txt}`}
      href="#"
      onClick={(e) => handleNav(e, 'home')}
    >
      <img
        src={'/logos/logo-87ef29e9.png'}
        alt="FloLabs Innovations Group logo"
        draggable={false}
        className={`h-9 w-9 shrink-0 sm:h-10 sm:w-10 object-contain ${light ? '' : 'brightness-0 dark:brightness-100'}`}
      />
      <span className={cls}>FloLabs Innovations Group</span>
    </a>
  );

  const ThemeBtn = (
    <button
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`inline-flex size-11 items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer ${light ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-muted hover:bg-muted/40 hover:text-foreground'}`}
      type="button"
      onClick={toggleTheme}
    >
      {isDark ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.56 1.56M17.5 17.5l1.57 1.57M2 12h2.2M19.8 12H22M4.93 19.07l1.56-1.56M17.5 6.5l1.57-1.57" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 14.2A9 9 0 1 1 9.8 3a7.2 7.2 0 1 0 11.2 11.2Z" />
        </svg>
      )}
    </button>
  );

  const loginCls = `inline-flex items-center text-sm font-medium px-3 py-1.5 rounded-full transition-colors cursor-pointer ${light ? 'text-white border border-white/25 bg-white/10 hover:bg-white/20' : 'text-foreground/90 hover:text-primary hover:bg-muted/10'}`;

  const Chevron = ({ open }: { open: boolean }) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
        overHero ? 'border-transparent bg-transparent' : 'glass-nav border-border'
      }`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        {/* Mobile */}
        <div className="flex items-center justify-between gap-3 md:hidden">
          <Brand cls="max-w-[11rem] text-left text-sm font-semibold leading-none tracking-tight sm:max-w-none sm:text-base" />
          <div className="flex shrink-0 items-center gap-1.5">
            <button onClick={contact} className={loginCls}>Contact us</button>
            {ThemeBtn}
          </div>
        </div>
        <nav aria-label="Mobile navigation" className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-[0.65rem] font-medium uppercase tracking-[0.06em] md:hidden scrollbar-none">
          {NAV_ITEMS.map((item) => {
            if (item.id === 'about') {
              return (
                <React.Fragment key="about">
                  <button
                    type="button"
                    onClick={() => setAboutOpen((o) => !o)}
                    className={`inline-flex min-h-10 items-center gap-1 whitespace-nowrap rounded-full px-3 uppercase tracking-[0.06em] cursor-pointer ${onAbout || aboutOpen ? (light ? 'bg-white/15 text-white' : 'bg-background/80 text-foreground') : dim}`}
                  >
                    About <Chevron open={aboutOpen} />
                  </button>
                  {aboutOpen &&
                    ABOUT_ITEMS.map((m) => (
                      <a
                        key={m.id}
                        href={'/about#' + m.id}
                        onClick={(e) => handleNav(e, m.id)}
                        className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3 border ${light ? 'border-white/25 text-white' : 'border-border text-foreground'}`}
                      >
                        {m.label}
                      </a>
                    ))}
                </React.Fragment>
              );
            }
            if (item.id === 'media') {
              return (
                <React.Fragment key="media">
                  <button
                    type="button"
                    onClick={() => setMediaOpen((o) => !o)}
                    className={`inline-flex min-h-10 items-center gap-1 whitespace-nowrap rounded-full px-3 uppercase tracking-[0.06em] cursor-pointer ${mediaActive || mediaOpen ? (light ? 'bg-white/15 text-white' : 'bg-background/80 text-foreground') : dim}`}
                  >
                    Media <Chevron open={mediaOpen} />
                  </button>
                  {mediaOpen &&
                    MEDIA_ITEMS.map((m) => (
                      <a
                        key={m.id}
                        href={m.href}
                        onClick={(e) => handleNav(e, m.id)}
                        className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3 border ${m.id === 'meetings' && onMeetings ? 'font-semibold ' : ''}${light ? 'border-white/25 text-white' : 'border-border text-foreground'}`}
                      >
                        {m.label}
                      </a>
                    ))}
                </React.Fragment>
              );
            }
            const isActive = activeNav === item.id || (item.id === 'about' && onAbout);
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNav(e, item.id)}
                className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3 transition duration-200 ${isActive ? (light ? 'bg-white/15 text-white font-semibold' : 'bg-background/80 text-foreground font-semibold') : dim}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop */}
        <div className="hidden w-full items-center gap-x-6 md:flex md:py-1 lg:gap-x-8">
          <div className="shrink-0">
            <Brand cls="text-left text-sm font-semibold leading-none tracking-tight sm:text-base md:text-lg" />
          </div>
          <nav aria-label="Desktop navigation" className="flex min-w-0 flex-1 items-center justify-start gap-x-6 lg:gap-x-7 text-[0.7rem] font-medium uppercase tracking-[0.06em]">
            {NAV_ITEMS.map((item) => {
              if (item.id === 'about') {
                return (
                  <div key="about" ref={aboutRef} className="relative" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
                    <button type="button" aria-haspopup="menu" aria-expanded={aboutOpen} onClick={(e) => handleNav(e, 'about')} className={`${itemCls(onAbout || aboutOpen)} uppercase tracking-[0.06em]`}>
                      About <Chevron open={aboutOpen} />
                      {(onAbout || aboutOpen) && <span className={`absolute bottom-1 left-0 right-0 h-[2px] rounded-full ${light ? 'bg-white' : 'bg-primary'}`} />}
                    </button>
                    {aboutOpen && (
                      <div role="menu" className="absolute left-0 top-full pt-2 min-w-[220px]">
                        <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0d1424]/95 backdrop-blur-xl shadow-[0_18px_40px_rgba(0,0,0,0.45)] py-2">
                          {ABOUT_ITEMS.map((m) => (
                            <a
                              key={m.id}
                              role="menuitem"
                              href={'/about#' + m.id}
                              onClick={(e) => handleNav(e, m.id)}
                              className="block px-5 py-2.5 text-[0.72rem] tracking-[0.06em] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              {m.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              if (item.id === 'media') {
                return (
                  <div key="media" ref={mediaRef} className="relative" onMouseEnter={() => setMediaOpen(true)} onMouseLeave={() => setMediaOpen(false)}>
                    <button type="button" aria-haspopup="menu" aria-expanded={mediaOpen} onClick={() => setMediaOpen((o) => !o)} className={`${itemCls(mediaActive || mediaOpen)} uppercase tracking-[0.06em]`}>
                      Media <Chevron open={mediaOpen} />
                    </button>
                    {mediaOpen && (
                      <div role="menu" className="absolute left-0 top-full pt-2 min-w-[190px]">
                        <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0d1424]/95 backdrop-blur-xl shadow-[0_18px_40px_rgba(0,0,0,0.45)] py-2">
                          {MEDIA_ITEMS.map((m) => (
                            <a
                              key={m.id}
                              role="menuitem"
                              href={m.href}
                              onClick={(e) => handleNav(e, m.id)}
                              className={`block px-5 py-2.5 text-[0.72rem] tracking-[0.06em] transition-colors hover:bg-white/10 ${activeNav === m.id || (m.id === 'meetings' && onMeetings) ? 'text-white font-semibold' : 'text-white/80 hover:text-white'}`}
                            >
                              {m.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              const isActive = activeNav === item.id || (item.id === 'about' && onAbout);
              return (
                <a key={item.id} href={item.href} onClick={(e) => handleNav(e, item.id)} className={itemCls(isActive)}>
                  {item.label}
                  {isActive && <span className={`absolute bottom-1 left-0 right-0 h-[2px] rounded-full ${light ? 'bg-white' : 'bg-primary'}`} />}
                </a>
              );
            })}
          </nav>
          <div className="flex shrink-0 items-center gap-2 lg:gap-3">
            <button onClick={contact} className={loginCls}>Contact us</button>
            {ThemeBtn}
          </div>
        </div>
      </div>
    </header>
  );
};
