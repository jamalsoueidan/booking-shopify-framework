import {
  RegisterOptions,
  TranslationDictionary,
  useI18n,
} from "@shopify/react-i18n";
import { useCallback } from "react";

// https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export interface useTranslationProps<T> extends Partial<RegisterOptions> {
  id: string;
  locales: { da: T; en: TranslationDictionary };
}

export const useTranslation = <T extends object>({
  id,
  locales,
}: useTranslationProps<T>) => {
  const [i18n] = useI18n({
    id: id,
    fallback: locales.da,
    translations: (locale: string) =>
      locale === "da" ? locales.da : locales.en,
  });

  const t = useCallback(
    (id: NestedKeyOf<T>, replacements?: any) => {
      return i18n.translate(id, replacements);
    },
    [i18n]
  );

  return { t };
};
