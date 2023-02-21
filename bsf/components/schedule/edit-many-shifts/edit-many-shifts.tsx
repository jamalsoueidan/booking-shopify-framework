import {
  Schedule,
  ScheduleServiceUpdateGroupBodyProps,
} from "@jamalsoueidan/bsb.types.schedule";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Columns, Layout, TextField } from "@shopify/polaris";
import {
  FormError,
  SubmitResult,
  useField,
  useForm,
} from "@shopify/react-form";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";

export type EditManyShiftsBody = ScheduleServiceUpdateGroupBodyProps;
export type EditManyShiftsSubmitResult = SubmitResult;
export interface EditManyShiftsRefMethod {
  submit: () => FormError[];
}

export interface EditManyShiftsProps {
  schedule: Schedule;
  onSubmit: (fields: EditManyShiftsBody) => EditManyShiftsSubmitResult;
}

export const EditManyShifts = forwardRef<
  EditManyShiftsRefMethod,
  EditManyShiftsProps
>(({ schedule, onSubmit }, ref) => {
  const { t } = useTranslation({ id: "edit-many-day-shifts", locales });
  const { toUtc, format } = useDate();

  const convert = useCallback(
    (time: string) => {
      const [hour, minuttes] = time.split(":").map((_) => parseInt(_, 10));
      return toUtc(
        new Date(
          `${format(schedule.start, "yyyy-MM-dd")} ${hour}:${minuttes}:00`,
        ),
      );
    },
    [format, schedule.start, toUtc],
  );

  const { fields, submit, validate } = useForm({
    fields: {
      endTime: useField(format(schedule.end, "HH:mm")),
      startTime: useField(format(schedule.start, "HH:mm")),
    },
    onSubmit: async (fieldValues) => {
      const start = convert(fieldValues.startTime);
      const end = convert(fieldValues.endTime);

      return onSubmit({
        end,
        start,
        tag: schedule.tag,
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
        {t("title")}
        <br />
        <br />
        {t("from", {
          from: <strong>{format(schedule.start, "PPp")}</strong>,
        })}
        <br />
        {t("to", {
          to: <strong>{format(schedule.end, "PPp")}</strong>,
        })}
      </Layout.Section>
      <Layout.Section>
        <Columns
          columns={{
            md: "3fr 3fr",
            xs: "3fr 3fr",
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
    </Layout>
  );
});

const locales = {
  da: {
    from: "fra: {from}",
    time_from: {
      label: "Ændre tid fra",
    },
    time_to: {
      label: "Ændre tid til",
    },
    title:
      "Dette vagtplan er en del af en gruppe af vagtplaner, ændring af tiden påvirker alle vagtplaner:",
    to: "til: {to}",
  },
  en: {
    from: "from: {from}",
    time_from: {
      label: "Edit time from",
    },
    time_to: {
      label: "Edit time to",
    },
    title:
      "This shift is part of a group of shifts, changes to time affects all shifts:",
    to: "to: {to}",
  },
};
