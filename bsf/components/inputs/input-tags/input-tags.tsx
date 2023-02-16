import { Tag } from "@jamalsoueidan/bsb.types";
import {
  InputDropdown,
  InputDropdownProps,
} from "@jamalsoueidan/bsf.components.inputs.input-dropdown";
import { InputDropdownOption } from "@jamalsoueidan/bsf.components.inputs.input-dropdown/input-dropdown";
import { TagColors, useTag } from "@jamalsoueidan/bsf.hooks.use-tag";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Icon } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { useCallback, useMemo } from "react";

const locales = {
  da: {
    label: "Tag",
    placeholder: "Vælge tag",
  },
  en: {
    label: "Tag",
    placeholder: "Choose tag",
  },
};

export type InputTagsField = Tag | undefined;
export type InputTagsProps = Pick<InputDropdownProps<Tag>, "options"> & {
  field: Field<InputTagsField>;
};

export const InputTags = ({ field }: InputTagsProps) => {
  const { options: data } = useTag();
  const { t } = useTranslation({ id: "tag-input", locales });

  const prefix = useCallback(
    (value: Tag) => (
      <Icon
        source={`<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><circle cx='10' cy='10' r='10' fill='%23${TagColors[value]}' /></svg>`}
        color="success"
      />
    ),
    [],
  );

  const options: Array<InputDropdownOption<Tag>> = useMemo(
    () =>
      data.map((d) => ({
        prefix: prefix(d.value),
        ...d,
      })),
    [data, prefix],
  );

  const selected = useMemo(
    () => options.find((option) => option.value === field.value),
    [field.value, options],
  );

  return (
    <InputDropdown
      input={{ label: t("label"), placeholder: t("placeholder") }}
      options={options}
      selected={selected}
      error={field.error}
      onChange={field.onChange}
    />
  );
};
