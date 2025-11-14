import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const Filters = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-foreground p-4">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center"
      >
        <span className="text-lg font-bold">Filters</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </Button>
      
      {isOpen && (
        <div className="mt-4 p-4 border-t border-foreground">
          <p className="text-muted-foreground">Filter options will be implemented later</p>
        </div>
      )}
    </div>
  );
};
