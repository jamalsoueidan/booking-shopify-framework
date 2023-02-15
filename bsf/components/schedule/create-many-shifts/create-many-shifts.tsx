import { InputDateDrop } from "@jamalsoueidan/bsf.components.inputs.input-date-drop";
import { InputDays } from "@jamalsoueidan/bsf.components.inputs.input-days";
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
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { eachDayOfInterval, endOfMonth } from "date-fns";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";

export interface CreateManyShiftsValue {
  start: Date;
  end: Date;
  tag: TagColors;
}

export type CreateManyShiftsBody = CreateManyShiftsValue[];
export type CreateManyShiftsSubmitResult = SubmitResult;
export type CreateManyShiftsRefMethod = {
  submit: () => FormError[];
};

export interface CreateManyShiftsProps {
  selectedDate: Date;
  onSubmit: (fields: CreateManyShiftsBody) => CreateManyShiftsSubmitResult;
}

const value = new Date();

export const CreateManyShifts = forwardRef<
  CreateManyShiftsRefMethod,
  CreateManyShiftsProps
>(({ selectedDate, onSubmit }, ref) => {
  const { options } = useTag();
  const { format, toUtc } = useDate();
  const { t } = useTranslation({ id: "create-many-shifts", locales });

  const getDatesFromSelectedDaysInCalendar = useCallback(
    (days: string[], range: Range) => {
      const allDaysInCalendarRange = eachDayOfInterval(range);
      const lowerCaseDayNames = days.map((d) => d.toLowerCase());
      return allDaysInCalendarRange.filter((date) => {
        const currentDayTextInDate = format(date, "EEEE").toLowerCase();
        return lowerCaseDayNames.includes(currentDayTextInDate);
      });
    },
    [format],
  );

  const convertToDate = useCallback(
    (date: Date, time: string) =>
      toUtc(new Date(`${format(date, "yyyy-MM-dd")} ${time}:00`)),
    [format, toUtc],
  );

  const { fields, submit, validate } = useForm({
    fields: {
      days: useField({
        validates: [Validators.isSelectedDays(t("select_days.error_empty"))],
        value: [format(selectedDate, "EEEE").toLowerCase()],
      }),
      endDate: useField<Date | undefined>(endOfMonth(selectedDate)),
      endTime: useField("16:00"),
      startDate: useField<Date | undefined>({
        validates: [Validators.isDate("invalid date")],
        value: selectedDate,
      }),
      startTime: useField("09:00"),
      tag: useField(options[0].value),
    },
    onSubmit: async (fieldValues) => {
      const daysSelected =
        fieldValues.startDate && fieldValues.endDate
          ? getDatesFromSelectedDaysInCalendar(fieldValues.days, {
              end: fieldValues.endDate,
              start: fieldValues.startDate,
            })
          : [];

      return onSubmit(
        daysSelected.map((date) => ({
          end: convertToDate(date, fieldValues.endTime),
          start: convertToDate(date, fieldValues.startTime),
          tag: fieldValues.tag,
        })),
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
        <InputDays field={fields.days} />
      </Layout.Section>
      <Layout.Section>
        <Columns columns={{ md: "3fr 3fr", xs: "3fr 3fr" }}>
          <InputDateDrop
            input={{ label: t("date_from.label") }}
            field={fields.startDate}
          />
          <InputDateDrop
            input={{ label: t("date_to.label") }}
            field={fields.endDate}
          />
        </Columns>
      </Layout.Section>
      <Layout.Section>
        <Columns columns={{ md: "3fr 3fr", xs: "3fr 3fr" }}>
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
    date_from: { label: "Dato fra" },
    date_to: { label: "Dato til" },
    select_days: { error_empty: "Du skal mindst vælge en dag" },
    time_from: { label: "Tid fra" },
    time_to: { label: "Tid til" },
  },
  en: {
    date_from: { label: "Date from" },
    date_to: { label: "Date to" },
    select_days: { error_empty: "You must select atleast one day" },
    time_from: { label: "Time from" },
    time_to: { label: "Time to" },
  },
};
