import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import SaleBanner from '@/components/sections/SaleBanner';

export default function Home() {
  return (
    <div className="min-h-screen">
      <SaleBanner />
      <Hero />
      <FeaturedProducts />
      <About />
      <Testimonials />
      <CTA />
    </div>
  );
}
