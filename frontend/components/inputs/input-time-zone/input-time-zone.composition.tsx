import { withApplicationCard } from "@jamalsoueidan/bit-dev.preview.with-application";
import { useField } from "@shopify/react-form";
import React from "react";
import { InputTimeZone } from "./input-time-zone";

export const BasicTimeZoneInput = withApplicationCard(() => {
  const field = useField("");
  return <InputTimeZone {...field} />;
});

export const PreSelectTimeZoneInput = withApplicationCard(() => {
  const field = useField("Europe/Istanbul");
  return <InputTimeZone {...field} />;
});
