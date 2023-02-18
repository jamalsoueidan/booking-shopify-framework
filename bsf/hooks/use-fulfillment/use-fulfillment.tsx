import { BookingFulfillmentStatus } from "@jamalsoueidan/bsb.types";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { BadgeProps, Icon } from "@shopify/polaris";
import React, { useCallback, useMemo } from "react";

const locales = {
  da: {
    [BookingFulfillmentStatus.BOOKED]: "Bestilt",
    [BookingFulfillmentStatus.CANCELLED]: "Annulleret",
    [BookingFulfillmentStatus.FULFILLED]: "Opfyldt",
    [BookingFulfillmentStatus.REFUNDED]: "Returneret",
    [BookingFulfillmentStatus.DEFAULT]: "-",
  },
  en: {
    [BookingFulfillmentStatus.BOOKED]: "Booked",
    [BookingFulfillmentStatus.CANCELLED]: "Cancelled",
    [BookingFulfillmentStatus.FULFILLED]: "Fulfilled",
    [BookingFulfillmentStatus.REFUNDED]: "Refunded",
    [BookingFulfillmentStatus.DEFAULT]: "-",
  },
};

// attention = yellow
// critial = pink
// success = green
// default = grey
// https://polaris.shopify.com/components/banner
export type FulfillmentBannerStatus =
  | "critical"
  | "success"
  | "attention"
  | "info"
  | Omit<string, "critical" | "success" | "attention" | "info">;

export const FulfillmentOptions: Record<
  BookingFulfillmentStatus,
  { bannerStatus?: BadgeProps["status"]; color: string }
> = {
  [BookingFulfillmentStatus.BOOKED]: {
    bannerStatus: "info",
    color: "a4e8f2",
  },
  [BookingFulfillmentStatus.CANCELLED]: {
    bannerStatus: undefined,
    color: "E4E5E7",
  },
  [BookingFulfillmentStatus.DEFAULT]: {
    bannerStatus: "attention",
    color: "FFEA8A",
  },
  [BookingFulfillmentStatus.FULFILLED]: {
    bannerStatus: "success",
    color: "AEE9D1",
  },
  [BookingFulfillmentStatus.REFUNDED]: {
    bannerStatus: "critical",
    color: "FED3D1",
  },
};

export const useFulfillment = () => {
  const { t } = useTranslation({ id: "use-fulfillment", locales });

  const prefix = useCallback(
    (option: BookingFulfillmentStatus) => (
      <Icon
        source={`<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><circle cx='10' cy='10' r='10' fill='%23${FulfillmentOptions[option].color}' /></svg>`}
      />
    ),
    [],
  );

  const options = useMemo(
    () =>
      Object.values(BookingFulfillmentStatus).map(
        (value: BookingFulfillmentStatus) => ({
          label: t(value),
          prefix: prefix(value),
          value,
        }),
      ),
    [prefix, t],
  );

  const selectFulfillment = useCallback(
    (value: BookingFulfillmentStatus) => options.find((o) => o.value === value),
    [options],
  );

  const selectFulfillmentValue = useCallback(
    (value: BookingFulfillmentStatus) =>
      options.find((o) => o.value === value)?.value,
    [options],
  );

  const selectFulfillmentLabel = useCallback(
    (value: BookingFulfillmentStatus) =>
      options.find((o) => o.value === value)?.label,
    [options],
  );

  const selectFulfillmentBannerStatus = useCallback(
    (value: BookingFulfillmentStatus): BadgeProps["status"] =>
      FulfillmentOptions[value].bannerStatus || "info",
    [],
  );

  const selectFulfillmentColor = useCallback(
    (value: BookingFulfillmentStatus) => `#${FulfillmentOptions[value].color}`,
    [],
  );

  return {
    options,
    selectFulfillment,
    selectFulfillmentBannerStatus,
    selectFulfillmentColor,
    selectFulfillmentLabel,
    selectFulfillmentValue,
  };
};
