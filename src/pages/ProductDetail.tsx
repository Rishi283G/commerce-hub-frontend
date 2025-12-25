import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/services/api';

// Mock product data - in production, fetch from API
const mockProducts: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Minimalist Desk Lamp',
    description: 'Elegant brass desk lamp with adjustable arm. Perfect for modern workspaces and reading nooks. Features a warm LED light source and a weighted base for stability. The brass finish develops a beautiful patina over time, making each piece unique.',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop',
    category: 'Lighting',
    stock: 15,
    featured: true,
  },
  '2': {
    id: '2',
    name: 'Ceramic Vase Set',
    description: 'Handcrafted ceramic vases in neutral tones. Set of 3 different sizes, perfect for displaying fresh or dried flowers. Each vase is made by skilled artisans using traditional pottery techniques.',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&h=800&fit=crop',
    category: 'Decor',
    stock: 20,
    featured: true,
  },
  '3': {
    id: '3',
    name: 'Marble Bowl',
    description: 'Natural marble decorative bowl. Each piece is unique due to natural stone variations. Perfect for displaying fruit, keys, or as a standalone decorative piece.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop',
    category: 'Decor',
    stock: 12,
    featured: true,
  },
  '4': {
    id: '4',
    name: 'Wooden Coffee Table',
    description: 'Mid-century modern coffee table crafted from solid walnut wood. Features clean lines and tapered legs. The natural grain of the wood makes each table one-of-a-kind.',
    price: 299.00,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&h=800&fit=crop',
    category: 'Furniture',
    stock: 8,
    featured: true,
  },
  '5': {
    id: '5',
    name: 'Linen Throw Blanket',
    description: 'Soft linen throw blanket in natural color. Machine washable and gets softer with each wash. Perfect for adding texture and warmth to any room.',
    price: 78.00,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop',
    category: 'Textiles',
    stock: 25,
  },
  '6': {
    id: '6',
    name: 'Glass Pendant Light',
    description: 'Hand-blown glass pendant light with brass hardware. Creates beautiful ambient lighting. Each piece has slight variations due to the handmade process.',
    price: 145.00,
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&h=800&fit=crop',
    category: 'Lighting',
    stock: 10,
  },
  '7': {
    id: '7',
    name: 'Ceramic Planter',
    description: 'Modern ceramic planter with drainage hole. Available in multiple sizes. The matte finish and clean lines complement any plant.',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=800&fit=crop',
    category: 'Decor',
    stock: 30,
  },
  '8': {
    id: '8',
    name: 'Wooden Side Table',
    description: 'Compact side table made from oak wood with brass accents. Perfect for small spaces. The minimalist design fits any interior style.',
    price: 175.00,
    image: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?w=800&h=800&fit=crop',
    category: 'Furniture',
    stock: 6,
  },
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = id ? mockProducts[id] : null;

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    addToCart(product, quantity);
    toast({
      title: 'Added to cart',
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
    setIsAdding(false);
  };

  return (
    <Layout>
      <div className="container py-8 lg:py-12">
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {product.name}
              </h1>
            </div>

            <p className="text-2xl font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-foreground">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Quantity</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full gap-2"
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
            >
              {isAdding ? (
                'Adding...'
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </>
              )}
            </Button>

            {/* Additional Info */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Category</span>
                <span className="text-foreground">{product.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">SKU</span>
                <span className="text-foreground">SKU-{product.id.padStart(6, '0')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
