'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';
import api from '@/lib/utils';

const SaleBanner = () => {
  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        const res = await api.get('/products/sale-banners');
        if (res.data && res.data.length > 0) {
          setBanners(res.data);
        }
      } catch (error) {
        console.error('Error fetching sale banners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Auto-rotate banners if multiple
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  if (loading || !banners.length || !isVisible) {
    return null;
  }

  const banner = banners[currentBanner];

  return (
    <div className="relative bg-gradient-to-r from-red-500 to-red-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {banner.image_url && (
              <img 
                src={banner.image_url} 
                alt={banner.title}
                className="w-12 h-12 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h3 className="font-bold text-lg">{banner.title}</h3>
              {banner.description && (
                <p className="text-sm opacity-90 line-clamp-1">{banner.description}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {banner.link_url && (
              <Button asChild variant="secondary" size="sm">
                <Link href={banner.link_url} className="flex items-center">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            
            {banners.length > 1 && (
              <div className="flex space-x-1">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBanner(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentBanner ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
            
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleBanner; 