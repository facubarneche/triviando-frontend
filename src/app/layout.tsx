import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { DynamicBackground } from './components/DynamicBackground';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'trivIAndo',
  description: 'trivIAndo, aprende jugando',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <DynamicBackground />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
