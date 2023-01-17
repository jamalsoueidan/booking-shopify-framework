import React from "react";
import {
  RegisterOptions,
  TranslationDictionary,
  useI18n,
} from "@shopify/react-i18n";
import { useCallback } from "react";

export interface useTranslationProps extends Partial<RegisterOptions> {
  id: string;
  locales: TranslationDictionary[];
}

export const useTranslation = ({
  id,
  locales,
  ...rest
}: useTranslationProps) => {
  const [i18n] = useI18n({
    id: id,
    fallback: locales[0],
    translations(locale) {
      if (locale === "da") {
        return locales[0] as any;
      } else {
        return locales[1] as any;
      }
    },
    ...rest,
  });

  const t = useCallback(
    (value: string) => {
      return i18n.translate(value);
    },
    [i18n]
  );

  return {
    t,
    i18n,
  };
};
