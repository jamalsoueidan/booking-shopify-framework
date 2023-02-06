import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { useToast } from "@jamalsoueidan/bsf.hooks.use-toast";
import { Card } from "@shopify/polaris";
import React, { useCallback, useRef, useState } from "react";
import {
  CreateOneShift,
  CreateOneShiftBody,
  CreateOneShiftRefMethod,
  CreateOneShiftSubmitResult,
} from "./create-one-shift";

const MockComponent = () => {
  const ref = useRef<CreateOneShiftRefMethod>(null);
  const { show } = useToast();
  const [body, setBody] = useState({});

  const onSubmit = useCallback(
    (fieldValues: CreateOneShiftBody): CreateOneShiftSubmitResult => {
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
      <CreateOneShift selectedDate={new Date()} onSubmit={onSubmit} ref={ref} />

      <div>
        <pre>{JSON.stringify(body, null, 2)}</pre>
      </div>
    </Card>
  );
};

export const BasicCreateOneShift = () => (
  <ApplicationFramePage title="Create one shift">
    <MockComponent />
  </ApplicationFramePage>
);
