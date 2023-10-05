import { createContext, useContext, useState } from "react";

const SelectedCategory = createContext();

function SelectedCategoryProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <SelectedCategory.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      {children}
    </SelectedCategory.Provider>
  );
}

function useSelectedCategory() {
  const context = useContext(SelectedCategory);
  if (context === undefined)
    throw new Error("used outside of SelectedCategoryProvider");
  return context;
}

export { SelectedCategoryProvider, useSelectedCategory };
