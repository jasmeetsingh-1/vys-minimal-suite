import { useEffect, useState } from 'react';
import { Header } from '@/components/Header/Header';
import { Filters } from './homePageComponents/Filters';
import { ProductSection } from './homePageComponents/ProductSection';
import { productApi, type Product, type ProductType } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [productsResponse, typesResponse] = await Promise.all([
          productApi.getProducts(),
          productApi.getProductTypes(),
        ]);

        if (productsResponse.status === 200) {
          setProducts(productsResponse.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to load products",
            variant: "destructive",
          });
        }

        if (typesResponse.status === 200) {
          setProductTypes(typesResponse.data);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 flex-shrink-0">
            <Filters />
          </aside>
          
          <main className="flex-1">
            <ProductSection products={products} loading={loading} />
          </main>
        </div>
      </div>
    </div>
  );
};
