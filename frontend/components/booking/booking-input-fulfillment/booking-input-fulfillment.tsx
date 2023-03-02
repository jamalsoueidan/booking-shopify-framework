import { BookingFulfillmentStatus } from "@jamalsoueidan/backend.types.booking";
import { Tag } from "@jamalsoueidan/backend.types.tag";
import {
  InputDropdown,
  InputDropdownProps,
} from "@jamalsoueidan/frontend.components.inputs.input-dropdown";
import { InputDropdownInput } from "@jamalsoueidan/frontend.components.inputs.input-dropdown/input-dropdown";
import { useFulfillment } from "@jamalsoueidan/frontend.hooks.use-fulfillment";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { Field } from "@shopify/react-form";
import React, { useMemo } from "react";

const locales = {
  da: {
    label: "Status",
    placeholder: "Vælge status",
  },
  en: {
    label: "Status",
    placeholder: "Choose status",
  },
};

export type BookingInputFulfillmentField = BookingFulfillmentStatus | undefined;
export type BookingInputFulfillmentProps = Pick<
  InputDropdownProps<Tag>,
  "options"
> & {
  field: Field<BookingInputFulfillmentField>;
  input?: InputDropdownInput;
};

export const BookingInputFulfillment = ({
  field,
  input,
}: BookingInputFulfillmentProps) => {
  const { options } = useFulfillment();
  const { t } = useTranslation({ id: "booking-tag-input", locales });

  const selected = useMemo(
    () => options.find((option) => option.value === field.value),
    [field.value, options],
  );

  return (
    <InputDropdown
      input={{ label: t("label"), placeholder: t("placeholder"), ...input }}
      options={options}
      selected={selected}
      error={field.error}
      onChange={(item) => field.onChange(item)}
    />
  );
};
