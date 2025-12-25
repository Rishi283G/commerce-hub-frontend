import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { CartItem } from '@/components/cart/CartItem';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { items, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products">
              <Button className="gap-2">
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 lg:py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border p-6">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
              <div className="mt-4 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">
                    {totalPrice >= 100 ? 'Free' : '$10.00'}
                  </span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">
                      ${(totalPrice + (totalPrice >= 100 ? 0 : 10)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link to="/checkout" className="block mt-6">
                <Button className="w-full gap-2">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link to="/products" className="block mt-4">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
