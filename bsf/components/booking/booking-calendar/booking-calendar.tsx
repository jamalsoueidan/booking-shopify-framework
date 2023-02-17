import { Staff } from "@jamalsoueidan/bsb.types";
import {
  BookingInputFulfillment,
  BookingInputFulfillmentField,
} from "@jamalsoueidan/bsf.components.booking.booking-input-fulfillment";
import {
  BookingInputStaff,
  BookingInputStaffField,
} from "@jamalsoueidan/bsf.components.booking.booking-input-staff";
import { CalendarType } from "@jamalsoueidan/bsf.components.calendar";
import { CalendarView } from "@jamalsoueidan/bsf.components.calendar/calendar";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { Box, Button, ButtonGroup, Stack, Text } from "@shopify/polaris";
import {
  Column1Major,
  Columns2Major,
  Columns3Major,
  MobileHamburgerMajor,
  ResetMinor,
} from "@shopify/polaris-icons";
import { useField } from "@shopify/react-form";
import { addDays, isEqual } from "date-fns";
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BookingCalendarCore,
  BookingCalendarCoreProps,
} from "./booking-calendar-core";

export type BookingCalendarProps = {
  staff: Staff[];
} & BookingCalendarCoreProps;

export const BookingCalendar = (props: BookingCalendarProps) => {
  const staffField = useField<BookingInputStaffField>(undefined);
  const fulfillmentField = useField<BookingInputFulfillmentField>(undefined);
  const [date, setDate] = useState<Date>();
  const [view, setView] = useState<CalendarView>("dayGridMonth");

  const ref = useRef<CalendarType>(null);

  const changeView = useCallback((value: CalendarView) => {
    ref.current?.getApi().changeView(value);
    setView(value);
  }, []);

  const reset = useCallback(() => {
    staffField.onChange(undefined);
    fulfillmentField.onChange(undefined);
    changeView("dayGridMonth");
    setView("dayGridMonth");
    ref.current?.getApi().today();
  }, [changeView, fulfillmentField, staffField]);

  const handlePrev = useCallback(() => {
    ref.current?.getApi().prev();
  }, []);

  const handleNext = useCallback(() => {
    ref.current?.getApi().next();
  }, []);

  useLayoutEffect(() => {
    const currentDate = ref.current?.getApi().view.currentStart;
    if (!isEqual(currentDate || new Date(), date || new Date())) {
      setDate(ref.current?.getApi().view.currentStart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useMemo(() => {
    const { data } = props;
    const filterStaff = staffField.value
      ? data?.filter((d) => d.staff._id === staffField.value?._id)
      : data;
    return fulfillmentField.value
      ? filterStaff.filter(
          (d) => d.fulfillmentStatus === fulfillmentField.value,
        )
      : filterStaff;
  }, [props, staffField.value, fulfillmentField.value]);

  const { staff: staffData } = props;

  return (
    <>
      <Stack>
        <Stack.Item fill>
          <Stack alignment="center">
            <BookingCalendarDateTitle date={date} view={view} />
            <ButtonGroup segmented>
              <Button onClick={handlePrev} size="slim">
                &#60;
              </Button>
              <Button onClick={handleNext} size="slim">
                &#62;
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack.Item>
        <Stack>
          <Button onClick={reset} icon={ResetMinor}>
            Nulstil
          </Button>

          <BookingInputFulfillment
            field={fulfillmentField}
            input={{
              labelHidden: true,
              placeholder: "Filtre status",
              size: "medium",
            }}
          />
          <BookingInputStaff
            data={staffData}
            field={staffField}
            input={{
              labelHidden: true,
              placeholder: "Filtre medarbejder",
              size: staffField.value ? "slim" : "medium",
            }}
          />
        </Stack>
      </Stack>

      <Box paddingBlockStart="5">
        <Stack>
          <ButtonGroup segmented>
            <Button
              onClick={() => changeView("dayGridMonth")}
              icon={Columns3Major}
            >
              Måned visning
            </Button>
            <Button
              onClick={() => changeView("timeGridWeek")}
              icon={Columns2Major}
            >
              Uge visning
            </Button>
            <Button
              onClick={() => changeView("timeGridDay")}
              icon={Column1Major}
            >
              dag visning
            </Button>
            <Button
              onClick={() => changeView("listWeek")}
              icon={MobileHamburgerMajor}
            >
              Liste visning
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>

      <BookingCalendarCore
        {...props}
        headerToolbar={{
          center: undefined,
          left: undefined,
          right: undefined,
        }}
        data={data}
        ref={ref}
      />
    </>
  );
};

export type BookingCalendarDateTitleProps = {
  date?: Date;
  view: CalendarView;
};

const BookingCalendarDateTitle = ({
  date,
  view,
}: BookingCalendarDateTitleProps) => {
  const { onlyFormat } = useDate();

  if (!date) {
    return <></>;
  }

  const dayGridMonth = view === "dayGridMonth" && onlyFormat(date, "MMMM yyyy");
  const timeGridWeek =
    view === "timeGridWeek" &&
    `${onlyFormat(date, "PP")} - ${onlyFormat(addDays(date, 6), "PP")}`;
  const timeGridDay = view === "timeGridDay" && onlyFormat(date, "PPP");
  const listWeek =
    view === "listWeek" &&
    `${onlyFormat(date, "PP")} - ${onlyFormat(addDays(date, 6), "PP")}`;

  return (
    <Text as="h1" variant="heading2xl">
      {dayGridMonth}
      {timeGridWeek}
      {timeGridDay}
      {listWeek}
    </Text>
  );
};
