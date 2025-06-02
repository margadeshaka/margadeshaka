import './globals.css';
import type { Metadata } from 'next';
import Analytics from './components/Analytics';

export const metadata: Metadata = {
  title: 'Margadeshaka AI',
  description: 'Built to listen. Designed to reflect. Made to walk with you.'};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <div className="flex-grow">
          {children}
          <Analytics />
        </div>
        <footer className="w-full py-6 text-center text-gray-400 bg-black/80 backdrop-blur-sm border-t border-indigo-900/30">
          <div className="container mx-auto">
            <p className="mb-2 cosmic-text">© 2025 — Margadeshaka AI</p>
            <p className="text-sm italic opacity-80">"The next step becomes clear when you feel heard."</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
