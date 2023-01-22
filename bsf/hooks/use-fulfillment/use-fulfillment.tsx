import { useCallback, useMemo } from "react";

export type FulfillmentStatus =
  | "cancelled"
  | "refunded"
  | "fulfilled"
  | "booked";

//attention = yellow
//critial = pink
//success = green
//default = grey
// https://polaris.shopify.com/components/banner
export type FulfillmentBannerStatus =
  | "critical"
  | "success"
  | "attention"
  | "info";

interface UseFulfillmentOptions {
  label: FulfillmentStatus | undefined;
  color: string;
  bannerStatus: FulfillmentBannerStatus | undefined;
}

export const useFulfillment = () => {
  const options = useMemo<Array<UseFulfillmentOptions>>(
    () => [
      {
        label: "cancelled",
        color: "#E4E5E7",
        bannerStatus: undefined,
      },
      {
        label: "fulfilled",
        color: "#AEE9D1",
        bannerStatus: "success",
      },
      {
        label: "refunded",
        color: "#FED3D1",
        bannerStatus: "critical",
      },
      {
        label: "booked",
        color: "#a4e8f2",
        bannerStatus: "info",
      },
      // when the booking is just created, it's undefined
      { label: undefined, color: "#FFEA8A", bannerStatus: "attention" },
    ],
    []
  );

  const getColor = useCallback(
    (label: FulfillmentStatus | undefined) => {
      return options.find((o) => o.label === label)?.color;
    },
    [options]
  );

  return {
    options,
    getColor,
  };
};
