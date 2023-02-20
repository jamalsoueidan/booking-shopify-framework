import { Tag } from "@jamalsoueidan/bsb.types.tag";
import {
  InputDropdown,
  InputDropdownProps,
} from "@jamalsoueidan/bsf.components.inputs.input-dropdown";
import { InputDropdownInput } from "@jamalsoueidan/bsf.components.inputs.input-dropdown/input-dropdown";
import { useTag } from "@jamalsoueidan/bsf.hooks.use-tag";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Field } from "@shopify/react-form";
import React, { useMemo } from "react";

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
  input?: InputDropdownInput;
};

export const InputTags = ({ field, input }: InputTagsProps) => {
  const { options } = useTag();
  const { t } = useTranslation({ id: "input-tags", locales });

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
