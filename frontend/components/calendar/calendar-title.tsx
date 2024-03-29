import { useDate } from "@jamalsoueidan/frontend.hooks.use-date";
import { Text } from "@shopify/polaris";
import { addDays, isEqual } from "date-fns";
import React, { useLayoutEffect, useState } from "react";
import { CalendarType, CalendarView } from "./calendar";

export type CalendarTitleProps = {
  calendarRef: CalendarType | null;
};

export const CalendarTitle = ({ calendarRef }: CalendarTitleProps) => {
  const [date, setDate] = useState<Date>();
  const [view, setView] = useState<CalendarView>();
  const { format } = useDate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const calendarCurrentStart = calendarRef?.getApi().view.currentStart;
    if (!isEqual(calendarCurrentStart || new Date(), date || new Date())) {
      setDate(calendarRef?.getApi().view.currentStart);
    }
    const calendarViewType = calendarRef?.getApi().view.type as CalendarView;
    if (calendarViewType !== view) {
      setView(calendarViewType);
    }
  });

  if (!date) {
    return <></>;
  }

  const multimonth = view === "multiMonthYear" && format(date, "MMMM yyyy");
  const dayGridMonth = view === "dayGridMonth" && format(date, "MMMM yyyy");
  const timeGridWeek =
    view === "timeGridWeek" &&
    `${format(date, "PP")} - ${format(addDays(date, 6), "PP")}`;
  const timeGridDay = view === "timeGridDay" && format(date, "PPP");
  const listWeek =
    view === "listWeek" &&
    `${format(date, "PP")} - ${format(addDays(date, 6), "PP")}`;

  return (
    <Text as="h1" variant="heading2xl">
      {multimonth}
      {dayGridMonth}
      {timeGridWeek}
      {timeGridDay}
      {listWeek}
    </Text>
  );
};
