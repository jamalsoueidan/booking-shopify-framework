import { WidgetStaff } from "@jamalsoueidan/bsb.mongodb.types";
import { Text } from "@jamalsoueidan/bsf.helpers.text";
import { usePrevious } from "@jamalsoueidan/bsf.hooks.use-previous";
import { Select, SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { useMemo } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

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
        .sort(Text.soryByTextKey("label")) || [],

    [data]
  );

  const dispatchOnChangeNoOptionLabel = useCallback(() => {
    if (optionLabel || !fieldOptions) {
      return;
    }

    if (fieldOptions?.length > 0 && !field.value) {
      const option = fieldOptions[0] as any;
      field.onChange(option.value);
    }
  }, [optionLabel, fieldOptions, field.value, field.onChange]);

  useEffect(dispatchOnChangeNoOptionLabel, []);
  useEffect(dispatchOnChangeNoOptionLabel, [fieldOptions]);

  return (
    <Select
      label="Vælg medarbejder"
      disabled={fieldOptions.length === 0}
      {...field}
      options={fieldOptions}
    />
  );
};
