import { Tag } from "@jamalsoueidan/backend.types.tag";
import { withApplicationCard } from "@jamalsoueidan/bit-dev.preview.with-application";
import { addMonths } from "date-fns";
import React from "react";
import { ScheduleModalEditOneShift } from "./schedule-modal-edit-one-shift";

export const BasicScheduleModalEditOneShift = withApplicationCard(() => (
  <ScheduleModalEditOneShift
    schedule={{
      _id: "1",
      end: addMonths(new Date(), 1),
      groupId: "1",
      shop: "testeriphone",
      staff: "1",
      start: new Date(),
      tag: Tag.all_day,
    }}
    close={() => {}}
  />
));
