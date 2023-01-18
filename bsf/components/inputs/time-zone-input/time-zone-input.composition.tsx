import React from "react";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { TimeZoneInput } from "./time-zone-input";
import { useField } from "@shopify/react-form";

export const BasicTimeZoneInput = () => {
  const field = useField("");
  return (
    <ApplicationFramePage>
      <TimeZoneInput {...field} />
    </ApplicationFramePage>
  );
};

export const PreSelectTimeZoneInput = () => {
  const field = useField("Europe/Istanbul");
  return (
    <ApplicationFramePage>
      <TimeZoneInput {...field} />
    </ApplicationFramePage>
  );
};
