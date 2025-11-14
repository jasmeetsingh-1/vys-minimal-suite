import { Button } from '@/components/ui/button';
import { cartReducers } from '@/react-store/slicesReducers';
import store from '@/react-store/store.jsx';
import type { Product } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();

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

  return (
    <div className="border border-foreground p-6 flex flex-col gap-4 float-effect">
      <div className="aspect-square bg-secondary flex items-center justify-center">
        <span className="text-4xl font-bold">{product.pTypeDetails.pTypeName.toUpperCase()}</span>
      </div>
      <h4 className="text-2xl font-bold">{product.pName}</h4>
      <p className="text-muted-foreground">{product.pDescription}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-2xl font-bold">₹{product.pCost}</span>
        <Button onClick={handleAddToCart} disabled={!product.availability}>
          {product.availability ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
};
