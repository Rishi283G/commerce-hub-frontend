import { Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Order } from '@/services/api';

// Mock orders for demo - in production, fetch from API
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    items: [
      { productId: '1', productName: 'Minimalist Desk Lamp', quantity: 1, price: 89.00 },
      { productId: '3', productName: 'Marble Bowl', quantity: 2, price: 45.00 },
    ],
    total: 179.00,
    status: 'delivered',
    createdAt: '2024-12-20T10:30:00Z',
  },
  {
    id: 'ORD-002',
    items: [
      { productId: '4', productName: 'Wooden Coffee Table', quantity: 1, price: 299.00 },
    ],
    total: 299.00,
    status: 'shipped',
    createdAt: '2024-12-23T14:15:00Z',
  },
];

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
};

export default function Orders() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Sign in to view orders</h1>
            <p className="text-muted-foreground mb-8">
              Please sign in to access your order history.
            </p>
            <Link to="/auth">
              <Button className="gap-2">
                Sign In
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
        <h1 className="text-3xl font-bold text-foreground mb-8">Order History</h1>

        {mockOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-8">
              You haven't placed any orders yet. Start shopping!
            </p>
            <Link to="/products">
              <Button className="gap-2">
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-card border border-border p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-semibold text-foreground">{order.id}</h2>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 text-xs font-medium capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-foreground">
                        {item.productName} × {item.quantity}
                      </span>
                      <span className="text-muted-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border mt-4 pt-4 flex justify-between">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
