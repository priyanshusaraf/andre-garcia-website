'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Award, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const carouselImages = [
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1500&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80',
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % carouselImages.length);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Carousel Images */}
      {carouselImages.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt="Banner"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 z-0 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      {/* Overlay for darkening */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-primary/20 z-0"></div>
      {/* Carousel Controls */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-2"><ChevronLeft className="h-6 w-6" /></button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-2"><ChevronRight className="h-6 w-6" /></button>
      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {carouselImages.map((_, idx) => (
          <span key={idx} className={`w-3 h-3 rounded-full ${idx === current ? 'bg-primary' : 'bg-white/50'} block`}></span>
        ))}
      </div>
      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-white drop-shadow-lg">
                <span className="premium-text">Artisan</span>
                <br />
                <span className="text-foreground">Cigar</span>
                <br />
                <span className="premium-text">Containers</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-xl drop-shadow">
                Preserve the essence of your finest cigars with our handcrafted 
                premium humidors and storage solutions. Each piece is a masterwork 
                of tradition and innovation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="shadow-luxury">
                <Link href="/products" className="flex items-center">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">
                  Our Story
                </Link>
              </Button>
            </div>
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold text-white">Lifetime Warranty</h3>
                  <p className="text-sm text-white/80">Quality guaranteed</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold text-white">Award Winning</h3>
                  <p className="text-sm text-white/80">Recognized excellence</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold text-white">Since 1985</h3>
                  <p className="text-sm text-white/80">Trusted craftsmanship</p>
                </div>
              </div>
            </div>
          </div>
          {/* Product Showcase (Optional) */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="bg-card rounded-lg shadow-luxury p-8 border bg-white/80">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                  alt="Showcase Product"
                  className="w-64 h-64 object-cover rounded-lg mx-auto"
                />
                <div className="space-y-2 text-center mt-4">
                  <h3 className="font-serif text-lg font-semibold">Signature Series</h3>
                  <p className="text-sm text-muted-foreground">Premium Humidor Collection</p>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-sm animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-sm animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 