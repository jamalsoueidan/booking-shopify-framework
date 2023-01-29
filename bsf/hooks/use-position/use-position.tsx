import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { useCallback, useMemo } from "react";

export type Positions = "1" | "2";

const locales = {
  da: {
    hairdresser: "Frisør",
    makeup: "Makeup",
  },
  en: {
    hairdresser: "Hairdresser",
    makeup: "Makeup",
  },
};

interface UseTagOptionsReturn {
  options: UseTagOptions[];
  select: (value: Positions) => string;
}

interface UseTagOptions {
  label: string;
  value: string;
}

export const usePosition = (): UseTagOptionsReturn => {
  const { t } = useTranslation({ id: "positions", locales });

  const options: UseTagOptions[] = useMemo(
    () => [
      { label: t("makeup"), value: "1" },
      { label: t("hairdresser"), value: "2" },
    ],
    [t],
  );

  const select = useCallback(
    (value: Positions) => {
      const option = options.find((o) => o.value === value);
      if (!option) {
        throw Error("usePosition couldnt find this position");
      }
      return option.label;
    },
    [options],
  );

  return {
    options,
    select,
  };
};
