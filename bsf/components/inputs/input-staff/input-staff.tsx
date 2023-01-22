import React, { ReactNode } from "react";

import { WidgetStaff } from "@jamalsoueidan/bsb.mongodb.types";
import { Select, SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { useMemo } from "react";

export interface InputStaffProps
  extends Field<string>,
    Partial<Omit<SelectProps, "onChange" | "error" | "onBlur" | "value">> {
  data: WidgetStaff[];
  optionLabel?: string;
}

export const InputStaff = ({
  data,
  optionLabel,
  ...field
}: InputStaffProps) => {
  const defaultOption = {
    key: optionLabel || "",
    label: optionLabel || "",
    value: "",
  } as any;

  const fieldOptions = useMemo(
    () =>
      data
        ?.map((o) => ({
          key: o.staff,
          label: o.fullname,
          value: o.staff,
        }))
        .concat(optionLabel ? [defaultOption] : [])
        .sort(sortByName) || [],

    [data]
  );

  return (
    <Select
      label="Vælg medarbejder"
      disabled={fieldOptions.length === 1}
      {...field}
      options={fieldOptions}
    />
  );
};

const sortByName = (a: any, b: any) => {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
};
