import { ApiResponse } from "@jamalsoueidan/backend.types.api";
import {
  Staff,
  StaffBodyCreate,
  StaffBodyUpdate,
} from "@jamalsoueidan/backend.types.staff";
import { useFetch } from "@jamalsoueidan/frontend.providers.fetch";
import { useCallback } from "react";
import { useQuery } from "react-query";

export const useStaff = () => {
  const { get } = useFetch();

  const { data } = useQuery<ApiResponse<Array<Staff>>>({
    queryFn: () => get({ url: "/staff" }),
    queryKey: ["staff"],
  });

  return { data: data?.payload };
};

interface UseStaffGetProps {
  userId: string;
}

export const useStaffGet = ({ userId }: UseStaffGetProps) => {
  const { get } = useFetch();

  const { data } = useQuery({
    enabled: !!userId,
    queryFn: () => get<ApiResponse<Staff>>({ url: `/staff/${userId}` }),
    queryKey: ["staff", userId],
  });

  return {
    data: data?.payload,
  };
};

type UseStaffCreateFetch = (
  body: StaffBodyCreate,
) => Promise<ApiResponse<Staff>>;

export const useStaffCreate = () => {
  const { post, mutate } = useFetch();

  const create: UseStaffCreateFetch = useCallback(
    async (body) => {
      const response: ApiResponse<Staff> = await post({
        body,
        url: "/staff",
      });
      await mutate(["staff"]);
      return response;
    },
    [post, mutate],
  );

  return {
    create,
  };
};

interface UseStaffUpdateProps {
  userId: string;
}

type UseStaffUpdateFetch = (
  body: StaffBodyUpdate,
) => Promise<ApiResponse<Staff>>;

export const useStaffUpdate = ({ userId }: UseStaffUpdateProps) => {
  const { put, mutate } = useFetch();

  const update: UseStaffUpdateFetch = useCallback(
    async (body) => {
      const response: ApiResponse<Staff> = await put({
        body,
        url: `/staff/${userId}`,
      });
      await mutate(["staff"]);
      return response;
    },
    [put, userId, mutate],
  );

  return {
    update,
  };
};
