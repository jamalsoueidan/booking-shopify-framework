import { TagInput, useTag } from "@jamalsoueidan/bsf.bsf-pkg";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { TagColors } from "@jamalsoueidan/bsf.hooks.use-tag";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Card, Columns, Layout, Modal, TextField } from "@shopify/polaris";
import { SubmitResult, useField, useForm } from "@shopify/react-form";
import { setHours, setMinutes } from "date-fns";
import React, { forwardRef, useImperativeHandle } from "react";

const locales = {
  da: {
    title: "Arbejdsdag {day} og dato {date}",
    time_from: {
      label: "Tid fra",
    },
    time_to: {
      label: "Tid til",
    },
  },
  en: {
    title: "Shiftday {day} og date {date}",
    time_from: {
      label: "Time from",
    },
    time_to: {
      label: "Time to",
    },
  },
};

interface FieldValues {
  start: string;
  end: string;
  tag: TagColors;
}

export interface CreateOneShiftRefMethod {
  submit: () => boolean;
}

export interface CreateOneShiftProps {
  selectedDate: string;
  onSubmit: (fields: FieldValues) => SubmitResult;
}

export const CreateOneShift = forwardRef(
  ({ selectedDate, onSubmit }: CreateOneShiftProps, ref) => {
    const { t } = useTranslation({ id: "create-one-day", locales });
    const { options } = useTag();
    const { toUtc, format } = useDate();

    const { fields, submit, validate } = useForm({
      fields: {
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
        const date = new Date(selectedDate);

        const convert = (time: string) => {
          const [hour, minuttes] = time.split(":").map((_) => parseInt(_));
          return toUtc(setHours(setMinutes(date, minuttes), hour));
        };

        const start = convert(fieldValues.startTime);
        const end = convert(fieldValues.endTime);

        return onSubmit({
          start: start.toISOString(),
          end: end.toISOString(),
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
      <Modal.Section>
        <Layout>
          <Layout.Section>
            <Card>
              <Card.Section>
                {t("title", {
                  day: (
                    <strong>{format(new Date(selectedDate), "EEEE")}</strong>
                  ),
                  date: (
                    <strong>{format(new Date(selectedDate), "PPP")}</strong>
                  ),
                })}
              </Card.Section>
            </Card>
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
      </Modal.Section>
    );
  }
);
