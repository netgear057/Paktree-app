import { createContext, useContext, useState, useEffect } from "react";

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const key = "favourites";

  const readFavourites = () => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  };

  const [favourites, setFavourites] = useState(readFavourites);

  const save = (items) => {
    setFavourites(items);
    localStorage.setItem(key, JSON.stringify(items));
  };

  const toggleFavourite = (item) => {
    setFavourites((prev) => {
      const exists = prev.some((fav) => fav._id === item._id);
      const updated = exists
        ? prev.filter((fav) => fav._id !== item._id)
        : [...prev, item];
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavourite = (_id) => favourites.some((fav) => fav._id === _id);

  // Optional: sync across tabs
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === key) {
        setFavourites(readFavourites());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

// Hook for easy usage
export function useLocalFavourites() {
  return useContext(FavouritesContext);
}
