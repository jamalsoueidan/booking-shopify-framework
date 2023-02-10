import { Staff } from "@jamalsoueidan/bsb.types/staff";
import { LoadingSpinner } from "@jamalsoueidan/bsf.components.loading.loading-spinner";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Avatar, Button, Stack } from "@shopify/polaris";
import React, { memo, useCallback, useMemo } from "react";
import { da, en } from "./translations";

export interface BookingStaffProps {
  data: Staff[];
  selected?: Staff;
  isLoadingBookings?: boolean;
  onSelect: (value?: Staff) => void;
}

export type BookingStaffTranslationKeys = keyof typeof da;

export const BookingStaff = memo(
  ({ data, selected, onSelect, isLoadingBookings }: BookingStaffProps) => {
    const { t } = useTranslation({
      id: "booking-staff",
      locales: { da, en },
    });

    const onClick = useCallback(() => {
      onSelect(undefined);
    }, [onSelect]);

    const buttons = useMemo(
      () =>
        data?.map((s) => (
          <StaffButton
            key={s._id}
            selectedStaff={selected}
            onSelect={onSelect}
            staff={s}
            isLoadingBookings={isLoadingBookings}
          />
        )),
      [data, selected, onSelect, isLoadingBookings],
    );

    if (!data) {
      return <LoadingSpinner />;
    }

    return (
      <Stack>
        <Button
          icon={<Avatar size="medium" />}
          size="large"
          onClick={onClick}
          pressed={!selected}
          loading={!selected ? isLoadingBookings : false}
        >
          {t("all")}
        </Button>
        {buttons}
      </Stack>
    );
  },
);

interface StaffButtonProps {
  selectedStaff?: Staff;
  staff: Staff;
  onSelect: (value: Staff) => void;
  isLoadingBookings?: boolean;
}

const StaffButton = memo(
  ({ selectedStaff, staff, onSelect, isLoadingBookings }: StaffButtonProps) => {
    const onClick = useCallback(() => onSelect(staff), [onSelect, staff]);

    return (
      <Button
        size="large"
        key={staff._id}
        onClick={onClick}
        pressed={selectedStaff?._id === staff._id}
        loading={selectedStaff?._id === staff._id ? isLoadingBookings : false}
        icon={
          <Avatar size="medium" name={staff.fullname} source={staff.avatar} />
        }
      >
        {staff.fullname}
      </Button>
    );
  },
);
