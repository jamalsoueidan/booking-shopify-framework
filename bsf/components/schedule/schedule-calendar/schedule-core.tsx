import {
  CalendarOptions,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { Schedule } from "@jamalsoueidan/bsb.types";
import { Calendar } from "@jamalsoueidan/bsf.components.calendar";
import {
  CalendarDate,
  CalendarType,
} from "@jamalsoueidan/bsf.components.calendar/calendar";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useTag } from "@jamalsoueidan/bsf.hooks.use-tag";
import React, { forwardRef, useCallback, useMemo } from "react";

export type ScheduleCalendarProps = {
  data: Array<Schedule>;
  onClick: (date: Date) => void;
  onClickSchedule: (schedule: Schedule) => void;
  onChangeDate: (date: CalendarDate) => void;
  headerToolbar?: CalendarOptions["headerToolbar"];
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
          color: selectTagColor(schedule.tag),
          end: schedule.end,
          extendedProps: schedule,
          start: schedule.start,
        })) || [],
      [data, selectTagColor, selectTagBackgroundColor],
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
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              padding: "5px",
            }}
          >
            <div>{hour}</div>
            <div>{selectTagLabel(schedule.tag)} </div>
          </div>
        );
      },
      [selectTagLabel, onlyFormat],
    );

    const handleClickEvent = useCallback(
      ({ event }: EventClickArg) => {
        onClickSchedule(event._def.extendedProps as Schedule);
      },
      [onClickSchedule],
    );

    const handleOnClick = useCallback(
      ({ dateStr }: DateClickArg) => {
        onClick(new Date(dateStr));
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
      />
    );
  },
);
