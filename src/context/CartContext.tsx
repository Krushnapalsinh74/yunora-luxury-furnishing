import { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  cartCount: number;
  wishlistCount: number;
  addToCart: () => void;
  removeFromCart: () => void;
  toggleWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(2);
  const [wishlistItems, setWishlistItems] = useState<Set<number>>(new Set([1]));

  const addToCart = () => setCartCount((prev) => prev + 1);
  const removeFromCart = () => setCartCount((prev) => Math.max(0, prev - 1));

  const toggleWishlist = (id: number) => {
    setWishlistItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isInWishlist = (id: number) => wishlistItems.has(id);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        wishlistCount: wishlistItems.size,
        addToCart,
        removeFromCart,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
