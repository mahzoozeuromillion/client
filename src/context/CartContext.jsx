// src/context/CartContext.jsx
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = {
        id: Date.now(),
        numbers: action.payload.numbers,
        price: 5, // AED 35 as shown in the image
      };
      return {
        ...state,
        items: [...state.items, newItem],
        total: state.total + newItem.price,
      };
    case "REMOVE_FROM_CART":
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price, 0),
      };
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (numbers) => {
    dispatch({ type: "ADD_TO_CART", payload: { numbers } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
