import { useContext } from "react";
import { FetchContext, FetchContextType } from "./fetch-context";

export function useFetch() {
  const context = useContext<FetchContextType>(FetchContext);
  if (context === undefined) {
    throw new Error("useFetch must be used within a FetchProvider");
  }

  return context;
}
