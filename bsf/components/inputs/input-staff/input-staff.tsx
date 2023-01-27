import { WidgetStaff } from "@jamalsoueidan/bsb.mongodb.types";
import { Text } from "@jamalsoueidan/bsf.helpers.text";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Select, SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { useMemo } from 'react';

export interface InputStaffProps {
  data?: WidgetStaff[];
  field: Field<string>;
  input?: Partial<Omit<SelectProps, "onChange" | "error" | "onBlur" | "value">>;
}

export const InputStaff = ({ data, input, field }: InputStaffProps) => {
  const { t } = useTranslation({ id: "input-staff", locales });
  const fieldOptions = useMemo(
    () =>
      data
        ?.map((o) => ({
          key: o.staff,
          label: o.fullname,
          value: o.staff,
        }))
        .sort(Text.soryByTextKey("label")) || [],

    [data],
  );

  return (
    <Select label={t("label")} disabled={fieldOptions.length === 0} options={fieldOptions} {...input} {...field} />
  );
};

const locales = {
  da: {
    label: "Vælg medarbejder",
  },
  en: {
    label: "Choose staff",
  },
};
