import { ApiResponse } from "@jamalsoueidan/backend.types.api";
import {
  Booking,
  BookingServiceCreateProps,
  BookingServiceGetAllProps,
  BookingServiceUpdateProps,
} from "@jamalsoueidan/backend.types.booking";
import { useFetch } from "@jamalsoueidan/frontend.providers.fetch";
import { useCallback } from "react";
import { useQuery } from "react-query";

export const useBookings = (
  params: Omit<BookingServiceGetAllProps, "staff"> & { staff?: string },
) => {
  const { get } = useFetch();

  const { data, isLoading } = useQuery<ApiResponse<Array<Booking>>>({
    enabled: !!params.start && !!params.end,
    queryFn: () => get({ params, url: "bookings" }),
    queryKey: ["/bookings", params],
  });

  return {
    data: data?.payload,
    isLoading,
  };
};

interface UseBookingGetProps {
  id: string;
}

export const useBookingGet = ({ id }: UseBookingGetProps) => {
  const { get } = useFetch();

  const { data } = useQuery<ApiResponse<Booking>>({
    queryFn: () => get({ url: `/bookings/${id}` }),
    queryKey: ["booking", id],
  });

  return {
    data: data?.payload,
  };
};

export const useBookingUpdate = ({
  id,
}: {
  id: BookingServiceUpdateProps["query"]["_id"];
}) => {
  const { put, mutate } = useFetch();

  const update = useCallback(
    async (body: BookingServiceUpdateProps["body"]) => {
      await put({ body, url: `/bookings/${id}` });
      await mutate(["bookings"]);
      await mutate(["booking", id]);
      await mutate(["widget", "availability"]);
    },
    [put, id, mutate],
  );

  return {
    update,
  };
};

export const useBookingCreate = () => {
  const { post, mutate } = useFetch();

  const create = useCallback(
    async (body: BookingServiceCreateProps) => {
      await post({ body, url: "/bookings" });
      await mutate(["bookings"]);
      await mutate(["widget", "availability"]);
    },
    [post, mutate],
  );

  return {
    create,
  };
};
