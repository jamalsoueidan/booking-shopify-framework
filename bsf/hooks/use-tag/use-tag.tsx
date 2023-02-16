import { Tag } from "@jamalsoueidan/bsb.types";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { useCallback, useMemo } from "react";

const locales = {
  da: {
    [Tag.all_day]: "Alle dage",
    [Tag.end_of_week]: "Slutning af ugen",
    [Tag.weekday]: "Hverdag",
    [Tag.middle_of_week]: "Midten af ugen",
    [Tag.start_of_week]: "Starten af ugen",
    [Tag.weekend]: "Weekend",
  },
  en: {
    [Tag.all_day]: "All days",
    [Tag.end_of_week]: "End of the week",
    [Tag.weekday]: "Weekday",
    [Tag.middle_of_week]: "Middel of the week",
    [Tag.start_of_week]: "Start of the week",
    [Tag.weekend]: "Weekend",
  },
};

export const TagColors: Record<Tag, string> = {
  [Tag.all_day]: "d24e01",
  [Tag.end_of_week]: "2980B9",
  [Tag.weekday]: "4b6043",
  [Tag.middle_of_week]: "A93226",
  [Tag.start_of_week]: "8E44AD",
  [Tag.weekend]: "235284",
};

export const useTag = () => {
  const { t } = useTranslation({ id: "tags", locales });

  const options = useMemo(
    () => [
      { label: t("weekday"), value: Tag.weekday },
      { label: t("weekend"), value: Tag.weekend },
      { label: t("all_day"), value: Tag.all_day },
      { label: t("end_of_week"), value: Tag.end_of_week },
      { label: t("start_of_week"), value: Tag.start_of_week },
      { label: t("middle_of_week"), value: Tag.middle_of_week },
    ],
    [t],
  );

  const selectTag = useCallback(
    (value: Tag) => options.find((o) => o.value === value),
    [options],
  );

  const selectTagValue = useCallback(
    (value: Tag) => options.find((o) => o.value === value)?.value,
    [options],
  );

  const selectTagLabel = useCallback(
    (value: Tag) => options.find((o) => o.value === value)?.label,
    [options],
  );
  const selectTagColor = useCallback((value: Tag) => TagColors[value], []);

  return {
    options,
    selectTag,
    selectTagColor,
    selectTagLabel,
    selectTagValue,
  };
};
