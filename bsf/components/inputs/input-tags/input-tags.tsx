import { useTag } from "@jamalsoueidan/bsf.hooks.use-tag";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Select, SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React from "react";

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

export type InputTagsField = string;
export type InputTagsInput = SelectProps;
export interface InputTagsProps {
  field: Field<InputTagsField>;
  input?: InputTagsInput;
}

export const InputTags = ({ field, input }: InputTagsProps) => {
  const { options } = useTag();
  const { t } = useTranslation({ id: "tag-input", locales });

  return <Select label={t("label")} placeholder={t("placeholder")} options={options} {...field} {...input} />;
};
