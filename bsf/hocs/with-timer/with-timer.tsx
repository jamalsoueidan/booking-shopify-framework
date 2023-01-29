import { WidgetHourRange } from "@jamalsoueidan/bsb.mongodb.types";
import { Text as HelperText } from "@jamalsoueidan/bsf.helpers.text";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { format } from "date-fns";
import React, { ReactNode, useCallback, useEffect, useMemo } from "react";

export type WithTimerFieldType =
  | {
      start: string;
      end: string;
    }
  | undefined;

export interface WithTimerStrictOption {
  value: string;
  label: string;
  disabled?: boolean;
  prefix?: ReactNode;
}

export interface InputProps extends Partial<SelectProps> {
  options?: WithTimerStrictOption[];
}

export interface WithTimerProps {
  data?: WidgetHourRange[];
  field: Field<WithTimerFieldType>;
  input?: InputProps;
}

export const withTimer =
  (WrappedComponent: React.ComponentType<WithTimerProps>) =>
  ({ data, input, field }: WithTimerProps) => {
    const { locale } = useTranslation({ id: "withTimer", locales: { da: {}, en: {} } });
    const { toTimeZone } = useDate();

    const options = useMemo(() => {
      if (!data || data.length === 0 || !locale) {
        // locale is only to force re-render
        return [];
      }

      const hours: Array<WithTimerStrictOption> =
        [...data].sort(HelperText.sortByDateKey("start")).map((t) => ({
          key: t.start,
          label: `${format(toTimeZone(t.start), "p")} - ${format(toTimeZone(t.end), "p")}`,
          value: t.start,
        })) || [];

      return hours;
    }, [data, toTimeZone, locale]);

    const onChange = useCallback(
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
      if (input?.placeholder || !options) {
        return;
      }

      if (options?.length > 0 && !field.value) {
        const option = options[0] as WithTimerStrictOption;
        onChange(option.value);
      }
    }, [options, field.value, onChange, input?.placeholder]);

    return <WrappedComponent field={field} input={{ ...input, onChange, options }} />;
  };
