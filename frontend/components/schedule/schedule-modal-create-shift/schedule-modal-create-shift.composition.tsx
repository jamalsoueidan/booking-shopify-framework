import { withApplicationCard } from "@jamalsoueidan/bit-dev.preview.with-application";
import { Button } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { ScheduleModalCreateShift } from "./schedule-modal-create-shift";

const MockComponent = ({ close }: { close: () => void }) => (
  <ScheduleModalCreateShift
    selectedDate={new Date()}
    staff="640c3580a44a7de77c8d17c6"
    close={close}
  />
);

export const Basic = withApplicationCard(
  () => {
    const [open, setOpen] = useState(true);
    const onClick = useCallback(() => {
      setOpen((state) => !state);
    }, []);

    return (
      <>
        <Button onClick={onClick}>Show Create Shift</Button>
        {open ? <MockComponent close={onClick} /> : null}
      </>
    );
  },
  { isLive: true, title: "Create Shift" },
);
