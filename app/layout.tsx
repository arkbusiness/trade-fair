import type { Metadata } from 'next';
import { ReactQueryClientProvider } from './core/providers';
import { INTER_CLASS } from './core/styles';
import { Toaster } from 'react-hot-toast';
import { ARK_META } from './core/shared/constants/common.const';
import NextTopLoader from 'nextjs-toploader';

import './globals.css';

export const metadata: Metadata = {
  title: ARK_META.title,
  description: ARK_META.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${INTER_CLASS} antialiased`}>
        <NextTopLoader color="var(--tertiary)" />
        <ReactQueryClientProvider>
          {children}
        </ReactQueryClientProvider>
        <Toaster
          toastOptions={{
            duration: 6000
          }}
        />
      </body>
    </html>
  );
}
