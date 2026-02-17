import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  //   const [cart, setCart] = useState(() => {
  //     const savedCart = localStorage.getItem("cart");
  //     return savedCart ? JSON.parse(savedCart) : [];
  //   });
  const savedCart = localStorage.getItem("cart");
  const [cart, setCart] = useState(JSON.parse(savedCart) || []);

  //   useEffect(() => {
  //     const savedCart = localStorage.getItem("cart");
  //     console.log("savedCart=>", savedCart);
  //     setCart();
  //   }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const currentItem = prevCart.find((item) => item.id === product.id);

      if (currentItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== product.id);
      }

      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        cart,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
