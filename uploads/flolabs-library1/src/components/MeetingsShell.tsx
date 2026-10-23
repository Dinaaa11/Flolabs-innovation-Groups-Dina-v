'use client';

import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { Header } from './Header';
import { Footer } from './Footer';

export function MeetingsShell({ children, activeNav = 'meetings' }: { children: React.ReactNode; activeNav?: string }) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header activeNav={activeNav} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
