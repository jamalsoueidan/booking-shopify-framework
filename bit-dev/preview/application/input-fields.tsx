import { StaffRole } from "@jamalsoueidan/backend.types.staff";
import { InputLanguage } from "@jamalsoueidan/frontend.components.inputs.input-language";
import { InputTimeZone } from "@jamalsoueidan/frontend.components.inputs.input-time-zone";
import { useSettings } from "@jamalsoueidan/frontend.providers.settings";
import { Select } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { Field, useField } from "@shopify/react-form";
import React, { useEffect, useMemo } from "react";

export const TimeZone = () => {
  const { update, timeZone } = useSettings();
  const field = useField(timeZone);

  useEffect(() => {
    update({ timeZone: field.value });
  }, [update, field.value]);

  return <InputTimeZone {...field} />;
};

export const Language = () => {
  const { language, update } = useSettings();
  const field = useField(language);

  useEffect(() => {
    update({ language: field.value });
  }, [update, field.value]);

  return <InputLanguage {...field} />;
};

export const UserRole = ({ field }: { field: Field<StaffRole> }) => {
  const roleOptions = useMemo(
    () =>
      Object.entries(StaffRole)
        .filter(([, value]) => !Number.isNaN(Number(value)))
        .map(([label, value]) => ({
          label,
          value: value.toString(),
        })),
    [],
  );

  return (
    <Select
      label="Role"
      options={roleOptions}
      value={field.value.toString()}
      onChange={(value) => field.onChange(parseInt(value, 10))}
    />
  );
};
