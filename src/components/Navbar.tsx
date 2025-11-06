import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Navbar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  cartItemsCount,
  onCartClick 
}: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-light tracking-tight">FiguraLab</h1>
          
          <div className="hidden md:flex items-center gap-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`text-sm font-light tracking-wide transition-colors hover:text-foreground ${
                  selectedCategory === category
                    ? "text-foreground border-b border-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile categories */}
        <div className="flex md:hidden items-center gap-4 mt-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`text-sm font-light tracking-wide whitespace-nowrap transition-colors hover:text-foreground ${
                selectedCategory === category
                  ? "text-foreground border-b border-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
