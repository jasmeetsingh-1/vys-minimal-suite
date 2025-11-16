import { useEffect, useState, useCallback, useRef } from 'react';
import { Header } from '@/components/Header/Header';
import { Filters } from './homePageComponents/Filters';
import { ProductSection } from './homePageComponents/ProductSection';
import { productApi, type Product, type ProductType } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersLoading, setFiltersLoading] = useState(true);
  const { toast } = useToast();
  const debounceTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        setFiltersLoading(true);
        const typesResponse = await productApi.getProductTypes();
        if (typesResponse.status === 200) {
          setProductTypes(typesResponse.data);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load product types",
          variant: "destructive",
        });
      } finally {
        setFiltersLoading(false);
      }
    };

    fetchProductTypes();
  }, [toast]);

  const fetchProducts = useCallback(async (typeId?: string, subTypeId?: string) => {
    try {
      setLoading(true);
      const productsResponse = await productApi.getProducts(typeId);

      if (productsResponse.status === 200) {
        let filteredProducts = productsResponse.data;
        
        if (subTypeId) {
          filteredProducts = filteredProducts.filter(
            (product) => product.pSubTypeDetails.pSubTypeId === subTypeId
          );
        }
        
        setProducts(filteredProducts);
      } else {
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = useCallback((typeId?: string, subTypeId?: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchProducts(typeId, subTypeId);
    }, 2000);
  }, [fetchProducts]);

  return (
    <div className="flex">
      <Filters 
        productTypes={productTypes} 
        onFilterChange={handleFilterChange}
        loading={filtersLoading}
      />
      
      <main className="flex-1 p-6">
        <ProductSection products={products} loading={loading} />
      </main>
    </div>
  );
};
