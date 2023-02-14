import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { useCallback, useMemo } from "react";

const locales = {
  da: {
    all: "Alle dage",
    end: "Slutning af ugen",
    everyday: "Hverdag",
    middle: "Midten af ugen",
    start: "Starten af ugen",
    weekend: "Weekend",
  },
  en: {
    all: "All days",
    end: "End of the week",
    everyday: "Everyday",
    middle: "Middel of the week",
    start: "Start of the week",
    weekend: "Weekend",
  },
};

export type TagText = keyof typeof locales.da;

export const TagTypesValues = {
  all: "#d24e01",
  end: "#2980B9",
  everyday: "#4b6043",
  middle: "#A93226",
  start: "#8E44AD",
  weekend: "#235284",
} as const;

export type TagColors = typeof TagTypesValues[TagText];

interface UseTag {
  label: string;
  value: TagColors;
}

export interface UseTagReturn {
  options: UseTag[];
  selectTag: (value: TagColors) => string;
}

export const useTag = (): UseTagReturn => {
  const { t } = useTranslation({ id: "tags", locales });

  const options: UseTag[] = useMemo(
    () => [
      { label: t("everyday"), value: TagTypesValues.everyday },
      { label: t("weekend"), value: TagTypesValues.weekend },
      { label: t("all"), value: TagTypesValues.all },
      { label: t("end"), value: TagTypesValues.end },
      { label: t("start"), value: TagTypesValues.start },
      { label: t("middle"), value: TagTypesValues.middle },
    ],
    [t],
  );

  const selectTag = useCallback(
    (value: TagColors) =>
      options.find((o) => o.value === value)?.label || "no found",
    [options],
  );

  return {
    options,
    selectTag,
  };
};
