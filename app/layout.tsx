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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
