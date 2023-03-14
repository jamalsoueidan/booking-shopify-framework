import { ScheduleFormManyShiftsRefMethod } from "@jamalsoueidan/frontend.components.schedule.schedule-form-many-shifts";
import { ScheduleFormOneShiftRefMethod } from "@jamalsoueidan/frontend.components.schedule.schedule-form-one-shift";
import { ScheduleModalCreateManyShifts } from "@jamalsoueidan/frontend.components.schedule.schedule-modal-create-many-shifts";
import { ScheduleModalCreateOneShift } from "@jamalsoueidan/frontend.components.schedule.schedule-modal-create-one-shift";
import { Modal, Tabs } from "@shopify/polaris";
import React, { useCallback, useRef, useState } from "react";

export interface ScheduleModalCreateShiftProps {
  selectedDate: Date;
  staff: string;
  close: () => void;
}

export const ScheduleModalCreateShift = ({
  selectedDate,
  staff,
  close,
}: ScheduleModalCreateShiftProps) => {
  const ref = useRef<
    ScheduleFormManyShiftsRefMethod | ScheduleFormOneShiftRefMethod
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  const submit = useCallback(() => {
    const noErrors = ref.current?.submit().length === 0;
    setLoading(true);
    if (noErrors) {
      close();
    }
  }, [close]);

  const tabs = [
    {
      content: "Create for range",
      id: "create-all",
    },
    {
      content: `Create for day`,
      id: "create-day",
    },
  ];

  return (
    <Modal
      open
      onClose={close}
      title="New availability"
      primaryAction={{
        content: `${tabs[selected].content}`,
        loading,
        onAction: submit,
      }}
      secondaryActions={[
        {
          content: "Luk",
          onAction: close,
        },
      ]}
    >
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Modal.Section>
          {tabs[selected].id === "create-day" ? (
            <ScheduleModalCreateOneShift
              ref={ref}
              date={selectedDate}
              staff={staff}
            />
          ) : (
            <ScheduleModalCreateManyShifts
              ref={ref}
              date={selectedDate}
              staff={staff}
            />
          )}
        </Modal.Section>
      </Tabs>
    </Modal>
  );
};
