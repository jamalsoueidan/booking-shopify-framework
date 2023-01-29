import { WithTimerFieldType, WithTimerProps, withTimer } from "@jamalsoueidan/bsf.hocs.with-timer";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Select } from "@shopify/polaris";
import React from "react";

export type InputTimerDropFieldType = WithTimerFieldType;
export type InputTimerDropProps = WithTimerProps;

export const InputTimerDrop = withTimer(({ input, field }) => {
  const { t } = useTranslation({
    id: "input-timer-select",
    locales,
  });

  return (
    <Select
      label={input?.label || t("label")}
      disabled={input && input?.options?.length === 0}
      {...input}
      value={field.value?.start}
    />
  );
});

const locales = {
  da: {
    label: "Vælg tid",
  },
  en: {
    label: "Choose time",
  },
};
