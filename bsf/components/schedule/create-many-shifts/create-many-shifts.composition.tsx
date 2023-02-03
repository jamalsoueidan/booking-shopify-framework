import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { useToast } from "@jamalsoueidan/bsf.hooks.use-toast";
import { Card } from "@shopify/polaris";
import React, { useCallback, useRef, useState } from "react";
import {
  CreateManyShifts,
  CreateManyShiftsBody,
  CreateManyShiftsRefMethod,
  CreateManyShiftsSubmitResult,
} from "./create-many-shifts";

const MockComponent = () => {
  const ref = useRef<CreateManyShiftsRefMethod>(null);
  const { show } = useToast();
  const [body, setBody] = useState({});

  const onSubmit = useCallback(
    (fieldValues: CreateManyShiftsBody): CreateManyShiftsSubmitResult => {
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
    <Card sectioned primaryFooterAction={{ content: "Submit", onAction: submit }}>
      <CreateManyShifts selectedDate={new Date().toJSON()} onSubmit={onSubmit} ref={ref} />

      <div>
        <pre>{JSON.stringify(body, null, 2)}</pre>
      </div>
    </Card>
  );
};

export const BasicCreateManyShifts = () => (
  <ApplicationFramePage title="Create many shifts">
    <MockComponent />
  </ApplicationFramePage>
);
