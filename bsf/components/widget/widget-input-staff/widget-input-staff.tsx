import { WidgetStaff } from "@jamalsoueidan/bsb.types";
import {
  InputDropdown,
  InputDropdownInput,
} from "@jamalsoueidan/bsf.components.inputs.input-dropdown";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Avatar } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { useCallback, useMemo } from "react";

export type WidgetInputStaffField = WidgetStaff | undefined;

export interface WidgetInputStaffProps {
  data?: Array<WidgetStaff>;
  field: Field<WidgetInputStaffField>;
  input?: InputDropdownInput;
}

export function WidgetInputStaff({
  data,
  field,
  input,
}: WidgetInputStaffProps) {
  const { t } = useTranslation({ id: "input-staff", locales });

  const prefix = useCallback(
    (staff: WidgetStaff) => (
      <Avatar size="small" source={staff?.avatar} name={staff?.fullname} />
    ),
    [],
  );

  const options = useMemo(
    () =>
      data?.map((d) => ({
        label: d.fullname,
        prefix: prefix(d),
        value: d.staff,
      })),
    [data, prefix],
  );

  const onChange = useCallback(
    (value: string) => {
      field.onChange(data?.find((option) => option.staff === value));
    },
    [data, field],
  );

  const selected = useMemo(
    () => options?.find((option) => option.value === field.value?.staff),
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
