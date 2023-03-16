/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUrl } from "@jamalsoueidan/frontend.hooks.use-url";
import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useQueryClient } from "react-query";

const shop = "testeriphone.myshopify.com";

export type Options = {
  url: string;
  params?: Record<string, number | Date | undefined>;
  body?: unknown;
};

export const useFetch = () => {
  const queryClient = useQueryClient();
  const { createURL } = useUrl(
    "https://booking-external-development.herokuapp.com/api/",
    { shop },
  );

  const getHeaders = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return {
        headers: {},
      };
    }
    return {};
  }, []);

  const put = useCallback(
    async (options: Options) => {
      const response = await axios.put(
        createURL(options),
        options.body,
        getHeaders(),
      );
      return response.data;
    },
    [createURL, getHeaders],
  );

  const destroy = useCallback(
    async (options: Options) => {
      const response = await axios.delete(createURL(options), getHeaders());
      return response.data;
    },
    [createURL, getHeaders],
  );

  const post = useCallback(
    async <T,>(options: Options): Promise<T> => {
      try {
        const response = await axios.post<unknown, AxiosResponse<T>>(
          createURL(options),
          options.body,
          getHeaders(),
        );
        return response?.data;
      } catch (error: any) {
        return error.response.data;
      }
    },
    [createURL, getHeaders],
  );

  const get = useCallback(
    async <T = never,>(options: Options): Promise<T> => {
      try {
        const response = await axios.get<never, AxiosResponse<T>>(
          createURL(options),
          getHeaders(),
        );
        return response.data;
      } catch (error: any) {
        return error.response.data;
      }
    },
    [createURL, getHeaders],
  );

  return {
    destroy,
    get,
    mutate: (key: any) => queryClient.invalidateQueries(key),
    post,
    put,
  };
};
