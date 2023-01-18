import {
  RegisterOptions,
  TranslationDictionary,
  useI18n,
} from "@shopify/react-i18n";
import { useCallback } from "react";

export interface useTranslationProps extends Partial<RegisterOptions> {
  id: string;
  locales: { da: TranslationDictionary; en: TranslationDictionary };
}

export const useTranslation = ({ id, locales }: useTranslationProps) => {
  const [i18n] = useI18n({
    id: id,
    fallback: locales.da,
    translations(locale: string) {
      return locale === "da" ? locales.da : locales.en;
    },
  });

  const t = useCallback(
    (id: string, replacements?: any) => {
      return i18n.translate(id, replacements);
    },
    [i18n]
  );

  return { t };
};
