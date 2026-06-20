import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    count: string;
    slug: string;
    image: string;
  };
  featured?: boolean;
}

export default function CategoryCard({ category, featured = false }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <motion.div 
        whileHover="hover"
        className={`group relative overflow-hidden cursor-pointer ${featured ? "h-full min-h-[400px] lg:min-h-[600px]" : "aspect-[4/3] lg:aspect-[4/5]"}`}
      >
        <div className="absolute inset-0 bg-muted/30">
          <motion.img 
            variants={{
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-6 lg:p-8">
          <p className="text-white/80 text-xs tracking-widest mb-2 font-medium">{category.count}</p>
          <div className="flex items-center justify-between">
            <h3 className={`font-serif text-white ${featured ? "text-4xl lg:text-5xl" : "text-2xl lg:text-3xl"}`}>
              {category.name}
            </h3>
            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-foreground transition-all duration-300">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
