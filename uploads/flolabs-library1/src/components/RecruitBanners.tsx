import React, { useEffect, useRef } from 'react';

type Band = [number, number, number, number];

const CleanBg: React.FC<{ src: string; bands: Band[]; className?: string; position?: string }> = ({ src, bands, className = '', position = '30% 100%' }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const c = ref.current;
      if (!c) return;
      c.width = img.width;
      c.height = img.height;
      const x = c.getContext('2d');
      if (!x) return;
      x.drawImage(img, 0, 0);
      for (const [x0, x1, y0, y1] of bands) {
        const top = y0 - 8, bot = y1 + 8, h = bot - top, w = x1 - x0 + 1;
        const m = document.createElement('canvas');
        m.width = w; m.height = h;
        const mx = m.getContext('2d')!;
        mx.drawImage(img, x0, bot - 2, w, 3, 0, 0, w, h);
        const g = mx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(1, 'rgba(0,0,0,1)');
        mx.globalCompositeOperation = 'destination-in';
        mx.fillStyle = g;
        mx.fillRect(0, 0, w, h);
        x.drawImage(img, x0, top - 2, w, 3, x0, top, w, h);
        x.drawImage(m, x0, top);
      }
    };
    img.src = src;
  }, [src]);
  return <canvas ref={ref} aria-hidden="true" className={`absolute inset-0 h-full w-full object-cover ${className}`} style={{ objectPosition: position }} />;
};

const RECRUIT_BG = '/logos/bg1.jfif';
const LEARN_BG = '/logos/pasted-1791082411949-0.png';

export const RecruitBanners: React.FC = () => (
  <section id="internships" className="w-full">
    {/* Get recruited */}
    <div className="relative isolate overflow-hidden min-h-[460px] sm:min-h-[500px] flex items-center bg-[#d9dde3] dark:bg-[#15171b]">
      <img src={RECRUIT_BG} alt="" aria-hidden="true" draggable={false} className="absolute inset-0 z-0 h-full w-full object-cover object-[60%_50%]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30 dark:from-[#07090E]/90 dark:via-[#07090E]/70 dark:to-[#07090E]/35 transition-colors duration-300" />
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.08] text-[#0b0d12] dark:text-white font-['Google_Sans_Flex','Google_Sans',sans-serif]">
          Get Recruited Today
        </h2>
        <p className="mt-6 max-w-none text-base sm:text-lg lg:text-xl leading-relaxed text-[#2f4052] dark:text-white/85">
          Join the FloLabs family and grow through hands-on programs in AI and robotics. We look for curious builders who want real-world experience, mentorship, and momentum with flexibility for busy schedules, affordable pathways, future-facing opportunities, and expertise shared across teams, so learning stays practical and within reach.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#apply" onClick={(e) => e.preventDefault()} className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold bg-black text-white hover:opacity-85 dark:bg-white dark:text-black transition-opacity cursor-pointer">Apply now</a>
          <a href="#programs" onClick={(e) => e.preventDefault()} className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold border border-black/30 bg-black/5 text-[#0b0d12] hover:bg-black/10 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-colors cursor-pointer">See programs</a>
        </div>
      </div>
    </div>

  </section>
);

export const LongLiveLearning: React.FC = () => (
  <section id="learning" className="relative isolate overflow-hidden min-h-[460px] sm:min-h-[500px] flex items-center bg-[#d9dde3] dark:bg-[#15171b]">
    <img src={LEARN_BG} alt="" aria-hidden="true" draggable={false} className="absolute inset-0 z-0 h-full w-full object-cover object-[60%_50%]" />
    <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30 dark:from-[#07090E]/90 dark:via-[#07090E]/70 dark:to-[#07090E]/35 transition-colors duration-300" />
    <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.08] text-[#0b0d12] dark:text-white font-['Google_Sans_Flex','Google_Sans',sans-serif]">
        Long Live Learning
      </h2>
      <p className="mt-6 max-w-none text-base sm:text-lg lg:text-xl leading-relaxed text-[#2f4052] dark:text-white/85">
        Learn about the latest trends in technology. We are learning about the future of AI, robotics, education, and so much more. Every day is a great day to learn, and we want to keep learning and expanding.
      </p>
      <p className="mt-4 max-w-none text-base sm:text-lg lg:text-xl leading-relaxed text-[#2f4052] dark:text-white/85">
        FloLabs Innovations Group wants to prepare you for your own journey in your career. We help you learn in the ways that work for you so you can achieve your goals and reach the next level.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-4">
        <a href="#media" onClick={(e) => e.preventDefault()} className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold bg-black text-white hover:opacity-85 dark:bg-white dark:text-black transition-opacity cursor-pointer">Read the latest</a>
      </div>
    </div>
</section>
);
