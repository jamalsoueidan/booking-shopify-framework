import { DatesSetArg, EventClickArg, EventContentArg } from "@fullcalendar/core";
import { EventImpl } from "@fullcalendar/core/internal";
import { BookingAggreate } from "@jamalsoueidan/bsb.mongodb.types";
import { Calendar } from "@jamalsoueidan/bsf.components.calendar";
import { LoadingSpinner } from "@jamalsoueidan/bsf.components.loading.loading-spinner";
import { Text } from "@jamalsoueidan/bsf.helpers.text";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useFulfillment } from "@jamalsoueidan/bsf.hooks.use-fulfillment";
import { Avatar, Tooltip } from "@shopify/polaris";
import React, { Suspense, memo, useCallback, useMemo, useState } from "react";

export interface BookingCalendarEvent {
  booking: BookingAggreate;
  event: EventImpl;
}

export interface BookingCalendarProps {
  /**
   * a node to be rendered in the special component.
   */
  data: Array<BookingAggreate>;
  onClickBooking?: (info: BookingCalendarEvent) => void;
  onChangeDate?: (date: Pick<BookingAggreate, "start" | "end">) => void;
}

export const BookingCalendar = memo(({ data, onClickBooking, onChangeDate }: BookingCalendarProps) => {
  const [date, setDate] = useState<Pick<BookingAggreate, "start" | "end">>();
  const { getColor } = useFulfillment();
  const { toTimeZone } = useDate();

  const dateChanged = useCallback(
    (props: DatesSetArg) => {
      const newDate = {
        start: props.start.toISOString().slice(0, 10),
        end: props.end.toISOString().slice(0, 10),
      };

      if (newDate.start !== date?.start || newDate.end !== date?.end) {
        setDate(newDate);
        if (onChangeDate) {
          onChangeDate(newDate);
        }
      }
    },
    [date?.end, date?.start, onChangeDate],
  );

  const events = useMemo(
    () =>
      data?.map((d) => ({
        ...d,
        start: toTimeZone(new Date(d.start)),
        end: toTimeZone(new Date(d.end)),
        backgroundColor: getColor(d.fulfillmentStatus),
        color: getColor(d.fulfillmentStatus),
        textColor: "#202223",
      })) || [],
    [data, getColor, toTimeZone],
  );

  const eventContent = useCallback((arg: EventContentArg) => {
    const booking: BookingAggreate = arg.event.extendedProps as BookingAggreate;
    const extendHour =
      arg?.event?.start && arg?.event?.end ? (
        <i>
          {`${Text.padTo2Digits(arg.event.start.getHours())}:${Text.padTo2Digits(arg.event.start.getMinutes())}`}
          {`${Text.padTo2Digits(arg.event.end.getHours())}:${Text.padTo2Digits(arg.event.end.getMinutes())}`}
        </i>
      ) : null;

    const fulfillmentStatus = booking.fulfillmentStatus || "In progress";

    return (
      <Tooltip content={fulfillmentStatus} dismissOnMouseOut>
        <div style={{ cursor: "pointer", padding: "4px", position: "relative" }}>
          <div>{extendHour}</div>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: "4px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Avatar size="small" name={booking.staff?.fullname} shape="square" source={booking.staff?.avatar} />
          </div>
          <div
            style={{
              overflow: "hidden",
            }}
          >
            {arg.event.title}
            <br />
            {booking.staff.fullname}
          </div>
        </div>
      </Tooltip>
    );
  }, []);

  const showBooking = useCallback(
    ({ event }: EventClickArg) => {
      if (onClickBooking) {
        onClickBooking({
          booking: event._def.extendedProps as BookingAggreate,
          event,
        });
      }
    },
    [onClickBooking],
  );

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Calendar events={events} eventContent={eventContent} datesSet={dateChanged} eventClick={showBooking} />
    </Suspense>
  );
});
