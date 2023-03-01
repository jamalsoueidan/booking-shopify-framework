import { useCallback } from "react";
import { FetchContextOptions } from "./fetch-context";

export const useFetch = () => {
  const put = useCallback(async (options: FetchContextOptions) => options, []);

  const destroy = useCallback(
    async (options: FetchContextOptions) => options,
    [],
  );

  const post = useCallback(async (options: FetchContextOptions) => options, []);

  const get = useCallback(async (options: FetchContextOptions) => options, []);

  return {
    destroy,
    get,
    mutate: (key: unknown) => key,
    post,
    put,
  };
};
