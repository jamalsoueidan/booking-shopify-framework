import { Tag } from "@jamalsoueidan/backend.types.tag";
import { ApplicationFramePage } from "@jamalsoueidan/bit-dev.preview.application";
import { useToast } from "@jamalsoueidan/frontend.providers.toast";
import { Card } from "@shopify/polaris";
import { setHours, setMinutes } from "date-fns";
import React, { useCallback, useRef, useState } from "react";
import {
  ScheduleFormOneShift,
  ScheduleFormOneShiftAllowEditing,
  ScheduleFormOneShiftBody,
  ScheduleFormOneShiftRefMethod,
  ScheduleFormOneShiftSubmitResult,
} from "./schedule-form-one-shift";

const MockComponent = ({
  data,
  allowEditing,
}: {
  data: ScheduleFormOneShiftBody;
  allowEditing?: ScheduleFormOneShiftAllowEditing;
}) => {
  const ref = useRef<ScheduleFormOneShiftRefMethod>(null);
  const { show } = useToast();
  const [body, setBody] = useState({});

  const onSubmit = useCallback(
    (
      fieldValues: ScheduleFormOneShiftBody,
    ): ScheduleFormOneShiftSubmitResult => {
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
      <ScheduleFormOneShift
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

const initData: ScheduleFormOneShiftBody = {
  end: setMinutes(setHours(new Date(), 16), 0),
  start: setMinutes(setHours(new Date(), 10), 0),
  tag: Tag.all_day,
};

export const BasicCreateOneShift = () => (
  <ApplicationFramePage title="Create one shift">
    <MockComponent data={initData} allowEditing={{ tag: true }} />
  </ApplicationFramePage>
);

export const BasicEditOneShift = () => (
  <ApplicationFramePage title="Create one shift">
    <MockComponent data={initData} />
  </ApplicationFramePage>
);
