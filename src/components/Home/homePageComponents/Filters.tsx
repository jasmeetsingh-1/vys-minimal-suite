import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProductType } from '@/lib/api';

interface FiltersProps {
  productTypes: ProductType[];
  onFilterChange: (typeId: string | undefined, subTypeId: string | undefined) => void;
}

export const Filters = ({ productTypes, onFilterChange }: FiltersProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedSubType, setSelectedSubType] = useState<string | undefined>();

  const handleTypeSelect = (typeId: string) => {
    const newTypeId = selectedType === typeId ? undefined : typeId;
    setSelectedType(newTypeId);
    setSelectedSubType(undefined);
    onFilterChange(newTypeId, undefined);
  };

  const handleSubTypeSelect = (typeId: string, subTypeId: string) => {
    setSelectedType(typeId);
    const newSubTypeId = selectedSubType === subTypeId ? undefined : subTypeId;
    setSelectedSubType(newSubTypeId);
    onFilterChange(typeId, newSubTypeId);
  };

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
          <div className="flex flex-col gap-6">
            {productTypes.map((type) => (
              <div key={type.pTypeId} className="flex flex-col gap-2">
                <Button
                  variant={selectedType === type.pTypeId ? 'default' : 'ghost'}
                  className="justify-start"
                  onClick={() => handleTypeSelect(type.pTypeId)}
                >
                  {type.pTypeName}
                </Button>
                
                {selectedType === type.pTypeId && type.subTypes.length > 0 && (
                  <div className="flex flex-col gap-1 ml-4">
                    {type.subTypes.map((subType) => (
                      <Button
                        key={subType.pSubTypeId}
                        variant={selectedSubType === subType.pSubTypeId ? 'secondary' : 'ghost'}
                        size="sm"
                        className="justify-start"
                        onClick={() => handleSubTypeSelect(type.pTypeId, subType.pSubTypeId)}
                      >
                        {subType.pSubTypeName}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
      ) : (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsVisible(true)}
          className="relative"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};
