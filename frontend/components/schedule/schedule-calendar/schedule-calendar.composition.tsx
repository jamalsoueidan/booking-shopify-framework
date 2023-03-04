import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { Card } from "@shopify/polaris";
import React from "react";
import mock from "./mock";
import { ScheduleCalendar } from "./schedule-calendar";
import { ScheduleCalendarCore } from "./schedule-core";

export const Basic = withApplication(
  () => (
    <Card sectioned>
      <ScheduleCalendar
        data={mock}
        onChangeDate={() => null}
        onClick={() => null}
        onClickSchedule={() => null}
      />
    </Card>
  ),
  { title: "Schedule Calendar" },
);

export const Notoolbar = withApplication(
  () => (
    <Card sectioned>
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
    </Card>
  ),
  { title: "Schedule Calendar no toolbar" },
);
