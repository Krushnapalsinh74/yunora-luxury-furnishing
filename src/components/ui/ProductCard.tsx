import { Heart, Star } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    badge?: string;
    rating: number;
    reviews: number;
    category: string;
    image: string;
  };
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isInWishlist, toggleWishlist, addToCart } = useCart();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col gap-3 relative"
    >
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <Link href={`/product/${product.id}`}>
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover cursor-pointer"
          />
        </Link>
        
        {product.badge && (
          <div className="absolute top-3 left-3 bg-card text-foreground text-[10px] font-medium tracking-widest px-2 py-1 z-10 shadow-sm uppercase">
            {product.badge}
          </div>
        )}

        <button 
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
          data-testid={`button-wishlist-${product.id}`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 flex justify-center">
          <button 
            onClick={() => addToCart()}
            className="w-full bg-primary/90 backdrop-blur-sm text-primary-foreground py-3 text-sm font-medium hover:bg-primary transition-colors uppercase tracking-wider"
            data-testid={`button-add-to-cart-${product.id}`}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
          <div className="flex text-[#D4AF37]">
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
          </div>
          <span className="ml-1">({product.reviews})</span>
        </div>
        
        <Link href={`/product/${product.id}`} className="font-serif text-lg leading-tight hover:text-primary transition-colors">
          {product.name}
        </Link>
        
        <div className="flex items-center gap-2 mt-1">
          <span className="font-medium">₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground text-sm line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
