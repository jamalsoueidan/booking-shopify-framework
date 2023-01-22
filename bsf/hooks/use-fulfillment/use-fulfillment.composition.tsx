import React from "react";
import { useFulfillment } from "./use-fulfillment";

export const BasicuseFulfillment = () => {
  const { getColor } = useFulfillment();

  return <>{getColor("booked")}</>;
};
