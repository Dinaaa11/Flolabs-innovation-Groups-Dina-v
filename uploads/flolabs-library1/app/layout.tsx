import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Flolabs innovation Group',
  description: 'Launching AI and robotics projects for the next generation',
  icons: {
    icon: '/logos/logo-87ef29e9.png',
    apple: '/logos/logo-87ef29e9.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=Google+Sans:wght@400;500;700&family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
