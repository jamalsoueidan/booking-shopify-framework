import da from "@fullcalendar/core/locales/da";
import en from "@fullcalendar/core/locales/en-gb";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useSettings } from "@jamalsoueidan/bsf.hooks.use-settings";
import React, { forwardRef } from "react";

export const Calendar = forwardRef<FullCalendar, any>((props, ref) => {
  const { language } = useSettings();

  return (
    <FullCalendar
      height="auto"
      ref={ref}
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin, listPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        center: "title",
        left: "today prev,next",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      }}
      firstDay={1}
      dayMaxEvents
      slotDuration="00:15:00"
      slotLabelFormat={[
        {
          hour: "numeric",
          meridiem: "short",
          minute: "2-digit",
          omitZeroMinute: false,
        },
      ]}
      eventDisplay="block"
      slotMinTime="07:00"
      slotMaxTime="20:00"
      locales={[da, en]}
      locale={language}
      buttonText={{
        next: ">>",
        prev: "<<",
      }}
      {...props}
    />
  );
});
