import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { useToast } from "@jamalsoueidan/bsf.hooks.use-toast";
import { Card } from "@shopify/polaris";
import { SubmitResult } from "@shopify/react-form";
import React, { useCallback, useRef, useState } from "react";
import { CreateOneShift, CreateOneShiftRefMethod } from "./create-one-shift";

const MockComponent = () => {
  const ref = useRef<CreateOneShiftRefMethod>();
  const { show } = useToast();
  const [body, setBody] = useState({});

  const onSubmit = useCallback((fieldValues): SubmitResult => {
    setBody(fieldValues);
    show({ content: "Schedules created" });
    return {
      status: "success",
    };
  }, []);

  const submit = useCallback(() => {
    ref?.current?.submit();
  }, [ref]);

  return (
    <Card
      sectioned
      primaryFooterAction={{ content: "Submit", onAction: submit }}
    >
      <CreateOneShift
        selectedDate={new Date().toDateString()}
        onSubmit={onSubmit}
        ref={ref}
      />

      <div>
        <pre>{JSON.stringify(body, null, 2)}</pre>
      </div>
    </Card>
  );
};

export const BasicCreateOneShift = () => {
  return (
    <ApplicationFramePage title="Create one shift">
      <MockComponent />
    </ApplicationFramePage>
  );
};
