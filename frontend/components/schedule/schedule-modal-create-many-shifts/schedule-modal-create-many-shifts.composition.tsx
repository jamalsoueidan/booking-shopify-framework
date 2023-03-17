import { withApplicationCard } from "@jamalsoueidan/bit-dev.preview.with-application";
import { ScheduleFormManyShiftsRefMethod } from "@jamalsoueidan/frontend.components.schedule.schedule-form-many-shifts";
import { useStaff } from "@jamalsoueidan/frontend.state.staff";
import { Button } from "@shopify/polaris";
import React, { useCallback, useRef } from "react";
import { ScheduleModalCreateManyShifts } from "./schedule-modal-create-many-shifts";

export const BasicScheduleModalCreateManyShifts = withApplicationCard(
  () => {
    const ref = useRef<ScheduleFormManyShiftsRefMethod>(null);
    const { data } = useStaff();

    const submit = useCallback(() => {
      ref.current?.submit();
    }, []);

    if (!data) {
      return <>Loading</>;
    }
    return (
      <>
        <ScheduleModalCreateManyShifts
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
