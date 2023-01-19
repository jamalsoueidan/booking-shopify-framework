import { useCallback, useMemo } from "react";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";

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

type TagTypes = { [t in TagText]: string };

export const TagTypes = {
  everyday: "#4b6043",
  weekend: "#235284",
  all: "#d24e01",
  end: "#2980B9",
  start: "#8E44AD",
  middle: "#A93226",
} as const;

export type TagColors = typeof TagTypes[TagText];

interface UseTag {
  label: string;
  value: TagColors;
}

export interface UseTagReturn {
  options: UseTag[];
  select: (value: TagColors) => string;
}

export const useTag = (): UseTagReturn => {
  const { t } = useTranslation({ id: "tags", locales });

  const options: UseTag[] = useMemo(
    () => [
      { label: t("everyday"), value: TagTypes.everyday },
      { label: t("weekend"), value: TagTypes.weekend },
      { label: t("all"), value: TagTypes.all },
      { label: t("end"), value: TagTypes.end },
      { label: t("start"), value: TagTypes.start },
      { label: t("middle"), value: TagTypes.middle },
    ],
    [t]
  );

  const select = useCallback(
    (value: TagColors) => {
      return options.find((o) => o.value === value)?.label || "no found";
    },
    [options]
  );

  return {
    options,
    select,
  };
};
