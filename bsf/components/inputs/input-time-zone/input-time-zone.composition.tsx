import React from "react";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { InputTimeZone } from "./input-time-zone";
import { useField } from "@shopify/react-form";

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
