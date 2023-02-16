import { withApplication } from "@jamalsoueidan/bsd.preview.with-application";
import { Card } from "@shopify/polaris";
import React from "react";
import mock from "./mock";
import { ScheduleCalendar } from "./schedule-calendar";

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
  { pageTitle: "Booking Calendar" },
);

export const Notoolbar = withApplication(
  () => (
    <Card sectioned>
      <ScheduleCalendar
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
  { pageTitle: "Booking Calendar" },
);
