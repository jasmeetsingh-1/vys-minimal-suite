import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Filters = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible ? (
        <aside className="w-[20%] border-r border-foreground p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Filters</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-muted-foreground">Filter options will be implemented later</p>
          </div>
        </aside>
      ) : (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsVisible(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-10"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};
