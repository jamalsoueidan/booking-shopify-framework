import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { useToast } from "@jamalsoueidan/frontend.providers.toast";
import {
  useStaffScheduleDestroy,
  useStaffScheduleUpdate,
} from "@jamalsoueidan/frontend.state.schedule";
import React, { useCallback, useRef } from "react";

import { Schedule } from "@jamalsoueidan/backend.types.schedule";
import {
  ScheduleFormOneShift,
  ScheduleFormOneShiftBody,
  ScheduleFormOneShiftRefMethod,
  ScheduleFormOneShiftSubmitResult,
} from "@jamalsoueidan/frontend.components.schedule.schedule-form-one-shift";
import { Modal } from "@shopify/polaris";

export interface ScheduleModalEditOneShiftProps {
  schedule: Schedule;
  close: () => void;
}

export const ScheduleModalEditOneShift = ({
  schedule,
  close,
}: ScheduleModalEditOneShiftProps) => {
  const ref = useRef<ScheduleFormOneShiftRefMethod>(null);
  const { show } = useToast();
  const { t } = useTranslation({
    id: "schedule-modal-edit-one-shift",
    locales,
  });

  const { update } = useStaffScheduleUpdate({
    schedule: schedule._id,
    staff: schedule.staff,
  });

  const { destroy } = useStaffScheduleDestroy({
    schedule: schedule._id,
    staff: schedule.staff,
  });

  const onDestroy = useCallback(() => {
    destroy();
    close();
  }, [close, destroy]);

  const onSubmit = useCallback(
    (
      fieldValues: ScheduleFormOneShiftBody,
    ): ScheduleFormOneShiftSubmitResult => {
      update(fieldValues);
      show({ content: t("success") });
      return { status: "success" };
    },
    [update, show, t],
  );

  const submit = useCallback(() => {
    const noErrors = ref.current?.submit().length === 0;
    if (noErrors) {
      close();
    }
  }, [close]);

  return (
    <Modal
      open
      onClose={close}
      title={t("title")}
      primaryAction={{
        content: t("save_changes"),
        onAction: submit,
      }}
      secondaryActions={[
        {
          content: t("destroy"),
          destructive: true,
          onAction: onDestroy,
        },
      ]}
    >
      <Modal.Section>
        <ScheduleFormOneShift data={schedule} onSubmit={onSubmit} ref={ref} />
      </Modal.Section>
    </Modal>
  );
};

const locales = {
  da: {
    destroy: "Slet vagtplan",
    save_changes: "Gem ændringer",
    success: "Vagtplan redigeret",
    title: "Redigere vagtplan",
  },
  en: {
    destroy: "Delete shift",
    save_changes: "Save changes",
    success: "Shift edit",
    title: "Edit shift",
  },
};
