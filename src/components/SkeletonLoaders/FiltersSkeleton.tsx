export const FiltersSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="h-10 bg-muted rounded" />
          <div className="flex flex-col gap-1 ml-4">
            <div className="h-8 bg-muted rounded w-4/5" />
            <div className="h-8 bg-muted rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};
