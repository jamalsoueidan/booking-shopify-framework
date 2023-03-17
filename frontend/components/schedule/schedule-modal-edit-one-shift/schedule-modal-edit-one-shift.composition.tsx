import { Tag } from "@jamalsoueidan/backend.types.tag";
import { withApplicationCard } from "@jamalsoueidan/bit-dev.preview.with-application";
import { HelperDate } from "@jamalsoueidan/frontend.helpers.helper-date";
import React from "react";
import { ScheduleModalEditOneShift } from "./schedule-modal-edit-one-shift";

const end = HelperDate.resetDateTime(new Date(), 16);
const start = HelperDate.resetDateTime(new Date(), 10);

export const BasicScheduleModalEditOneShift = withApplicationCard(
  () => (
    <ScheduleModalEditOneShift
      schedule={{
        _id: "1",
        end,
        shop: "testeriphone.myshopify.com",
        staff: "1",
        start,
        tag: Tag.all_day,
      }}
      close={() => {}}
    />
  ),
  { isLive: true },
);
