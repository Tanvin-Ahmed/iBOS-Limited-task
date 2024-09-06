import { Category, Product } from "@/types";
import { createContext, ReactNode, useState } from "react";

// Define the structure of the AuthContext
type StoreContextType = {
  categories: Category[];
  products: Product[];
  selectedCategoryId: string;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
};

// Create the default context with dummy values (will be overwritten by provider)
export const StoreContext = createContext<StoreContextType>({
  categories: [],
  products: [],
  selectedCategoryId: "",
  setCategories: () => {},
  setProducts: () => {},
  setSelectedCategoryId: () => {},
});

const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  return (
    <StoreContext.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        selectedCategoryId,
        setSelectedCategoryId,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
