import { withApplicationCard } from "@jamalsoueidan/bit-dev.preview.with-application";
import { useStaff } from "@jamalsoueidan/frontend.state.staff";
import React from "react";
import { ScheduleModalCreateOneShift } from "./schedule-modal-create-one-shift";

export const BasicScheduleModalCreateOneShift = withApplicationCard(() => {
  const { data } = useStaff();
  if (!data) {
    return <>Loading</>;
  }
  return <ScheduleModalCreateOneShift date={new Date()} staff={data[0]._id} />;
});
