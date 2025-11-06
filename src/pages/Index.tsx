import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { Product, CartItem } from "@/types/product";

const CATEGORIES = ["Todas", "Anime", "Películas", "Videojuegos", "Cómics"];

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Figura Naruto Uzumaki",
    price: 45.99,
    category: "Anime",
    image: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=400&q=80"
  },
  {
    id: 2,
    name: "Figura Darth Vader",
    price: 59.99,
    category: "Películas",
    image: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400&q=80"
  },
  {
    id: 3,
    name: "Figura Master Chief",
    price: 54.99,
    category: "Videojuegos",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&q=80"
  },
  {
    id: 4,
    name: "Figura Spider-Man",
    price: 42.99,
    category: "Cómics",
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=400&q=80"
  },
  {
    id: 5,
    name: "Figura Goku Ultra Instinct",
    price: 49.99,
    category: "Anime",
    image: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=400&q=80"
  },
  {
    id: 6,
    name: "Figura Iron Man Mark 85",
    price: 67.99,
    category: "Películas",
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=400&q=80"
  },
  {
    id: 7,
    name: "Figura Link Breath of the Wild",
    price: 52.99,
    category: "Videojuegos",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&q=80"
  },
  {
    id: 8,
    name: "Figura Batman Arkham Knight",
    price: 56.99,
    category: "Cómics",
    image: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400&q=80"
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = selectedCategory === "Todas" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-light tracking-tight mb-2">
            {selectedCategory === "Todas" ? "Todas las Figuras" : selectedCategory}
          </h2>
          <p className="text-muted-foreground font-light">
            {filteredProducts.length} productos disponibles
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Index;
