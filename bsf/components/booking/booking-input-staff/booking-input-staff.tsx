import { Staff } from "@jamalsoueidan/bsb.types.staff";
import {
  InputDropdown,
  InputDropdownInput,
} from "@jamalsoueidan/bsf.components.inputs.input-dropdown";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Avatar } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { useCallback, useMemo } from "react";

export type BookingInputStaffField = Staff | undefined;

export interface BookingInputStaffProps {
  data?: Array<Staff>;
  field: Field<BookingInputStaffField>;
  input?: InputDropdownInput;
}

export function BookingInputStaff({
  data,
  field,
  input,
}: BookingInputStaffProps) {
  const { t } = useTranslation({ id: "input-staff", locales });

  const prefix = useCallback(
    (staff: Staff) => (
      <Avatar size="small" source={staff?.avatar} name={staff?.fullname} />
    ),
    [],
  );

  const options = useMemo(
    () =>
      data?.map((d) => ({
        label: d.fullname,
        prefix: prefix(d),
        value: d._id,
      })),
    [data, prefix],
  );

  const onChange = useCallback(
    (value: string) => {
      field.onChange(data?.find((option) => option._id === value));
    },
    [data, field],
  );

  const selected = useMemo(
    () => options?.find((option) => option.value === field.value?._id),
    [field.value, options],
  );

  return (
    <InputDropdown
      input={{ label: t("label"), placeholder: t("placeholder"), ...input }}
      options={options}
      selected={selected}
      error={field.error}
      onChange={onChange}
    />
  );
}

const locales = {
  da: {
    label: "Vælg medarbejder",
    placeholder: "Vælg medarbejder",
  },
  en: {
    label: "Choose staff",
    placeholder: "Choose staff",
  },
};
