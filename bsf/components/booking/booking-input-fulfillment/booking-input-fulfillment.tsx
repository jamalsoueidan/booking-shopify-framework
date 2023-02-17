import { BookingFulfillmentStatus, Tag } from "@jamalsoueidan/bsb.types";
import {
  InputDropdown,
  InputDropdownProps,
} from "@jamalsoueidan/bsf.components.inputs.input-dropdown";
import { InputDropdownInput } from "@jamalsoueidan/bsf.components.inputs.input-dropdown/input-dropdown";
import { useFulfillment } from "@jamalsoueidan/bsf.hooks.use-fulfillment";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
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
  const { t } = useTranslation({ id: "tag-input", locales });

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
      onChange={field.onChange}
    />
  );
};
