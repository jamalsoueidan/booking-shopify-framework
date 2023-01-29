import { RegisterOptions, TranslationDictionary, useI18n } from "@shopify/react-i18n";
import { useCallback, useMemo } from "react";

// https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? `${Key}.${keyof ObjectType[Key] & string}`
    : `${Key}`;
}[keyof ObjectType & string];

export interface UseTranslationProps<T> extends Partial<RegisterOptions> {
  id: string;
  locales: { da: T; en: TranslationDictionary };
}

export const useTranslation = <T extends object>({ id, locales }: UseTranslationProps<T>) => {
  const [i18n] = useI18n({
    fallback: locales.da as TranslationDictionary,
    id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translations: (locale: string) => (locale === "da" ? locales.da : locales.en) as any,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = useCallback((id: NestedKeyOf<T>, replacements?: any) => i18n.translate(id, replacements), [i18n]);

  const locale = useMemo(() => i18n.locale, [i18n]);

  return { locale, t };
};
