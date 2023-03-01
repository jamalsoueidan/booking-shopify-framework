/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";

export type UseURLOptions = {
  url: string;
  params?: Record<string, any>;
  body?: unknown;
};

export function useUrl(
  defaultURI: string,
  defaultParams?: Record<string, any>,
) {
  const buildParams = useCallback((params: Record<string, any>) => {
    const p: Array<string> = [];
    const keys = Object.keys(params);
    keys.forEach((param) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = params[param];
      if (typeof value === "object") {
        p.push(`${param}=${value.toJSON()}`);
      } else {
        p.push(`${param}=${value}`);
      }
    });
    return p;
  }, []);

  const createURL = useCallback(
    (options: UseURLOptions) => {
      let params: Array<string> = [];
      if (options?.params) {
        params = params.concat(buildParams(options.params));
      }

      if (defaultParams) {
        params = params.concat(buildParams(defaultParams));
      }

      let url = defaultURI + options.url;
      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }
      return url;
    },
    [defaultParams, defaultURI, buildParams],
  );

  return {
    createURL,
  };
}
