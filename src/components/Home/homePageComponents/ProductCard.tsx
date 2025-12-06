import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import type { Product } from '@/lib/api';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl = '/placeholder.svg';
  const category = product.pTypeDetails.pTypeName;
  const price = parseFloat(product.pCost) || 0;

  return (
    <Link to={`/product/${product.pId}`} className="group">
      <div className="bg-muted mb-3 overflow-hidden">
        <ProductImage 
          src={imageUrl} 
          alt={product.pName} 
          className="w-full h-[250px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div>
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">{category}</p>
            <h3 className="font-medium text-sm">{product.pName}</h3>
          </div>
          <p className="font-semibold text-sm">₹{price}</p>
        </div>
      </div>
    </Link>
  );
};
