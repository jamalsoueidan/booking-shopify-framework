import { Tag } from "@jamalsoueidan/backend.types.tag";
import {
  ScheduleFormOneShift,
  ScheduleFormOneShiftBody,
  ScheduleFormOneShiftRefMethod,
  ScheduleFormOneShiftSubmitResult,
} from "@jamalsoueidan/frontend.components.schedule.schedule-form-one-shift";
import { HelperDate } from "@jamalsoueidan/frontend.helpers.helper-date";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { useToast } from "@jamalsoueidan/frontend.providers.toast";
import { useStaffScheduleCreate } from "@jamalsoueidan/frontend.state.schedule";
import React, { forwardRef, useCallback, useMemo } from "react";

export interface ScheduleModalCreateOneShiftProps {
  date: Date;
  staff: string;
}

export const ScheduleModalCreateOneShift = forwardRef<
  ScheduleFormOneShiftRefMethod,
  ScheduleModalCreateOneShiftProps
>(({ date, staff }, ref) => {
  const { show } = useToast();
  const { t } = useTranslation({ id: "create-one-shifts-modal", locales });
  const { create } = useStaffScheduleCreate({ staff });

  const onSubmit = useCallback(
    (
      fieldValues: ScheduleFormOneShiftBody,
    ): ScheduleFormOneShiftSubmitResult => {
      create(fieldValues);
      show({ content: t("success") });
      return { status: "success" };
    },
    [create, show, t],
  );

  const initData = useMemo(
    () => ({
      end: HelperDate.resetDateTime(date, 16),
      start: HelperDate.resetDateTime(date, 10),
      tag: Tag.all_day,
    }),
    [date],
  );

  return (
    <ScheduleFormOneShift
      data={initData}
      onSubmit={onSubmit}
      ref={ref}
      allowEditing={{ tag: true }}
    />
  );
});

const locales = {
  da: {
    success: "Vagtplan oprettet",
  },
  en: {
    success: "Shift created",
  },
};
