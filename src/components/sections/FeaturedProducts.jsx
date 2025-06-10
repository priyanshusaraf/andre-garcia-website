import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight } from 'lucide-react';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Signature Mahogany Humidor",
      category: "Desktop Humidors",
      price: "$1,299",
      originalPrice: "$1,599",
      rating: 5,
      reviews: 47,
      badge: "Best Seller",
      badgeVariant: "default",
      image: "/api/placeholder/300/300",
      description: "Handcrafted from premium mahogany with Spanish cedar lining. Holds up to 50 cigars with precision humidity control."
    },
    {
      id: 2,
      name: "Executive Travel Case",
      category: "Travel Cases",
      price: "$349",
      rating: 4.9,
      reviews: 23,
      badge: "New",
      badgeVariant: "secondary",
      image: "/api/placeholder/300/300",
      description: "Compact luxury for the discerning traveler. Waterproof, crush-resistant, and beautifully appointed."
    },
    {
      id: 3,
      name: "Heritage Cabinet Collection",
      category: "Cabinet Humidors",
      price: "$4,299",
      rating: 5,
      reviews: 12,
      badge: "Premium",
      badgeVariant: "secondary",
      image: "/api/placeholder/300/300",
      description: "The pinnacle of cigar storage. Holds 300+ cigars with museum-quality preservation technology."
    }
  ];

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
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-luxury transition-all duration-300 border-border/50 bg-card">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  {/* Product Image Placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <div className="w-32 h-32 bg-primary/20 rounded-lg flex items-center justify-center">
                      <div className="w-20 h-20 bg-primary/30 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Badge */}
                  <Badge className="absolute top-4 left-4" variant={product.badgeVariant}>
                    {product.badge}
                  </Badge>

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
                    <span className="text-sm text-muted-foreground">{product.category}</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <CardTitle className="font-serif">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/products/${product.id}`}>
                    Add to Cart
                  </Link>
                </Button>
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