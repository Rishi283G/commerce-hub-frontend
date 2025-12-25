import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold text-foreground">Store</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Quality products for everyday life.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=featured" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">
                  Contact: support@store.com
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  Hours: Mon-Fri 9am-5pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
