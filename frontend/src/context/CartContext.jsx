import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const[isCartOpen,setIsCartOpen]=useState(false)
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, selectedVariant = null) => {
    setCart((prev) => {
      const key = selectedVariant
        ? `${product._id}-${JSON.stringify(selectedVariant)}`
        : product._id;

      const exists = prev.find((item) => item.cartKey === key);

      if (exists) {
        return prev.map((item) =>
          item.cartKey === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const price = selectedVariant?.price || product.price;

      return [...prev, {
        cartKey: key,
        _id: product._id,
        name: product.name,
        slug: product.slug,
        image: product.images?.[0] || "",
        price: Number(price),
        quantity,
        selectedVariant,
        stock: product.stock,
      }];
    });
  };

  const removeFromCart = (cartKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

const clearCart = () => {
  setCart([]);
  localStorage.removeItem("cart");
};

  const updateQuantity = (cartKey, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.cartKey === cartKey ? { ...item, quantity } : item
      )
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal,isCartOpen,setIsCartOpen,clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
export default CartProvider;