import { CalendarTitle } from "@jamalsoueidan/frontend.components.calendar";
import { CalendarType } from "@jamalsoueidan/frontend.components.calendar/calendar";
import {
  InputTags,
  InputTagsField,
} from "@jamalsoueidan/frontend.components.inputs.input-tags";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { Button, ButtonGroup, Columns, Inline } from "@shopify/polaris";
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

  const data = useMemo(
    () =>
      tag.value ? props?.data.filter((d) => d.tag === tag.value) : props?.data,
    [props, tag.value],
  );

  return (
    <>
      <Columns columns={["oneThird", "twoThirds"]}>
        <Inline gap="4">
          <CalendarTitle calendarRef={ref.current} />
          <ButtonGroup segmented>
            <Button onClick={handlePrev} size="slim">
              &#60;
            </Button>
            <Button onClick={handleNext} size="slim">
              &#62;
            </Button>
          </ButtonGroup>
        </Inline>
        <Inline gap="4" align="end">
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
        </Inline>
      </Columns>

      <ScheduleCalendarCore
        {...props}
        headerToolbar={{
          center: undefined,
          left: undefined,
          right: undefined,
        }}
        data={data}
        ref={ref}
        initialView="dayGridMonth"
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
