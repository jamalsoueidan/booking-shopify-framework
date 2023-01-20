import { SelectDaysInput } from "@jamalsoueidan/bsf.components.inputs.select-days-input";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { TagColors, useTag } from "@jamalsoueidan/bsf.hooks.use-tag";
import {
  Columns,
  DatePicker,
  Layout,
  Range,
  TextField,
} from "@shopify/polaris";
import { SubmitResult, useField, useForm } from "@shopify/react-form";
import da from "date-fns/locale/da";

import { TagInput } from "@jamalsoueidan/bsf.components.inputs.tag-input";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getMonth,
  getYear,
  subDays,
} from "date-fns";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Validators } from "@jamalsoueidan/bsf.helpers.validators";

interface FieldValues {
  start: string;
  end: string;
  tag: TagColors;
}

const locales = {
  da: {
    select_days: {
      error_empty: "Du skal mindst vælge en dag",
    },
    time_from: {
      label: "Tid fra",
    },
    time_to: {
      label: "Tid til",
    },
  },
  en: {
    select_days: {
      error_empty: "You must select atleast one day",
    },
    time_from: {
      label: "Time from",
    },
    time_to: {
      label: "Time to",
    },
  },
};

export interface CreateManyShiftsRefMethod {
  submit: () => boolean;
}

export interface CreateManyShiftsProps {
  selectedDate: string;
  onSubmit: (fields: FieldValues[]) => SubmitResult;
}

export const CreateManyShifts = forwardRef(
  ({ selectedDate, onSubmit }: CreateManyShiftsProps, ref) => {
    const { options } = useTag();
    const { toUtc } = useDate();
    const { t, locale } = useTranslation({ id: "create-many-shifts", locales });

    const [{ month, year }, setDate] = useState({
      month: getMonth(new Date(selectedDate)) - 1,
      year: getYear(new Date(selectedDate)),
    });

    const [selectedDates, setSelectedDates] = useState<Range>({
      start: new Date(selectedDate),
      end: endOfMonth(new Date(selectedDate)),
    });

    const getDatesFromSelectedDaysInCalendar = useCallback(
      (days: string[]) => {
        const allDaysInCalendarRange = eachDayOfInterval(selectedDates);
        const lowerCaseDayNames = days.map((d) => d.toLowerCase());
        return allDaysInCalendarRange.filter((date) => {
          const currentDayTextInDate = format(date, "EEEE", {
            locale: locale === "da" ? da : undefined,
          }).toLowerCase();
          return lowerCaseDayNames.includes(currentDayTextInDate);
        });
      },
      [selectedDates, locale]
    );

    const getZonedTime = useCallback(
      (date: Date, time: string) =>
        toUtc(`${format(date, "yyyy-MM-dd")} ${time}:00`).toISOString(),
      []
    );

    const { fields, submit, validate, submitErrors } = useForm({
      fields: {
        days: useField({
          value: [format(new Date(selectedDate), "EEEE").toLowerCase()],
          validates: [Validators.isSelectedDays(t("select_days.error_empty"))],
        }),
        startTime: useField({
          value: "09:00",
          validates: [],
        }),
        endTime: useField({
          value: "16:00",
          validates: [],
        }),
        tag: useField({
          value: options[0].value,
          validates: [],
        }),
      },
      onSubmit: async (fieldValues) => {
        const daysSelected = getDatesFromSelectedDaysInCalendar(
          fieldValues.days
        );

        return onSubmit(
          daysSelected.map((date) => {
            return {
              start: getZonedTime(date, fieldValues.startTime),
              end: getZonedTime(date, fieldValues.endTime),
              tag: fieldValues.tag,
            };
          })
        );
      },
    });

    const handleMonthChange = useCallback(
      (month: number, year: number) => setDate({ month, year }),
      []
    );

    useImperativeHandle(ref, () => ({
      submit() {
        submit();
        return validate();
      },
    }));

    return (
      <Layout>
        <Layout.Section>
          <SelectDaysInput field={fields.days}></SelectDaysInput>
        </Layout.Section>
        <Layout.Section>
          <DatePicker
            month={month}
            year={year}
            onChange={setSelectedDates}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
            multiMonth
            allowRange
            disableDatesBefore={subDays(new Date(), 1)}
          />
        </Layout.Section>
        <Layout.Section>
          <Columns
            columns={{
              xs: "3fr 3fr",
              md: "3fr 3fr",
            }}
          >
            <TextField
              label={t("time_from.label")}
              type="time"
              autoComplete="off"
              {...fields.startTime}
            />
            <TextField
              label={t("time_to.label")}
              type="time"
              autoComplete="off"
              {...fields.endTime}
            />
          </Columns>
        </Layout.Section>
        <Layout.Section>
          <TagInput field={fields.tag} />
        </Layout.Section>
      </Layout>
    );
  }
);
