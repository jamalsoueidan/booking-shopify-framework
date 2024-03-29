import { WidgetHourRange } from "@jamalsoueidan/backend.types.widget";
import { HelperArray } from "@jamalsoueidan/frontend.helpers.helper-array";
import { useDate } from "@jamalsoueidan/frontend.hooks.use-date";
import { usePrevious } from "@jamalsoueidan/frontend.hooks.use-previous";
import { SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { isEqual } from "date-fns";
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
  const { formatInTimezone } = useDate();

  const options = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    const hours: Array<UseTimerOption> =
      [...data].sort(HelperArray.sortByDate((d) => d.start)).map((t) => ({
        key: t.start.toJSON(),
        label: `${formatInTimezone(t.start, "p")} - ${formatInTimezone(
          t.end,
          "p",
        )}`,
        value: t.start.toJSON(),
      })) || [];

    return hours;
  }, [data, formatInTimezone]);

  const handleOnChange = useCallback(
    (startDate: string) => {
      const selectedHour = data?.find((t) =>
        isEqual(t.start, new Date(startDate)),
      );

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
