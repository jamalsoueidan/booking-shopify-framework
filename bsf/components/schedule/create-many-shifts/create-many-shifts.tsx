import { InputDate } from "@jamalsoueidan/bsf.components.inputs.input-date";
import { InputDays } from "@jamalsoueidan/bsf.components.inputs.input-days";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { TagColors, useTag } from "@jamalsoueidan/bsf.hooks.use-tag";
import { Columns, Layout, Range, TextField } from "@shopify/polaris";
import {
  FormError,
  SubmitResult,
  useField,
  useForm,
} from "@shopify/react-form";

import { InputTags } from "@jamalsoueidan/bsf.components.inputs.input-tags";
import { Validators } from "@jamalsoueidan/bsf.helpers.validators";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { eachDayOfInterval, format } from "date-fns";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";

export interface CreateManyShiftsValue {
  start: string;
  end: string;
  tag: TagColors;
}

export type CreateManyShiftsBody = CreateManyShiftsValue[];
export type CreateManyShiftsSubmitResult = SubmitResult;
export type CreateManyShiftsRefMethod = {
  submit: () => FormError[];
};

export interface CreateManyShiftsProps {
  selectedDate: string;
  onSubmit: (fields: CreateManyShiftsBody) => CreateManyShiftsSubmitResult;
}

export const CreateManyShifts = forwardRef<
  CreateManyShiftsRefMethod,
  CreateManyShiftsProps
>(({ selectedDate, onSubmit }, ref) => {
  const { options } = useTag();
  const { toUtc } = useDate();
  const { t, locale } = useTranslation({
    id: "create-many-shifts",
    locales,
  });

  const getDatesFromSelectedDaysInCalendar = useCallback(
    (days: string[], range: Range) => {
      const allDaysInCalendarRange = eachDayOfInterval(range);
      const lowerCaseDayNames = days.map((d) => d.toLowerCase());
      return allDaysInCalendarRange.filter((date) => {
        const currentDayTextInDate = format(date, "EEEE").toLowerCase();
        return lowerCaseDayNames.includes(currentDayTextInDate);
      });
    },
    [locale]
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
      startDate: useField<Date | undefined>({
        value: undefined,
        validates: [Validators.isDate("invalid date")],
      }),
      endDate: useField<Date | undefined>(undefined),
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
      const daysSelected =
        fieldValues.startDate && fieldValues.endDate
          ? getDatesFromSelectedDaysInCalendar(fieldValues.days, {
              start: fieldValues.startDate,
              end: fieldValues.endDate,
            })
          : [];

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

  useImperativeHandle(ref, () => ({
    submit() {
      submit();
      return validate();
    },
  }));

  return (
    <Layout>
      <Layout.Section>
        <InputDays {...fields.days} />
      </Layout.Section>
      <Layout.Section>
        <Columns
          columns={{
            xs: "3fr 3fr",
            md: "3fr 3fr",
          }}
        >
          <InputDate label={t("date_from.label")} {...fields.startDate} />
          <InputDate label={t("date_to.label")} {...fields.endDate} />
        </Columns>
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
        <InputTags field={fields.tag} />
      </Layout.Section>
    </Layout>
  );
});

const locales = {
  da: {
    select_days: {
      error_empty: "Du skal mindst vælge en dag",
    },
    date_from: {
      label: "Dato fra",
    },
    date_to: {
      label: "Dato til",
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
    date_from: {
      label: "Date from",
    },
    date_to: {
      label: "Date to",
    },
    time_from: {
      label: "Time from",
    },
    time_to: {
      label: "Time to",
    },
  },
};
