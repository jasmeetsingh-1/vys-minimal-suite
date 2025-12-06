import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Search } from 'lucide-react';
import { Header } from '@/components/Header/Header';
import ProductImage from '@/components/Home/homePageComponents/ProductImage';
import ProductThumbnail from '@/components/Home/homePageComponents/ProductThumbnail';
import { Button } from '@/components/ui/button';
import { productApi, type Product } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { cartReducers } from '@/react-store/slicesReducers';
import store from '@/react-store/store.jsx';
import { ProductDetailSkeleton } from '@/components/SkeletonLoaders/ProductDetailSkeleton';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Commented out color and size selection - not needed for current implementation
  // const [selectedColor, setSelectedColor] = useState(0);
  // const [selectedSize, setSelectedSize] = useState('M');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await productApi.getProductDetails(id);
        
        if (response.status === 200) {
          setProduct(response.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to load product details",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, toast]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Product not found</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const imageUrl = '/placeholder.svg';
  const images = [imageUrl, imageUrl, imageUrl, imageUrl];

  // Commented out color and size arrays - not needed for current implementation
  // const colors = ['#E5E5E5', '#8B8B8B', '#000000', '#A8D5BA', '#C8B6E2'];
  // const sizes = ['XS', 'S', 'M', 'L', 'XL', '2X'];

  const handleAddToCart = () => {
    store.dispatch(
      cartReducers.addToCart({
        [product.pId]: {
          ...product,
          quantity: 1,
        },
      })
    );
    
    toast({
      title: "Added to cart",
      description: `${product.pName} has been added to your cart.`,
    });
  };

  const price = parseFloat(product.pCost) || 0;
  const category = product.pTypeDetails.pTypeName;

  return (
    <div className="min-h-screen bg-background">
      <div className="md:hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-muted mb-4">
            <ProductImage 
              src={images[selectedImage]} 
              alt={product.pName}
              className="w-full aspect-square object-cover"
            />
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <ProductThumbnail
                key={idx}
                src={img}
                alt={`${product.pName} ${idx + 1}`}
                isActive={selectedImage === idx}
                onClick={() => setSelectedImage(idx)}
              />
            ))}
          </div>

          <h1 className="text-xl font-bold mb-2">{product.pName}</h1>
          <p className="text-sm text-muted-foreground mb-2">{category}</p>
          <p className="text-2xl font-bold mb-4">₹{price}</p>
          
          <p className="text-sm text-muted-foreground mb-6">
            {product.pDescription}
          </p>

          {!product.availability ? (
            <Button disabled className="w-full">
              Out of Stock
            </Button>
          ) : (
            <Button onClick={handleAddToCart} className="w-full">
              ADD
            </Button>
          )}
        </div>
      </div>

      <div className="hidden md:block">
        <Header />
        <main className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex gap-4">
              <div className="flex flex-col gap-3 w-20">
                {images.map((img, idx) => (
                  <ProductThumbnail
                    key={idx}
                    src={img}
                    alt={`${product.pName} ${idx + 1}`}
                    isActive={selectedImage === idx}
                    onClick={() => setSelectedImage(idx)}
                  />
                ))}
              </div>

              <div className="flex-1 bg-muted">
                <ProductImage 
                  src={images[selectedImage]} 
                  alt={product.pName}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="flex-1 lg:max-w-md">
              <Button variant="ghost" size="icon" className="ml-auto mb-4 rounded-full border border-border">
                <Heart className="w-5 h-5" />
              </Button>

              <h1 className="text-2xl font-bold mb-2">{product.pName}</h1>
              <p className="text-3xl font-bold mb-2">₹{price}</p>
              <p className="text-sm text-muted-foreground mb-6">MRP incl. of all taxes</p>

              <p className="mb-8 text-sm">
                {product.pDescription}
              </p>

              {/* Commented out color selection - not needed for current implementation */}
              {/* <div className="mb-8">
                <h3 className="font-semibold mb-3">Color</h3>
                <div className="flex gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className={`w-12 h-12 border-2 ${selectedColor === index ? 'border-foreground' : 'border-border'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(index)}
                    />
                  ))}
                </div>
              </div> */}

              {/* Commented out size selection - not needed for current implementation */}
              {/* <div className="mb-8">
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="flex gap-2 mb-3">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      className="w-14 h-10"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <button className="underline hover:no-underline">FIND YOUR SIZE</button>
                  <button className="underline hover:no-underline">MEASUREMENT GUIDE</button>
                </div>
              </div> */}

              {!product.availability ? (
                <Button disabled className="w-full h-12 text-base" size="lg">
                  Out of Stock
                </Button>
              ) : (
                <Button onClick={handleAddToCart} className="w-full h-12 text-base" size="lg">
                  ADD
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductDetail;

