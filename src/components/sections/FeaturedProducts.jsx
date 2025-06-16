'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight } from 'lucide-react';
import api from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

const FeaturedProducts = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Get only featured products if available, else first 3
  const featuredProducts = products.filter(p => p.badge === 'Best Seller' || p.featured).slice(0, 3);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 3);

  const handleAddToCart = (product) => {
    addItem(product);
  };

  if (loading) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Featured <span className="premium-text">Collections</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most coveted pieces, each representing the pinnacle of 
            craftsmanship and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-luxury transition-all duration-300 border-border/50 bg-card">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  {/* Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-32 h-32 object-cover rounded-lg" />
                    ) : (
                      <div className="w-32 h-32 bg-primary/20 rounded-lg flex items-center justify-center">
                        <div className="w-20 h-20 bg-primary/30 rounded"></div>
                      </div>
                    )}
                  </div>
                  {/* Badge */}
                  {product.badge && (
                    <Badge className="absolute top-4 left-4" variant={product.badgeVariant || 'default'}>
                      {product.badge}
                    </Badge>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button asChild className="shadow-lg">
                      <Link href={`/products/${product.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{product.category || ''}</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">({product.reviews || 0})</span>
                    </div>
                  </div>
                  <CardTitle className="font-serif">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link href={`/products/${product.id}`}>
                    View Details
                  </Link>
                </Button>
                {product.stock > 0 ? (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    disabled
                  >
                    Out of Stock
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/products" className="flex items-center">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 