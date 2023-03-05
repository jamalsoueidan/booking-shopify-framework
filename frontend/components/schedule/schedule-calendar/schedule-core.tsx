import {
  CalendarOptions,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { Schedule } from "@jamalsoueidan/backend.types.schedule";
import { Calendar } from "@jamalsoueidan/frontend.components.calendar";
import {
  CalendarDate,
  CalendarType,
  CalendarView,
} from "@jamalsoueidan/frontend.components.calendar/calendar";
import { useDate } from "@jamalsoueidan/frontend.hooks.use-date";
import { useTag } from "@jamalsoueidan/frontend.hooks.use-tag";
import { Text } from "@shopify/polaris";
import React, { forwardRef, useCallback, useMemo } from "react";

export type ScheduleCalendarProps = {
  data: Array<Schedule>;
  onClick?: (date: Date) => void;
  onClickSchedule?: (schedule: Schedule) => void;
  onChangeDate: (date: CalendarDate) => void;
  headerToolbar?: CalendarOptions["headerToolbar"];
  initialView?: CalendarView;
};

export const ScheduleCalendarCore = forwardRef<
  CalendarType,
  ScheduleCalendarProps
>(
  (
    {
      data,
      onClick,
      onClickSchedule,
      onChangeDate,
      headerToolbar,
      initialView,
    }: ScheduleCalendarProps,
    ref,
  ) => {
    const { onlyFormat } = useDate();
    const { selectTagLabel, selectTagBackgroundColor, selectTagColor } =
      useTag();

    const events = useMemo(
      () =>
        data?.map((schedule) => ({
          backgroundColor: selectTagBackgroundColor(schedule.tag),
          color: selectTagBackgroundColor(schedule.tag),
          end: schedule.end,
          extendedProps: schedule,
          start: schedule.start,
        })) || [],
      [data, selectTagBackgroundColor],
    );

    const renderItem = useCallback(
      (arg: EventContentArg) => {
        const hour = arg?.event?.start && arg?.event.end && (
          <i>
            {onlyFormat(arg.event.start, "p")}
            {" - "}
            {onlyFormat(arg.event.end, "p")}
          </i>
        );

        const schedule: Schedule = arg.event.extendedProps as Schedule;

        return (
          <div
            style={{
              color: selectTagColor(schedule.tag),
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              padding: "5px",
            }}
          >
            <Text variant="bodyMd" as="span" fontWeight="semibold">
              {selectTagLabel(schedule.tag)}
            </Text>
            <Text variant="bodySm" as="span">
              {hour}
            </Text>
          </div>
        );
      },
      [onlyFormat, selectTagColor, selectTagLabel],
    );

    const handleClickEvent = useCallback(
      ({ event }: EventClickArg) => {
        if (onClickSchedule) {
          onClickSchedule(event._def.extendedProps as Schedule);
        }
      },
      [onClickSchedule],
    );

    const handleOnClick = useCallback(
      ({ dateStr }: DateClickArg) => {
        if (onClick) {
          onClick(new Date(dateStr));
        }
      },
      [onClick],
    );

    const validRange = useCallback((start: Date) => ({ start }), []);

    return (
      <Calendar
        ref={ref}
        events={events}
        eventContent={renderItem}
        datesSet={onChangeDate}
        headerToolbar={headerToolbar}
        dateClick={handleOnClick}
        eventClick={handleClickEvent}
        validRange={validRange}
        initialView={"dayGridMonth"}
        /*showNonCurrentDates={false}
        views={{
          multiMonthFourMonth: {
            type: "multiMonth",
            duration: { months: 4 },
          },
        }}*/
      />
    );
  },
);
