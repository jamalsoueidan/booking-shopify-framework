import { SaveBarContext } from "@jamalsoueidan/frontend.providers.save-bar";
import { useContext } from "react";

export const useSaveBar = () => {
  const context = useContext(SaveBarContext);
  if (context === undefined) {
    throw new Error("useSaveBar must be used within a SaveBarProvider");
  }

  return context;
};
