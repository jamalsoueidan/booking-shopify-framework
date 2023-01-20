import {
  RegisterOptions,
  TranslationDictionary,
  useI18n,
} from "@shopify/react-i18n";
import { useCallback, useMemo } from "react";

// https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? `${Key}.${keyof ObjectType[Key] & string}`
    : `${Key}`;
}[keyof ObjectType & string];

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
    fallback: locales.da as any,
    translations: (locale: string) =>
      locale === "da" ? locales.da : (locales.en as any),
  });

  const t = useCallback(
    (id: NestedKeyOf<T>, replacements?: any) => {
      return i18n.translate(id, replacements);
    },
    [i18n]
  );

  const locale = useMemo(() => i18n.locale, [i18n]);

  return { t, locale };
};
