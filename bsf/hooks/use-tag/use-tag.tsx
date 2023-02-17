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

export const TagColors: Record<
  Tag,
  { backgroundColor: string; color: string }
> = {
  [Tag.all_day]: { backgroundColor: "ebeceb", color: "2f2e2e" },
  [Tag.end_of_week]: { backgroundColor: "ffe1b8", color: "814319" },
  [Tag.weekday]: { backgroundColor: "d5d4fe", color: "422d94" },
  [Tag.middle_of_week]: { backgroundColor: "ceefa9", color: "304e1b" },
  [Tag.start_of_week]: { backgroundColor: "a9caef", color: "1b354e" },
  [Tag.weekend]: { backgroundColor: "efa9ae", color: "4e1b1b" },
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
  const selectTagBackgroundColor = useCallback(
    (value: Tag) => TagColors[value].backgroundColor,
    [],
  );
  const selectTagColor = useCallback(
    (value: Tag) => TagColors[value].color,
    [],
  );

  return {
    options,
    selectTag,
    selectTagBackgroundColor,
    selectTagColor,
    selectTagLabel,
    selectTagValue,
  };
};
