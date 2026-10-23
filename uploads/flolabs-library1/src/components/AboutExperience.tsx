'use client';

import React, { useEffect, useState } from 'react';

const FACTS: [string, string][] = [
  ['Full name', 'John Hazlewood'],
  ['Current role', 'Founder and CEO of FloLabs Innovations Group; founding intern of FloLabs'],
  ['Primary focus', 'Artificial intelligence, robotics, experiential learning, applied research and entrepreneurship'],
  ['Background', 'Hospitality, international sports, travel, internet technology, applied research, nonprofit initiatives, the sharing economy and venture building'],
  ['Geographic roots', 'Austin, Texas; Greek Alexandrian family heritage; extensive experience in Sofia, Bulgaria; currently based on the island of Lemnos, Greece'],
  ['Educational philosophy', 'Combine relevant knowledge with real projects, collaboration, accountability and evidence of ability while developing hard work, integrity and reliability'],
  ['FloLabs model', 'Primarily remote experiential learning, applied research, startup studio and venture studio'],
  ['Mission', '“We aspire to inspire, help as many people as possible, live long and prosper.”'],
  ['Core belief', '“Talent is everywhere. Opportunity should be too.”'],
];

const FAQ: [string, string][] = [
  ['Who is John Hazlewood?', 'John Hazlewood is a Greek American entrepreneur and the founder and CEO of FloLabs Innovations Group. His career spans hospitality, international sports, travel, early internet booking technology, travel industry research, the sharing economy, nonprofit initiatives, artificial intelligence, robotics, applied research and practical education.'],
  ['What is John Hazlewood the founder of?', 'John Hazlewood is the founder and CEO of FloLabs Innovations Group, a primarily remote ecosystem combining experiential learning, applied research and venture building. FloLabs teams work on initiatives involving AI, robotics, wearables, human performance, travel, healthcare, education and space intelligence.'],
  ['Why does John Hazlewood call himself the “founding intern”?', 'John uses the title “founding intern” to express the belief that founders and leaders must remain active learners. It reflects FloLabs’ learning through work culture and the reality that rapidly changing fields such as AI and robotics require continuous learning at every level.'],
  ['What is FloLabs?', 'FloLabs is a global learning, research and venture building environment that operates primarily online. It combines structured resources with real projects so participants can develop practical skills, collaborate across disciplines and build evidence of what they can do. The internship is also FloLabs’ primary talent acquisition platform for future team members.'],
  ['Is FloLabs only for university students?', 'No. FloLabs is designed for university students, recent graduates, career changers, PhD candidates, postdoctoral researchers, experienced engineers, open source enthusiasts, subject matter experts, prospective entrepreneurs, citizen scientists and lifelong learners. Available pathways and expectations vary according to experience, interests and readiness.'],
  ['What fields does FloLabs work in?', 'FloLabs focuses primarily on artificial intelligence, robotics, multimodal systems, wearables, human performance, travel and hospitality technology, healthcare innovation, education, research, entrepreneurship and space intelligence through initiatives such as Cosmos Intelligence and its conversational Space Buddy.'],
  ['How did John Hazlewood’s travel technology experience influence FloBrain?', 'John’s travel systems connected global distribution systems, airlines, hotels, rental cars and other suppliers through a common middleware layer. FloBrain applies a related orchestration approach to AI models, data, tools and interfaces, extending a problem solving pattern he developed over decades in travel technology.'],
  ['What nonprofit initiatives has John Hazlewood helped create?', 'John cofounded Face to Face Bulgaria to combat sex trafficking and forced prostitution. In 2022, he cofounded GR4UA with family members to help Ukrainians living in Greece find employment after the war began.'],
  ['What makes the FloLabs learning model different?', 'The model connects learning directly to application. Participants use masterclasses selected for their teams, current tools, buddy collaboration and real project work. FloLabs also develops hard work, integrity, reliability and professional accountability. Learners leave with documented evidence of both ability and trustworthiness.'],
  ['Does FloLabs guarantee a job?', 'No. Completing the program does not guarantee employment. FloLabs uses the internship as its primary talent pipeline and plans to hire future team members only from people who have completed it and shown a strong fit through their work. The program also helps participants strengthen their skills, portfolios, professional networks and career readiness whether or not they later join FloLabs.'],
  ['Where is John Hazlewood based?', 'John is from Austin, Texas, and is currently based on the island of Lemnos, Greece. FloLabs plans to establish its future headquarters, campus and AI and robotics laboratory there, with facilities for both local work and remote participation.'],
  ['How can someone join FloLabs?', 'Prospective participants can review the program, projects and expectations, complete the application and orientation process, and speak with the FloLabs team about their interests, experience and preferred learning pathway.'],
];

function P({ children }: { children: React.ReactNode }) {
  return <p className="story-p text-base leading-[1.75] text-foreground/90">{children}</p>;
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-8 font-['Outfit',sans-serif] text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-foreground sm:mb-10 sm:text-5xl">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 mt-8 text-xl font-semibold tracking-tight sm:text-2xl">{children}</h3>;
}

