import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 py-4 border-b border-border">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium text-foreground">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <p className="font-semibold text-foreground">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => removeFromCart(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
