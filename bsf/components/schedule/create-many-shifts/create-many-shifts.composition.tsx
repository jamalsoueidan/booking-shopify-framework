import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { useToast } from "@jamalsoueidan/bsf.hooks.use-toast";
import { SubmitResult } from "@shopify/react-form";
import React, { useCallback, useRef, useState } from "react";
import { Button, Card } from "@shopify/polaris";
import {
  CreateManyShifts,
  CreateManyShiftsRefMethod,
} from "./create-many-shifts";

const MockComponent = () => {
  const ref = useRef<CreateManyShiftsRefMethod>();
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
      <CreateManyShifts
        date={new Date().toDateString()}
        onSubmit={onSubmit}
        ref={ref}
      />

      <div>
        <pre>{JSON.stringify(body, null, 2)}</pre>
      </div>
    </Card>
  );
};

export const BasicCreateManyShifts = () => {
  return (
    <ApplicationFramePage title="Create many shifts">
      <MockComponent />
    </ApplicationFramePage>
  );
};
