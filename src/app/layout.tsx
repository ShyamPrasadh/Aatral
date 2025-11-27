import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SplashProvider } from '@/components/SplashProvider';
import AppWrapper from '@/components/AppWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AATRAL Energy Dashboard',
    description: 'Advanced energy monitoring dashboard for UAE buildings',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider>
                    <SplashProvider>
                        <AppWrapper showSplash={true} splashDuration={3000}>
                            {children}
                        </AppWrapper>
                    </SplashProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
