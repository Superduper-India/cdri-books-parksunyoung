import { useContext } from "react";
import { FavoriteContext } from "@/app/_contexts/FavoriteContext";

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
}
