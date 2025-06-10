import { Inter, Playfair_Display, Cinzel } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata = {
  title: 'André García - Premium Cigar Containers & Humidors',
  description: 'Discover handcrafted premium cigar containers, humidors, and storage solutions. Artisan quality since 1985. Preserve the essence of your finest cigars.',
  keywords: 'cigar humidor, premium cigar containers, handcrafted humidors, cigar storage, luxury cigar accessories',
  authors: [{ name: 'André García' }],
  creator: 'André García',
  publisher: 'André García',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://andregarcia.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'André García - Premium Cigar Containers & Humidors',
    description: 'Discover handcrafted premium cigar containers, humidors, and storage solutions. Artisan quality since 1985.',
    url: 'https://andregarcia.com',
    siteName: 'André García',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'André García Premium Cigar Containers',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'André García - Premium Cigar Containers & Humidors',
    description: 'Discover handcrafted premium cigar containers, humidors, and storage solutions. Artisan quality since 1985.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cinzel.variable}`}>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
