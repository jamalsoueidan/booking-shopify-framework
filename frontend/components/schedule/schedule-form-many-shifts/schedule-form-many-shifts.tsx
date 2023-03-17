/* eslint-disable no-console */
import { InputDateDrop } from "@jamalsoueidan/frontend.components.inputs.input-date-drop";
import { InputDays } from "@jamalsoueidan/frontend.components.inputs.input-days";
import { Columns, Layout, TextField } from "@shopify/polaris";
import {
  FormError,
  SubmitResult,
  useField,
  useForm,
} from "@shopify/react-form";

import {
  ScheduleServiceCreateGroupBodyProps,
  ScheduleServiceDaysInterval,
  ScheduleServiceUpdateGroupBodyProps,
} from "@jamalsoueidan/backend.types.schedule";
import { Tag } from "@jamalsoueidan/backend.types.tag";
import { InputTags } from "@jamalsoueidan/frontend.components.inputs.input-tags";
import { HelperDate } from "@jamalsoueidan/frontend.helpers.helper-date";
import { Validators } from "@jamalsoueidan/frontend.helpers.validators";
import { useDate } from "@jamalsoueidan/frontend.hooks.use-date";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
} from "react";

export type ScheduleFormManyShiftsAllowEditing = {
  tag: boolean;
};

export type ScheduleFormManyShiftsBody =
  | ScheduleServiceCreateGroupBodyProps
  | ScheduleServiceUpdateGroupBodyProps;

export type ScheduleFormManyShiftsSubmitResult = SubmitResult;
export type ScheduleFormManyShiftsRefMethod = {
  submit: () => FormError[];
};

export interface ScheduleFormManyShiftsProps {
  data: ScheduleFormManyShiftsBody;
  allowEditing?: ScheduleFormManyShiftsAllowEditing;
  onSubmit: (
    fields: ScheduleFormManyShiftsBody,
  ) => ScheduleFormManyShiftsSubmitResult;
}

export const ScheduleFormManyShifts = forwardRef<
  ScheduleFormManyShiftsRefMethod,
  ScheduleFormManyShiftsProps
>(({ data, onSubmit, allowEditing }, ref) => {
  const { formatInTimezone, toUtc } = useDate();
  const { t } = useTranslation({ id: "schedule-form-many-shifts", locales });

  const convertToUtc = useCallback(
    (date: Date, time: string) => {
      const [hour, minuttes] = time.split(":").map((_) => parseInt(_, 10));
      return toUtc(
        new Date(
          `${formatInTimezone(date, "yyyy-MM-dd")} ${hour}:${minuttes}:00`,
        ),
      );
    },
    [formatInTimezone, toUtc],
  );

  const endDate = useMemo(() => {
    if (data.end) {
      return data.end;
    }
    return HelperDate.resetDateTime(new Date(), 16);
  }, [data]);

  const startDate = useMemo(() => {
    if (data.start) {
      return data.start;
    }
    return HelperDate.resetDateTime(new Date(), 8);
  }, [data]);

  const { fields, submit, validate } = useForm({
    fields: {
      days: useField<Array<ScheduleServiceDaysInterval>>({
        validates: [Validators.isSelectedDays(t("select_days.error_empty"))],
        value: data.days || [],
      }),
      endDate: useField<Date>({
        validates: [Validators.isDate("invalid date")],
        value: endDate,
      }),
      endTime: useField(formatInTimezone(endDate, "HH:mm")),
      startDate: useField<Date>({
        validates: [Validators.isDate("invalid date")],
        value: startDate,
      }),
      startTime: useField(formatInTimezone(startDate, "HH:mm")),
      tag: useField<Tag>(data.tag),
    },
    onSubmit: async (fieldValues) => {
      const end = convertToUtc(fieldValues.endDate, fieldValues.endTime);
      const start = convertToUtc(fieldValues.startDate, fieldValues.startTime);
      return onSubmit({
        days: fieldValues.days,
        end,
        start,
        tag: fieldValues.tag,
      });
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
      {allowEditing?.tag ? (
        <Layout.Section>
          <InputTags field={fields.tag} />
        </Layout.Section>
      ) : null}
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
