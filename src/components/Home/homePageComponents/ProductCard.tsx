import { Button } from '@/components/ui/button';
import { cartReducers } from '@/react-store/slicesReducers';
import store from '@/react-store/store.jsx';
import type { Product } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { Minus, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();
  const cartItems = useSelector((state: any) => state.cartItems.items);
  const cartItem = cartItems[product.pId];

  const handleAddToCart = () => {
    store.dispatch(
      cartReducers.addToCart({
        [product.pId]: {
          ...product,
          quantity: 1,
        },
      })
    );
    
    toast({
      title: "Added to Cart",
      description: `${product.pName} has been added to your cart.`,
    });
  };

  const handleIncrement = () => {
    store.dispatch(cartReducers.incrementQuantity(product.pId));
  };

  const handleDecrement = () => {
    if (cartItem.quantity === 1) {
      store.dispatch(cartReducers.removeFromCart(product.pId));
    } else {
      store.dispatch(cartReducers.decrementQuantity(product.pId));
    }
  };

  return (
    <div className="border border-foreground p-6 flex flex-col gap-4 float-effect">
      <div className="aspect-square bg-secondary flex items-center justify-center">
        <span className="text-4xl font-bold">{product.pTypeDetails.pTypeName.toUpperCase()}</span>
      </div>
      <h4 className="text-2xl font-bold">{product.pName}</h4>
      <p className="text-muted-foreground">{product.pDescription}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-2xl font-bold">₹{product.pCost}</span>
        {!product.availability ? (
          <Button disabled>Out of Stock</Button>
        ) : cartItem ? (
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" onClick={handleDecrement}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-bold min-w-[2rem] text-center">{cartItem.quantity}</span>
            <Button size="icon" variant="outline" onClick={handleIncrement}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        )}
      </div>
    </div>
  );
};
