import { CalendarTitle } from "@jamalsoueidan/bsf.components.calendar";
import { CalendarType } from "@jamalsoueidan/bsf.components.calendar/calendar";
import {
  InputTags,
  InputTagsField,
} from "@jamalsoueidan/bsf.components.inputs.input-tags";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Button, ButtonGroup, Stack } from "@shopify/polaris";
import { ResetMinor } from "@shopify/polaris-icons";
import { useField } from "@shopify/react-form";
import React, { useCallback, useMemo, useRef } from "react";
import { ScheduleCalendarCore, ScheduleCalendarProps } from "./schedule-core";

export const ScheduleCalendar = (props: ScheduleCalendarProps) => {
  const { t } = useTranslation({ id: "schedule-calendar", locales });
  const ref = useRef<CalendarType>(null);
  const tag = useField<InputTagsField>(undefined);

  const reset = useCallback(() => {
    tag.onChange(undefined);
    ref.current?.getApi().today();
  }, [tag]);

  const handlePrev = useCallback(() => {
    ref.current?.getApi().prev();
  }, []);

  const handleNext = useCallback(() => {
    ref.current?.getApi().next();
  }, []);

  const data = useMemo(() => {
    const { data } = props;
    return tag.value ? data.filter((d) => d.tag === tag.value) : data;
  }, [props, tag.value]);

  return (
    <>
      <Stack>
        <Stack.Item fill>
          <Stack alignment="center">
            <CalendarTitle calendarRef={ref.current} />
            <ButtonGroup segmented>
              <Button onClick={handlePrev} size="slim">
                &#60;
              </Button>
              <Button onClick={handleNext} size="slim">
                &#62;
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack.Item>
        <Stack>
          <Button onClick={reset} icon={ResetMinor}>
            {t("reset")}
          </Button>

          <InputTags
            field={tag}
            input={{
              labelHidden: true,
              placeholder: t("input.tag"),
              size: "medium",
            }}
          />
        </Stack>
      </Stack>

      <ScheduleCalendarCore
        {...props}
        headerToolbar={{
          center: undefined,
          left: undefined,
          right: undefined,
        }}
        data={data}
        ref={ref}
      />
    </>
  );
};

const locales = {
  da: {
    dayGridMonth: "Måned",
    input: {
      tag: "Filtre tag",
    },
    reset: "Nulstil",
  },
  en: {
    dayGridMonth: "Month",
    input: {
      tag: "Filter by tag",
    },
    reset: "Reset",
  },
};
