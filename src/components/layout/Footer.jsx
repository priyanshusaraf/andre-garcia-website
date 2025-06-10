import React from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t leather-texture">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-display text-2xl font-bold premium-text">
                André García
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Crafting premium cigar containers and humidors since 1985. 
              Each piece is meticulously designed to preserve the essence and 
              quality of your finest cigars.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=humidors" className="text-muted-foreground hover:text-primary transition-colors">
                  Premium Humidors
                </Link>
              </li>
              <li>
                <Link href="/products?category=travel-cases" className="text-muted-foreground hover:text-primary transition-colors">
                  Travel Cases
                </Link>
              </li>
              <li>
                <Link href="/products?category=desktop" className="text-muted-foreground hover:text-primary transition-colors">
                  Desktop Humidors
                </Link>
              </li>
              <li>
                <Link href="/products?category=cabinet" className="text-muted-foreground hover:text-primary transition-colors">
                  Cabinet Humidors
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="text-muted-foreground hover:text-primary transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/craftsmanship" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-muted-foreground hover:text-primary transition-colors">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  123 Artisan Lane<br />
                  Miami, FL 33101<br />
                  United States
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <Link href="tel:+1-305-555-0123" className="text-muted-foreground hover:text-primary transition-colors">
                  +1 (305) 555-0123
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <Link href="mailto:info@andregarcia.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@andregarcia.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 André García. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
              Shipping Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 