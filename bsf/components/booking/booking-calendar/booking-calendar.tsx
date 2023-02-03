import { DatesSetArg, EventClickArg, EventContentArg } from "@fullcalendar/core";
import { EventImpl } from "@fullcalendar/core/internal";
import { BookingResponse } from "@jamalsoueidan/bsb.mongodb.types";
import { Calendar } from "@jamalsoueidan/bsf.components.calendar";
import { LoadingSpinner } from "@jamalsoueidan/bsf.components.loading.loading-spinner";
import { HelperText } from "@jamalsoueidan/bsf.helpers.helper-text";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useFulfillment } from "@jamalsoueidan/bsf.hooks.use-fulfillment";
import { Avatar, Tooltip } from "@shopify/polaris";
import React, { Suspense, memo, useCallback, useMemo, useState } from "react";

export interface BookingCalendarEvent {
  booking: BookingResponse;
  event: EventImpl;
}

export interface BookingCalendarProps {
  /**
   * a node to be rendered in the special component.
   */
  data: Array<BookingResponse>;
  onClickBooking?: (info: BookingCalendarEvent) => void;
  onChangeDate?: (date: Pick<BookingResponse, "start" | "end">) => void;
}

export const BookingCalendar = memo(({ data, onClickBooking, onChangeDate }: BookingCalendarProps) => {
  const [date, setDate] = useState<Pick<BookingResponse, "start" | "end">>();
  const { getColor } = useFulfillment();
  const { toTimeZone } = useDate();

  const dateChanged = useCallback(
    (props: DatesSetArg) => {
      const newDate = {
        end: props.end.toISOString().slice(0, 10),
        start: props.start.toISOString().slice(0, 10),
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
        backgroundColor: getColor(d.fulfillmentStatus),
        color: getColor(d.fulfillmentStatus),
        end: toTimeZone(new Date(d.end)),
        start: toTimeZone(new Date(d.start)),
        textColor: "#202223",
      })) || [],
    [data, getColor, toTimeZone],
  );

  const eventContent = useCallback((arg: EventContentArg) => {
    const booking: BookingResponse = arg.event.extendedProps as BookingResponse;
    const extendHour =
      arg?.event?.start && arg?.event?.end ? (
        <i>
          {`${HelperText.padTo2Digits(arg.event.start.getHours())}:${HelperText.padTo2Digits(
            arg.event.start.getMinutes(),
          )}`}
          {`${HelperText.padTo2Digits(arg.event.end.getHours())}:${HelperText.padTo2Digits(
            arg.event.end.getMinutes(),
          )}`}
        </i>
      ) : null;

    const fulfillmentStatus = booking.fulfillmentStatus || "In progress";

    return (
      <Tooltip content={fulfillmentStatus} dismissOnMouseOut>
        <div style={{ cursor: "pointer", padding: "4px", position: "relative" }}>
          <div>{extendHour}</div>
          <div
            style={{
              alignItems: "center",
              bottom: 0,
              display: "flex",
              justifyContent: "flex-end",
              left: 0,
              position: "absolute",
              right: "4px",
              top: 0,
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
          booking: event._def.extendedProps as BookingResponse,
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
