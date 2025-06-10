import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Award, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cigar-gradient opacity-10"></div>
      <div className="absolute inset-0 leather-texture"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                <span className="premium-text">Artisan</span>
                <br />
                <span className="text-foreground">Cigar</span>
                <br />
                <span className="premium-text">Containers</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
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
                  <h3 className="font-semibold">Lifetime Warranty</h3>
                  <p className="text-sm text-muted-foreground">Quality guaranteed</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Award Winning</h3>
                  <p className="text-sm text-muted-foreground">Recognized excellence</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Since 1985</h3>
                  <p className="text-sm text-muted-foreground">Trusted craftsmanship</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Showcase */}
          <div className="relative">
            <div className="relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-700">
              {/* Main Product Image Placeholder */}
              <div className="bg-card rounded-lg shadow-luxury p-8 border">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <div className="w-20 h-20 bg-primary/20 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg font-semibold">Signature Series</h3>
                      <p className="text-sm text-muted-foreground">Premium Humidor Collection</p>
                    </div>
                  </div>
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 