import React, { useState } from 'react';

interface FooterProps {
  onNavClick?: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Internships', href: '/internships' },
  ];

  const projectLinks = [
    { name: 'Athletic Performance Intelligence', href: 'https://www.athleticperformanceintelligence.com/' },
    { name: 'CAIPO', href: 'https://www.caipo.ai/' },
    { name: 'Connecting the Dots', href: 'https://www.youtube.com/@flolabsinnovation' },
    { name: 'Cosmos Intelligence', href: 'http://cosmosintelligence.org/' },
    { name: 'Flo Travel', href: 'https://www.flomadtravel.com/' },
    { name: 'FloBrain', href: 'https://www.flobrain.ai/' },
    { name: 'FloLabs Innovations Group', href: 'https://www.flolabsinnovations.com/' },
    { name: 'FloLabs International', href: 'https://www.flolabs.international/' },
    { name: 'FloStudios', href: 'https://www.flostudios.ai/' },
    { name: 'Hephaestus International', href: 'https://hephaestus.international/' },
    { name: 'Innovation Bootcamp University', href: 'https://www.bootcampuniversity.org/' },
    { name: 'MoodChanger', href: 'https://www.moodchanger.ai/' },
    { name: 'Legal & Ethics Ventures Institute', href: 'https://www.legalethicsventuresinstitute.com/' },
    { name: 'RoboCollective', href: 'https://www.robocollective.ai/' },
    { name: 'Space Ventures Institute', href: 'https://www.spaceventuresinstitute.com/' },
    { name: 'TARRL', href: 'https://tarrl.org/' },
  ];

  const companyLinks = [
    { name: 'Careers', href: '/internships' },
    { name: 'Contact Us', href: '/internships' },
    { name: 'Merch', href: 'https://flolabsrd.notion.site/merch-background' },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith('http') && onNavClick) {
      e.preventDefault();
      onNavClick(href);
    }
  };

  return (
    <footer className="mt-auto w-full border-t border-border bg-background py-16 text-foreground sm:py-20 transition-colors duration-200">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop & Tablet Multi-Column Layout */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.7fr)_minmax(0,0.95fr)_minmax(0,0.7fr)] lg:gap-10 xl:gap-14">
          
          {/* Column 1: FloLabs Info, Newsletter, Social Icons */}
          <div className="flex flex-col gap-8 lg:col-span-1">
            <div>
              <a
                className="inline-flex items-center gap-3 transition-opacity hover:opacity-90"
                href="/"
                onClick={(e) => handleLinkClick(e, '/')}
              >
                <img src={'/logos/logo-87ef29e9.png'} alt="FloLabs Innovations Group logo" draggable={false} className="h-10 w-10 shrink-0 object-contain brightness-0 dark:brightness-100" />
                <span className="text-base font-bold text-foreground sm:text-lg">
                  FloLabs Innovations Group
                </span>
              </a>
              <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-foreground">
                The global platform showcasing our mission, active projects
                and collaboration opportunities across AI and robotics. We connect curious builders to
                experiential learning and real venture execution.
              </p>
            </div>

            {/* Newsletter Section */}
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-foreground">
                Newsletter
              </p>
              <p className="mt-3 text-[13px] text-muted">Receive the newest FloLabs updates at:</p>

              {isSubscribed ? (
                <div className="mt-4 flex w-full max-w-[340px] items-center bg-primary/10 border border-primary/30 p-2.5 text-xs text-primary rounded-none">
                  <span>✓ You are now subscribed to FloLabs updates.</span>
                </div>
              ) : (
                <form
                  className="mt-4 flex w-full max-w-[340px] items-center bg-[#D1D1D1] dark:bg-[#253241] p-1 transition-colors"
                  onSubmit={handleSubscribe}
                >
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="min-h-10 flex-1 bg-transparent px-4 text-[15px] text-gray-900 dark:text-gray-100 outline-none placeholder:text-gray-600 dark:placeholder:text-gray-400"
                    name="email"
                  />
                  <button
                    type="submit"
                    className="flex h-10 w-10 shrink-0 items-center justify-center bg-black dark:bg-[#00080d] text-white transition-colors hover:bg-primary dark:hover:bg-primary cursor-pointer"
                    aria-label="Subscribe to newsletter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-send h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                      <path d="m21.854 2.147-10.94 10.939" />
                    </svg>
                  </button>
                </form>
              )}
            </div>

            {/* Social Media Section */}
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-foreground">
                Social media
              </p>
              <div className="mt-4 flex items-center gap-4">
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@flolabsinnovation"
                  className="inline-flex text-foreground transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FloLabs on YouTube"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.5V8.5l6.3 3.5-6.3 3.5Z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/flolabs-innovation/"
                  className="inline-flex text-foreground transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FloLabs on LinkedIn"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/people/Flo-Labs-RD/61572285432918/"
                  className="inline-flex text-foreground transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FloLabs on Facebook"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/flolabsinnovations/"
                  className="inline-flex text-foreground transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FloLabs on Instagram"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@flomadlabs"
                  className="inline-flex text-foreground transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FloLabs on TikTok"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>

                {/* Reddit */}
                <a
                  href="https://www.reddit.com/user/FloLabs_Innovations/"
                  className="inline-flex text-foreground transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FloLabs on Reddit"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 (Desktop): Navigation */}
          <div className="hidden lg:block">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-foreground">
                Navigation
              </p>
              <div className="mt-4">
                <ul className="flex flex-col gap-3.5">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        className="text-[15px] text-foreground transition-colors hover:text-primary"
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3 (Desktop): Projects */}
          <div className="hidden lg:block">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-foreground">
                Projects
              </p>
              <div className="mt-4">
                <ul className="flex flex-col gap-3.5">
                  {projectLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[15px] text-foreground transition-colors hover:text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 4 (Desktop): Company */}
          <div className="hidden lg:block">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-foreground">
                Company
              </p>
              <div className="mt-4">
                <ul className="flex flex-col gap-3.5">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        className="text-[15px] text-foreground transition-colors hover:text-primary"
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        onClick={(e) => handleLinkClick(e, link.href)}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Accordions View (Visible only on < lg screens) */}
        <div className="mt-10 flex flex-col gap-1 lg:hidden">
          {/* Navigation Accordion */}
          <details className="group border-b border-border pb-5 dark:border-white/10">
            <summary className="text-[13px] font-bold uppercase tracking-[0.2em] text-foreground flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden select-none">
              <span className="flex items-center gap-2">
                Navigation
                <span className="text-[11px] transition-transform duration-200 group-open:rotate-90" aria-hidden="true">
                  ▸
                </span>
              </span>
            </summary>
            <div className="mt-4">
              <ul className="flex flex-col gap-3.5 pl-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      className="text-[15px] text-foreground transition-colors hover:text-primary"
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          {/* Projects Accordion */}
          <details className="group border-b border-border pb-5 dark:border-white/10">
            <summary className="text-[13px] font-bold uppercase tracking-[0.2em] text-foreground flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden select-none">
              <span className="flex items-center gap-2">
                Projects
                <span className="text-[11px] transition-transform duration-200 group-open:rotate-90" aria-hidden="true">
                  ▸
                </span>
              </span>
            </summary>
            <div className="mt-4 max-h-96 overflow-y-auto pr-2">
              <ul className="flex flex-col gap-3.5 pl-2">
                {projectLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[15px] text-foreground transition-colors hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          {/* Company Accordion */}
          <details className="group border-b border-border pb-5 dark:border-white/10">
            <summary className="text-[13px] font-bold uppercase tracking-[0.2em] text-foreground flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden select-none">
              <span className="flex items-center gap-2">
                Company
                <span className="text-[11px] transition-transform duration-200 group-open:rotate-90" aria-hidden="true">
                  ▸
                </span>
              </span>
            </summary>
            <div className="mt-4">
              <ul className="flex flex-col gap-3.5 pl-2">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      className="text-[15px] text-foreground transition-colors hover:text-primary"
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={(e) => handleLinkClick(e, link.href)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>

        {/* Bottom Banner Divider */}
        <div className="mt-14 border-t border-border pt-8 sm:mt-16 dark:border-white/10">
          <p className="text-center text-[13px] font-light tracking-[0.25em] text-muted dark:text-foreground">
            Live Long and Prosper
          </p>
        </div>
      </div>
    </footer>
  );
};
