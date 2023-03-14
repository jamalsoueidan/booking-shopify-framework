import { withApplicationCard } from "@jamalsoueidan/bit-dev.preview.with-application";
import { useStaff } from "@jamalsoueidan/frontend.state.staff";
import React from "react";
import { ScheduleModalCreateManyShifts } from "./schedule-modal-create-many-shifts";

export const BasicScheduleModalCreateManyShifts = withApplicationCard(() => {
  const { data } = useStaff();
  if (!data) {
    return <>Loading</>;
  }
  return (
    <ScheduleModalCreateManyShifts date={new Date()} staff={data[0]._id} />
  );
});
