import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { AlphaCard } from "@shopify/polaris";
import React from "react";
import mock from "./mock";
import { ScheduleCalendar } from "./schedule-calendar";
import { ScheduleCalendarCore } from "./schedule-core";

export const Basic = withApplication(
  () => (
    <AlphaCard>
      <ScheduleCalendar
        data={mock}
        onChangeDate={() => null}
        onClick={() => null}
        onClickSchedule={() => null}
      />
    </AlphaCard>
  ),
  { title: "Schedule Calendar" },
);

export const Notoolbar = withApplication(
  () => (
    <AlphaCard>
      <ScheduleCalendarCore
        data={mock}
        onChangeDate={() => null}
        onClick={() => null}
        onClickSchedule={() => null}
        headerToolbar={{
          center: undefined,
          left: undefined,
          right: undefined,
        }}
      />
    </AlphaCard>
  ),
  { title: "Schedule Calendar no toolbar" },
);
