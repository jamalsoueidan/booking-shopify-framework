import { withApplicationCard } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { ScheduleModalEditManyShifts } from "./schedule-modal-edit-many-shifts";

export const BasicScheduleModalEditManyShifts = withApplicationCard(
  () => (
    <ScheduleModalEditManyShifts
      schedule={{
        _id: "6412ac03934660e21ffafd8b",
        groupId: "1678945283606",
        staff: "640c3580a44a7de77c8d17c6",
      }}
      close={() => {}}
    />
  ),
  { isLive: true },
);
