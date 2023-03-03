/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  RegisterOptions,
  TranslationDictionary,
  useI18n,
} from "@shopify/react-i18n";
import { ComplexReplacementDictionary } from "@shopify/react-i18n/build/ts/types";

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

export const useTranslation = <T extends object>({
  id,
  locales,
}: UseTranslationProps<T>) => {
  const [i18n] = useI18n({
    fallback: locales.da as TranslationDictionary,
    id,
    translations: (locale: string) =>
      (locale === "da" ? locales.da : locales.en) as any,
  });

  const t = useCallback(
    (id: NestedKeyOf<T>, replacements?: any) =>
      i18n.translate(id, replacements),
    [i18n],
  );

  /*
   * dynamic value
   * const test = 'a'
   * d(test);
   */
  const tdynamic = useCallback(
    (
      id: NestedKeyOf<T> | Omit<string, NestedKeyOf<T>>,
      replacements?: ComplexReplacementDictionary,
    ) => {
      if (replacements?.count === 0) {
        return i18n.translate(`${id}.zero`, replacements);
      }
      return i18n.translate(id as any, replacements);
    },
    [i18n],
  );

  const locale = useMemo(() => i18n.locale, [i18n]);

  return { locale, t, tdynamic };
};
