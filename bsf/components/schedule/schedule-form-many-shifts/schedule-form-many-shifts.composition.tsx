import { Tag } from "@jamalsoueidan/bsb.types.tag";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { useToast } from "@jamalsoueidan/bsf.hooks.use-toast";
import { Card } from "@shopify/polaris";
import { addMonths, setHours, setMinutes } from "date-fns";
import React, { useCallback, useRef, useState } from "react";
import {
  ScheduleFormManyShifts,
  ScheduleFormManyShiftsBody,
  ScheduleFormManyShiftsRefMethod,
  ScheduleFormManyShiftsSubmitResult,
} from "./schedule-form-many-shifts";

const MockComponent = ({ data }: { data?: ScheduleFormManyShiftsBody }) => {
  const ref = useRef<ScheduleFormManyShiftsRefMethod>(null);
  const { show } = useToast();
  const [body, setBody] = useState({});

  const onSubmit = useCallback(
    (
      fieldValues: ScheduleFormManyShiftsBody,
    ): ScheduleFormManyShiftsSubmitResult => {
      setBody(fieldValues);
      show({ content: "Schedules created" });
      return {
        status: "success",
      };
    },
    [show],
  );

  const submit = useCallback(() => {
    ref?.current?.submit();
  }, [ref]);

  return (
    <Card
      sectioned
      primaryFooterAction={{ content: "Submit", onAction: submit }}
    >
      <ScheduleFormManyShifts data={data} onSubmit={onSubmit} ref={ref} />

      <div>
        <pre>{JSON.stringify(body, null, 2)}</pre>
      </div>
    </Card>
  );
};

export const BasicCreateShifts = () => (
  <ApplicationFramePage title="Create shifts">
    <MockComponent />
  </ApplicationFramePage>
);

const initData: ScheduleFormManyShiftsBody = {
  days: ["monday"],
  end: addMonths(setMinutes(setHours(new Date(), 16), 0), 1),
  start: setMinutes(setHours(new Date(), 10), 0),
  tag: Tag.all_day,
};

export const BasicEditShifts = () => (
  <ApplicationFramePage title="Edit shifts">
    <MockComponent data={initData} />
  </ApplicationFramePage>
);