function PhotoRow({ cards, still }: { cards: { text: string; image: string; title?: string }[]; still?: boolean }) {
  const loop = still ? cards : [...cards, ...cards];
  return (
    <div className={still ? 'my-8' : 'card-viewport my-8 overflow-hidden'}>
      <ul className={still ? 'grid list-none grid-cols-2 gap-4 p-0 lg:grid-cols-4' : 'card-track'}>
        {loop.map((card, i) => (
          <li key={`${card.text}-${i}`} data-clone={!still && i >= cards.length ? '' : undefined} aria-hidden={!still && i >= cards.length ? true : undefined} className={`relative h-80 overflow-hidden rounded-[28px] bg-[#1a1b1e] shadow-lg ${still ? '' : 'w-72 shrink-0'}`}>
            <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent ${still ? 'h-28' : 'h-full bg-gradient-to-b from-transparent via-black/10 to-black/80'}`} />
            <div className="relative flex h-full flex-col justify-end p-6 text-white">
              {card.title ? <h3 className="text-xl font-semibold">{card.title}</h3> : null}
              <p className="mt-1 text-sm font-medium leading-snug">{card.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TextRail({ items, onPhoto }: { items: string[]; onPhoto?: boolean }) {
  return (
    <ul className={onPhoto ? 'my-8 list-none divide-y divide-white/25 border-y border-white/25 p-0 text-white' : 'my-8 list-none divide-y divide-[#122033]/15 border-y border-[#122033]/15 p-0 text-[#122033] dark:divide-white/20 dark:border-white/20 dark:text-white'}>
      {items.map((item) => (
        <li key={item} className="py-4 text-base font-semibold leading-snug sm:text-lg">{item}</li>
      ))}
    </ul>
  );
}

function Section({ id, children, alt, image, paper }: { id?: string; children: React.ReactNode; alt?: boolean; image?: string; paper?: boolean }) {
  return (
    <section id={id} className={`relative overflow-hidden border-t border-border ${paper ? 'bg-white text-[#122033] dark:bg-black dark:text-white [&_a]:!text-[#00349b] dark:[&_a]:!text-[#7eb6ff] [&_h2]:!text-[#122033] dark:[&_h2]:!text-white [&_h3]:!text-[#122033] dark:[&_h3]:!text-white [&_p]:!text-[#122033]/90 dark:[&_p]:!text-white/90 [&_.card-track_p]:!text-white' : image ? 'text-white [&_a]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_p]:!text-white/90' : alt ? 'bg-primary/5 dark:bg-card' : 'bg-background'}`}>
      {image ? (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/45 dark:bg-black/65" />
        </>
      ) : null}
      <div className="about-in relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">{children}</div>
    </section>
  );
}

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
    {children}
  </a>
);

export function AboutExperience() {
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (!id) return;
    const el = document.getElementById(decodeURIComponent(id));
    if (!el) return;
    requestAnimationFrame(() => {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    });
  }, []);

  return (
    <article className="bg-background text-foreground">
      <style>{`
        .story-p { max-width: 68ch; margin-bottom: 1.5rem; }
        .about-in { display: flex; flex-wrap: wrap; align-items: stretch; column-gap: 1.25rem; row-gap: 1.25rem; }
        .about-in > * { flex: 1 0 100%; min-width: 0; }
        .about-in > h2 { margin-bottom: 0.25rem; }
        .about-in > .story-p { max-width: none; margin-bottom: 0; }
        .about-in > h2 + .story-p { max-width: 68ch; margin-bottom: 1.75rem; font-size: 1.25rem; line-height: 1.55; }
        .about-in > h2 ~ .story-p:not(h2 + .story-p) {
          border-top: 1px solid color-mix(in srgb, currentColor 22%, transparent);
          padding-top: 1rem;
        }
        @media (min-width: 800px) {
          .about-in > h2 ~ .story-p:not(h2 + .story-p) {
            flex: 1 1 calc(50% - 0.75rem);
            max-width: calc(50% - 0.75rem);
            border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
            padding: 1.25rem 1.15rem 1.35rem;
          }
        }
        @media (min-width: 1100px) {
          .about-in > h2 ~ .story-p:not(h2 + .story-p) {
            flex: 1 1 calc(33.333% - 0.9rem);
            max-width: calc(33.333% - 0.9rem);
          }
        }
        @media (prefers-reduced-motion: no-preference) {
          .about-in { animation: aboutFade .65s ease both; }
          @keyframes aboutFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
          .card-track { display: flex; gap: 1rem; width: max-content; animation: cardSlide 42s linear infinite; }
          .card-viewport:hover .card-track { animation-play-state: paused; }
          @keyframes cardSlide { to { transform: translateX(-50%); } }
          @media (prefers-reduced-motion: reduce) {
            .about-in, .card-track { animation: none; }
            .card-track { flex-wrap: wrap; width: 100%; }
            .card-track [data-clone] { display: none; }
          }
        }
      `}</style>

      <header className="border-y border-border bg-white text-foreground dark:bg-black">
        <div className="mx-auto max-w-6xl space-y-8 px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <h1 className="font-['Outfit',sans-serif] text-3xl font-medium leading-snug tracking-[-0.03em] md:text-5xl">
              John Hazlewood <span className="text-muted">Founder, CEO and founding intern.</span>
            </h1>
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p>John Hazlewood is the founder and CEO of <a className="text-foreground underline underline-offset-4" href="https://www.flolabsinnovations.com/">FloLabs Innovations Group</a>, a primarily remote experiential learning, research and venture building ecosystem focused on artificial intelligence, robotics, human performance, travel, healthcare, education and the space economy.</p>
              <p>He also describes himself as FloLabs’ founding intern. That title is intentional. John sees “intern” as another word for “learner,” and he believes even a founder should never stop learning.</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:flex-row">
            <img src="/about/john-hazlewood.png" alt="John Hazlewood standing beside a humanoid robot" className="h-80 w-full rounded-xl object-cover md:h-auto md:min-h-[34rem] md:flex-1" />
            <div className="flex flex-1 flex-col gap-6">
              <aside aria-label="John Hazlewood profile summary" className="overflow-hidden rounded-xl border border-border bg-card text-foreground transition-transform duration-200 ease-out hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100">
                <div className="relative h-48 overflow-hidden">
                  <img src="/about/photo-lemnos.png" alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold">Founder and CEO of FloLabs Innovations Group</h2>
                  <p className="mt-2 text-sm text-muted">Founding Intern at FloLabs. Based on the island of Lemnos, Greece.</p>
                  <a href="https://www.linkedin.com/in/hazlewood/" className="mt-4 inline-flex min-h-11 items-center border border-foreground px-4 text-sm font-semibold hover:bg-foreground hover:text-background">LinkedIn profile</a>
                </div>
              </aside>
              <div className="relative min-h-56 flex-1 overflow-hidden rounded-xl">
                <img src="/about/photo-coast.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h2 className="text-xl font-semibold">The most valuable education starts with a real problem</h2>
                  <p className="mt-2 text-sm text-white/85">Join a capable team and start building.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section aria-labelledby="quick-facts-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 id="quick-facts-heading" className="font-['Outfit',sans-serif] text-4xl font-medium tracking-[-0.03em] sm:text-6xl">Quick facts about John Hazlewood</h2>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {FACTS.map(([term, detail]) => (
            <div key={term} className="grid gap-2 py-4 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-8">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{term}</dt>
              <dd>{detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="latest-work-heading" className="border-t border-border bg-white text-[#122033] dark:bg-black dark:text-white">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <article className="lg:sticky lg:top-24 lg:self-start">
            <h2 id="latest-work-heading" className="font-['Outfit',sans-serif] text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              <a href="#from-caipo-to-flobrain-embodied-ai-and-robotics" className="hover:underline">John's Journey</a>
            </h2>
            <p className="mt-4 text-sm text-[#5c6b7a] dark:text-white/70">When John was living in Sofia and met George Bush when he was president</p>
            <a href="https://www.youtube.com/watch?v=mLvX3a-IU8U" className="relative mt-8 block overflow-hidden rounded-3xl bg-black" target="_blank" rel="noreferrer">
              <img src="https://i.ytimg.com/vi/mLvX3a-IU8U/hqdefault.jpg" alt="Preview of John's Journey on YouTube" className="aspect-video w-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff0000] text-2xl text-white">▶</span>
              </span>
            </a>
          </article>
          <div className="divide-y divide-[#122033]/15 border-y border-[#122033]/15 dark:divide-white/15 dark:border-white/15">
            {[
              ['John with his mother and Brian Chesky the CEO and Founder of Airbnb', 'October 2026', 'Place', '#why-the-island-of-lemnos-matters', '/about/john-mother-brian-chesky.png'],
              ['John and Admiral Inman with an autographed book by Hillary Clinton that I met and gave to him', 'October 2026', 'Place', '#why-the-island-of-lemnos-matters', '/about/john-admiral-inman.png'],
              ['John and Hillary and her daughter Chelsea around the time she ran for president and lost to Donald Trump', 'October 2026', 'Place', '#why-the-island-of-lemnos-matters', '/about/john-hillary-chelsea.png'],
            ].map(([title, date, topic, href, image], index) => (
              <article key={`${title}-${index}`} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-6 py-6">
                <div>
                  <h3 className="text-2xl font-medium leading-snug tracking-[-0.02em]">
                    <a href={href} className="hover:underline">{title}</a>
                  </h3>
                  <p className="mt-3 text-sm text-[#5c6b7a] dark:text-white/70">{date} <span className="mx-2">{topic}</span></p>
                  <a href={href} className="mt-2 inline-flex text-sm font-medium hover:underline">Learn more <span aria-hidden="true" className="ml-1">›</span></a>
                </div>
                {image ? <a href={href} className="block w-[220px] shrink-0 overflow-hidden rounded-2xl"><img src={image} alt="" className="aspect-[4/3] w-[220px] object-cover" /></a> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Section id="a-founder-shaped-by-austin-alexandria-sofia-and-the-island-of-lemnos">
        <div className="relative -mx-4 -mt-16 overflow-hidden px-4 py-16 text-white sm:-mx-6 sm:px-6 sm:-mt-24 lg:-mx-8 lg:px-8 [&_h2]:!text-white [&_p]:!text-white/90">
          <img src="/about/life-of-global-experience.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/45 dark:bg-black/65" />
          <div className="relative">
            <h2 className="mb-5 font-['Outfit',sans-serif] text-4xl font-medium tracking-[-0.03em] sm:text-5xl">A Life of Global Experience</h2>
            <P>John’s career has crossed hospitality, international sports, travel, early internet technology, Y2K, the sharing economy, artificial intelligence and robotics. The industries have changed, but the pattern has remained consistent: identify an emerging shift, connect people who might never otherwise meet, create something practical and learn through the process of bringing it into the world.</P>
            <P>Today, he brings those lessons, both the successes and the difficult reinventions, to FloLabs and its global community of students, career changers, developers, researchers, citizen scientists, designers, entrepreneurs, subject matter experts and lifelong learners.</P>
          </div>
        </div>
        <div className="-mx-4 bg-primary/10 px-4 py-12 dark:bg-card sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <h2 className="font-['Outfit',sans-serif] text-3xl font-medium tracking-[-0.03em] text-foreground sm:text-5xl">Roots and Values</h2>
          <div className="mt-6 grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(15rem,0.7fr)]">
            <div>
              <p className="text-base leading-relaxed text-foreground/90">John’s story is rooted in four places that continue to shape his worldview: Austin, Alexandria, Sofia and the island of Lemnos.</p>
              <ol className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ['01', 'Austin', 'Entrepreneurship, experimentation and the courage to start.'],
                  ['02', 'Alexandria', 'Knowledge, intellectual curiosity and the exchange of ideas across cultures.'],
                  ['03', 'Sofia', 'Distributed technical talent and the power of international teams.'],
                  ['04', 'Lemnos', 'Heritage, invention and the opportunity to build something globally connected from a place outside a conventional innovation hub.'],
                ].map(([num, city, detail]) => (
                  <li key={num}>
                    <p className="text-sm font-semibold text-primary">{num}</p>
                    <p className="mt-3 font-semibold text-foreground">{city}</p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">{detail}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative min-h-64 overflow-hidden rounded-2xl">
              <img src="/about/photo-coast.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <blockquote className="relative m-4 rounded-2xl bg-background/85 p-5 text-foreground shadow-sm backdrop-blur-md">
                <span className="block font-['Georgia',serif] text-4xl leading-none text-muted">“</span>
                <p className="mt-1 text-base leading-snug">Each place contributed something different to how John thinks and works.</p>
                <span className="mt-4 block h-px w-8 bg-[#8aa0b5]" />
              </blockquote>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <H2 id="founder-story-heading">A founder shaped by Austin, Alexandria, Sofia and the island of Lemnos</H2>
          <PhotoRow still cards={[
            { title: 'Austin', text: 'Entrepreneurship & Experimentation', image: '/about/photo-austin.png' },
            { title: 'Alexandria', text: 'Knowledge & Cultural Exchange', image: '/about/photo-alexandria.png' },
            { title: 'Sofia', text: 'Distributed Talent & Global Teams', image: '/about/photo-sofia.png' },
            { title: 'Lemnos', text: 'Heritage & Global Innovation', image: '/about/photo-lemnos.png' },
          ]} />
          <P>He grew up in Austin, Texas, in a family where entrepreneurship was part of daily life. His father died when John was young, and his mother operated restaurants and a travel agency. John and his siblings helped in the family businesses, giving him an early education in service, establishing a hard work ethic, responsibility, customer relationships and the realities of running a company.</P>
          <P>His mother was Greek, born and raised in Alexandria, Egypt, once one of the world’s great crossroads of knowledge, science, commerce and culture. His family’s heritage also reaches back to the island of Lemnos in the northern Aegean, where he spent summers as a child. FloLabs plans to establish its future headquarters, campus and AI and robotics laboratory there, with systems that will also support remote participation.</P>
          <P>John also lived for many years in Sofia, Bulgaria, where he built and managed international technology teams. That experience reinforced a conviction that now sits at the center of FloLabs: exceptional talent is not confined to the usual technology capitals.</P>
          <P>Each place contributed something different to how John thinks and works.</P>
          <P>John’s connection to education is also personal. According to his family history, his great grandfather was a philanthropist who helped fund a school in the village of Sardes on the island of Lemnos and another in Alexandria. John is carrying that commitment forward through a learning community designed for AI, remote collaboration and continuous technological change.</P>
        </div>
      </Section>

      <Section id="why-the-island-of-lemnos-matters" image="/about/photo-lemnos.png">
        <H2 id="lemnos-heading">Why the island of Lemnos matters</H2>
        <P>People have lived on the island of Lemnos for thousands of years. Excavations near Hephaistia at Ouriakos found evidence of a hunting camp from the eleventh millennium BC, around 10,000 BC. Hephaistia became one of the island’s two principal cities and an important center for the worship of Hephaestus.</P>
        <P>Ancient Greek tradition places Hephaestus and his workshop on the island of Lemnos at volcanic Mount Mosychlos. He was the god of fire, blacksmiths, metalworking, craftsmanship, invention and innovation. Ancient accounts also credit him with creating Talos, a bronze humanoid robot, and Pandora, whom John views as an early description of an intelligent artificial being. The story of Pandora is associated with what is commonly called Pandora&apos;s Box.</P>
        <P>John believes these accounts may be rooted in real events and may preserve memories of advanced craftsmanship and technology that later generations described in the language available to them. He does not see them simply as made up stories.</P>
        <P>FloLabs plans to establish its future headquarters, campus and AI and robotics laboratory on the island of Lemnos. The campus and its remote systems will allow people from around the world to study, collaborate and build together. This work is part of <A href="https://hephaestus.international/">Hephaestus.International</A> and connects the island’s long history of craftsmanship and invention with the technologies shaping the future.</P>
      </Section>

      <Section id="learning-entrepreneurship-by-doing-it" image="/about/about-header-background.png">
        <H2 id="learning-heading">Learning entrepreneurship by doing it</H2>
        <P>John studied hotel and restaurant management at the <A href="https://www.uh.edu/hilton-college/">University of Houston</A>, but his most formative education came from building businesses.</P>
        <P>His first ventures involved practical work. He helped start an import and export business moving used clothing to Honduras and mahogany furniture to the United States. He cofounded a landscape maintenance company, operated crews and trucks, and later opened a travel agency near the University of Texas campus in Austin.</P>
        <P>Those experiences taught him lessons that rarely fit neatly into a textbook: how to earn trust, sell a service, manage cash flow, solve operational problems, recover from mistakes and keep moving when the original plan does not work.</P>
        <P>They also created unexpected opportunities.</P>
        <P>John and his brother first met the president of a women’s professional basketball team in Milan, Italy, when he came into their travel agency to buy an airline ticket. That chance meeting led them to help recruit a University of Texas player for the team. They later founded Agex International, a sports agency focused on representing American women’s basketball players in Europe and other international leagues. At the time, the United States did not yet have an established women’s professional league. Their clients played in Italy, Spain, France, Turkey, Japan and more than 20 other countries.</P>
        <P>John and his brother later invested proceeds from the basketball business in the Austin Soccadillos, a semiprofessional soccer franchise that John helped operate for two seasons. Ahead of the 1994 FIFA World Cup, he helped bring the Bulgarian national team to Austin for its training camp before the tournament and represented the delegation during its stay.</P>
        <P>These experiences taught John how to connect talented people with international opportunities and turn unexpected meetings into practical ventures.</P>
      </Section>

      <Section id="entering-internet-travel-before-online-booking-was-normal" paper>
        <H2 id="travel-heading">Entering internet travel before online booking was normal</H2>
        <P>In the mid 1990s, while operating his travel agency, John began working with technologist and particle physicist Linas Vepstas on an early prototype that allowed travelers to search for and book flights through the internet.</P>
        <P>At the time, persuading people to enter a credit card number online was itself a frontier problem. Much of the infrastructure now taken for granted, including mature APIs, cloud platforms, simple payment integrations and modern web development frameworks, did not yet exist.</P>
        <P>John recognized that online travel would become a major market, but the company still needed capital, technical talent and time to rebuild its systems as the market changed.</P>
        <P>After more than a year of approaching potential investors, John secured backing from <A href="https://www.nsa.gov/History/Cryptologic-History/Historical-Figures/Historical-Figures-View/Article/1620368/adm-bobby-r-inman-usn/">Admiral Bobby R. Inman</A>, the former director of the U.S. National Security Agency and former deputy director of the CIA, who had gone on to become an investor and technology leader in Austin. Inman would become a long term adviser to John across multiple ventures.</P>
        <P>John established a development operation in Sofia, Bulgaria, building an international technology organization around internet travel and enterprise software. An early company and its Sofia team were acquired by the German travel technology company iFAO, which was later acquired by Amadeus, while John retained the travel booking code and continued building.</P>
        <P>He later launched TravelStoreMaker with investment from Worldspan, a global distribution system for travel, and additional backing from Admiral Inman. The platform provided private label internet booking technology, fulfillment and customer support to travel businesses in multiple countries. Thousands of small and midsized websites used the technology, including travel agencies and airlines. In today’s language, John describes the model as an early “Shopify for travel.”</P>
        <P>After the September 11 attacks disrupted global travel and Worldspan stopped making additional investments, John and his team had to support the business from its own revenue. They adapted the model and ultimately served travel businesses in more than 20 countries through sites available in more than 20 languages. The experience taught John that a capable team can survive disruption by conserving resources, changing direction and continuing to build.</P>
        <P>At its peak, the Sofia operation grew to more than 130 team members.</P>
        <P>The architecture behind TravelStoreMaker also created a direct technical connection to <A href="https://www.flobrain.ai/">FloBrain</A>. John’s teams integrated global distribution systems, more than 50 low cost carriers, hotels, rental cars and travel package services through a middleware platform that allowed clients to choose APIs and build their own interfaces. FloBrain applies a related orchestration mindset to AI models, data, tools and interfaces. The technologies are different, but the problem solving pattern is familiar: connect fragmented systems and make them useful through one experience.</P>
        <P>During this period, John also served for two years as a research analyst for <A href="https://www.phocuswright.com/">Phocuswright</A>, studying online travel trends in Central and Eastern Europe. He organized an online travel summit and, the following year, an online travel and space summit featuring astronaut Story Musgrave as keynote speaker. Musgrave flew six missions across all five Space Shuttle orbiters, and John witnessed three of his launches, two at night and one during the day, as well as a shuttle landing at Edwards Air Force Base. Those experiences formed an early bridge among travel, technology, research and space, connections that later reappeared in FloLabs’ space, robotics and citizen science initiatives.</P>
        <P>The travel technology years showed John how quickly new infrastructure, customer needs, investor priorities and outside events can change a business.</P>
      </Section>

      <Section id="setbacks-reinvention-and-the-value-of-changing-direction" image="/about/photo-coast.png">
        <H2 id="setbacks-heading">Setbacks, reinvention and the value of changing direction</H2>
        <P>John does not present entrepreneurship as a sequence of victories. He speaks openly about layoffs, failed fundraising efforts, difficult pivots and the emotional weight of watching a business contract.</P>
        <P>Around 2011, as major customers changed direction and the travel technology market evolved, he had to reduce the size of the Sofia team. Letting go of colleagues he had worked with for years was one of the most difficult periods of his career.</P>
        <P>In 2012, during that period of uncertainty, John joined 11 Bulgarian cyclists on a 55 day journey of more than 3,000 kilometers from Sofia to London. The group crossed 13 countries and arrived shortly before the London Summer Olympics.</P>
        <P>Along the way, the riders used Couchsurfing and the then emerging Airbnb platform. The experience gave John a firsthand view of the sharing economy and inspired his next venture.</P>
        <P>After returning to Austin, he founded sharingXchange, initially conceived as a metasearch platform for sharing economy accommodation and boat rental marketplaces. The company later evolved into a property listing and management service that helped owners distribute and support their properties across multiple booking channels. It grew to approximately 600 properties, primarily in Europe.</P>
        <P>Then the COVID pandemic stopped international travel and devastated the business.</P>
        <P>John adapted again. A houseboat he owned on Lake Travis became the prototype for a water based hospitality concept combining houseboat stays, events and glamping. That experience led to a broader resort concept, but after nearly two years of partnership and funding discussions, the project did not secure the support required to move forward.</P>
        <P>John’s work also extended into nonprofit and social impact initiatives. He cofounded Face to Face Bulgaria with a friend to combat sex trafficking and forced prostitution. In 2022, he cofounded GR4UA with members of his family to help Ukrainians living in Greece find employment after the war began. These efforts reflect a commitment to practical help that predates FloLabs and now informs its wider mission.</P>
        <P>The experience helped John decide where to focus next. He asked which field could create the greatest long term impact. His answer was artificial intelligence.</P>
      </Section>

      <Section id="becoming-a-learner-again" image="/about/john-hazlewood.png">
        <H2 id="learner-heading">Becoming a learner again</H2>
        <P>John entered AI with decades of experience in technology and entrepreneurship, but without pretending to be an AI expert.</P>
        <P>He approached the transition as an intensive independent apprenticeship. For months, he spent 12 hours a day studying artificial intelligence, deep learning, emerging tools, recorded conferences, research, online courses and technical meetups. He attended AI communities in Austin and remotely followed events in San Francisco and elsewhere.</P>
        <P>As John studied AI, he reconnected with Linas Vepstas, the particle physicist and technology cofounder who had helped him build the early internet travel systems. Vepstas later served as a lead developer for <A href="https://opencog.org/">OpenCog</A>, an open source application framework for artificial general intelligence, or AGI, and as head of research for the AI behind Hanson Robotics’ Sophia. Their conversations helped John see how his experience connecting software and operating systems could apply to robotics.</P>
        <P>John encourages people not to let a previous degree, title or industry become a box. Experience does not make someone less capable of starting again; it creates a larger foundation from which to connect new ideas. He compares that accumulation to an expanding AI dataset: the richer the foundation, the easier it can become to learn and make new connections. His own transition from travel technology into AI, robotics, neuroscience, physics and biology is the evidence behind that belief.</P>
        <P>That experience exposed a gap that would later become central to FloLabs.</P>
        <P>The internet contains an extraordinary amount of knowledge. A motivated learner can access university lectures, research papers, certification programs, technical tutorials, open source software and expert discussions from almost anywhere. What remains difficult to obtain is the environment around the information: meaningful projects, capable collaborators, structured accountability, feedback, context and the chance to apply knowledge to something real.</P>
        <P>John did not need another collection of disconnected courses. He needed a reason to connect the dots.</P>
        <P>That insight became both a product philosophy and an educational philosophy.</P>
      </Section>

      <Section id="from-caipo-to-flobrain-embodied-ai-and-robotics" image="https://www.flostudios.ai/assets/caipo-card.webp">
        <H2 id="ai-heading">From CAIPO to FloBrain, embodied AI and robotics</H2>
        <P>John’s first concept in this new chapter was <A href="https://www.caipo.ai/">CAIPO</A>, originally derived from “Chief AI and Productivity Officer.” He envisioned an AI layer that could help organizations connect fragmented information, understand meetings and conversations, make knowledge usable and help people become more productive.</P>
        <P>The idea expanded into an AI wearable with a microphone, speaker, camera and sensors, an interface intended to provide context aware assistance in the physical world. John then returned to his roots in travel, imagining a conversational AI travel planner and travel companion that could understand preferences, build itineraries and eventually power a robotic hotel concierge.</P>
        <P>Those ideas led to FloBrain, a multimodal AI and contextual intelligence platform that brings together language models, voice, vision, sensor data, memory, tools and specialized AI buddies. FloLabs is developing it as a shared intelligence layer for software, wearables and robots.</P>
        <P><A href="https://cosmosintelligence.org/">Cosmos Intelligence</A> is one example. FloLabs is developing this conversational Space Buddy to combine NASA and other open data with artificial intelligence so people can explore the universe and ask questions naturally. John wants it to make the knowledge, discovery and wonder of space available to people everywhere, including those who may never travel there physically.</P>
        <P>From that core, FloLabs teams have explored and developed initiatives in areas including:</P>
        <PhotoRow cards={[
          { text: 'Conversational and multimodal artificial intelligence.', image: 'https://www.flostudios.ai/assets/robocollective-card.png' },
          { text: 'AI wearables and human computer interfaces.', image: 'https://www.flostudios.ai/assets/caipo-card.webp' },
          { text: 'Assistive, hospitality and humanoid robotics.', image: 'https://www.flostudios.ai/assets/carousel/tarrl.png' },
          { text: 'Travel planning and robotic concierge services.', image: 'https://www.flostudios.ai/assets/carousel/flotravel.png' },
          { text: 'Health, mood and human performance intelligence.', image: 'https://www.flostudios.ai/assets/carousel/moodchanger.png' },
          { text: 'Animal health and pet technology.', image: 'https://www.flostudios.ai/assets/pets-card.png' },
          { text: 'Space imagery, citizen science and space intelligence.', image: 'https://www.flostudios.ai/assets/carousel/cosmos.png' },
          { text: 'Open source research, advanced computing and emerging technologies.', image: 'https://www.flostudios.ai/assets/carousel/hepheastus.png' },
          { text: 'Entrepreneurship, venture creation and future of work education.', image: 'https://www.flostudios.ai/assets/carousel/bootcamp.png' },
        ]} />
        <P>John also spent several months living in China, including time in Hangzhou, Shanghai, Shenzhen, and Hong Kong meeting robotics companies and studying the supply chain, commercialization and rapid development of humanoids and other robotic systems. One experience made that transition tangible: a hotel service robot rode the elevator to John’s floor, rang his doorbell and delivered a room key. For John, it was a small but revealing example of AI and robotics moving beyond demonstrations and into everyday hospitality. The broader experience strengthened his view that the most valuable learning happens when software, hardware, research, operations and market reality meet.</P>
      </Section>

      <Section id="why-john-created-flolabs" image="/about/future-background.png">
        <H2 id="why-heading">Why John created FloLabs</H2>
        <P>FloLabs began with a practical startup problem: ambitious AI and robotics projects required a team.</P>
        <P>John initially considered a conventional internship model. But an earlier experience recruiting interns at a university career event had shown him the limitations of unstructured internships. Many people joined enthusiastically, few continued, and some later listed months of experience without having completed meaningful work.</P>
        <P>He wanted to build something more serious for the participant and for the organization.</P>
        <P>FloLabs started with a small group of approximately 10 interns and grew into a global community spanning more than 20 countries. What began as a way to form project teams now combines:</P>
        <TextRail onPhoto items={[
          'Experiential learning, where participants learn through relevant work.',
          'Structured masterclasses, aligned with the tools and knowledge a team actually uses.',
          'Applied research, connecting emerging ideas with practical experiments.',
          'A startup and venture studio, where ideas move from research and design toward development, testing and launch.',
          'International collaboration, bringing together people across disciplines, cultures and experience levels.',
          'Longer term pathways, including apprenticeship, fellowship, scholar, Masters, PhD and entrepreneurship tracks for participants who want to continue.',
        ]} />
        <P>FloLabs is designed to help as many people as possible move their careers forward. Participants gain practical experience, build portfolios and work with people from other fields and countries. The program is also FloLabs’ primary talent acquisition platform. FloLabs plans to fill future roles with people who have completed the internship and demonstrated through their work that they are a strong fit. The company does not plan to hire anyone who has not first completed the internship. Completion does not guarantee a job, but it gives participants the opportunity to be evaluated through real contributions instead of only a résumé or interview.</P>
        <P>Participants learn the full working cycle, from ideation and research through planning, design, development, testing, launch, user feedback and revision. They encounter ambiguity, work with teammates, adjust when an idea fails and see how technical decisions affect customers and society.</P>
        <P>FloLabs combines structured learning with real work inside a venture building environment. Education and production support each other. It can complement university study or provide another path for career changers, independent learners and people whose talent has not yet been matched with opportunity. Participants may also qualify for paid work as they advance through the program, with plans to offer stock options in the future.</P>
      </Section>

      <section id="johns-approach-to-learning-and-leadership" className="border-t border-white/10 bg-black text-white">
        <div className="about-in mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h2 id="philosophy-heading" className="mb-8 font-['Outfit',sans-serif] text-4xl font-medium tracking-[-0.03em] text-white sm:text-6xl">John’s approach to learning and leadership</h2>
          <div className="space-y-3">
            {[
              ['Learn only what you can connect to action', 'https://www.flostudios.ai/assets/caipo-card.webp', ['FloLabs masterclasses are aligned with the work of each team. A participant learning AWS, Figma, data engineering, multimodal perception, automation or AI assisted development should have an opportunity to apply that knowledge to a relevant task.', 'The goal is to build evidence of ability rather than collect certificates.']],
              ['Work with a buddy', '/about/photo-sofia.png', ['FloLabs uses a buddy system because people generally learn faster and produce stronger work when they plan, build and review together. Participants break projects into tasks, agree on responsibilities, document the process and bring results back to the wider team.', 'The buddy system builds technical skill while improving communication, reliability, project planning, peer learning and accountability.']],
              ['Develop integrity and reliability alongside technical ability', '/about/photo-coast.png', ['John believes education should develop character and professional habits as deliberately as it develops technical ability. FloLabs therefore places a strong emphasis on hard work, integrity and reliability, qualities that build trust and remain valuable in every industry, role and stage of a career.', 'At FloLabs, integrity means being honest about what you know and do not know, giving others appropriate credit, representing your work accurately, acknowledging mistakes and allowing evidence to guide conclusions. In research, it also means stating uncertainty clearly and never exaggerating a result or making a claim before the evidence supports it.', 'Reliability means showing up prepared, honoring commitments, communicating early when something is delayed or blocked, supporting teammates and completing agreed work to an appropriate standard. Intelligence and technical skill may create an opportunity, but integrity and reliability determine whether other people will trust someone with greater responsibility.', 'Participants practice these values through documented work, transparent collaboration, the buddy system, peer accountability and consistent follow through. John tells participants to focus on hard work, integrity and reliability because all else will follow.']],
              ['See how a startup really works', 'https://www.flostudios.ai/assets/carousel/bootcamp.png', ['John wants participants to see how a startup works beyond their own department. When appropriate, they may join conversations with advisers, partners, prospective customers and domain experts. They see how ideas are evaluated, why priorities change and what happens after a product launches.']],
              ['Build in public and connect the dots', 'https://www.flostudios.ai/assets/carousel/flotravel.png', ['FloLabs works in the open whenever it can. Its approach combines open source software, open science and open learning. Participants see how ideas are researched, challenged, built, tested and improved. The Connecting the Dots podcast shares selected team discussions so others can follow the work.']],
              ['Remain a learner at every level', '/about/john-hazlewood.png', ['Calling himself the founding intern is John’s reminder that leadership does not place someone above the learning process. The technologies FloLabs works with change too quickly for static expertise. Curiosity, humility, discernment and the ability to learn continuously are strategic advantages.']],
              ['Pursue work with meaning and purpose', 'https://www.flostudios.ai/assets/robocollective-card.png', ['John focuses on AI and robotics because he believes they can expand human capability, improve health, increase access, create opportunity and solve useful problems.']],
            ].map(([title, image, paragraphs]) => (
              <details key={title as string} className="group relative overflow-hidden rounded-2xl border border-white/15">
                <img src={image as string} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
                <div className="absolute inset-0 bg-black/60 group-open:bg-black/50" />
                <summary className="relative flex min-h-24 cursor-pointer list-none items-end justify-between gap-4 px-5 py-4 text-xl font-semibold [&::-webkit-details-marker]:hidden">
                  {title}
                  <span aria-hidden="true" className="text-white/70 group-open:hidden">+</span>
                  <span aria-hidden="true" className="hidden text-white/70 group-open:inline">–</span>
                </summary>
                <div className="relative space-y-3 px-5 pb-5 text-base leading-relaxed text-white/90">
                  {(paragraphs as string[]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Section id="what-participants-can-expect-from-the-founder" paper>
        <H2 id="expect-heading">What participants can expect from the founder</H2>
        <P>FloLabs gives participants direct access to its leadership. During the company’s early growth, John participates in meetings across all technical, design, data, research, marketing, legal, space and operations teams. He also meets all new participants, learns about their backgrounds and asks what they want to become capable of doing.</P>
        <P>Participants are expected to contribute, communicate and follow through. The program is flexible and primarily remote, but the work still carries responsibilities and deadlines. Outcomes are not guaranteed.</P>
        <P>Participants can expect:</P>
        <TextRail items={[
          'Exposure to ambitious, multidisciplinary AI, robotics, research and venture projects.',
          'Pathways based on interests, readiness and demonstrated commitment.',
          'Work with international teammates from different cultures and disciplines.',
          'A culture that deliberately develops integrity, reliability, accountability and professional follow through.',
          'Project specific learning resources and masterclasses.',
          'Experience with modern AI, collaboration, design, development and research tools.',
          'Opportunities to build a portfolio and documented evidence of contribution.',
          'An honest view of startup uncertainty, iteration and product development.',
          'Consideration for future roles when there is a strong mutual fit. FloLabs intends to recruit future hires from people who have completed the internship, but completion does not guarantee employment.',
        ]} />
        <P>John wants applicants to understand both the opportunity and the expectations so they can decide whether FloLabs is the right fit.</P>
      </Section>

      <Section id="who-is-likely-to-thrive-at-flolabs" paper>
        <H2 id="thrive-heading">Who is likely to thrive at FloLabs?</H2>
        <P>John built FloLabs for people with relentless curiosity who want to take part in shaping the future.</P>
        <P>That can include:</P>
        <PhotoRow cards={[
          { text: 'University students seeking substantial experience beyond the classroom.', image: 'https://www.flostudios.ai/assets/carousel/bootcamp.png' },
          { text: 'Career changers who need credible, applied work rather than another isolated course.', image: 'https://www.flostudios.ai/assets/carousel/flotravel.png' },
          { text: 'Developers, engineers, researchers and designers who want to work across disciplines.', image: 'https://www.flostudios.ai/assets/robocollective-card.png' },
          { text: 'PhD candidates, postdoctoral researchers and subject matter experts seeking ambitious collaborative projects.', image: 'https://www.flostudios.ai/assets/carousel/hepheastus.png' },
          { text: 'Prospective founders who want to understand how ideas become ventures.', image: 'https://www.flostudios.ai/assets/caipo-card.webp' },
          { text: 'Citizen scientists and open source contributors motivated by discovery and impact.', image: 'https://www.flostudios.ai/assets/carousel/cosmos.png' },
          { text: 'Lifelong learners who want community, challenge, meaning and purpose.', image: '/about/about-header-background.png' },
        ]} />
        <P>People join from many countries, schools and career stages. What matters is their willingness to learn, contribute, collaborate and take responsibility for their development.</P>
      </Section>

      <Section id="the-flolabs-mission" paper>
        <H2 id="mission-heading">The FloLabs mission</H2>
        <P>FloLabs’ mission is:</P>
        <P>We aspire to inspire, help as many people as possible, live long and prosper.</P>
        <P>The Vulcan salute appears in the FloLabs identity because John believes technology and entrepreneurship should improve life.</P>
        <P>John defines prosperity broadly to include health, knowledge, meaningful work, community, personal agency and the ability to contribute something valuable.</P>
        <P>That is why FloLabs connects education with research and venture creation. Learning should lead somewhere. Research should inform action. Technology should serve people. Entrepreneurship should create pathways for others, not only rewards for founders.</P>
      </Section>

      <Section id="a-personal-invitation-from-john" paper>
        <H2 id="invite-heading">A personal invitation from John</H2>
        <P>I have spent my career moving between industries, countries and technology cycles. I have built companies, raised investment, managed international teams, watched ventures grow and experienced the pain of having to start again.</P>
        <P>The most important lesson I have learned is that no one ever reaches a point where learning is finished.</P>
        <P>When I entered artificial intelligence, I had decades of experience in technology, but I was a beginner again. I spent months studying, joining communities and trying to connect what I was learning to real problems. That experience helped me understand what is missing from much of education today. Knowledge is available everywhere, but meaningful opportunities to apply it are not.</P>
        <P>FloLabs is our attempt to change that.</P>
        <P>We are building a global community where serious learners can work with one another on ideas at the frontier of AI, robotics, research and entrepreneurship. Some participants will use the experience to strengthen a university education. Some will change careers. Some will become researchers, engineers or founders. Others will join because they want to contribute to projects that give them meaning and purpose.</P>
        <P>The program requires real work and does not guarantee a job. It offers a place to develop practical ability and join a community building useful technology.</P>
        <P>If you are relentlessly curious, willing to contribute and ready to learn by doing, I invite you to explore FloLabs.</P>
        <p className="mt-8 font-['Google_Sans_Flex','Google_Sans',sans-serif] text-2xl leading-snug sm:text-3xl">Talent is everywhere. Opportunity should be too.</p>
        <p className="mt-6 text-lg">Live long and prosper. 🖖</p>
        <p className="mt-2 font-semibold">John Hazlewood</p>
        <p>Founder and CEO, FloLabs Innovations Group</p>
        <p>Founding Intern, FloLabs</p>
      </Section>

      <section id="frequently-asked-questions" aria-labelledby="faq-heading" className="border-t border-border bg-white text-[#122033] dark:bg-black dark:text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h2 id="faq-heading" className="font-['Outfit',sans-serif] text-4xl font-medium tracking-[-0.03em] sm:text-6xl">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-black/15 border-y border-black/15 dark:divide-white/20 dark:border-white/20">
            {FAQ.map(([question, answer], index) => {
              const expanded = open === index;
              return (
                <div key={question}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setOpen(expanded ? null : index)}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-[#122033] sm:text-lg dark:text-white"
                    >
                      {question}
                      <span aria-hidden="true" className="text-primary">{expanded ? '–' : '+'}</span>
                    </button>
                  </h3>
                  <div className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-[68ch] pb-4 leading-[1.75] text-[#122033]/90 dark:text-white/90">{answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="final-cta-heading" className="border-t border-border bg-white text-[#122033] dark:bg-black dark:text-white">
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h2 id="final-cta-heading" className="font-['Outfit',sans-serif] text-4xl font-medium tracking-[-0.03em] sm:text-6xl">Talent is everywhere. Opportunity should be too.</h2>
          <blockquote className="mt-8 border-l-2 border-primary pl-5 text-lg leading-snug sm:text-xl">
            Talent is everywhere. Opportunity should be too. Our responsibility is to help close that gap by giving serious, curious people the chance to learn, contribute and build evidence of what they can do.
          </blockquote>
          <p className="mt-4 text-lg text-[#122033]/90 dark:text-white/90">Explore FloLabs, learn how the program works and discover the AI, robotics and research projects being built by our international teams.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://www.flolabs.international/internships" className="inline-flex min-h-11 items-center bg-[#122033] px-6 text-sm font-semibold text-white dark:bg-white dark:text-[#0d0f16]">Apply to join FloLabs</a>
            <a href="https://www.flolabsinnovations.com/education" className="inline-flex min-h-11 cursor-pointer items-center border border-[#122033]/40 px-6 text-sm font-semibold text-[#122033] transition-colors duration-200 hover:bg-[#122033] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-white/40 dark:text-white dark:hover:bg-white dark:hover:text-[#0d0f16]">Learn how the program works</a>
            <a href="https://www.flolabs.international/projects" className="inline-flex min-h-11 items-center border border-[#122033]/40 px-6 text-sm font-semibold text-[#122033] dark:border-white/40 dark:text-white">Explore projects</a>
          </div>
        </div>
      </section>
    </article>
  );
}
