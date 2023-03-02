import { PreviwApplication } from "@jamalsoueidan/bit-dev.preview.application";
import { useField } from "@shopify/react-form";
import React from "react";
import { InputTimeZone } from "./input-time-zone";

export const BasicTimeZoneInput = () => {
  const field = useField("");
  return (
    <PreviwApplication>
      <InputTimeZone {...field} />
    </PreviwApplication>
  );
};

export const PreSelectTimeZoneInput = () => {
  const field = useField("Europe/Istanbul");
  return (
    <PreviwApplication>
      <InputTimeZone {...field} />
    </PreviwApplication>
  );
};
