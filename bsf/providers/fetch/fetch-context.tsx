import { createContext } from "react";

export type FetchContextOptions = {
  url: string;
  params?: Record<string, string | number | Date | undefined>;
  body?: unknown;
};

export type FetchContextType = {
  destroy: <T>(options: FetchContextOptions) => Promise<T>;
  get: <T>(options: FetchContextOptions) => Promise<T>;
  mutate: (key: unknown) => void;
  post: <T>(options: FetchContextOptions) => Promise<T>;
  put: <T>(options: FetchContextOptions) => Promise<T>;
};

export const FetchContext = createContext<FetchContextType>({} as never);
