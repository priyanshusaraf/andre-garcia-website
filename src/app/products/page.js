'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Star, ArrowRight, Filter, Grid, List, Search } from 'lucide-react';
import { products, categories, sortOptions, filterProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

const Products = () => {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  // Filter and sort products based on current state
  const filteredProducts = useMemo(() => {
    return filterProducts(products, searchTerm, selectedCategory, sortBy);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product) => {
    addItem(product);
  };



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
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  size="sm"
                  className="text-sm"
                  onClick={() => setSelectedCategory(category.name)}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant={viewMode === 'grid' ? "default" : "ghost"} 
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? "default" : "ghost"} 
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Results Info */}
          <div className="mb-6 text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "All Products" && ` in ${selectedCategory}`}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
              {filteredProducts.map((product) => (
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
                   <Button 
                     variant="outline" 
                     className="w-full"
                     onClick={() => handleAddToCart(product)}
                     disabled={!product.inStock}
                   >
                     {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                   </Button>
                 </CardFooter>
               </Card>
             ))}
           </div>
           )}

           {/* Pagination or Load More could go here */}
           {filteredProducts.length > 0 && (
             <div className="text-center mt-12">
               <p className="text-sm text-muted-foreground">
                 Showing all {filteredProducts.length} results
               </p>
             </div>
           )}
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