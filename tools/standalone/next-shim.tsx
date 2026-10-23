import React, { useEffect, useState } from 'react';

function currentPath() {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  return raw.startsWith('/') ? raw : `/${raw}`;
}

export function usePathname() {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const sync = () => setPath(currentPath());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);
  return path.split('#')[0].split('?')[0];
}

export function useRouter() {
  return {
    push(href: string) {
      const url = new URL(href, 'http://flo.local');
      const next = `${url.pathname}${url.search}${url.hash}`;
      if (window.location.hash !== `#${next}`) window.location.hash = next;
      else window.dispatchEvent(new HashChangeEvent('hashchange'));
      window.requestAnimationFrame(() => {
        const id = decodeURIComponent(url.hash.replace(/^#/, ''));
        if (!id) {
          window.scrollTo({ top: 0 });
          return;
        }
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
      });
    },
  };
}

export default function Link({
  href,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      {...rest}
      href={`#${href}`}
      onClick={(event) => {
        rest.onClick?.(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        window.location.hash = href;
      }}
    >
      {children}
    </a>
  );
}
