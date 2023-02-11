import { WidgetHourRange } from "@jamalsoueidan/bsb.types";
import { HelperArray } from "@jamalsoueidan/bsf.helpers.helper-array";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { usePrevious } from "@jamalsoueidan/bsf.hooks.use-previous";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { format, isEqual } from "date-fns";
import { ReactNode, useCallback, useEffect, useMemo } from "react";

export type UseTimerField =
  | {
      start: Date;
      end: Date;
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
  autoSelectFirst?: boolean;
  field: Field<UseTimerField>;
}

export const useTimer = ({ data, field, autoSelectFirst }: UseTimerProps) => {
  const { toTimeZone } = useDate();
  const { locale } = useTranslation({
    id: "withTimer",
    locales: { da: {}, en: {} },
  });

  const options = useMemo(() => {
    if (!data || data.length === 0 || !locale) {
      // locale is only to force re-render
      return [];
    }

    const hours: Array<UseTimerOption> =
      [...data].sort(HelperArray.sortDateBy("start")).map((t) => ({
        key: t.start.toJSON(),
        label: `${format(toTimeZone(t.start), "p")} - ${format(
          toTimeZone(t.end),
          "p",
        )}`,
        value: t.start.toJSON(),
      })) || [];

    return hours;
  }, [data, toTimeZone, locale]);

  const handleOnChange = useCallback(
    (startDate: string) => {
      const selectedHour = data?.find((t) =>
        isEqual(t.start, new Date(startDate)),
      );

      if (!selectedHour) {
        field.onChange(undefined);
      } else {
        field.onChange({
          end: new Date(selectedHour.end),
          start: new Date(selectedHour.start),
        });
      }
    },
    [data, field],
  );

  useEffect(() => {
    if (!autoSelectFirst || !options || field.error) {
      return;
    }

    if (options?.length > 0 && !field.value) {
      const option = options[0] as UseTimerOption;
      handleOnChange(option.value);
    }
  }, [options, handleOnChange, field.value, field.error, autoSelectFirst]);

  usePrevious(
    ([prevOptions]) => {
      const optionsUnchanged =
        JSON.stringify(prevOptions) === JSON.stringify(options);
      if (optionsUnchanged || !field.value) {
        return;
      }

      const value = options.find(
        (option) => option.value === field.value?.start.toJSON(),
      );
      if (!value) {
        handleOnChange("");
      }
    },
    [options, field.value, handleOnChange],
  );

  return { onChange: handleOnChange, options };
};
