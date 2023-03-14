import { Tag } from "@jamalsoueidan/backend.types.tag";
import { withApplicationCard } from "@jamalsoueidan/bit-dev.preview.with-application";
import { useStaff } from "@jamalsoueidan/frontend.state.staff";
import { addMonths } from "date-fns";
import React from "react";
import { ScheduleModalEditManyShifts } from "./schedule-modal-edit-many-shifts";

export const BasicScheduleModalEditManyShifts = withApplicationCard(() => {
  const { data } = useStaff();
  if (!data) {
    return <>Loading</>;
  }

  return (
    <ScheduleModalEditManyShifts
      schedule={{
        _id: "1",
        end: addMonths(new Date(), 1),
        groupId: "1",
        shop: "testeriphone",
        staff: data[0]._id,
        start: new Date(),
        tag: Tag.all_day,
      }}
      close={() => {}}
    />
  );
});
