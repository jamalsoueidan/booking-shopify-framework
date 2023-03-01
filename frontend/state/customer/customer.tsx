import { ApiResponse } from "@jamalsoueidan/backend.types.api";
import { CustomerQuery } from "@jamalsoueidan/backend.types.customer";
import { useFetch } from "@jamalsoueidan/frontend.providers.fetch";

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
