import { DatesSetArg, EventClickArg } from "@fullcalendar/core";
import { EventImpl } from "@fullcalendar/core/internal";
import { Text } from "@jamalsoueidan/bsf.helpers.text";
import { LoadingSpinner } from "@jamalsoueidan/bsf.bsf-pkg";
import { Avatar, Tooltip } from "@shopify/polaris";
import React, { Suspense, memo, useCallback, useMemo, useState } from "react";
import { BookingAggreate } from "@jamalsoueidan/bsb.mongodb.types";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useFulfillment } from "@jamalsoueidan/bsf.hooks.use-fulfillment";
import { Calendar } from "@jamalsoueidan/bsf.components.calendar";

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

export const BookingCalendar = memo(
  ({ data, onClickBooking, onChangeDate }: BookingCalendarProps) => {
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
          onChangeDate && onChangeDate(newDate);
        }
      },
      [date]
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
      [data]
    );

    const eventContent = useCallback((arg: any) => {
      const booking: BookingAggreate = arg.event.extendedProps;
      const extendHour = (
        <i>
          {Text.padTo2Digits(arg.event.start.getHours()) +
            ":" +
            Text.padTo2Digits(arg.event.start.getMinutes())}{" "}
          -
          {Text.padTo2Digits(arg.event.end.getHours()) +
            ":" +
            Text.padTo2Digits(arg.event.end.getMinutes())}
        </i>
      );

      const fulfillmentStatus = booking.fulfillmentStatus || "In progress";

      return (
        <Tooltip content={fulfillmentStatus} dismissOnMouseOut>
          <div
            style={{ cursor: "pointer", padding: "4px", position: "relative" }}
          >
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
              <Avatar
                size="small"
                name={booking.staff?.fullname}
                shape="square"
                source={booking.staff?.avatar}
              />
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

    const showBooking = useCallback(({ event }: EventClickArg) => {
      onClickBooking &&
        onClickBooking({
          booking: event._def.extendedProps,
          event,
        } as any);
    }, []);

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Calendar
          events={events}
          eventContent={eventContent}
          datesSet={dateChanged}
          eventClick={showBooking}
        />
      </Suspense>
    );
  }
);
