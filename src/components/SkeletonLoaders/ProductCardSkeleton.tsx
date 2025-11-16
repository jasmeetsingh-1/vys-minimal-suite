export const ProductCardSkeleton = () => {
  return (
    <div className="border border-border p-6 flex flex-col gap-4 animate-pulse">
      <div className="aspect-square bg-muted rounded" />
      
      <div className="h-8 bg-muted rounded w-3/4" />
      
      <div className="flex flex-col gap-2">
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded w-5/6" />
      </div>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="h-8 bg-muted rounded w-20" />
        <div className="h-10 bg-muted rounded w-32" />
      </div>
    </div>
  );
};
