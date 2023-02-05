import { DatesSetArg, EventClickArg, EventContentArg } from "@fullcalendar/core";
import { BookingResponse } from "@jamalsoueidan/bsb.mongodb.types";
import { Calendar } from "@jamalsoueidan/bsf.components.calendar";
import { LoadingSpinner } from "@jamalsoueidan/bsf.components.loading.loading-spinner";
import { HelperText } from "@jamalsoueidan/bsf.helpers.helper-text";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useFulfillment } from "@jamalsoueidan/bsf.hooks.use-fulfillment";
import { Avatar, Tooltip } from "@shopify/polaris";
import React, { Suspense, memo, useCallback, useMemo, useState } from "react";

export type BookingCalendarDateState = Pick<BookingResponse, "start" | "end">;

export interface BookingCalendarProps {
  data: Array<BookingResponse>;
  onClickBooking: (booking: BookingResponse) => void;
  onChangeDate: (date: BookingCalendarDateState) => void;
}

export const BookingCalendar = memo(({ data, onClickBooking, onChangeDate }: BookingCalendarProps) => {
  const [date, setDate] = useState<BookingCalendarDateState>();
  const { getColor } = useFulfillment();
  const { toTimeZone } = useDate();

  const handleChangeDate = useCallback(
    (props: DatesSetArg) => {
      const newDate = {
        end: props.end.toISOString().slice(0, 10),
        start: props.start.toISOString().slice(0, 10),
      };

      if (newDate.start !== date?.start || newDate.end !== date?.end) {
        setDate(newDate);
        onChangeDate(newDate);
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

  const renderItem = useCallback((arg: EventContentArg) => {
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

  const handleClickEvent = useCallback(
    ({ event }: EventClickArg) => {
      onClickBooking(event._def.extendedProps as BookingResponse);
    },
    [onClickBooking],
  );

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Calendar events={events} eventContent={renderItem} datesSet={handleChangeDate} eventClick={handleClickEvent} />
    </Suspense>
  );
});
