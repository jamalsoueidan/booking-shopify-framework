import { Schedule } from "@jamalsoueidan/backend.types.schedule";
import {
  ScheduleFormManyShifts,
  ScheduleFormManyShiftsBody,
  ScheduleFormManyShiftsRefMethod,
  ScheduleFormManyShiftsSubmitResult,
} from "@jamalsoueidan/frontend.components.schedule.schedule-form-many-shifts";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { useToast } from "@jamalsoueidan/frontend.providers.toast";
import {
  useStaffScheduleDestroy,
  useStaffScheduleDestroyGroup,
  useStaffScheduleGetGroup,
  useStaffScheduleUpdateGroup,
} from "@jamalsoueidan/frontend.state.schedule";
import { Modal } from "@shopify/polaris";
import React, { useCallback, useRef } from "react";

export interface ScheduleModalEditManyShiftsProps {
  schedule: Pick<Schedule, "_id" | "staff" | "groupId">;
  close: () => void;
}

export const ScheduleModalEditManyShifts = ({
  schedule,
  close,
}: ScheduleModalEditManyShiftsProps) => {
  const ref = useRef<ScheduleFormManyShiftsRefMethod>(null);
  const { show } = useToast();
  const { t } = useTranslation({
    id: "schedule-modal-edit-many-shifts",
    locales,
  });

  const { data: group } = useStaffScheduleGetGroup({
    groupId: schedule.groupId || "",
    staff: schedule.staff,
  });

  const { updateGroup } = useStaffScheduleUpdateGroup({
    groupId: schedule.groupId || "",
    staff: schedule.staff,
  });

  const { destroyGroup } = useStaffScheduleDestroyGroup({
    groupId: schedule.groupId || "",
    staff: schedule.staff,
  });

  const { destroy } = useStaffScheduleDestroy({
    schedule: schedule._id,
    staff: schedule.staff,
  });

  const onDestroy = useCallback(() => {
    destroyGroup();
    close();
  }, [close, destroyGroup]);

  const onDestroyOne = useCallback(() => {
    destroy();
    close();
  }, [close, destroy]);

  const onSubmit = useCallback(
    (
      fieldValues: ScheduleFormManyShiftsBody,
    ): ScheduleFormManyShiftsSubmitResult => {
      updateGroup(fieldValues);
      show({ content: t("success") });
      return { status: "success" };
    },
    [updateGroup, show, t],
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
          content: t("destroy_one"),
          destructive: true,
          onAction: onDestroyOne,
        },
        {
          content: t("destroy"),
          destructive: true,
          onAction: onDestroy,
        },
      ]}
    >
      <Modal.Section>
        {group && (
          <ScheduleFormManyShifts data={group} onSubmit={onSubmit} ref={ref} />
        )}
      </Modal.Section>
    </Modal>
  );
};

const locales = {
  da: {
    destroy: "Slet alle",
    destroy_one: "Slet pågældende",
    save_changes: "Gem ændringer",
    success: "Vagtplaner redigeret",
    title: "Redigere vagtplaner",
  },
  en: {
    destroy: "Delete all",
    destroy_one: "Delete one",
    save_changes: "Save changes",
    success: "Shifts edited",
    title: "Edit shifts",
  },
};
