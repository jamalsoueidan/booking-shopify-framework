import { Tag } from "@jamalsoueidan/backend.types.tag";
import { InputTags } from "@jamalsoueidan/frontend.components.inputs.input-tags";
import { useDate } from "@jamalsoueidan/frontend.hooks.use-date";
import { useTag } from "@jamalsoueidan/frontend.hooks.use-tag";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { Card, Columns, Layout, TextField } from "@shopify/polaris";
import {
  FormError,
  SubmitResult,
  useField,
  useForm,
} from "@shopify/react-form";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";

export type ScheduleFormOneShiftAllowEditing = {
  tag: boolean;
};
export interface ScheduleFormOneShiftBody {
  start: Date;
  end: Date;
  tag: Tag;
}

export type ScheduleFormOneShiftSubmitResult = SubmitResult;
export interface ScheduleFormOneShiftRefMethod {
  submit: () => FormError[];
}

export interface ScheduleFormOneShiftProps {
  data: ScheduleFormOneShiftBody;
  allowEditing?: ScheduleFormOneShiftAllowEditing;
  onSubmit: (
    fields: ScheduleFormOneShiftBody,
  ) => ScheduleFormOneShiftSubmitResult;
}

export const ScheduleFormOneShift = forwardRef<
  ScheduleFormOneShiftRefMethod,
  ScheduleFormOneShiftProps
>(({ data, onSubmit, allowEditing }, ref) => {
  const { t } = useTranslation({ id: "create-one-day", locales });
  const { options } = useTag();
  const { toUtc, format } = useDate();

  const convert = useCallback(
    (time: string) => {
      const [hour, minuttes] = time.split(":").map((_) => parseInt(_, 10));
      return toUtc(
        new Date(`${format(data.start, "yyyy-MM-dd")} ${hour}:${minuttes}:00`),
      );
    },
    [format, data, toUtc],
  );

  const { fields, submit, validate } = useForm({
    fields: {
      endTime: useField(format(data.end, "HH:mm")),
      startTime: useField(format(data.start, "HH:mm")),
      tag: useField<Tag>(options[0].value),
    },
    onSubmit: async (fieldValues) => {
      const start = convert(fieldValues.startTime);
      const end = convert(fieldValues.endTime);

      return onSubmit({
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
        <Card>
          <Card.Section>
            {t("title", {
              date: <strong>{format(data?.start, "PPP")}</strong>,
              day: <strong>{format(data?.start, "EEEE")}</strong>,
            })}
          </Card.Section>
        </Card>
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
    time_from: {
      label: "Tid fra",
    },
    time_to: {
      label: "Tid til",
    },
    title: "Arbejdsdag {day} og dato {date}",
  },
  en: {
    time_from: {
      label: "Time from",
    },
    time_to: {
      label: "Time to",
    },
    title: "Shiftday {day} og date {date}",
  },
};
