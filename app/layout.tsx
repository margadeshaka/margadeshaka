import './globals.css';
import type { Metadata } from 'next';
import Analytics from './components/Analytics';

export const metadata: Metadata = {
  title: 'ChakraVision - 3D Sudarshan Chakra Interactive Experience',
  description: 'A beautiful interactive web application built with Next.js and Three.js, centered around a 3D Sudarshan Chakra, inspired by authentic Hindu scriptures.',
};

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
