import { Cart, Category, Product } from "@/types";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

// Define the structure of the AuthContext
type StoreContextType = {
  categories: Category[];
  products: Product[];
  cartItems: Cart[];
  selectedCategoryId: string;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  insertCartItem: (item: Product) => void;
  removeFromCart: (id: string) => void;
  updateCart: (item: Cart) => void;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
  totalCartItemCount: number;
  subTotal: number;
};

// Create the default context with dummy values (will be overwritten by provider)
export const StoreContext = createContext<StoreContextType>({
  categories: [],
  products: [],
  cartItems: [],
  selectedCategoryId: "",
  setCategories: () => {},
  setProducts: () => {},
  setSelectedCategoryId: () => {},
  insertCartItem: () => {},
  removeFromCart: () => {},
  updateCart: () => {},
  totalCartItemCount: 0,
  subTotal: 0,
});

const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  useEffect(() => {
    const str = sessionStorage.getItem("my-cart");
    if (str?.trim()) {
      setCartItems(JSON.parse(str) as Cart[]);
    }
  }, []);

  const insertCartItem = (item: Product) => {
    setCartItems((state) => {
      const existingItem = state.find((i) => i.id === item.id);

      if (existingItem) {
        const cartItem = {
          ...existingItem,
          itemCount: existingItem.itemCount + 1,
        };
        const newCart = state.map((i) => (i.id === cartItem.id ? cartItem : i));

        sessionStorage.setItem("my-cart", JSON.stringify(newCart));
        return newCart;
      } else {
        const cartItem = { ...item, itemCount: 1 };
        sessionStorage.setItem("my-cart", JSON.stringify([...state, cartItem]));
        return [...state, cartItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((state) => {
      const newState = state.filter((s) => s.id !== id);
      sessionStorage.setItem("my-cart", JSON.stringify(newState));
      return newState;
    });
  };

  const updateCart = (item: Cart) => {
    setCartItems((state) => {
      const newState = state.map((s) => (s.id === item.id ? item : s));
      sessionStorage.setItem("my-cart", JSON.stringify(newState));

      return newState;
    });
  };

  const totalCartItemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.itemCount, 0);
  }, [cartItems]);

  const subTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.offerPrice) * item.itemCount,
      0
    );
  }, [cartItems]);

  return (
    <StoreContext.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        selectedCategoryId,
        setSelectedCategoryId,
        cartItems,
        insertCartItem,
        removeFromCart,
        updateCart,
        totalCartItemCount,
        subTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
