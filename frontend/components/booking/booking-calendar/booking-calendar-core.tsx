import {
  CalendarOptions,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { BookingServiceGetByIdReturn } from "@jamalsoueidan/backend.types.booking";
import { Calendar } from "@jamalsoueidan/frontend.components.calendar";
import {
  CalendarDate,
  CalendarType,
} from "@jamalsoueidan/frontend.components.calendar/calendar";
import { LoadingSpinner } from "@jamalsoueidan/frontend.components.loading.loading-spinner";
import { useDate } from "@jamalsoueidan/frontend.hooks.use-date";
import { useFulfillment } from "@jamalsoueidan/frontend.hooks.use-fulfillment";
import { Avatar, Tooltip } from "@shopify/polaris";
import React, { Suspense, forwardRef, useCallback, useMemo } from "react";

export interface BookingCalendarCoreProps {
  data: Array<BookingServiceGetByIdReturn>;
  onClickBooking?: (booking: BookingServiceGetByIdReturn) => void;
  onChangeDate: (date: CalendarDate) => void;
  headerToolbar?: CalendarOptions["headerToolbar"];
}

export const BookingCalendarCore = forwardRef<
  CalendarType,
  BookingCalendarCoreProps
>(({ data, onClickBooking, onChangeDate, headerToolbar }, ref) => {
  const { selectFulfillmentColor } = useFulfillment();
  const { onlyFormat } = useDate();

  const events = useMemo(
    () =>
      data?.map((d) => ({
        ...d,
        backgroundColor: selectFulfillmentColor(d.fulfillmentStatus),
        color: selectFulfillmentColor(d.fulfillmentStatus),
        end: d.end,
        start: d.start,
        textColor: "#202223",
      })) || [],
    [data, selectFulfillmentColor],
  );

  const renderItem = useCallback(
    (arg: EventContentArg) => {
      const extendHour =
        arg?.event?.start && arg?.event?.end ? (
          <i>
            {onlyFormat(arg.event.start, "p")}
            {" - "}
            {onlyFormat(arg.event.end, "p")}
          </i>
        ) : null;

      const booking = arg.event.extendedProps as BookingServiceGetByIdReturn;
      const fulfillmentStatus = booking.fulfillmentStatus || "In progress";

      return (
        <Tooltip content={fulfillmentStatus} dismissOnMouseOut>
          <div
            style={{
              cursor: "pointer",
              padding: "4px",
              position: "relative",
            }}
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
              {booking.staff?.fullname || "-"}
            </div>
          </div>
        </Tooltip>
      );
    },
    [onlyFormat],
  );

  const handleClickEvent = useCallback(
    ({ event }: EventClickArg) => {
      if (onClickBooking) {
        onClickBooking(event._def.extendedProps as BookingServiceGetByIdReturn);
      }
    },
    [onClickBooking],
  );

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Calendar
        ref={ref}
        events={events}
        eventContent={renderItem}
        datesSet={onChangeDate}
        eventClick={handleClickEvent}
        headerToolbar={headerToolbar}
      />
    </Suspense>
  );
});
