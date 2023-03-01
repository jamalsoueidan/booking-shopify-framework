import { Tag } from "@jamalsoueidan/backend.types.tag";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { Icon } from "@shopify/polaris";
import React, { useCallback, useMemo } from "react";

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

export const TagOptions: Record<
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
  const { t } = useTranslation({ id: "use-tag", locales });

  const prefix = useCallback(
    (tag: Tag) => (
      <Icon
        source={`<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><circle cx='10' cy='10' r='10' fill='%23${TagOptions[tag].backgroundColor}' /></svg>`}
      />
    ),
    [],
  );

  const options = useMemo(
    () =>
      Object.values(Tag).map((value: Tag) => ({
        label: t(value),
        prefix: prefix(value),
        value,
      })),
    [prefix, t],
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
    (value: Tag) => `#${TagOptions[value].backgroundColor}`,
    [],
  );

  const selectTagColor = useCallback(
    (value: Tag) => `#${TagOptions[value].color}`,
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
