'use client';

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ShowcaseContent } from './components/ShowcaseContent';
import { LoginModal } from './components/LoginModal';

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200 selection:bg-primary/20 selection:text-primary">
        {/* FloLabs International Header */}
        <Header
          activeNav={activeNav}
          onNavClick={(navId) => setActiveNav(navId)}
          onLoginClick={() => setIsLoginOpen(true)}
        />

        {/* Page Showcase Body */}
        <ShowcaseContent
          activeNav={activeNav}
          onSelectNav={(navId) => setActiveNav(navId)}
          onOpenLogin={() => setIsLoginOpen(true)}
        />

        {/* FloLabs International Footer */}
        <Footer
          onNavClick={(href) => {
            const cleanHref = href.replace('/', '') || 'home';
            setActiveNav(cleanHref);
          }}
        />

        {/* Login Modal */}
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}
