import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/Header/Header';

export const ProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Skeleton */}
      <div className="md:hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Skeleton className="w-5 h-5" />
          <div className="flex gap-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        </div>

        <div className="p-4">
          {/* Main Image */}
          <div className="bg-muted mb-4">
            <Skeleton className="w-full aspect-square" />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((idx) => (
              <Skeleton key={idx} className="w-16 h-16 flex-shrink-0 rounded" />
            ))}
          </div>

          {/* Product Name */}
          <Skeleton className="h-7 w-3/4 mb-2" />
          
          {/* Category */}
          <Skeleton className="h-4 w-1/3 mb-2" />
          
          {/* Price */}
          <Skeleton className="h-8 w-24 mb-4" />
          
          {/* Description */}
          <div className="mb-6 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Button */}
          <Skeleton className="w-full h-10" />
        </div>
      </div>

      {/* Desktop Skeleton */}
      <div className="hidden md:block">
        <Header />
        <main className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image Section */}
            <div className="flex-1 flex gap-4">
              {/* Thumbnail Column */}
              <div className="flex flex-col gap-3 w-20">
                {[1, 2, 3, 4].map((idx) => (
                  <Skeleton key={idx} className="w-20 h-20 rounded" />
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 bg-muted">
                <Skeleton className="w-full aspect-square" />
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex-1 lg:max-w-md">
              {/* Heart Button */}
              <Skeleton className="w-10 h-10 rounded-full ml-auto mb-4" />

              {/* Product Name */}
              <Skeleton className="h-8 w-3/4 mb-2" />
              
              {/* Price */}
              <Skeleton className="h-10 w-32 mb-2" />
              
              {/* MRP Text */}
              <Skeleton className="h-4 w-48 mb-6" />

              {/* Description */}
              <div className="mb-8 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>

              {/* Button */}
              <Skeleton className="w-full h-12" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

