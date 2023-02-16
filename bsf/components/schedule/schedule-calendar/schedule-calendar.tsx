import { EventClickArg, EventContentArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { Schedule } from "@jamalsoueidan/bsb.types";
import { Calendar } from "@jamalsoueidan/bsf.components.calendar";
import { CalendarDate } from "@jamalsoueidan/bsf.components.calendar/calendar";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useTag } from "@jamalsoueidan/bsf.hooks.use-tag";
import React, { useCallback, useMemo } from "react";

export interface ScheduleCalendarProps {
  data: Array<Schedule>;
  onClick: (date: Date) => void;
  onClickSchedule: (schedule: Schedule) => void;
  onChangeDate: (date: CalendarDate) => void;
}

export const ScheduleCalendar = ({
  data,
  onClick,
  onClickSchedule,
  onChangeDate,
}: ScheduleCalendarProps) => {
  const { onlyFormat } = useDate();
  const { selectTag } = useTag();

  const events = useMemo(
    () =>
      data?.map((extendedProps) => ({
        backgroundColor: extendedProps.tag,
        color: extendedProps.tag,
        end: extendedProps.end,
        extendedProps,
        start: extendedProps.start,
      })) || [],
    [data],
  );

  const renderItem = useCallback(
    (arg: EventContentArg) => {
      const hour =
        arg?.event?.start && arg?.event?.end ? (
          <i>
            {onlyFormat(arg.event.start, "p")}
            {" - "}
            {onlyFormat(arg.event.end, "p")}
          </i>
        ) : null;

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
          <div>{selectTag(schedule.tag)?.label} </div>
          {schedule.groupId && (
            <div
              style={{
                backgroundColor: `#${schedule.groupId.slice(-6)}`,
                height: "15px",
                marginTop: "4px",
                width: "15px",
              }}
            />
          )}
        </div>
      );
    },
    [selectTag, onlyFormat],
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
      events={events}
      eventContent={renderItem}
      datesSet={onChangeDate}
      headerToolbar={{
        center: "title",
        left: "today prev,next",
        right: undefined,
      }}
      dateClick={handleOnClick}
      eventClick={handleClickEvent}
      validRange={validRange}
    />
  );
};
