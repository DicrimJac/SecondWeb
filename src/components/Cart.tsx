import { X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartItem } from "@/types/product";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl font-light tracking-tight">Carrito</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground font-light">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-border pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded object-cover bg-muted"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-light">{item.name}</h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 border border-border rounded">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-muted"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-muted"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="font-light">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-4 space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="font-light">Total</span>
                  <span className="font-light">${total.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Finalizar Compra
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
