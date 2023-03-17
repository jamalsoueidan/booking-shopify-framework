import { withApplicationCard } from "@jamalsoueidan/bit-dev.preview.with-application";
import { ScheduleFormOneShiftRefMethod } from "@jamalsoueidan/frontend.components.schedule.schedule-form-one-shift";
import { useStaff } from "@jamalsoueidan/frontend.state.staff";
import { Button } from "@shopify/polaris";
import React, { useCallback, useRef } from "react";
import { ScheduleModalCreateOneShift } from "./schedule-modal-create-one-shift";

export const BasicScheduleModalCreateOneShift = withApplicationCard(
  () => {
    const ref = useRef<ScheduleFormOneShiftRefMethod>(null);
    const { data } = useStaff();

    const submit = useCallback(() => {
      ref.current?.submit();
    }, []);

    if (!data) {
      return <>Loading</>;
    }
    return (
      <>
        <ScheduleModalCreateOneShift
          ref={ref}
          date={new Date()}
          staff={data[0]._id}
        />
        <Button onClick={submit}>Submit</Button>
      </>
    );
  },
  { isLive: true },
);
