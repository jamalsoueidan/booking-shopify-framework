import { ApiResponse } from "@jamalsoueidan/bsb.types.api";
import { CustomerQuery } from "@jamalsoueidan/bsb.types.customer";
import { useFetch } from "@jamalsoueidan/bsf.hooks.use-fetch";

export const useCustomer = () => {
  const { get } = useFetch();

  return {
    find: async (name: string) => {
      const response: ApiResponse<Array<CustomerQuery>> = await get({
        params: { name },
        url: `/customers`,
      });
      return response.payload;
    },
  };
};
