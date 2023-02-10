import { EventClickArg, EventContentArg } from "@fullcalendar/core";
import { Booking } from "@jamalsoueidan/bsb.types/booking";
import { Calendar } from "@jamalsoueidan/bsf.components.calendar";
import { CalendarDateState } from "@jamalsoueidan/bsf.components.calendar/calendar";
import { LoadingSpinner } from "@jamalsoueidan/bsf.components.loading.loading-spinner";
import { HelperText } from "@jamalsoueidan/bsf.helpers.helper-text";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useFulfillment } from "@jamalsoueidan/bsf.hooks.use-fulfillment";
import { Avatar, Tooltip } from "@shopify/polaris";
import React, { Suspense, memo, useCallback, useMemo } from "react";

export interface BookingCalendarProps {
  data: Array<Booking>;
  onClickBooking: (booking: Booking) => void;
  onChangeDate: (date: CalendarDateState) => void;
}

export const BookingCalendar = memo(
  ({ data, onClickBooking, onChangeDate }: BookingCalendarProps) => {
    const { getColor } = useFulfillment();
    const { toTimeZone } = useDate();

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

    const renderItem = useCallback((arg: EventContentArg) => {
      const booking: Booking = arg.event.extendedProps as Booking;
      const extendHour =
        arg?.event?.start && arg?.event?.end ? (
          <i>
            {`${HelperText.padTo2Digits(
              arg.event.start.getHours(),
            )}:${HelperText.padTo2Digits(arg.event.start.getMinutes())}`}
            {`${HelperText.padTo2Digits(
              arg.event.end.getHours(),
            )}:${HelperText.padTo2Digits(arg.event.end.getMinutes())}`}
          </i>
        ) : null;

      const fulfillmentStatus = booking.fulfillmentStatus || "In progress";

      return (
        <Tooltip content={fulfillmentStatus} dismissOnMouseOut>
          <div
            style={{ cursor: "pointer", padding: "4px", position: "relative" }}
          >
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

    const handleClickEvent = useCallback(
      ({ event }: EventClickArg) => {
        onClickBooking(event._def.extendedProps as Booking);
      },
      [onClickBooking],
    );

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Calendar
          events={events}
          eventContent={renderItem}
          datesSet={onChangeDate}
          eventClick={handleClickEvent}
        />
      </Suspense>
    );
  },
);
