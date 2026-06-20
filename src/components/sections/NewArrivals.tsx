import { useProducts } from "@/lib/useApi";
import { adaptProduct } from "@/lib/productAdapter";
import ProductCard from "@/components/ui/ProductCard";
import { products as staticProducts } from "@/data/products";
import { Loader2 } from "lucide-react";

export default function NewArrivals() {
  const { data, isLoading } = useProducts({ limit: 20 });

  const displayProducts = data?.items?.length
    ? [...data.items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4).map(adaptProduct)
    : [...staticProducts].reverse().slice(0, 4);

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl lg:text-5xl text-foreground">New Arrivals</h2>
        </div>

        {isLoading && (
          <div className="flex justify-center mb-8">
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {displayProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
