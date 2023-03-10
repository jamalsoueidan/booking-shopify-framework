import { ApiResponse } from "@jamalsoueidan/backend.types.api";
import {
  WidgetSchedule,
  WidgetServiceAvailabilityProps,
  WidgetServiceGetStaffProps,
  WidgetStaff,
} from "@jamalsoueidan/backend.types.widget";
import { useFetch } from "@jamalsoueidan/frontend.providers.fetch";
import { useQuery } from "react-query";

export const useWidgetStaff = (params: WidgetServiceGetStaffProps) => {
  const { get, mutate } = useFetch();

  const { data } = useQuery<ApiResponse<Array<WidgetStaff>>>({
    enabled: params.productId > 0,
    queryFn: async () => {
      mutate(["widget", "availability"]);
      return get({ params, url: `/widget/staff` });
    },
    queryKey: ["widget", "staff", params],
  });

  return { data: data?.payload };
};

export const useWidgetAvailability = (
  params: WidgetServiceAvailabilityProps,
) => {
  const { get } = useFetch();
  const { data } = useQuery<ApiResponse<Array<WidgetSchedule>>>({
    enabled:
      !!params.staff && !!params.productId && !!params.start && !!params.end,
    queryFn: () => get({ params, url: "/widget/availability" }),
    queryKey: ["widget", "availability", params],
  });

  return { data: data?.payload };
};
