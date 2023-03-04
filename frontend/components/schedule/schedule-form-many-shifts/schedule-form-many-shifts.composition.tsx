import { Tag } from "@jamalsoueidan/backend.types.tag";
import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { useToast } from "@jamalsoueidan/frontend.providers.toast";
import { Card } from "@shopify/polaris";
import { addMonths, setHours, setMinutes } from "date-fns";
import React, { useCallback, useRef, useState } from "react";
import {
  ScheduleFormManyShifts,
  ScheduleFormManyShiftsAllowEditing,
  ScheduleFormManyShiftsBody,
  ScheduleFormManyShiftsRefMethod,
  ScheduleFormManyShiftsSubmitResult,
} from "./schedule-form-many-shifts";

const MockComponent = ({
  data,
  allowEditing,
}: {
  data: ScheduleFormManyShiftsBody;
  allowEditing?: ScheduleFormManyShiftsAllowEditing;
}) => {
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
      <ScheduleFormManyShifts
        data={data}
        allowEditing={allowEditing}
        onSubmit={onSubmit}
        ref={ref}
      />

      <div>
        <pre>{JSON.stringify(body, null, 2)}</pre>
      </div>
    </Card>
  );
};

const initData: ScheduleFormManyShiftsBody = {
  days: ["monday"],
  end: addMonths(setMinutes(setHours(new Date(), 16), 0), 1),
  start: setMinutes(setHours(new Date(), 10), 0),
  tag: Tag.all_day,
};

export const BasicCreateShifts = withApplication(
  () => <MockComponent data={initData} allowEditing={{ tag: true }} />,
  { title: "Create shifts" },
);

export const BasicEditShifts = withApplication(
  () => <MockComponent data={initData} />,
  { title: "Edit shifts" },
);
