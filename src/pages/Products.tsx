import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Layout } from '@/components/layout/Layout';
import { Product } from '@/services/api';

// Mock products for demo - in production, these come from API
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Minimalist Desk Lamp',
    description: 'Elegant brass desk lamp with adjustable arm. Perfect for modern workspaces and reading nooks.',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    category: 'Lighting',
    stock: 15,
    featured: true,
  },
  {
    id: '2',
    name: 'Ceramic Vase Set',
    description: 'Handcrafted ceramic vases in neutral tones. Set of 3 different sizes.',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop',
    category: 'Decor',
    stock: 20,
    featured: true,
  },
  {
    id: '3',
    name: 'Marble Bowl',
    description: 'Natural marble decorative bowl. Each piece is unique due to natural stone variations.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop',
    category: 'Decor',
    stock: 12,
    featured: true,
  },
  {
    id: '4',
    name: 'Wooden Coffee Table',
    description: 'Mid-century modern coffee table crafted from solid walnut wood.',
    price: 299.00,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=400&fit=crop',
    category: 'Furniture',
    stock: 8,
    featured: true,
  },
  {
    id: '5',
    name: 'Linen Throw Blanket',
    description: 'Soft linen throw blanket in natural color. Machine washable.',
    price: 78.00,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    category: 'Textiles',
    stock: 25,
  },
  {
    id: '6',
    name: 'Glass Pendant Light',
    description: 'Hand-blown glass pendant light with brass hardware.',
    price: 145.00,
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop',
    category: 'Lighting',
    stock: 10,
  },
  {
    id: '7',
    name: 'Ceramic Planter',
    description: 'Modern ceramic planter with drainage hole. Available in multiple sizes.',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
    category: 'Decor',
    stock: 30,
  },
  {
    id: '8',
    name: 'Wooden Side Table',
    description: 'Compact side table made from oak wood with brass accents.',
    price: 175.00,
    image: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?w=400&h=400&fit=crop',
    category: 'Furniture',
    stock: 6,
  },
];

const categories = ['All', 'Furniture', 'Lighting', 'Decor', 'Textiles'];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading] = useState(false);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <Layout>
      <div className="container py-8 lg:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            All Products
          </h1>
          <p className="text-muted-foreground">
            Browse our complete collection of curated items
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Filter className="h-5 w-5 text-muted-foreground self-center mr-2 hidden md:block" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </p>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} isLoading={isLoading} />
      </div>
    </Layout>
  );
}
