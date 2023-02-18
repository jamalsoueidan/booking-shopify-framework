import type { DatesSetArg } from "@fullcalendar/core";
import { CalendarOptions as CO } from "@fullcalendar/core";
import da from "@fullcalendar/core/locales/da";
import en from "@fullcalendar/core/locales/en-gb";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useSettings } from "@jamalsoueidan/bsf.hooks.use-settings";
import { isEqual } from "date-fns";
import React, { forwardRef, useCallback, useMemo, useState } from "react";

export type CalendarDate = {
  start: Date;
  end: Date;
};

export type CalendarView =
  | "multiMonthYear"
  | "dayGridMonth"
  | "timeGridWeek"
  | "timeGridDay"
  | "listWeek";

export type CalendarOptions = Omit<CO, "events"> & {
  events?: Array<CalendarDate>;
};

export type CalendarType = FullCalendar;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Calendar = forwardRef<CalendarType, CalendarOptions>(
  (props, ref) => {
    const { language } = useSettings();
    const { toTimeZone } = useDate();

    const [date, setDate] = useState<CalendarDate>();
    const handleChangeDate = useCallback(
      (newDate: DatesSetArg) => {
        if (
          !date ||
          !newDate ||
          !isEqual(newDate.start, date.start) ||
          !isEqual(newDate.end, date.end)
        ) {
          if (props.datesSet) {
            props.datesSet(newDate);
          }
          setDate(newDate);
        }
      },
      [date, props],
    );

    const events = useMemo(
      () =>
        props.events?.map((e: { end: Date; start: Date }) => ({
          ...e,
          end: toTimeZone(e.end),
          start: toTimeZone(e.start),
        })),
      [props.events, toTimeZone],
    );

    return (
      <FullCalendar
        height="auto"
        ref={ref}
        plugins={[
          timeGridPlugin,
          dayGridPlugin,
          interactionPlugin,
          listPlugin,
          multiMonthPlugin,
        ]}
        firstDay={1}
        dayMaxEvents
        slotDuration="00:15:00"
        slotLabelFormat={[
          {
            hour: "numeric",
            meridiem: "short",
            minute: "2-digit",
            omitZeroMinute: false,
          },
        ]}
        eventDisplay="block"
        slotMinTime="07:00"
        slotMaxTime="20:00"
        locales={[da, en]}
        locale={language}
        buttonText={{
          next: ">>",
          prev: "<<",
        }}
        {...props}
        datesSet={handleChangeDate}
        events={events}
        headerToolbar={
          props.headerToolbar || {
            center: "title",
            left: "today prev,next",
            right:
              "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }
        }
        initialView={props.initialView || "dayGridMonth"}
      />
    );
  },
);
