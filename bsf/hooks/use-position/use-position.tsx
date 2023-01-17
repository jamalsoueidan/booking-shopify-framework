import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { useCallback, useMemo } from "react";

type positions = "1" | "2";

const locales = [
  {
    makeup: "Makeup",
    hairdresser: "Frisør",
  },
  {
    makeup: "Makeup",
    hairdresser: "Hairdresser",
  },
];

interface UseTagOptionsReturn {
  options: UseTagOptions[];
  select: (value: positions) => string;
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
    [t]
  );

  const select = useCallback(
    (value: positions) => {
      const option = options.find((o) => o.value === value);
      if (!option) {
        throw Error("usePosition couldnt find this position");
      }
      return option.label;
    },
    [options]
  );

  return {
    options,
    select,
  };
};
