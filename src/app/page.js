import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <About />
      <Testimonials />
      <CTA />
    </div>
  );
}
