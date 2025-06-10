import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Star, ArrowRight, Filter, Grid, List, Search } from 'lucide-react';

export const metadata = {
  title: 'Premium Cigar Containers & Humidors - André García Collection',
  description: 'Explore our complete collection of handcrafted premium cigar containers, humidors, and storage solutions. From desktop humidors to travel cases.',
};

const Products = () => {
  const categories = [
    { name: "All Products", count: 24, active: true },
    { name: "Desktop Humidors", count: 8 },
    { name: "Cabinet Humidors", count: 4 },
    { name: "Travel Cases", count: 6 },
    { name: "Accessories", count: 6 }
  ];

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
      capacity: "50 Cigars",
      material: "Mahogany & Spanish Cedar",
      description: "Handcrafted from premium mahogany with Spanish cedar lining. Features precision humidity control and elegant brass hardware."
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
      capacity: "5 Cigars",
      material: "Leather & Cedar",
      description: "Compact luxury for the discerning traveler. Waterproof, crush-resistant, and beautifully appointed with premium leather."
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
      capacity: "300+ Cigars",
      material: "Walnut & Spanish Cedar",
      description: "The pinnacle of cigar storage. Museum-quality preservation technology with handcrafted walnut construction."
    },
    {
      id: 4,
      name: "Classic Desktop Humidor",
      category: "Desktop Humidors",
      price: "$899",
      rating: 4.8,
      reviews: 34,
      capacity: "25 Cigars",
      material: "Cherry & Spanish Cedar",
      description: "Elegant cherry wood construction with traditional brass fittings. Perfect for the beginning collector."
    },
    {
      id: 5,
      name: "Professional Travel Humidor",
      category: "Travel Cases",
      price: "$799",
      rating: 4.9,
      reviews: 18,
      capacity: "15 Cigars",
      material: "Carbon Fiber & Cedar",
      description: "Ultra-lightweight carbon fiber exterior with Spanish cedar interior. Built for frequent travelers."
    },
    {
      id: 6,
      name: "Artisan Display Cabinet",
      category: "Cabinet Humidors",
      price: "$6,299",
      rating: 5,
      reviews: 8,
      badge: "Limited Edition",
      badgeVariant: "secondary",
      capacity: "500+ Cigars",
      material: "Exotic Burl & Cedar",
      description: "Showcase your collection in this museum-quality display cabinet with climate-controlled sections."
    },
    {
      id: 7,
      name: "Compact Travel Tube",
      category: "Travel Cases",
      price: "$179",
      rating: 4.7,
      reviews: 56,
      capacity: "2 Cigars",
      material: "Aluminum & Cedar",
      description: "Discreet protection for your favorite cigars. Fits easily in briefcase or luggage."
    },
    {
      id: 8,
      name: "Master's Edition Humidor",
      category: "Desktop Humidors",
      price: "$2,899",
      rating: 5,
      reviews: 15,
      badge: "Master's Choice",
      badgeVariant: "default",
      capacity: "100 Cigars",
      material: "Ebony & Spanish Cedar",
      description: "André García's personal design featuring rare ebony wood and gold-plated hardware."
    },
    {
      id: 9,
      name: "Precision Hygrometer Set",
      category: "Accessories",
      price: "$199",
      rating: 4.9,
      reviews: 67,
      capacity: "N/A",
      material: "Stainless Steel",
      description: "Professional-grade hygrometer and humidification system for optimal cigar preservation."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary/10 to-secondary/10 leather-texture">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">
              Premium <span className="premium-text">Collection</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Discover our complete range of handcrafted cigar containers, humidors, 
              and accessories. Each piece represents decades of refinement and 
              uncompromising attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Categories */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={category.active ? "default" : "outline"}
                  size="sm"
                  className="text-sm"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            {/* Search and View Options */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    {product.badge && (
                      <Badge className="absolute top-4 left-4" variant={product.badgeVariant}>
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
                    
                    {/* Specifications */}
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span>{product.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Material:</span>
                        <span>{product.material}</span>
                      </div>
                    </div>

                    <Separator className="my-4" />
                    
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

                <CardFooter className="p-6 pt-0 space-y-2">
                  <Button asChild className="w-full">
                    <Link href={`/products/${product.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30 leather-texture">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-serif text-xl font-semibold">Free Shipping</h3>
              <p className="text-muted-foreground text-sm">
                Complimentary shipping on orders over $500
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-serif text-xl font-semibold">Lifetime Warranty</h3>
              <p className="text-muted-foreground text-sm">
                Every piece comes with our lifetime craftsmanship guarantee
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-serif text-xl font-semibold">Personal Consultation</h3>
              <p className="text-muted-foreground text-sm">
                Expert guidance to find your perfect storage solution
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products; 