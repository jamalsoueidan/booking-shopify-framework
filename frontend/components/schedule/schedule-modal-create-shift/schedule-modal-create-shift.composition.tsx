import { withApplicationCard } from "@jamalsoueidan/bit-dev.preview.with-application";
import { useStaff } from "@jamalsoueidan/frontend.state.staff";
import React from "react";
import { ScheduleModalCreateShift } from "./schedule-modal-create-shift";

export const BasicScheduleModalCreateShift = withApplicationCard(() => {
  const { data } = useStaff();
  if (!data) {
    return <>Loading</>;
  }

  return (
    <ScheduleModalCreateShift
      selectedDate={new Date()}
      staff={data[0]._id}
      close={() => {}}
    />
  );
});
