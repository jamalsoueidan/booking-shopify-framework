import {
  FetchContext,
  FetchContextType,
} from "@jamalsoueidan/bsf.providers.fetch";
import { useContext } from "react";

export function useFetch() {
  const context = useContext<FetchContextType>(FetchContext);
  if (context === undefined) {
    throw new Error("useFetch must be used within a FetchProvider");
  }

  return context;
}
