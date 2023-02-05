import { DatesSetArg, EventClickArg, EventContentArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { BookingResponse, Schedule } from "@jamalsoueidan/bsb.mongodb.types";
import { Calendar } from "@jamalsoueidan/bsf.components.calendar";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useTag } from "@jamalsoueidan/bsf.hooks.use-tag";
import { format } from "date-fns";
import React, { useCallback, useMemo, useState } from "react";

export type ScheduleCalendarDateState = Pick<BookingResponse, "start" | "end">;

export interface ScheduleCalendarProps {
  data: Array<Schedule>;
  onClick: (date: Date) => void;
  onClickSchedule: (schedule: Schedule) => void;
  onChangeDate: (date: ScheduleCalendarDateState) => void;
}

export const ScheduleCalendar = ({ data, onClick, onClickSchedule, onChangeDate }: ScheduleCalendarProps) => {
  const { toTimeZone } = useDate();
  const { select: selectTag } = useTag();

  const [date, setDate] = useState<ScheduleCalendarDateState>();

  const handleChangeDate = useCallback(
    ({ start, end }: DatesSetArg) => {
      const newDate = {
        end: end.toISOString().slice(0, 10),
        start: start.toISOString().slice(0, 10),
      };

      if (newDate.start !== date?.start || newDate.end !== date?.end) {
        setDate(newDate);
      }

      onChangeDate(newDate);
    },
    [date, onChangeDate],
  );

  const events = useMemo(
    () =>
      data?.map((extendedProps) => ({
        backgroundColor: extendedProps.tag,
        color: extendedProps.tag,
        end: toTimeZone(extendedProps.end),
        extendedProps,
        start: toTimeZone(extendedProps.start),
      })) || [],
    [data, toTimeZone],
  );

  const renderItem = useCallback(
    (arg: EventContentArg) => {
      const schedule: Schedule = arg.event.extendedProps as Schedule;
      const hour = (
        <i>
          {format(arg.event.start || new Date(), "HH:mm")} - {format(arg.event.end || new Date(), "HH:mm")}
        </i>
      );

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
          <div>{selectTag(schedule.tag as never)} </div>
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
    [selectTag],
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
      datesSet={handleChangeDate}
      headerToolbar={{
        center: "title",
        left: "today prev,next",
        right: null,
      }}
      dateClick={handleOnClick}
      eventClick={handleClickEvent}
      validRange={validRange}
    />
  );
};
