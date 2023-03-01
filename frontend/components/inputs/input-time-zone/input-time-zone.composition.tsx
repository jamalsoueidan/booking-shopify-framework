import { ApplicationFramePage } from "@jamalsoueidan/bit-dev.preview.application";
import { useField } from "@shopify/react-form";
import React from "react";
import { InputTimeZone } from "./input-time-zone";

export const BasicTimeZoneInput = () => {
  const field = useField("");
  return (
    <ApplicationFramePage>
      <InputTimeZone {...field} />
    </ApplicationFramePage>
  );
};

export const PreSelectTimeZoneInput = () => {
  const field = useField("Europe/Istanbul");
  return (
    <ApplicationFramePage>
      <InputTimeZone {...field} />
    </ApplicationFramePage>
  );
};
