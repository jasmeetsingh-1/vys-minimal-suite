import ProductImage from './ProductImage';

interface ProductThumbnailProps {
  src: string;
  alt: string;
  isActive?: boolean;
  onClick?: () => void;
}

const ProductThumbnail = ({ src, alt, isActive, onClick }: ProductThumbnailProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-16 h-16 flex-shrink-0 border-2 transition-colors ${
        isActive ? 'border-foreground' : 'border-border'
      }`}
    >
      <ProductImage src={src} alt={alt} className="w-full h-full object-cover" />
    </button>
  );
};

export default ProductThumbnail;

