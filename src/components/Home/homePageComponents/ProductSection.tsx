import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from '@/components/SkeletonLoaders/ProductCardSkeleton';
import type { Product } from '@/lib/api';

interface ProductSectionProps {
  products: Product[];
  loading: boolean;
}

export const ProductSection = ({ products, loading }: ProductSectionProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-xl text-muted-foreground">No products available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.pId} product={product} />
      ))}
    </div>
  );
};
