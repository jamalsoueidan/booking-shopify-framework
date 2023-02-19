import { Staff } from "@jamalsoueidan/bsb.types.staff";
import {
  BookingInputFulfillment,
  BookingInputFulfillmentField,
} from "@jamalsoueidan/bsf.components.booking.booking-input-fulfillment";
import {
  BookingInputStaff,
  BookingInputStaffField,
} from "@jamalsoueidan/bsf.components.booking.booking-input-staff";
import {
  CalendarTitle,
  CalendarType,
} from "@jamalsoueidan/bsf.components.calendar";
import { CalendarView } from "@jamalsoueidan/bsf.components.calendar/calendar";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Box, Button, ButtonGroup, Stack } from "@shopify/polaris";
import {
  Column1Major,
  Columns2Major,
  Columns3Major,
  MobileHamburgerMajor,
  ResetMinor,
} from "@shopify/polaris-icons";
import { useField } from "@shopify/react-form";
import React, { useCallback, useMemo, useRef } from "react";
import {
  BookingCalendarCore,
  BookingCalendarCoreProps,
} from "./booking-calendar-core";

export type BookingCalendarProps = {
  staff: Staff[];
} & BookingCalendarCoreProps;

export const BookingCalendar = (props: BookingCalendarProps) => {
  const { t } = useTranslation({ id: "booking-calendar", locales });
  const staffField = useField<BookingInputStaffField>(undefined);
  const fulfillmentField = useField<BookingInputFulfillmentField>(undefined);

  const ref = useRef<CalendarType>(null);

  const changeView = useCallback((value: CalendarView) => {
    ref.current?.getApi().changeView(value);
  }, []);

  const reset = useCallback(() => {
    staffField.onChange(undefined);
    fulfillmentField.onChange(undefined);
    changeView("dayGridMonth");
    ref.current?.getApi().today();
  }, [changeView, fulfillmentField, staffField]);

  const handlePrev = useCallback(() => {
    ref.current?.getApi().prev();
  }, []);

  const handleNext = useCallback(() => {
    ref.current?.getApi().next();
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
            <CalendarTitle calendarRef={ref.current} />
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
            {t("reset")}
          </Button>

          <BookingInputFulfillment
            field={fulfillmentField}
            input={{
              labelHidden: true,
              placeholder: t("input.fulfillment"),
              size: "medium",
            }}
          />
          <BookingInputStaff
            data={staffData}
            field={staffField}
            input={{
              labelHidden: true,
              placeholder: t("input.staff"),
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
              {t("dayGridMonth")}
            </Button>
            <Button
              onClick={() => changeView("timeGridWeek")}
              icon={Columns2Major}
            >
              {t("timeGridWeek")}
            </Button>
            <Button
              onClick={() => changeView("timeGridDay")}
              icon={Column1Major}
            >
              {t("timeGridDay")}
            </Button>
            <Button
              onClick={() => changeView("listWeek")}
              icon={MobileHamburgerMajor}
            >
              {t("listWeek")}
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

const locales = {
  da: {
    dayGridMonth: "Måned",
    input: {
      fulfillment: "Filtre status",
      staff: "Filtre medarbejder",
    },
    listWeek: "Liste",
    reset: "Nulstil",
    timeGridDay: "Dag",
    timeGridWeek: "Uge",
  },
  en: {
    dayGridMonth: "Month",
    input: {
      fulfillment: "Filter by status",
      staff: "Filter by staff",
    },
    listWeek: "List",
    reset: "Reset",
    timeGridDay: "Day",
    timeGridWeek: "Week",
  },
};
