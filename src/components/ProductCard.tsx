import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border border-border bg-card transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="font-light text-lg tracking-wide">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-light">${product.price}</span>
          <Button
            onClick={() => onAddToCart(product)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Agregar
          </Button>
        </div>
      </div>
    </Card>
  );
};
