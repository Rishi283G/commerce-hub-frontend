import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Layout } from '@/components/layout/Layout';
import heroBanner from '@/assets/hero-banner.jpg';
import { Product } from '@/services/api';

// Mock featured products for demo - in production, these come from API
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Minimalist Desk Lamp',
    description: 'Elegant brass desk lamp with adjustable arm',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    category: 'Lighting',
    stock: 15,
    featured: true,
  },
  {
    id: '2',
    name: 'Ceramic Vase Set',
    description: 'Handcrafted ceramic vases in neutral tones',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop',
    category: 'Decor',
    stock: 20,
    featured: true,
  },
  {
    id: '3',
    name: 'Marble Bowl',
    description: 'Natural marble decorative bowl',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop',
    category: 'Decor',
    stock: 12,
    featured: true,
  },
  {
    id: '4',
    name: 'Wooden Coffee Table',
    description: 'Mid-century modern coffee table',
    price: 299.00,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=400&fit=crop',
    category: 'Furniture',
    stock: 8,
    featured: true,
  },
];

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $100',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated support team',
  },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-card">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-24">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Curated Design for Modern Living
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Discover our collection of thoughtfully designed products that bring elegance and function to your everyday life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/products?category=featured">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View Collection
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[500px] overflow-hidden">
              <img
                src={heroBanner}
                alt="Curated collection of premium lifestyle products"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-background">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Featured Products
              </h2>
              <p className="text-muted-foreground mt-1">
                Handpicked items for your home
              </p>
            </div>
            <Link to="/products">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Subscribe to receive updates on new arrivals and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-primary-foreground text-foreground placeholder:text-muted-foreground outline-none"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
