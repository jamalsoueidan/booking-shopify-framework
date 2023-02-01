import { WidgetHourRange } from "@jamalsoueidan/bsb.mongodb.types";
import { Text as HelperText } from "@jamalsoueidan/bsf.helpers.text";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { format } from "date-fns";
import { ReactNode, useCallback, useEffect, useMemo } from "react";

export type UseTimerField =
  | {
      start: string;
      end: string;
    }
  | undefined;

export interface UseTimerOption {
  value: string;
  label: string;
  disabled?: boolean;
  prefix?: ReactNode;
}

export interface UseTimerInput extends Partial<SelectProps> {
  options?: UseTimerOption[];
}

export interface UseTimerProps {
  data?: WidgetHourRange[];
  placeholder?: string;
  field: Field<UseTimerField>;
}

export const useTimer = ({ data, field, placeholder }: UseTimerProps) => {
  const { locale } = useTranslation({ id: "withTimer", locales: { da: {}, en: {} } });
  const { toTimeZone } = useDate();

  const options = useMemo(() => {
    if (!data || data.length === 0 || !locale) {
      // locale is only to force re-render
      return [];
    }

    const hours: Array<UseTimerOption> =
      [...data].sort(HelperText.sortByDateKey("start")).map((t) => ({
        key: t.start,
        label: `${format(toTimeZone(t.start), "p")} - ${format(toTimeZone(t.end), "p")}`,
        value: t.start,
      })) || [];

    return hours;
  }, [data, toTimeZone, locale]);

  const handleOnChange = useCallback(
    (selected: string) => {
      const selectedHour = data?.find((t) => t.start === selected);

      if (!selectedHour) {
        field.onChange(undefined);
      } else {
        field.onChange({
          end: selectedHour.end,
          start: selectedHour.start,
        });
      }
    },
    [data, field],
  );

  useEffect(() => {
    if (placeholder || !options || field.error) {
      return;
    }

    if (options?.length > 0 && !field.value) {
      const option = options[0] as UseTimerOption;
      handleOnChange(option.value);
    }
  }, [options, handleOnChange, field.value, field.error, placeholder]);

  return { onChange: handleOnChange, options };
};
