import { ScheduleFormManyShiftsRefMethod } from "@jamalsoueidan/frontend.components.schedule.schedule-form-many-shifts";
import { ScheduleFormOneShiftRefMethod } from "@jamalsoueidan/frontend.components.schedule.schedule-form-one-shift";
import { ScheduleModalCreateManyShifts } from "@jamalsoueidan/frontend.components.schedule.schedule-modal-create-many-shifts";
import { ScheduleModalCreateOneShift } from "@jamalsoueidan/frontend.components.schedule.schedule-modal-create-one-shift";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
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
  const { t } = useTranslation({
    id: "schedule-modal-create-shift",
    locales,
  });
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
    } else {
      setLoading(false);
    }
  }, [close]);

  const tabs = [
    {
      content: t("create_range"),
      id: "create-all",
    },
    {
      content: t("create_day"),
      id: "create-day",
    },
  ];

  return (
    <Modal
      open
      onClose={close}
      title={t("title")}
      primaryAction={{
        content: `${tabs[selected].content}`,
        loading,
        onAction: submit,
      }}
      secondaryActions={[
        {
          content: t("close"),
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

const locales = {
  da: {
    close: "Luk",
    create_day: "Opret en vagtplan",
    create_range: "Opret flere vagtplan",
    title: "Tilføj vagt til skema",
  },
  en: {
    close: "Close",
    create_day: "Create for day",
    create_range: "Create for range",
    title: "New availability",
  },
};
