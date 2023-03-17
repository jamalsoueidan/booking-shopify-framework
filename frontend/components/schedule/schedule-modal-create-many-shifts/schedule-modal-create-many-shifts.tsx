import {
  ScheduleServiceCreateGroupBodyProps,
  ScheduleServiceDaysInterval,
} from "@jamalsoueidan/backend.types.schedule";
import { Tag } from "@jamalsoueidan/backend.types.tag";
import {
  ScheduleFormManyShifts,
  ScheduleFormManyShiftsBody,
  ScheduleFormManyShiftsRefMethod,
  ScheduleFormManyShiftsSubmitResult,
} from "@jamalsoueidan/frontend.components.schedule.schedule-form-many-shifts";
import { HelperDate } from "@jamalsoueidan/frontend.helpers.helper-date";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { useToast } from "@jamalsoueidan/frontend.providers.toast";
import { useStaffScheduleCreateGroup } from "@jamalsoueidan/frontend.state.schedule";
import { endOfMonth } from "date-fns";
import React, { forwardRef, useCallback, useMemo } from "react";

export interface ScheduleModalCreateManyShiftsProps {
  date: Date;
  staff: string;
}

export const ScheduleModalCreateManyShifts = forwardRef<
  ScheduleFormManyShiftsRefMethod,
  ScheduleModalCreateManyShiftsProps
>(({ date, staff }, ref) => {
  const { show } = useToast();
  const { createGroup } = useStaffScheduleCreateGroup({ staff });
  const { t } = useTranslation({
    id: "schedule-modal-create-many-shifts",
    locales,
  });

  const onSubmit = useCallback(
    (
      fieldValues: ScheduleFormManyShiftsBody,
    ): ScheduleFormManyShiftsSubmitResult => {
      createGroup(fieldValues);
      show({ content: t("success") });
      return { status: "success" };
    },
    [createGroup, show, t],
  );

  const initData: ScheduleServiceCreateGroupBodyProps = useMemo(
    () => ({
      days: [
        date
          .toLocaleString("en-US", {
            weekday: "long",
          })
          .toLowerCase() as ScheduleServiceDaysInterval,
      ],
      end: HelperDate.resetDateTime(endOfMonth(date), 16),
      start: HelperDate.resetDateTime(date, 10),
      tag: Tag.all_day,
    }),
    [date],
  );

  return (
    <ScheduleFormManyShifts
      data={initData}
      onSubmit={onSubmit}
      ref={ref}
      allowEditing={{ tag: true }}
    />
  );
});

const locales = {
  da: {
    success: "Vagtplaner oprettet",
  },
  en: {
    success: "Shifts created",
  },
};
