import { withApplication } from "@jamalsoueidan/bsd.preview.with-application";
import { Card } from "@shopify/polaris";
import React from "react";
import mock from "./mock";
import { ScheduleCalendar } from "./schedule-calendar";

export const BasicScheduleCalendar = withApplication(
  () => (
    <Card sectioned>
      <ScheduleCalendar data={mock} onChangeDate={() => null} onClick={() => null} onClickSchedule={() => null} />
    </Card>
  ),
  { pageTitle: "Booking Calendar" },
);
